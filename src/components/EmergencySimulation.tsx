'use client';

import { useState } from 'react';
import { useConversation } from '@elevenlabs/react';
import ConversationControls from './ConversationControls';
import ConversationDisplay from './ConversationDisplay';
import EmergencyHeader from './EmergencyHeader';

interface EmergencySimulationProps {
  systemPrompt: string;
}

export default function EmergencySimulation({ systemPrompt }: EmergencySimulationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>>([]);
  const [userId] = useState(() => `dispatcher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs agent');
      setIsConnected(false);
    },
    onMessage: (message) => {
      console.log('Received message:', message);
      const newMessage = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: (message.source === 'user' ? 'user' : 'agent') as 'user' | 'agent',
        content: message.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
    onStatusChange: (status) => {
      console.log('Status changed:', status);
    },
    overrides: {
      agent: {
        prompt: {
          prompt: systemPrompt
        },
        firstMessage: 'Hello?'
      }
    }
  });

  const startConversation = async () => {
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
      if (!agentId) {
        throw new Error('ElevenLabs Agent ID not configured');
      }

      await conversation.startSession({
        agentId,
        connectionType: 'webrtc',
        userId
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      alert('Failed to start conversation. Please check your microphone permissions and agent configuration.');
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  const sendTextMessage = (message: string) => {
    conversation.sendUserMessage(message);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <EmergencyHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ConversationDisplay 
              messages={messages}
              isConnected={isConnected}
              isSpeaking={conversation.isSpeaking}
            />
            
            <ConversationControls
              isConnected={isConnected}
              isSpeaking={conversation.isSpeaking}
              onStart={startConversation}
              onEnd={endConversation}
              onSendMessage={sendTextMessage}
              canSendFeedback={conversation.canSendFeedback}
              onSendFeedback={conversation.sendFeedback}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
