// Supabase Edge Function: toss-billing-auth
// 토스페이먼츠 빌링키 발급 처리

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const TOSS_SECRET_KEY = Deno.env.get('TOSS_SECRET_KEY')
const TOSS_API_URL = 'https://api.tosspayments.com/v1/billing/authorizations/issue'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * 토스페이먼츠 빌링키 발급 Edge Function
 * 클라이언트에서 카드 정보 입력 후 발급받은 authKey를 사용하여 빌링키를 발급합니다.
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

        // Supabase 클라이언트 생성 (사용자 인증 확인용)
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

        const { authKey, customerKey } = await req.json()

        if (!authKey || !customerKey) {
            return new Response(
                JSON.stringify({ error: 'authKey and customerKey are required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 테스트 환경에서 실제 API 키가 없으면 mock 응답 반환
        if (!TOSS_SECRET_KEY) {
            console.log('[DEV MODE] Returning mock billing key')
            return new Response(
                JSON.stringify({
                    billingKey: `mock_billing_key_${Date.now()}`,
                    customerKey,
                    cardCompany: '삼성카드',
                    cardNumber: '5365-****-****-0123',
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 토스페이먼츠 빌링키 발급 API 호출
        const basicAuth = btoa(`${TOSS_SECRET_KEY}:`)

        const tossResponse = await fetch(TOSS_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authKey,
                customerKey,
            }),
        })

        if (!tossResponse.ok) {
            const errorData = await tossResponse.json()
            console.error('Toss API error:', errorData)
            return new Response(
                JSON.stringify({ 
                    error: errorData.message || 'Failed to issue billing key',
                    code: errorData.code 
                }),
                { status: tossResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const tossData = await tossResponse.json()

        // 빌링키를 subscriptions 테이블에 저장
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        const { error: dbError } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: user.id,
                plan_type: 'premium',
                billing_key: tossData.billingKey,
                customer_key: customerKey,
                status: 'pending', // 첫 결제 완료 후 active로 변경
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'user_id',
            })

        if (dbError) {
            console.error('Database error:', dbError)
            return new Response(
                JSON.stringify({ error: 'Failed to save billing key' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        return new Response(
            JSON.stringify({
                billingKey: tossData.billingKey,
                customerKey: tossData.customerKey,
                cardCompany: tossData.card?.cardCompany || '',
                cardNumber: tossData.card?.number || '',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Error in toss-billing-auth:', error)
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
