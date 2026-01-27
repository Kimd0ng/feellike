// Supabase Edge Function: toss-billing-payment
// 토스페이먼츠 빌링 결제 실행

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const TOSS_SECRET_KEY = Deno.env.get('TOSS_SECRET_KEY')
const TOSS_API_URL = 'https://api.tosspayments.com/v1/billing'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const PREMIUM_PRICE = 4900 // 월 구독료

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * 주문 ID 생성
 */
function generateOrderId(): string {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    return `FL_${timestamp}_${randomStr}`.toUpperCase()
}

/**
 * 토스페이먼츠 빌링 결제 Edge Function
 * 저장된 빌링키를 사용하여 정기 결제를 실행합니다.
 * @author Feel Economy Team
 */
Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Authorization 헤더에서 사용자 토큰 추출
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: 'Authorization header required' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Supabase 클라이언트 생성
        const supabase = createClient(
            SUPABASE_URL!,
            SUPABASE_SERVICE_ROLE_KEY!
        )

        // 사용자 토큰 검증
        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return new Response(
                JSON.stringify({ error: 'Invalid or expired token' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const { billingKey, customerKey } = await req.json()

        if (!billingKey || !customerKey) {
            return new Response(
                JSON.stringify({ error: 'billingKey and customerKey are required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const orderId = generateOrderId()

        // 테스트 환경에서 실제 API 키가 없으면 mock 응답 반환
        if (!TOSS_SECRET_KEY) {
            console.log('[DEV MODE] Returning mock payment response')

            // 구독 상태 업데이트 (mock)
            const expiresAt = new Date()
            expiresAt.setMonth(expiresAt.getMonth() + 1)

            await supabase
                .from('subscriptions')
                .update({
                    status: 'active',
                    started_at: new Date().toISOString(),
                    expires_at: expiresAt.toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq('user_id', user.id)

            // 결제 내역 저장 (mock)
            const { data: subscription } = await supabase
                .from('subscriptions')
                .select('id')
                .eq('user_id', user.id)
                .single()

            await supabase
                .from('payment_history')
                .insert({
                    user_id: user.id,
                    subscription_id: subscription?.id,
                    amount: PREMIUM_PRICE,
                    currency: 'KRW',
                    payment_key: `mock_payment_${Date.now()}`,
                    order_id: orderId,
                    status: 'completed',
                    payment_method: 'CARD',
                    card_company: '삼성카드',
                    card_number: '5365-****-****-0123',
                    receipt_url: 'https://example.com/receipt',
                    paid_at: new Date().toISOString(),
                })

            return new Response(
                JSON.stringify({
                    paymentKey: `mock_payment_${Date.now()}`,
                    orderId,
                    status: 'DONE',
                    approvedAt: new Date().toISOString(),
                    receiptUrl: 'https://example.com/receipt',
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 토스페이먼츠 빌링 결제 API 호출
        const basicAuth = btoa(`${TOSS_SECRET_KEY}:`)

        const tossResponse = await fetch(`${TOSS_API_URL}/${billingKey}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerKey,
                amount: PREMIUM_PRICE,
                orderId,
                orderName: 'Feel Like 프리미엄 구독 (월간)',
            }),
        })

        if (!tossResponse.ok) {
            const errorData = await tossResponse.json()
            console.error('Toss payment error:', errorData)

            // 결제 실패 내역 저장
            const { data: subscription } = await supabase
                .from('subscriptions')
                .select('id')
                .eq('user_id', user.id)
                .single()

            await supabase
                .from('payment_history')
                .insert({
                    user_id: user.id,
                    subscription_id: subscription?.id,
                    amount: PREMIUM_PRICE,
                    currency: 'KRW',
                    order_id: orderId,
                    status: 'failed',
                    failure_reason: errorData.message || 'Payment failed',
                })

            return new Response(
                JSON.stringify({ 
                    error: errorData.message || 'Payment failed',
                    code: errorData.code 
                }),
                { status: tossResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const tossData = await tossResponse.json()

        // 구독 상태 업데이트
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        const { error: subscriptionError } = await supabase
            .from('subscriptions')
            .update({
                status: 'active',
                started_at: new Date().toISOString(),
                expires_at: expiresAt.toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)

        if (subscriptionError) {
            console.error('Subscription update error:', subscriptionError)
        }

        // 결제 내역 저장
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('user_id', user.id)
            .single()

        const { error: paymentError } = await supabase
            .from('payment_history')
            .insert({
                user_id: user.id,
                subscription_id: subscription?.id,
                amount: PREMIUM_PRICE,
                currency: 'KRW',
                payment_key: tossData.paymentKey,
                order_id: orderId,
                status: 'completed',
                payment_method: tossData.method || 'CARD',
                card_company: tossData.card?.company || '',
                card_number: tossData.card?.number || '',
                receipt_url: tossData.receipt?.url || '',
                paid_at: tossData.approvedAt,
            })

        if (paymentError) {
            console.error('Payment history error:', paymentError)
        }

        return new Response(
            JSON.stringify({
                paymentKey: tossData.paymentKey,
                orderId: tossData.orderId,
                status: tossData.status,
                approvedAt: tossData.approvedAt,
                receiptUrl: tossData.receipt?.url || '',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Error in toss-billing-payment:', error)
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
