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
  canSendFeedback,
  onSendFeedback
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
    <div className="p-4 bg-gray-800">
      {/* Main Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-3">
          {!isConnected ? (
            <button
              onClick={onStart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              📞 Start Emergency Call
            </button>
          ) : (
            <button
              onClick={onEnd}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              📴 End Call
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className="text-sm text-gray-300">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Text Input */}
      {isConnected && (
        <form onSubmit={handleSendMessage} className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Type your response..."
              className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              disabled={isSpeaking}
            />
            <button
              type="submit"
              disabled={!textMessage.trim() || isSpeaking}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      )}

      {/* Quick Response Buttons */}
      {isConnected && (
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Quick Responses:</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => onSendMessage(response)}
                disabled={isSpeaking}
                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-200 text-sm px-3 py-2 rounded border border-gray-600 transition-colors"
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Controls */}
      {canSendFeedback && (
        <div className="border-t border-gray-700 pt-4">
          <div className="text-sm text-gray-400 mb-2">Training Feedback:</div>
          <div className="flex space-x-2">
            <button
              onClick={() => onSendFeedback(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              👍 Good Response
            </button>
            <button
              onClick={() => onSendFeedback(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              👎 Needs Improvement
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isConnected && (
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
          <h3 className="text-blue-200 font-medium mb-2">Training Instructions:</h3>
          <ul className="text-blue-300 text-sm space-y-1">
            <li>• Click &quot;Start Emergency Call&quot; to begin the simulation</li>
            <li>• Listen carefully to the caller&apos;s emergency</li>
            <li>• Ask appropriate questions to gather information</li>
            <li>• Provide clear, calm instructions</li>
            <li>• Use quick response buttons for common dispatcher phrases</li>
            <li>• Provide feedback on your performance when prompted</li>
          </ul>
        </div>
      )}
    </div>
  );
}
