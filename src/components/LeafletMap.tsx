'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface LeafletMapProps {
  coordinates?: { lat: number; lng: number };
  scenarioName?: string;
}

function MapUpdater({ coordinates }: { coordinates: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 14);
    }
  }, [coordinates, map]);
  return null;
}

export default function LeafletMap({ coordinates, scenarioName }: LeafletMapProps) {
  useEffect(() => {
    // Fix for default marker icon in Next.js
    const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
    const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
    const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
  }, []);

  if (!coordinates) {
    return (
      <div className="w-full h-full bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-slate-400">No location data available</p>
          <p className="text-slate-500 text-sm mt-2">Map will appear when scenario is active</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={14}
      className="w-full h-full rounded-lg z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.lng]}>
        <Popup>
          <div className="text-center">
            <strong className="text-lg">🚨 Emergency Location</strong>
            {scenarioName && (
              <p className="text-sm text-gray-600 mt-1">{scenarioName}</p>
            )}
          </div>
        </Popup>
      </Marker>
      <MapUpdater coordinates={coordinates} />
    </MapContainer>
  );
}

