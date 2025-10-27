'use client';

import { useState, useEffect, useRef } from 'react';

interface ConversationControlsProps {
  isConnected: boolean;
  isSpeaking: boolean;
  onStartCall: () => void; // Renamed from onStart to avoid conflict
  onEndCall: () => void;   // Renamed from onEnd to avoid conflict
  onSendMessage: (message: string) => void;
  canSendFeedback: boolean;
  onSendFeedback: (positive: boolean) => void;
}

// Extend Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function ConversationControls({
  isConnected,
  isSpeaking,
  onStartCall,
  onEndCall,
  onSendMessage,
}: ConversationControlsProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Listen for a single utterance
      recognitionRef.current.interimResults = true; // Get interim results
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
        console.log('Speech recognition started');
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart + ' ';
          } else {
            interimTranscript += transcriptPart;
          }
        }
        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          console.log('Final transcript:', finalTranscript.trim());
          onSendMessage(finalTranscript.trim());
          setIsListening(false); // Stop listening after final result
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
        // If no final transcript was sent, but listening ended, clear transcript
        if (!transcript) {
          setTranscript('');
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTranscript('');
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSendMessage, transcript]); // Added transcript to dependencies

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="p-4 bg-slate-800/50 border-t border-slate-700">
      {isConnected ? (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={startListening}
            disabled={isListening || isSpeaking}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${isListening ? 'bg-red-600 hover:bg-red-700 shadow-red-500/25' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'} text-white disabled:bg-slate-600 disabled:cursor-not-allowed`}
          >
            {isListening ? (
              <>
                <span className="animate-pulse">🔴</span>
                <span>Listening...</span>
              </>
            ) : (
              <>
                <span>🎤</span>
                <span>Speak</span>
              </>
            )}
          </button>
          {transcript && (
            <div className="flex-1 bg-slate-700 text-white px-5 py-3 rounded-lg border border-slate-600 overflow-hidden text-ellipsis whitespace-nowrap">
              {transcript}
            </div>
          )}
          <button
            onClick={onEndCall}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-red-500/25"
          >
            End Call
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <button
            onClick={onStartCall}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-green-500/25 flex items-center gap-3 text-xl"
          >
            <span className="text-3xl">📞</span>
            <span>Start Emergency Call</span>
          </button>
        </div>
      )}
    </div>
  );
}
