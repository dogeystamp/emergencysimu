'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isSpeaking, setIsSpeaking] = useState(false); // AI is speaking
  const [isGenerating, setIsGenerating] = useState(false);

  const elevenLabsWsRef = useRef<WebSocket | null>(null);
  const elevenLabsSessionIdRef = useRef<string | null>(null);

  const addMessage = useCallback((message: {id: string, type: 'user' | 'agent', content: string, timestamp: Date}) => {
    setMessages((prev: typeof messages) => [...prev, message]);
  }, []);

  const [audioQueue, setAudioQueue] = useState<string[]>([]); // Queue for base64 audio

  const playAudio = useCallback(async () => {
    console.log('playAudio called. audioQueue length:', audioQueue.length, 'isSpeaking:', isSpeaking);
    if (audioQueue.length > 0 && !isSpeaking) {
      setIsSpeaking(true);
      const audioBase64 = audioQueue[0];
      console.log('Attempting to play audio. audioBase64 (first 50 chars):', audioBase64.substring(0, 50));
      try {
        const audioBlob = await (await fetch(`data:audio/mpeg;base64,${audioBase64}`)).blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log('Audio URL created:', audioUrl);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          console.log('Audio playback ended.');
          URL.revokeObjectURL(audioUrl);
          setAudioQueue(prev => prev.slice(1));
          setIsSpeaking(false);
        };
        await audio.play();
        console.log('Audio playback started.');
      } catch (e) {
        console.error('Error playing audio:', e);
        setIsSpeaking(false); // Reset speaking state on error
        setAudioQueue(prev => prev.slice(1)); // Remove problematic audio from queue
      }
    }
  }, [audioQueue, isSpeaking]);

  useEffect(() => {
    if (!isSpeaking && audioQueue.length > 0) {
      playAudio();
    }
  }, [audioQueue, isSpeaking, playAudio]);

  const startConversation = useCallback(async () => {
    if (!isConnected) {
      setIsConnected(true);
      try {
        // 1. Fetch signed URL from backend
        const configResponse = await fetch('/api/elevenlabs-config');
        if (!configResponse.ok) {
          throw new Error('Failed to fetch ElevenLabs signed URL');
        }
        const { signedUrl, elevenLabsVoiceId } = await configResponse.json();

        // 2. Establish direct WebSocket connection to ElevenLabs Agent using the signed URL
        const ws = new WebSocket(signedUrl);
        elevenLabsWsRef.current = ws;

        ws.onopen = () => {
          console.log('Connected to ElevenLabs Agent WebSocket');
          // Send initial configuration and system prompt to the agent
          const initialMessage = {
            "type": "conversation_initiation_client_data",
            "conversation_config_override": {
              "voice_id": elevenLabsVoiceId,
              "model_id": "eleven_multilingual_v2" // Recommended model_id
            },
            "user_id": "emergency_dispatcher_user" // Example user_id
          };
          
          ws.send(JSON.stringify(initialMessage));
        };

        ws.onmessage = async (event) => {
          console.log('WebSocket message received:', event.data);
          if (typeof event.data === 'string') {
            try {
              const data = JSON.parse(event.data);
              console.log('Parsed WebSocket JSON data:', data);
              if (data.type === 'audio_event' && data.audio_event && data.audio_event.audio_base_64) {
                setAudioQueue(prev => [...prev, data.audio_event.audio_base_64]);
                addMessage({ id: Date.now().toString(), type: 'agent', content: 'Agent is speaking...', timestamp: new Date() });
              } else if (data.type === 'agent_response' && data.agent_response_event && data.agent_response_event.agent_response) {
                addMessage({ id: Date.now().toString(), type: 'agent', content: data.agent_response_event.agent_response, timestamp: new Date() });
              } else if (data.type === 'error') {
                console.error('ElevenLabs Agent error:', data.content);
                addMessage({ id: Date.now().toString(), type: 'agent', content: `Error: ${data.content}`, timestamp: new Date() });
              } else if (data.type === 'conversation_initiation_metadata') {
                console.log('Conversation initiation metadata received:', data.conversation_initiation_metadata_event);
                elevenLabsSessionIdRef.current = data.conversation_initiation_metadata_event.conversation_id;
              } else if (data.type === 'ping') {
                console.log('Received ping from ElevenLabs Agent');
              } else {
                console.log('Unhandled JSON message type:', data);
              }
            } catch (e) {
              console.error('Failed to parse ElevenLabs Agent string message:', e);
            }
          } else if (event.data instanceof Blob) {
            console.log('Received audio blob from ElevenLabs Agent (unexpected format):', event.data);
          }
        };

        ws.onclose = (event) => {
          console.log('Disconnected from ElevenLabs Agent WebSocket', event.code, event.reason);
          setIsConnected(false);
          setIsSpeaking(false);
        };

        ws.onerror = (error) => {
          console.error('ElevenLabs Agent WebSocket error:', error);
          setIsConnected(false);
          setIsSpeaking(false);
        };

      } catch (error) {
        console.error('Error starting ElevenLabs Agent conversation:', error);
        setIsConnected(false);
      }
    }
  }, [isConnected, currentPrompt, addMessage, elevenLabsSessionIdRef, setAudioQueue, playAudio]);

  const endConversation = useCallback(() => {
    if (isConnected) {
      setIsConnected(false);
      setMessages([]);
      setAudioQueue([]); // Clear audio queue on end conversation
      if (elevenLabsWsRef.current) {
        elevenLabsWsRef.current.close();
        elevenLabsWsRef.current = null;
      }
      elevenLabsSessionIdRef.current = null;
    }
  }, [isConnected]);

  const sendAudioMessage = useCallback((message: string) => {
    const userMessage = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    addMessage(userMessage);

    if (elevenLabsWsRef.current && elevenLabsWsRef.current.readyState === WebSocket.OPEN) {
      const conversationId = elevenLabsSessionIdRef.current;
      if (!conversationId) {
        console.error('Conversation ID not available, cannot send message.');
        return;
      }
      console.log('Sending user message to WebSocket:', { type: 'user_message', text: message, conversation_id: conversationId });
      elevenLabsWsRef.current.send(JSON.stringify({
        "type": "user_message",
        "text": message,
        "conversation_id": conversationId,
      }));
    } else {
      console.error('ElevenLabs Agent WebSocket not open, cannot send message.');
    }
  }, [addMessage]);

  const getNewScenario = () => {
    const newPrompt = getRandomEmergencyPrompt();
    setCurrentPrompt(newPrompt.prompt);
    setCurrentScenarioName(newPrompt.name);
    setCurrentCoordinates(newPrompt.coordinates);
    setMessages([]);
    setAudioQueue([]); // Clear audio queue on new scenario
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
      setAudioQueue([]); // Clear audio queue on new scenario
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
                isSpeaking={isSpeaking}
                setIsSpeaking={setIsSpeaking}
                addMessage={addMessage}
                elevenLabsWsRef={elevenLabsWsRef} // Pass WebSocket ref to ConversationDisplay
              />
              
              <ConversationControls
                isConnected={isConnected}
                isSpeaking={isSpeaking}
                onStartCall={startConversation}
                onEndCall={endConversation}
                onSendMessage={sendAudioMessage}
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
