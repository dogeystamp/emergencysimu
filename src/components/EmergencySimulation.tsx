'use client';

import { useState } from 'react';
import ConversationControls from './ConversationControls';
import ConversationDisplay from './ConversationDisplay';
import EmergencyHeader from './EmergencyHeader';
import EmergencyMap from './EmergencyMap';
import { getRandomEmergencyPrompt } from '@/lib/prompts';

interface EmergencySimulationProps {
  systemPrompt: string;
  scenarioName: string;
  initialCoordinates?: { lat: number; lng: number };
}

export default function EmergencySimulation({ systemPrompt, scenarioName, initialCoordinates }: EmergencySimulationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'agent', content: string, timestamp: Date}>>([]);
  const [currentPrompt, setCurrentPrompt] = useState(systemPrompt);
  const [currentScenarioName, setCurrentScenarioName] = useState(scenarioName);
  const [currentCoordinates, setCurrentCoordinates] = useState(initialCoordinates);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const startConversation = async () => {
    setIsConnected(true);
    
    const formattedSystemPrompt = `You are roleplaying as an emergency caller in a training simulation for dispatchers. 

Here is your character and situation:

${currentPrompt}

You are calling emergency services. Respond as this character would - stay in character with the described emotional state, location, and scenario details. Be natural and realistic in your responses. You are the one experiencing the emergency, so address the dispatcher as "you" when referring to them. Keep your responses relatively brief and realistic for someone in an emergency situation.

Start the conversation by calling emergency services. Be in character - panicked, emotional, describing what you're witnessing.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          systemPrompt: formattedSystemPrompt
        })
      });

      if (response.ok) {
        const data = await response.json();
        const initialMessage = {
          id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'agent' as const,
          content: data.message,
          timestamp: new Date()
        };
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const endConversation = async () => {
    setIsConnected(false);
    setMessages([]);
  };

  const sendTextMessage = async (message: string) => {
    const userMessage = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    
    setMessages((prev: typeof messages) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formattedSystemPrompt = `You are roleplaying as an emergency caller in a training simulation for dispatchers. 

Here is your character and situation:

${currentPrompt}

You are calling emergency services. Respond as this character would - stay in character with the described emotional state, location, and scenario details. Be natural and realistic in your responses. You are the one experiencing the emergency, so address the dispatcher as "you" when referring to them. Keep your responses relatively brief and realistic for someone in an emergency situation.`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.type === 'user' ? 'user' : 'assistant',
            content: m.content
          })),
          systemPrompt: formattedSystemPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const agentMessage = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'agent' as const,
        content: data.message,
        timestamp: new Date()
      };
      
      setMessages((prev: typeof messages) => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewScenario = () => {
    const newPrompt = getRandomEmergencyPrompt();
    setCurrentPrompt(newPrompt.prompt);
    setCurrentScenarioName(newPrompt.name);
    setCurrentCoordinates(newPrompt.coordinates);
    setMessages([]);
  };

  const generateNewScenario = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to generate scenario');
      }

      const data = await response.json();
      const generatedScenario = data.scenario;
      const coordinates = data.coordinates;
      
      const scenarioLines = generatedScenario.split('\n').filter((line: string) => line.trim());
      const name = scenarioLines[0] || 'AI Generated Scenario';
      
      setCurrentPrompt(generatedScenario);
      setCurrentScenarioName(name.substring(0, 50));
      setCurrentCoordinates(coordinates);
      setMessages([]);
    } catch (error) {
      console.error('Error generating scenario:', error);
      alert('Failed to generate new scenario. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#0A192F]">
      <EmergencyHeader 
        scenarioName={currentScenarioName} 
        onNewScenario={getNewScenario}
        onGenerateScenario={generateNewScenario}
        isGenerating={isGenerating}
      />
      
      <main className="container mx-auto px-4 py-4">
        <div className="max-w-full mx-auto h-[calc(100vh-100px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-4 h-full">
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl h-full">
              <EmergencyMap 
                coordinates={currentCoordinates}
                scenarioName={currentScenarioName}
              />
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col">
              <ConversationDisplay 
                messages={messages}
                isConnected={isConnected}
                isSpeaking={isLoading}
              />
              
              <ConversationControls
                isConnected={isConnected}
                isSpeaking={isLoading}
                onStart={startConversation}
                onEnd={endConversation}
                onSendMessage={sendTextMessage}
                canSendFeedback={false}
                onSendFeedback={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
