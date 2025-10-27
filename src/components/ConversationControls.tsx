'use client';

import { useState } from 'react';

interface ConversationControlsProps {
  isConnected: boolean;
  isSpeaking: boolean;
  onStart: () => void;
  onEnd: () => void;
  onSendMessage: (message: string) => void;
  canSendFeedback: boolean;
  onSendFeedback: (positive: boolean) => void;
}

export default function ConversationControls({
  isConnected,
  isSpeaking,
  onStart,
  onEnd,
  onSendMessage,
}: ConversationControlsProps) {
  const [textMessage, setTextMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (textMessage.trim() && isConnected) {
      onSendMessage(textMessage.trim());
      setTextMessage('');
    }
  };

  const quickResponses = [
    "What is your emergency?",
    "What is your location?",
    "Are you safe right now?",
    "Is anyone injured?",
    "Can you describe what happened?",
    "Stay on the line, help is on the way"
  ];

  return (
    <div className="p-4 bg-slate-800/50 border-t border-slate-700">
      {isConnected ? (
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Your response..."
            className="flex-1 bg-slate-700 text-white px-5 py-3 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            disabled={isSpeaking}
          />
          <div className="relative">
            <select 
              onChange={(e) => onSendMessage(e.target.value)}
              disabled={isSpeaking}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-200 px-4 py-3 rounded-lg border border-slate-600 hover:border-slate-500 transition-all appearance-none pr-10"
            >
              <option value="" disabled selected>Quick Responses</option>
              {quickResponses.map((response, index) => (
                <option key={index} value={response}>{response}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={!textMessage.trim() || isSpeaking}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none"
          >
            Send
          </button>
          <button
            onClick={onEnd}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-red-500/25"
          >
            End Call
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-center py-8">
          <button
            onClick={onStart}
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
