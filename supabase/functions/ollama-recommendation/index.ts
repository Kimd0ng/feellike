// Supabase Edge Function: ollama-recommendation
// OpenAI API를 사용하여 감정 기반 추천 생성

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RecommendationRequest {
    mood: string;
    weather: {
        temp: number;
        condition: string;
        description: string;
    };
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

Deno.serve(async (req) => {
    // CORS preflight 처리
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        if (!OPENAI_API_KEY) {
            return new Response(
                JSON.stringify({
                    theme: '오늘의 추천',
                    reason: '기분 전환에 좋아요.',
                    recommendation: '맛있는 음식 주문',
                    platform: 'baemin',
                    searchKeyword: '맛집',
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const { mood, weather, timeOfDay }: RecommendationRequest = await req.json()

        const timeDescriptions: Record<string, string> = {
            morning: '아침',
            afternoon: '오후',
            evening: '저녁',
            night: '밤',
        }

        const systemPrompt = `당신은 감정 기반 소비를 추천하는 AI입니다. JSON으로만 답변하세요:
{"theme":"테마","reason":"이유","recommendation":"추천","platform":"baemin","searchKeyword":"검색어"}
platform은 baemin/youtube/coupang 중 하나.`

        const userPrompt = `감정: ${mood}, 날씨: ${weather.description} ${Math.round(weather.temp)}°C, 시간: ${timeDescriptions[timeOfDay]}. 한국어로 답변.`

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 200,
                response_format: { type: 'json_object' },
            }),
        })

        if (!openaiResponse.ok) {
            throw new Error(`OpenAI API error: ${openaiResponse.status}`)
        }

        const openaiData = await openaiResponse.json()
        const responseText = openaiData.choices[0].message.content
        const result = JSON.parse(responseText)

        // 플랫폼 검증
        if (!['baemin', 'youtube', 'coupang'].includes(result.platform)) {
            result.platform = 'baemin'
        }

        return new Response(
            JSON.stringify(result),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({
                theme: '오늘의 추천',
                reason: '기분 전환에 좋아요.',
                recommendation: '맛있는 음식 주문',
                platform: 'baemin',
                searchKeyword: '맛집',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
