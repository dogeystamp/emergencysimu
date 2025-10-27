import { NextResponse } from 'next/server';

export async function GET() {
      const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
      const elevenLabsAgentId = process.env.ELEVENLABS_AGENT_ID;
      const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID;
  
      if (!elevenLabsApiKey) {
        return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
      }
      if (!elevenLabsAgentId) {
        return NextResponse.json({ error: 'ElevenLabs Agent ID not configured' }, { status: 500 });
      }
      if (!elevenLabsVoiceId) {
        return NextResponse.json({ error: 'ElevenLabs Voice ID not configured' }, { status: 500 });
      }
  
      try {
        const signedUrlResponse = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${elevenLabsAgentId}`, {
          method: 'GET',
          headers: {
            'xi-api-key': elevenLabsApiKey,
          },
        });
  
        if (!signedUrlResponse.ok) {
          const errorText = await signedUrlResponse.text();
          console.error(`ElevenLabs Signed URL API error: ${signedUrlResponse.status} - ${errorText}`);
          return NextResponse.json({ error: `Failed to get signed URL from ElevenLabs: ${errorText}` }, { status: signedUrlResponse.status });
        }
  
        const { signed_url } = await signedUrlResponse.json();
  
        return NextResponse.json({
          signedUrl: signed_url,
          elevenLabsVoiceId: elevenLabsVoiceId,
        });
      } catch (error) {
        console.error('Error generating ElevenLabs signed URL:', error);
        return NextResponse.json({ error: 'Internal server error when generating signed URL' }, { status: 500 });
      }
    }
  
