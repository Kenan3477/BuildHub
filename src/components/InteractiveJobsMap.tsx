'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Job interface
interface Job {
  id: number;
  title: string;
  type: string;
  budget: string | number;
  location: string;
  coordinates: { lat: number; lng: number };
  posted: string;
  description: string;
  urgency: string;
  verified: boolean;
}

interface InteractiveJobsMapProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  selectedJob?: Job | null;
  height?: string;
}

// Job type color mapping
const jobTypeColors = {
  'Kitchen': '#ef4444',
  'Bathroom': '#3b82f6', 
  'Extension': '#10b981',
  'Electrical': '#8b5cf6',
  'Landscaping': '#f59e0b',
  'Roofing': '#dc2626',
  'Plumbing': '#06b6d4',
  'Commercial': '#3b82f6',
  'Residential': '#ef4444',
  'Infrastructure': '#10b981'
};

const InteractiveJobsMap: React.FC<InteractiveJobsMapProps> = ({ 
  jobs, 
  onJobSelect, 
  selectedJob,
  height = '600px' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [markersLayer, setMarkersLayer] = useState<any>(null);

  // Load Leaflet scripts
  const handleLeafletLoad = () => {
    setLeafletLoaded(true);
  };

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstance) return;

    // @ts-ignore - Leaflet is loaded via CDN
    const L = (window as any).L;

    // Initialize map centered on UK
    const map = L.map(mapRef.current).setView([54.5, -2.0], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 5
    }).addTo(map);

    // Restrict map bounds to UK area
    const ukBounds = L.latLngBounds([49.5, -11.0], [61.0, 2.0]);
    map.setMaxBounds(ukBounds);

    // Create marker cluster group
    const markers = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 50,
      iconCreateFunction: function(cluster: any) {
        return L.divIcon({
          html: `<div style="
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            border: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">${cluster.getChildCount()}</div>`,
          className: 'custom-cluster-icon',
          iconSize: [40, 40]
        });
      }
    });

    setMapInstance(map);
    setMarkersLayer(markers);
    map.addLayer(markers);

  }, [leafletLoaded, mapInstance]);

  // Update markers when jobs change
  useEffect(() => {
    if (!mapInstance || !markersLayer || !leafletLoaded) return;

    // @ts-ignore - Leaflet is loaded via CDN
    const L = (window as any).L;

    // Clear existing markers
    markersLayer.clearLayers();

    // Add new markers
    jobs.forEach(job => {
      const jobType = job.type;
      const color = jobTypeColors[jobType as keyof typeof jobTypeColors] || '#6b7280';
      
      // Create custom marker icon
      const markerIcon = L.divIcon({
        html: `
          <div style="
            width: 30px; 
            height: 30px; 
            background-color: ${color}; 
            border: 3px solid white; 
            border-radius: 50%; 
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            ${getJobTypeIcon(jobType)}
          </div>
        `,
        className: 'custom-job-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      // Create popup content
      const popupContent = `
        <div style="min-width: 280px; font-family: Inter, sans-serif;">
          <div style="
            display: flex; 
            align-items: flex-start; 
            gap: 8px; 
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
          ">
            <div style="
              width: 8px; 
              height: 40px; 
              background: ${color}; 
              border-radius: 4px;
              flex-shrink: 0;
            "></div>
            <div style="flex: 1;">
              <div style="
                font-size: 16px; 
                font-weight: 600; 
                color: #111827; 
                margin-bottom: 4px;
                line-height: 1.3;
              ">${job.title}</div>
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 4px;
                background: ${color}; 
                color: white; 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 12px; 
                font-weight: 500;
              ">
                ${getJobTypeIcon(jobType)} ${jobType}
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 12px;">
            <div style="
              display: flex; 
              align-items: center; 
              gap: 6px; 
              color: #6b7280; 
              font-size: 14px;
              margin-bottom: 6px;
            ">
              📍 ${job.location}
            </div>
            <div style="
              display: flex; 
              align-items: center; 
              gap: 6px; 
              color: #10b981; 
              font-size: 14px; 
              font-weight: 600;
              margin-bottom: 6px;
            ">
              💷 ${job.budget}
            </div>
            <div style="
              display: flex; 
              align-items: center; 
              gap: 6px; 
              color: #6b7280; 
              font-size: 12px;
            ">
              🕒 Posted ${job.posted}
            </div>
          </div>

          <div style="
            background: #f9fafb; 
            padding: 12px; 
            border-radius: 8px; 
            margin-bottom: 12px;
            font-size: 13px;
            color: #374151;
            line-height: 1.4;
          ">
            ${job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}
          </div>

          <div style="
            display: flex; 
            align-items: center; 
            justify-content: space-between;
            margin-bottom: 12px;
          ">
            <div style="
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 4px 8px;
              background: ${getUrgencyColor(job.urgency)};
              color: white;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 500;
            ">
              ${getUrgencyIcon(job.urgency)} ${job.urgency} Priority
            </div>
            ${job.verified ? `
              <div style="
                display: flex;
                align-items: center;
                gap: 4px;
                color: #10b981;
                font-size: 11px;
                font-weight: 500;
              ">
                ✅ Verified
              </div>
            ` : ''}
          </div>

          <button 
            onclick="window.selectJob(${job.id})"
            style="
              width: 100%;
              background: linear-gradient(135deg, #f59e0b, #ea580c);
              color: white;
              padding: 10px 16px;
              border: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
              box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
            "
            onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(245, 158, 11, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(245, 158, 11, 0.3)'"
          >
            View Full Details →
          </button>
        </div>
      `;

      // Create marker
      const marker = L.marker([job.coordinates.lat, job.coordinates.lng], {
        icon: markerIcon
      }).bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      markersLayer.addLayer(marker);
    });

    // Set up global job selection function
    (window as any).selectJob = (jobId: number) => {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        onJobSelect(job);
        mapInstance.closePopup();
      }
    };

  }, [jobs, mapInstance, markersLayer, leafletLoaded, onJobSelect]);

  // Helper functions
  const getJobTypeIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      'Kitchen': '🍳',
      'Bathroom': '🚿',
      'Extension': '🏗️',
      'Electrical': '⚡',
      'Landscaping': '🌿',
      'Roofing': '🏠',
      'Plumbing': '🔧',
      'Commercial': '🏢',
      'Residential': '🏡',
      'Infrastructure': '🛣️'
    };
    return icons[type] || '🔨';
  };

  const getUrgencyColor = (urgency: string): string => {
    switch(urgency) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getUrgencyIcon = (urgency: string): string => {
    switch(urgency) {
      case 'High': return '🔥';
      case 'Medium': return '⚡';
      case 'Low': return '📋';
      default: return '📋';
    }
  };

  return (
    <>
      {/* Load Leaflet CSS and JS */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
      />
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" 
      />
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" 
      />

      <Script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={() => {
          // Load marker cluster after leaflet
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js';
          script.onload = handleLeafletLoad;
          document.head.appendChild(script);
        }}
      />

      {/* Map Container */}
      <div style={{ position: 'relative' }}>
        <div 
          ref={mapRef} 
          style={{ 
            height,
            width: '100%',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#f8fafc'
          }} 
        />
        
        {!leafletLoaded && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '24px',
                marginBottom: '8px'
              }}>🗺️</div>
              <div style={{ 
                color: '#6b7280',
                fontSize: '14px'
              }}>Loading UK Construction Jobs Map...</div>
            </div>
          </div>
        )}

        {/* Map Legend */}
        {leafletLoaded && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'white',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '12px',
            zIndex: 1000,
            maxWidth: '200px'
          }}>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '8px',
              color: '#111827',
              fontSize: '13px'
            }}>Job Types</div>
            {Object.entries(jobTypeColors).map(([type, color]) => (
              <div key={type} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                marginBottom: '4px' 
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '2px solid white',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }}></div>
                <span style={{ color: '#374151' }}>{type}</span>
              </div>
            ))}
            <div style={{ 
              marginTop: '12px',
              paddingTop: '8px',
              borderTop: '1px solid #e5e7eb',
              color: '#6b7280',
              fontSize: '11px'
            }}>
              📍 {jobs.length} Active Jobs
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for popups */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
};

export default InteractiveJobsMap;