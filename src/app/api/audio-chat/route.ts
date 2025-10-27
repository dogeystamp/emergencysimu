import { NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import { GoogleGenerativeAI } from '@google/generative-ai';

let wss: WebSocketServer | undefined;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('GOOGLE_API_KEY is not set');
}
if (!ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY is not set');
}

const genAI = GOOGLE_API_KEY ? new GoogleGenerativeAI(GOOGLE_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite"}) : null;

async function getGeminiResponse(message: string): Promise<string> {
  if (!model) {
    return "AI model not initialized.";
  }
  try {
    const chat = model.startChat({}); // Start a new chat for each message for simplicity here
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return "I'm sorry, I'm having trouble understanding right now.";
  }
}

async function getElevenLabsAudio(text: string): Promise<Buffer | null> {
  if (!ELEVENLABS_API_KEY) {
    return null;
  }
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/YOUR_VOICE_ID`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status} - ${errorText}`);
      return null;
    }

    const audioBuffer = await response.arrayBuffer();
    return Buffer.from(audioBuffer);
  } catch (error) {
    console.error('Error calling ElevenLabs API:', error);
    return null;
  }
}

function getWebSocketServer() {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', ws => {
      console.log('Client connected to audio-chat WebSocket');

      ws.on('message', async message => {
        console.log(`Received text from client: ${message}`);
        const transcribedText = message.toString();

        // 1. Get Gemini Response
        const geminiResponseText = await getGeminiResponse(transcribedText);
        ws.send(JSON.stringify({ type: 'text', content: geminiResponseText })); // Send text back for display

        // 2. Get ElevenLabs Audio
        const audioBuffer = await getElevenLabsAudio(geminiResponseText);
        if (audioBuffer) {
          ws.send(audioBuffer); // Send audio buffer back to client
        } else {
          ws.send(JSON.stringify({ type: 'error', content: 'Failed to generate audio.' }));
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected from audio-chat WebSocket');
      });

      ws.on('error', error => {
        console.error('WebSocket error:', error);
      });
    });
  }
  return wss;
}

export async function GET(request: NextRequest) {
  // This is a workaround for Next.js's serverless nature.
  // In a real-world scenario, you'd typically use a dedicated WebSocket server
  // or a platform that supports WebSockets directly.
  // Here, we're hijacking the request to upgrade to a WebSocket.
  
  // @ts-ignore - req.socket.server is not directly typed
  const server = request.socket?.server;
  if (server && !server.wss) {
    server.wss = getWebSocketServer();
    server.on('upgrade', (req: any, socket: any, head: any) => {
      if (req.url === '/api/audio-chat') {
        server.wss.handleUpgrade(req, socket, head, (ws: any) => {
          server.wss.emit('connection', ws, req);
        });
      }
    });
  }

  return new Response(null, { status: 101 }); // Switching Protocols
}
