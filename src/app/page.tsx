'use client';

import { useState, useEffect } from 'react';
import EmergencySimulation from '@/components/EmergencySimulation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSystemPrompt = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SYSTEM_PROMPT_URL || 'http://localhost:8080/system-prompt');
        if (!response.ok) {
          throw new Error(`Failed to fetch system prompt: ${response.statusText}`);
        }
        const prompt = await response.text();
        setSystemPrompt(prompt);
      } catch (err) {
        console.error('Error fetching system prompt:', err);
        setError('Failed to load emergency simulation configuration. Please ensure the server is running.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSystemPrompt();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md mx-4">
          <h2 className="text-xl font-bold text-red-200 mb-2">Configuration Error</h2>
          <p className="text-red-300">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <EmergencySimulation systemPrompt={systemPrompt} />
    </div>
  );
}