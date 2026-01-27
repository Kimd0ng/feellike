-- =============================================
-- Subscription System Tables
-- 구독 시스템을 위한 테이블 및 함수
-- Supabase SQL Editor에서 실행하세요
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
-- 완료!
-- =============================================
-- 테이블이 생성되었습니다:
-- 1. daily_usage - 일일 사용량 추적
-- 2. subscriptions - 구독 정보
-- 3. payment_history - 결제 내역
--
-- 함수가 생성되었습니다:
-- 1. get_or_create_daily_usage() - 오늘 사용량 조회/생성
-- 2. increment_daily_usage() - 사용량 증가
-- 3. check_usage_availability() - 사용 가능 여부 체크
-- 4. get_subscription_status() - 구독 상태 조회
