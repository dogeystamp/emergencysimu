// This file is no longer used for conversational turns in the audio call flow.
// The audio call logic is now handled by src/app/api/audio-chat/route.ts
// and the WebSocket connection.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'This endpoint is deprecated for audio calls.' }, { status: 400 });
}