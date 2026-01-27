// Supabase Edge Function: weather-proxy
// OpenWeatherMap API 프록시

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

const WEATHER_API_KEY = Deno.env.get('WEATHER_API_KEY')
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { lat, lon } = await req.json()

        // API 키가 없으면 mock 데이터 반환
        if (!WEATHER_API_KEY) {
            return new Response(
                JSON.stringify({
                    temp: 15,
                    condition: 'sunny',
                    description: '맑음 (개발 모드)',
                    icon: '01d',
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`)
        }

        const data = await response.json()

        const weatherId = data.weather[0].id
        let condition = 'sunny'

        if (weatherId >= 200 && weatherId < 600) {
            condition = 'rainy'
        } else if (weatherId >= 600 && weatherId < 700) {
            condition = 'snowy'
        } else if (weatherId >= 801) {
            condition = 'cloudy'
        }

        return new Response(
            JSON.stringify({
                temp: data.main.temp,
                condition,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
