'use client';

interface ConversationDisplayProps {
  messages: Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>;
  isConnected: boolean;
  isSpeaking: boolean;
}

export default function ConversationDisplay({ messages, isConnected, isSpeaking }: ConversationDisplayProps) {
  return (
    <div className="flex-1 bg-slate-900/50 overflow-y-auto p-6">
      <div className="space-y-6">
        {!isConnected && messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-sm">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <div className="w-24 h-24 bg-gradient-to-br from-green-800 to-emerald-900 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
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
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'agent' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📞</span>
              </div>
            )}
            <div
              className={`max-w-xl px-5 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-100 rounded-bl-none'
              }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">YOU</span>
              </div>
            )}
          </div>
        ))}

        {isSpeaking && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">📞</span>
            </div>
            <div className="bg-slate-700 text-slate-100 px-5 py-3 rounded-2xl rounded-bl-none">
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
