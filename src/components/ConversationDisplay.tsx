'use client';

interface ConversationDisplayProps {
  messages: Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>;
  isConnected: boolean;
  isSpeaking: boolean;
}

export default function ConversationDisplay({ messages, isConnected, isSpeaking }: ConversationDisplayProps) {
  return (
    <div className="h-96 bg-gray-900 border-b border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        {!isConnected && (
          <div className="text-center text-gray-400 py-8">
            <div className="text-lg mb-2">📞 Ready to Start Training</div>
            <div className="text-sm">Click &quot;Start Emergency Call&quot; to begin the simulation</div>
          </div>
        )}
        
        {isConnected && messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <div className="text-lg mb-2">🔗 Connected to Emergency Services</div>
            <div className="text-sm">Waiting for agent response...</div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {message.type === 'user' ? 'You (Dispatcher)' : 'Emergency Caller'}
              </div>
              <div className="text-sm">{message.content}</div>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isSpeaking && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">Emergency caller is speaking...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
