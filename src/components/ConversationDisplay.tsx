'use client';

import { useState, useEffect, useRef } from 'react';

interface ConversationDisplayProps {
  messages: Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>;
  isConnected: boolean;
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;
  addMessage: (message: {id: string, type: 'user' | 'agent', content: string, timestamp: Date}) => void;
}

export default function ConversationDisplay({
  messages,
  isConnected,
  isSpeaking,
  setIsSpeaking,
  addMessage,
}: ConversationDisplayProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize AudioContext on user gesture (e.g., first click on start call button)
    // For now, we'll try to initialize it here, but might need to move it.
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    // WebSocket connection
    if (isConnected && !wsRef.current) {
      wsRef.current = new WebSocket(`ws://${window.location.host}/api/audio-chat`);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected for audio playback');
      };

      wsRef.current.onmessage = async (event) => {
        if (typeof event.data === 'string') {
          // Handle text messages (e.g., Gemini response text)
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'text') {
              addMessage({ id: Date.now().toString(), type: 'agent', content: data.content, timestamp: new Date() });
            } else if (data.type === 'error') {
              console.error('Server error:', data.content);
              addMessage({ id: Date.now().toString(), type: 'agent', content: `Error: ${data.content}`, timestamp: new Date() });
            }
          } catch (e) {
            console.error('Failed to parse WebSocket string message:', e);
          }
        } else if (event.data instanceof Blob) {
          // Handle audio data
          try {
            const arrayBuffer = await event.data.arrayBuffer();
            if (audioContextRef.current) {
              const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
              audioQueueRef.current.push(audioBuffer);
              if (!isPlayingRef.current) {
                playNextAudio();
              }
            }
          } catch (e) {
            console.error('Error decoding audio data:', e);
          }
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected for audio playback');
        setIsSpeaking(false);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsSpeaking(false);
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isConnected, addMessage, setIsSpeaking]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const playNextAudio = () => {
    if (audioQueueRef.current.length > 0 && audioContextRef.current && !isPlayingRef.current) {
      isPlayingRef.current = true;
      setIsSpeaking(true);
      const audioBuffer = audioQueueRef.current.shift();
      if (audioBuffer) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => {
          isPlayingRef.current = false;
          if (audioQueueRef.current.length > 0) {
            playNextAudio();
          } else {
            setIsSpeaking(false);
          }
        };
        source.start(0);
      }
    }
  };

  return (
    <div ref={scrollRef} className="flex-1 bg-transparent overflow-y-auto p-6">
      <div className="space-y-6">
        {!isConnected && messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-sm">
              <div className="w-24 h-24 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Start</h3>
              <p className="text-slate-400">
                Click the "Start Emergency Call" button to begin your training simulation.
              </p>
            </div>
          </div>
        )}
        
        {isConnected && messages.length === 0 && !isSpeaking && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-sm">
              <div className="w-24 h-24 bg-green-800/50 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Connected</h3>
              <p className="text-slate-400">The simulation has started. Waiting for the first message.</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 items-end ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'agent' && (
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🚨</span>
              </div>
            )}
            <div
              className={`max-w-lg px-5 py-3 rounded-2xl shadow-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-100 rounded-bl-none'
              }`}>
              <p className="leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isSpeaking && (
          <div className="flex gap-4 items-end">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="bg-slate-700 text-slate-100 px-5 py-3 rounded-2xl rounded-bl-none shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
