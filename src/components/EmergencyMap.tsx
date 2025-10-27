'use client';

import dynamic from 'next/dynamic';

// Dynamically import the entire map to avoid SSR issues
const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <p className="text-slate-400">Loading map...</p>
      </div>
    </div>
  )
});

interface EmergencyMapProps {
  coordinates?: { lat: number; lng: number };
  scenarioName?: string;
}

export default function EmergencyMap({ coordinates, scenarioName }: EmergencyMapProps) {
  return <LeafletMap coordinates={coordinates} scenarioName={scenarioName} />;
}

