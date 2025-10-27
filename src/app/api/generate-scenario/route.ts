import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    const systemPrompt = `You are an expert in creating realistic emergency scenarios for dispatcher training. Generate an emergency scenario that could realistically happen in Waterloo, Ontario, Canada.

Create a scenario with the following structure:
1. Caller's emotional state and physical condition
2. Location details (be specific with landmarks, street names, and surroundings in Waterloo)
3. Description of the emergency situation
4. Coordinates in JSON format: {"lat": 43.XXXX, "lng": -80.XXXX} with realistic Waterloo coordinates

Waterloo area coordinates to use as reference:
- Latitude: ~43.4 to 43.5
- Longitude: ~-80.5 to -80.6

The scenario should be:
- Realistic and believable
- Detailed enough to feel authentic
- Placed in a specific urban location in Waterloo, Ontario
- Involving a single emergency situation (medical, accident, security, etc.)
- Include specific details like caller characteristics, exact location, what's happening
- Provide coordinates as specified latitude around 43.40-43.52 and longitude around -80.50 to -80.60

Format your response as:
SCENARIO:
[prompt that describes the caller's state, location, and the emergency situation they're witnessing]

COORDINATES:
{"lat": 43.XXXX, "lng": -80.XXXX}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || '',
        'X-Title': 'Scenario Generator'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate a new realistic emergency scenario for dispatcher training.' }
        ],
        max_tokens: 800,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `OpenRouter API error: ${error}` }, { status: response.status });
    }

    const data = await response.json();
    console.log('OpenRouter API response:', JSON.stringify(data, null, 2));
    const responseText = data.choices[0]?.message?.content || 'No response from model';
    console.log('OpenRouter response text:', responseText);
    
    // Parse coordinates from the response
    let coordinates = null;
    const coordinatesMatch = responseText.match(/COORDINATES:\s*\{[^}]+\}/);
    if (coordinatesMatch) {
      try {
        coordinates = JSON.parse(coordinatesMatch[0].replace('COORDINATES:', '').trim());
      } catch (e) {
        console.error('Failed to parse coordinates:', e);
      }
    }
    
    // Extract just the scenario text (before COORDINATES:)
    const scenarioText = responseText.split('COORDINATES:')[0].replace('SCENARIO:', '').trim();
    
    // Fallback to default Waterloo coordinates if parsing failed
    if (!coordinates) {
      coordinates = { lat: 43.4643, lng: -80.5204 };
    }
    
    return NextResponse.json({
      scenario: scenarioText || responseText,
      coordinates
    });
  } catch (error) {
    console.error('Error generating scenario:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

