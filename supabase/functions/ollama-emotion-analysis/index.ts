// Supabase Edge Function: ollama-emotion-analysis
// 감정 분석 (OpenAI API 사용)

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        if (!OPENAI_API_KEY) {
            return new Response(
                JSON.stringify({ emotion: '보통' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const { text } = await req.json()

        const systemPrompt = `감정을 분석하여 다음 중 하나만 답변: 행복함, 우울함, 피곤함, 흥분됨, 차분함, 화남, 불안함, 신남`
        const userPrompt = `텍스트: "${text}"`

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
                temperature: 0.3,
                max_tokens: 10,
            }),
        })

        if (!openaiResponse.ok) {
            throw new Error('OpenAI API error')
        }

        const data = await openaiResponse.json()
        let emotion = data.choices[0].message.content.trim()

        const validEmotions = ['행복함', '우울함', '피곤함', '흥분됨', '차분함', '화남', '불안함', '신남']
        if (!validEmotions.includes(emotion)) {
            emotion = '행복함'
        }

        return new Response(
            JSON.stringify({ emotion }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ emotion: '보통' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
