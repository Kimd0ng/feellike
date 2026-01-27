-- =============================================
-- Feel Economy Database Schema
-- =============================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- emotion_logs table
-- =============================================
CREATE TABLE IF NOT EXISTS emotion_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  weather JSONB NOT NULL,
  recommendation JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_emotion_logs_user_id ON emotion_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_emotion_logs_created_at ON emotion_logs(created_at DESC);

-- =============================================
-- Row Level Security (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE emotion_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own logs
CREATE POLICY "Users can view own logs"
  ON emotion_logs
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own logs
CREATE POLICY "Users can insert own logs"
  ON emotion_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own logs
CREATE POLICY "Users can update own logs"
  ON emotion_logs
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own logs
CREATE POLICY "Users can delete own logs"
  ON emotion_logs
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- Helper Functions
-- =============================================

-- Function to get user's emotion statistics
CREATE OR REPLACE FUNCTION get_emotion_stats(target_user_id UUID)
RETURNS TABLE (
  mood TEXT,
  count BIGINT,
  last_occurrence TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    el.mood,
    COUNT(*) as count,
    MAX(el.created_at) as last_occurrence
  FROM emotion_logs el
  WHERE el.user_id = target_user_id
  GROUP BY el.mood
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's recent logs
CREATE OR REPLACE FUNCTION get_recent_logs(target_user_id UUID, log_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  mood TEXT,
  weather JSONB,
  recommendation JSONB,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    el.id,
    el.mood,
    el.weather,
    el.recommendation,
    el.created_at
  FROM emotion_logs el
  WHERE el.user_id = target_user_id
  ORDER BY el.created_at DESC
  LIMIT log_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get similar past logs (same mood + similar weather)
CREATE OR REPLACE FUNCTION get_similar_past_logs(
  target_user_id UUID,
  target_mood TEXT,
  target_weather_condition TEXT,
  log_limit INTEGER DEFAULT 3
)
RETURNS TABLE (
  id UUID,
  mood TEXT,
  weather JSONB,
  recommendation JSONB,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    el.id,
    el.mood,
    el.weather,
    el.recommendation,
    el.created_at
  FROM emotion_logs el
  WHERE el.user_id = target_user_id
    AND el.mood = target_mood
    AND el.weather->>'condition' = target_weather_condition
  ORDER BY el.created_at DESC
  LIMIT log_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Subscription System Tables
-- =============================================

-- daily_usage table: 사용자별 일일 추천 사용량 추적
CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  usage_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_usage_user_date ON daily_usage(user_id, usage_date);

-- subscriptions table: 구독 상태 관리
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'premium')),
  billing_key TEXT,
  customer_key TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'pending')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for subscription queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- payment_history table: 결제 내역 저장
CREATE TABLE IF NOT EXISTS payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KRW',
  payment_key TEXT,
  order_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  payment_method TEXT,
  card_company TEXT,
  card_number TEXT,
  receipt_url TEXT,
  failure_reason TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for payment history queries
CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_status ON payment_history(status);
CREATE INDEX IF NOT EXISTS idx_payment_history_paid_at ON payment_history(paid_at DESC);

-- =============================================
-- Subscription System RLS
-- =============================================

-- Enable RLS for subscription tables
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- daily_usage policies
CREATE POLICY "Users can view own usage"
  ON daily_usage
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON daily_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON daily_usage
  FOR UPDATE
  USING (auth.uid() = user_id);

-- subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
  ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- payment_history policies
CREATE POLICY "Users can view own payments"
  ON payment_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payment_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- Subscription Helper Functions
-- =============================================

-- Function to get or create today's usage record
CREATE OR REPLACE FUNCTION get_or_create_daily_usage(target_user_id UUID)
RETURNS daily_usage AS $$
DECLARE
  usage_record daily_usage;
BEGIN
  -- Try to get existing record for today
  SELECT * INTO usage_record
  FROM daily_usage
  WHERE user_id = target_user_id AND usage_date = CURRENT_DATE;
  
  -- If not found, create new record
  IF NOT FOUND THEN
    INSERT INTO daily_usage (user_id, usage_date, usage_count)
    VALUES (target_user_id, CURRENT_DATE, 0)
    RETURNING * INTO usage_record;
  END IF;
  
  RETURN usage_record;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment daily usage
CREATE OR REPLACE FUNCTION increment_daily_usage(target_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO daily_usage (user_id, usage_date, usage_count)
  VALUES (target_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, usage_date)
  DO UPDATE SET 
    usage_count = daily_usage.usage_count + 1,
    updated_at = NOW()
  RETURNING usage_count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can use recommendation
CREATE OR REPLACE FUNCTION check_usage_availability(target_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_subscription subscriptions;
  current_usage INTEGER;
  free_limit INTEGER := 3;
BEGIN
  -- Check if user has active premium subscription
  SELECT * INTO user_subscription
  FROM subscriptions
  WHERE user_id = target_user_id
    AND plan_type = 'premium'
    AND status = 'active'
    AND (expires_at IS NULL OR expires_at > NOW());
  
  -- Premium users have unlimited access
  IF FOUND THEN
    RETURN TRUE;
  END IF;
  
  -- Free users: check daily limit
  SELECT COALESCE(usage_count, 0) INTO current_usage
  FROM daily_usage
  WHERE user_id = target_user_id AND usage_date = CURRENT_DATE;
  
  RETURN COALESCE(current_usage, 0) < free_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's subscription status
CREATE OR REPLACE FUNCTION get_subscription_status(target_user_id UUID)
RETURNS TABLE (
  plan_type TEXT,
  status TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  today_usage INTEGER,
  daily_limit INTEGER,
  is_premium BOOLEAN
) AS $$
DECLARE
  sub_record subscriptions;
  usage_count INTEGER;
BEGIN
  -- Get subscription
  SELECT * INTO sub_record
  FROM subscriptions s
  WHERE s.user_id = target_user_id;
  
  -- Get today's usage
  SELECT COALESCE(du.usage_count, 0) INTO usage_count
  FROM daily_usage du
  WHERE du.user_id = target_user_id AND du.usage_date = CURRENT_DATE;
  
  RETURN QUERY SELECT
    COALESCE(sub_record.plan_type, 'free'),
    COALESCE(sub_record.status, 'active'),
    sub_record.expires_at,
    COALESCE(usage_count, 0),
    3,
    (sub_record.plan_type = 'premium' AND sub_record.status = 'active' AND (sub_record.expires_at IS NULL OR sub_record.expires_at > NOW()));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Sample Data (Optional - for testing)
-- =============================================

-- Uncomment below to insert sample data
-- Note: Replace 'YOUR_USER_ID' with actual user ID from auth.users

/*
INSERT INTO emotion_logs (user_id, mood, weather, recommendation, created_at) VALUES
(
  'YOUR_USER_ID',
  '행복함',
  '{"temp": 20, "condition": "sunny", "description": "맑음", "icon": "01d"}'::jsonb,
  '{
    "theme": "행복한 순간을 더 특별하게",
    "reason": "좋은 기분일 때는 평소 좋아하던 것을 즐기는 게 최고예요.",
    "recommendation": "좋아하는 디저트 카페 방문",
    "platform": "baemin",
    "searchKeyword": "디저트 카페"
  }'::jsonb,
  NOW() - INTERVAL '1 day'
),
(
  'YOUR_USER_ID',
  '우울함',
  '{"temp": 15, "condition": "rainy", "description": "비", "icon": "10d"}'::jsonb,
  '{
    "theme": "마음을 따뜻하게 채워줄 위로",
    "reason": "우울할 때는 따뜻한 음식이 세로토닌을 높여줄 거예요.",
    "recommendation": "따뜻한 국물 요리",
    "platform": "baemin",
    "searchKeyword": "국밥 칼국수"
  }'::jsonb,
  NOW() - INTERVAL '2 days'
);
*/
