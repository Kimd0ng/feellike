// Supabase Edge Function: geocoding-proxy
// Reverse geocoding 프록시

import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"

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

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
            { headers: { 'User-Agent': 'FeellikeApp/1.0' } }
        )

        if (!response.ok) {
            throw new Error('Geocoding API error')
        }

        const data = await response.json()
        const location = data.address?.city || data.address?.town || data.address?.county || '알 수 없는 위치'

        return new Response(
            JSON.stringify({ location }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ location: '알 수 없는 위치' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
