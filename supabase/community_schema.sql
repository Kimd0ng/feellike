-- =============================================
-- Feel Economy Community Schema
-- 커뮤니티 기능을 위한 데이터베이스 스키마
-- =============================================

-- =============================================
-- community_posts 테이블
-- 사용자들의 경험 공유 게시글
-- =============================================
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  -- 감정 분석 결과 연동
  mood TEXT,
  weather_condition TEXT,
  recommendation_theme TEXT,
  -- 메타데이터
  view_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_mood ON community_posts(mood);

-- =============================================
-- community_comments 테이블
-- 게시글에 대한 댓글
-- =============================================
CREATE TABLE IF NOT EXISTS community_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_community_comments_post_id ON community_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_community_comments_user_id ON community_comments(user_id);

-- =============================================
-- post_likes 테이블
-- 게시글 좋아요
-- =============================================
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- =============================================
-- community_posts RLS Policies
-- 읽기: 누구나 가능 (비로그인 포함)
-- 쓰기/수정/삭제: 본인만 가능
-- =============================================

-- 게시글 읽기 - 누구나 가능
CREATE POLICY "Anyone can view posts"
  ON community_posts
  FOR SELECT
  USING (true);

-- 게시글 작성 - 로그인한 사용자만
CREATE POLICY "Authenticated users can create posts"
  ON community_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 게시글 수정 - 본인만
CREATE POLICY "Users can update own posts"
  ON community_posts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 게시글 삭제 - 본인만
CREATE POLICY "Users can delete own posts"
  ON community_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- community_comments RLS Policies
-- =============================================

-- 댓글 읽기 - 누구나 가능
CREATE POLICY "Anyone can view comments"
  ON community_comments
  FOR SELECT
  USING (true);

-- 댓글 작성 - 로그인한 사용자만
CREATE POLICY "Authenticated users can create comments"
  ON community_comments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 댓글 삭제 - 본인만
CREATE POLICY "Users can delete own comments"
  ON community_comments
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- post_likes RLS Policies
-- =============================================

-- 좋아요 읽기 - 누구나 가능
CREATE POLICY "Anyone can view likes"
  ON post_likes
  FOR SELECT
  USING (true);

-- 좋아요 작성 - 로그인한 사용자만
CREATE POLICY "Authenticated users can like posts"
  ON post_likes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 좋아요 삭제 - 본인만
CREATE POLICY "Users can remove own likes"
  ON post_likes
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Helper Functions
-- =============================================

-- 게시글 조회수 증가
CREATE OR REPLACE FUNCTION increment_view_count(target_post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE community_posts
  SET view_count = view_count + 1
  WHERE id = target_post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 댓글 수 업데이트 (트리거용)
CREATE OR REPLACE FUNCTION update_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts
    SET comments_count = comments_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts
    SET comments_count = comments_count - 1
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 좋아요 수 업데이트 (트리거용)
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts
    SET likes_count = likes_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts
    SET likes_count = likes_count - 1
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Triggers
-- =============================================

-- 댓글 수 자동 업데이트 트리거
DROP TRIGGER IF EXISTS trigger_update_comments_count ON community_comments;
CREATE TRIGGER trigger_update_comments_count
  AFTER INSERT OR DELETE ON community_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comments_count();

-- 좋아요 수 자동 업데이트 트리거
DROP TRIGGER IF EXISTS trigger_update_likes_count ON post_likes;
CREATE TRIGGER trigger_update_likes_count
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_likes_count();

-- =============================================
-- 게시글 목록 조회 함수 (사용자 정보 포함)
-- =============================================
CREATE OR REPLACE FUNCTION get_community_posts(
  page_limit INTEGER DEFAULT 20,
  page_offset INTEGER DEFAULT 0,
  filter_mood TEXT DEFAULT NULL,
  sort_by TEXT DEFAULT 'latest'
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_email TEXT,
  title TEXT,
  content TEXT,
  mood TEXT,
  weather_condition TEXT,
  recommendation_theme TEXT,
  view_count INTEGER,
  likes_count INTEGER,
  comments_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cp.id,
    cp.user_id,
    u.email as user_email,
    cp.title,
    cp.content,
    cp.mood,
    cp.weather_condition,
    cp.recommendation_theme,
    cp.view_count,
    cp.likes_count,
    cp.comments_count,
    cp.created_at
  FROM community_posts cp
  LEFT JOIN auth.users u ON cp.user_id = u.id
  WHERE (filter_mood IS NULL OR cp.mood = filter_mood)
  ORDER BY
    CASE WHEN sort_by = 'popular' THEN cp.likes_count END DESC,
    CASE WHEN sort_by = 'latest' THEN cp.created_at END DESC
  LIMIT page_limit
  OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 게시글 상세 조회 함수
-- =============================================
CREATE OR REPLACE FUNCTION get_post_detail(target_post_id UUID, current_user_id UUID DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_email TEXT,
  title TEXT,
  content TEXT,
  mood TEXT,
  weather_condition TEXT,
  recommendation_theme TEXT,
  view_count INTEGER,
  likes_count INTEGER,
  comments_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  is_liked BOOLEAN,
  is_owner BOOLEAN
) AS $$
BEGIN
  -- 조회수 증가
  PERFORM increment_view_count(target_post_id);
  
  RETURN QUERY
  SELECT 
    cp.id,
    cp.user_id,
    u.email as user_email,
    cp.title,
    cp.content,
    cp.mood,
    cp.weather_condition,
    cp.recommendation_theme,
    cp.view_count + 1 as view_count,
    cp.likes_count,
    cp.comments_count,
    cp.created_at,
    EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = cp.id AND pl.user_id = current_user_id) as is_liked,
    (cp.user_id = current_user_id) as is_owner
  FROM community_posts cp
  LEFT JOIN auth.users u ON cp.user_id = u.id
  WHERE cp.id = target_post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 댓글 목록 조회 함수
-- =============================================
CREATE OR REPLACE FUNCTION get_post_comments(target_post_id UUID)
RETURNS TABLE (
  id UUID,
  post_id UUID,
  user_id UUID,
  user_email TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cc.id,
    cc.post_id,
    cc.user_id,
    u.email as user_email,
    cc.content,
    cc.created_at
  FROM community_comments cc
  LEFT JOIN auth.users u ON cc.user_id = u.id
  WHERE cc.post_id = target_post_id
  ORDER BY cc.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
