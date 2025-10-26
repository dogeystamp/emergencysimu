'use client';

import { useState, useEffect } from 'react';
import EmergencySimulation from '@/components/EmergencySimulation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRandomEmergencyPrompt } from '@/lib/prompts';

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading time for better UX
    const timer = setTimeout(() => {
      const randomPrompt = getRandomEmergencyPrompt();
      setSystemPrompt(randomPrompt.prompt);
      setSelectedScenario(randomPrompt.name);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <EmergencySimulation 
        systemPrompt={systemPrompt} 
        scenarioName={selectedScenario}
      />
    </div>
  );
}