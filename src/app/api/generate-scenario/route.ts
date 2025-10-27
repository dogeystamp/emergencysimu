import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
      return NextResponse.json({ error: 'Google API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(googleApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite"});

    const systemPrompt = `You are an expert in creating realistic emergency scenarios for dispatcher training. Generate an emergency scenario that could realistically happen in Waterloo, Ontario, Canada.\n\nCreate a scenario with the following structure:\n1. Caller's emotional state and physical condition\n2. Location details (be specific with landmarks, street names, and surroundings in Waterloo)\n3. Description of the emergency situation\n4. Coordinates in JSON format: {"lat": 43.XXXX, "lng": -80.XXXX} with realistic Waterloo coordinates\n\nWaterloo area coordinates to use as reference:\n- Latitude: ~43.4 to 43.5\n- Longitude: ~-80.5 to -80.6\n\nThe scenario should be:\n- Realistic and believable\n- Detailed enough to feel authentic\n- Placed in a specific urban location in Waterloo, Ontario\n- Involving a single emergency situation (medical, accident, security, etc.)\n- Include specific details like caller characteristics, exact location, what's happening\n- Provide coordinates as specified latitude around 43.40-43.52 and longitude around -80.50 to -80.60\n\nFormat your response as:\nSCENARIO:\n[prompt that describes the caller's state, location, and the emergency situation they're witnessing]\n\nCOORDINATES:\n{"lat": 43.XXXX, "lng": -80.XXXX}`;

    const result = await model.generateContent(systemPrompt + '\n\nGenerate a new realistic emergency scenario for dispatcher training.');
    const response = await result.response;
    const responseText = response.text();
    console.log('Gemini API response:', responseText);
    
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

