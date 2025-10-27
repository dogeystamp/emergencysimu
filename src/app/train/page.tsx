'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import EmergencySimulation from '@/components/EmergencySimulation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getRandomEmergencyPrompt } from '@/lib/prompts';

export default function TrainPage() {
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [initialCoordinates, setInitialCoordinates] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading time for better UX
    const timer = setTimeout(() => {
      const randomPrompt = getRandomEmergencyPrompt();
      setSystemPrompt(randomPrompt.prompt);
      setSelectedScenario(randomPrompt.name);
      setInitialCoordinates(randomPrompt.coordinates);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#0A192F] min-h-screen">
      <Navigation />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <EmergencySimulation 
          systemPrompt={systemPrompt} 
          scenarioName={selectedScenario}
          initialCoordinates={initialCoordinates}
        />
      )}
    </div>
  );
}

