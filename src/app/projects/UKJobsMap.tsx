'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Job {
  id: number;
  title: string;
  type: string;
  lat: number;
  lng: number;
  location: string;
  budget: string;
  urgent: boolean;
  timePosted: string;
  description: string;
}

interface UKJobsMapProps {
  jobs: Job[];
  jobTypeColors: { [key: string]: string };
  onJobClick: (job: Job) => void;
  searchPin?: { lat: number; lng: number } | null;
  onSearchPinChange?: (position: { lat: number; lng: number } | null) => void;
  searchRadius?: number;
  onRadiusChange?: (radius: number) => void;
}

// Create custom search pin icon
const createSearchPinIcon = () => {
  const iconHtml = `
    <div style="
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
      cursor: move;
      position: relative;
    ">
      📍
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'search-pin-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

// Component to handle map clicks for dropping search pin
const SearchPinHandler: React.FC<{
  onPinDrop: (position: { lat: number; lng: number }) => void;
  isDropMode: boolean;
}> = ({ onPinDrop, isDropMode }) => {
  useMapEvents({
    click: (e) => {
      if (isDropMode) {
        onPinDrop({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    }
  });
  return null;
};

// Calculate distance between two points in kilometers
const calculateDistance = (pos1: [number, number], pos2: [number, number]): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (pos2[0] - pos1[0]) * Math.PI / 180;
  const dLng = (pos2[1] - pos1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pos1[0] * Math.PI / 180) * Math.cos(pos2[0] * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Create custom icon function
const createCustomIcon = (color: string, urgent: boolean) => {
  const size = urgent ? 32 : 24;
  const iconHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border: ${urgent ? '3px solid #ef4444' : '2px solid white'};
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: ${urgent ? '14px' : '10px'};
      ${urgent ? 'animation: pulse 2s infinite;' : ''}
    ">
      ${urgent ? '!' : ''}
    </div>
    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
    </style>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-job-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

const UKJobsMap: React.FC<UKJobsMapProps> = ({ 
  jobs, 
  jobTypeColors, 
  onJobClick,
  searchPin,
  onSearchPinChange,
  searchRadius = 25,
  onRadiusChange
}) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [isDropMode, setIsDropMode] = useState(false);
  const searchPinRef = useRef<L.Marker | null>(null);

  // UK center coordinates
  const ukCenter: [number, number] = [54.5, -2.0];
  const ukBounds: [[number, number], [number, number]] = [
    [49.8, -8.5], // Southwest corner
    [60.9, 2.0]   // Northeast corner
  ];

  // Filter jobs by radius if search pin is active
  const filteredJobs = searchPin ? jobs.filter(job => {
    const distance = calculateDistance([searchPin.lat, searchPin.lng], [job.lat, job.lng]);
    return distance <= searchRadius;
  }) : jobs;

  const handlePinDrop = (position: { lat: number; lng: number }) => {
    if (onSearchPinChange) {
      onSearchPinChange(position);
    }
    setIsDropMode(false);
  };

  const handleSearchPinDrag = (e: L.DragEndEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();
    if (onSearchPinChange) {
      onSearchPinChange({
        lat: position.lat,
        lng: position.lng
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search Controls */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '200px'
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
          Local Job Search
        </div>
        
        <button
          onClick={() => setIsDropMode(true)}
          style={{
            padding: '8px 12px',
            backgroundColor: isDropMode ? '#dc2626' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {isDropMode ? '📍 Click Map to Drop Pin' : '📍 Drop Search Pin'}
        </button>

        {searchPin && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', color: '#6b7280', minWidth: '45px' }}>
                Radius:
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={searchRadius}
                onChange={(e) => onRadiusChange && onRadiusChange(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <span style={{ fontSize: '0.8rem', color: '#374151', minWidth: '35px' }}>
                {searchRadius}km
              </span>
            </div>
            
            <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: '600' }}>
              {filteredJobs.length} jobs within {searchRadius}km
            </div>
            
            <button
              onClick={() => onSearchPinChange && onSearchPinChange(null)}
              style={{
                padding: '6px 10px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              Clear Search Area
            </button>
          </>
        )}
      </div>

      {/* Map Container */}
      <div style={{ 
        height: '600px', 
        width: '100%', 
        borderRadius: '12px', 
        overflow: 'hidden',
        cursor: isDropMode ? 'crosshair' : 'grab'
      }}>
        <MapContainer
          center={ukCenter}
          zoom={6}
          maxBounds={ukBounds}
          maxBoundsViscosity={1.0}
          style={{ height: '100%', width: '100%' }}
          ref={setMap}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          zoomControl={true}
          attributionControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
            minZoom={5}
          />
          
          {/* Search Pin Handler */}
          <SearchPinHandler onPinDrop={handlePinDrop} isDropMode={isDropMode} />
          
          {/* Search Pin and Radius Circle */}
          {searchPin && (
            <>
              <Circle
                center={[searchPin.lat, searchPin.lng]}
                radius={searchRadius * 1000} // Convert km to meters
                pathOptions={{
                  fillColor: '#f59e0b',
                  fillOpacity: 0.1,
                  color: '#f59e0b',
                  weight: 2,
                  opacity: 0.6
                }}
              />
              <Marker
                position={[searchPin.lat, searchPin.lng]}
                icon={createSearchPinIcon()}
                draggable={true}
                eventHandlers={{
                  dragend: handleSearchPinDrag,
                }}
                ref={searchPinRef}
              >
                <Popup>
                  <div style={{ textAlign: 'center', padding: '8px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Search Area</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      📍 Drag to move<br/>
                      🔍 {filteredJobs.length} jobs within {searchRadius}km
                    </div>
                  </div>
                </Popup>
              </Marker>
            </>
          )}
          
          {/* Job Markers */}
          {filteredJobs.map((job) => {
            const iconColor = jobTypeColors[job.type] || '#6b7280';
            const customIcon = createCustomIcon(iconColor, job.urgent);

            return (
              <Marker
                key={job.id}
                position={[job.lat, job.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => onJobClick(job),
                }}
              >
                <Popup>
                  <div style={{ minWidth: '200px', padding: '0.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                        {job.title}
                      </h4>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: iconColor,
                        color: 'white',
                        fontSize: '0.7rem',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '12px',
                        fontWeight: '500',
                        marginTop: '0.25rem'
                      }}>
                        {job.type}
                      </span>
                      {job.urgent && (
                        <span style={{
                          display: 'inline-block',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          fontSize: '0.7rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '4px',
                          fontWeight: '600',
                          marginLeft: '0.5rem',
                          marginTop: '0.25rem'
                        }}>
                          URGENT
                        </span>
                      )}
                    </div>
                    
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      📍 {job.location}
                    </div>
                    
                    <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#059669', marginBottom: '0.5rem' }}>
                      💰 {job.budget}
                    </div>
                    
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      🕒 {job.timePosted}
                    </div>
                    
                    {searchPin && (
                      <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '0.5rem', fontWeight: '600' }}>
                        📏 {Math.round(calculateDistance([searchPin.lat, searchPin.lng], [job.lat, job.lng]))}km away
                      </div>
                    )}
                    
                    <p style={{ fontSize: '0.8rem', color: '#374151', margin: '0.5rem 0', lineHeight: '1.4' }}>
                      {job.description}
                    </p>
                    
                    <button 
                      onClick={() => onJobClick(job)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '0.5rem'
                      }}
                    >
                      View Full Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default UKJobsMap;