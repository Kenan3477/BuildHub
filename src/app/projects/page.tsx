'use client';

import React, { useState } from 'react';
import { ArrowLeft, Building, MapPin, Clock, DollarSign } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useJobs } from '../../context/JobsContext';

// Dynamically import the map component to avoid SSR issues
const UKJobsMap = dynamic(() => import('./UKJobsMap'), { 
  ssr: false,
  loading: () => <div style={{ height: '600px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading interactive map...</div>
});

// Mock construction jobs data with real UK coordinates
const constructionJobs = [
  {
    id: 1,
    title: "Site Manager - Commercial Development",
    type: "Commercial",
    lat: 51.5074,
    lng: -0.1278,
    location: "London, SW1A 1AA",
    budget: "£65,000",
    urgent: false,
    timePosted: "2 days ago",
    description: "Lead site management for major office development in central London."
  },
  {
    id: 2,
    title: "Residential Extension Specialist",
    type: "Residential",
    lat: 53.4808,
    lng: -2.2426,
    location: "Manchester, M1 1AA",
    budget: "£45,000",
    urgent: true,
    timePosted: "1 hour ago",
    description: "Specialist contractor needed for Victorian house extension."
  },
  {
    id: 3,
    title: "Bridge Construction Engineer",
    type: "Infrastructure",
    lat: 55.9533,
    lng: -3.1883,
    location: "Edinburgh, EH1 1YZ",
    budget: "£75,000",
    urgent: false,
    timePosted: "1 day ago",
    description: "Lead engineer for new pedestrian bridge project."
  },
  {
    id: 4,
    title: "School Renovation Project",
    type: "Commercial",
    lat: 51.4816,
    lng: -3.1791,
    location: "Cardiff, CF10 3AT",
    budget: "£55,000",
    urgent: false,
    timePosted: "3 days ago",
    description: "Complete renovation of primary school building."
  },
  {
    id: 5,
    title: "Highway Maintenance Crew",
    type: "Infrastructure",
    lat: 52.4862,
    lng: -1.8904,
    location: "Birmingham, B1 1BB",
    budget: "£40,000",
    urgent: true,
    timePosted: "5 hours ago",
    description: "Road maintenance and repair team needed urgently."
  },
  {
    id: 6,
    title: "Luxury Home Builder",
    type: "Residential",
    lat: 53.7997,
    lng: -1.5492,
    location: "Leeds, LS1 1UR",
    budget: "£70,000",
    urgent: false,
    timePosted: "4 days ago",
    description: "High-end residential construction specialist required."
  },
  {
    id: 7,
    title: "Shopping Center Renovation",
    type: "Commercial",
    lat: 53.4084,
    lng: -2.9916,
    location: "Liverpool, L1 1JQ",
    budget: "£80,000",
    urgent: false,
    timePosted: "2 days ago",
    description: "Large-scale shopping center modernization project."
  },
  {
    id: 8,
    title: "Railway Station Upgrade",
    type: "Infrastructure",
    lat: 51.4545,
    lng: -2.5879,
    location: "Bristol, BS1 6PN",
    budget: "£90,000",
    urgent: false,
    timePosted: "1 week ago",
    description: "Platform extension and accessibility improvements."
  }
];

const jobTypeColors = {
  'Residential': '#22c55e',
  'Commercial': '#3b82f6', 
  'Infrastructure': '#f59e0b'
};

const getPriceColor = (budgetString: string): string => {
  const budget = parseInt(budgetString.replace(/[£,]/g, ''));
  if (budget < 30000) return '#ef4444'; // red
  if (budget < 50000) return '#f97316'; // orange  
  if (budget < 70000) return '#eab308'; // yellow
  if (budget < 85000) return '#22c55e'; // green
  return '#8b5cf6'; // purple
};

export default function ProjectsPage() {
  const { getAllJobs } = useJobs();
  const allJobs = getAllJobs();
  
  // Convert jobs to map format
  const constructionJobs = allJobs.map(job => ({
    id: job.id,
    title: job.title,
    type: job.type || job.projectType || 'Residential',
    lat: job.lat || 53.4808, // Default to Manchester if no coordinates
    lng: job.lng || -2.2426,
    location: `${job.location}, ${job.postcode}`,
    budget: `£${job.budget.toLocaleString()}`,
    urgent: job.urgent || job.urgency === 'ASAP',
    timePosted: job.timePosted || 'Recently',
    description: job.description
  }));

  const [selectedJob, setSelectedJob] = useState<typeof constructionJobs[0] | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchPin, setSearchPin] = useState<{ lat: number; lng: number } | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(25);

  const filteredJobs = filterType === 'all' 
    ? constructionJobs 
    : constructionJobs.filter(job => job.type === filterType);

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

  // Filter jobs by search radius if search pin is active
  const searchFilteredJobs = searchPin ? filteredJobs.filter(job => {
    const distance = calculateDistance([searchPin.lat, searchPin.lng], [job.lat, job.lng]);
    return distance <= searchRadius;
  }) : filteredJobs;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => window.history.back()} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 1rem', 
              backgroundColor: '#f3f4f6', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
              Back to BuildHub
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                UK Construction Jobs Map
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                {searchPin ? `${searchFilteredJobs.length} jobs within ${searchRadius}km of search area` : `${filteredJobs.length} active positions • Interactive map with zoomable clusters`}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem',
                backgroundColor: 'white'
              }}
            >
              <option value="all">All Job Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Infrastructure">Infrastructure</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Map Section */}
        <div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                Interactive Jobs Map
              </h2>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: jobTypeColors.Residential, borderRadius: '50%' }}></div>
                  <span>Residential</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: jobTypeColors.Commercial, borderRadius: '50%' }}></div>
                  <span>Commercial</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: jobTypeColors.Infrastructure, borderRadius: '50%' }}></div>
                  <span>Infrastructure</span>
                </div>
              </div>
            </div>
            
            {/* Interactive UK Map */}
            <UKJobsMap 
              jobs={filteredJobs} 
              jobTypeColors={jobTypeColors}
              onJobClick={setSelectedJob}
              searchPin={searchPin}
              onSearchPinChange={setSearchPin}
              searchRadius={searchRadius}
              onRadiusChange={setSearchRadius}
            />
            
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
              🗺️ Powered by OpenStreetMap • Click markers for details • 📍 Drop pin to search locally • Drag pin & adjust radius
            </div>
          </div>
        </div>

        {/* Jobs List Sidebar */}
        <div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                {searchPin ? `Local Jobs (${searchFilteredJobs.length})` : `Active Jobs (${filteredJobs.length})`}
              </h3>
              {searchPin && (
                <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600' }}>
                  📍 Within {searchRadius}km radius
                </div>
              )}
            </div>
            
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {searchFilteredJobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    borderLeft: `4px solid ${jobTypeColors[job.type as keyof typeof jobTypeColors]}`,
                    position: 'relative',
                    backgroundColor: selectedJob?.id === job.id ? '#f8fafc' : 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {job.urgent && (
                    <span style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '0.7rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: '600'
                    }}>
                      URGENT
                    </span>
                  )}
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827', margin: 0, marginBottom: '0.25rem' }}>
                      {job.title}
                    </h4>
                    <span style={{
                      backgroundColor: jobTypeColors[job.type as keyof typeof jobTypeColors],
                      color: 'white',
                      fontSize: '0.7rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}>
                      {job.type}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <MapPin style={{ height: '0.8rem', width: '0.8rem', color: '#6b7280' }} />
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{job.location}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <DollarSign style={{ height: '0.8rem', width: '0.8rem', color: '#6b7280' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: getPriceColor(job.budget) }}>
                      {job.budget}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Clock style={{ height: '0.8rem', width: '0.8rem', color: '#6b7280' }} />
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{job.timePosted}</span>
                  </div>
                  
                  {searchPin && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600' }}>
                        📏 {Math.round(calculateDistance([searchPin.lat, searchPin.lng], [job.lat, job.lng]))}km away
                      </span>
                    </div>
                  )}
                  
                  <p style={{ fontSize: '0.8rem', color: '#374151', margin: '0.5rem 0 0 0', lineHeight: '1.4' }}>
                    {job.description}
                  </p>
                  
                  <button style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                  }}>
                    View Job Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Market Statistics */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              {searchPin ? 'Local Market Overview' : 'Market Overview'}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>
                  £{Math.round(searchFilteredJobs.reduce((sum, job) => sum + parseInt(job.budget.replace(/[£,]/g, '')), 0) / 1000)}k
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {searchPin ? 'Local Value' : 'Total Value'}
                </div>
              </div>
              
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#dc2626' }}>
                  {searchFilteredJobs.filter(job => job.urgent).length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {searchPin ? 'Local Urgent' : 'Urgent Jobs'}
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              {searchPin ? 'Local Job Distribution' : 'Job Type Distribution'}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem' }}>
              {Object.entries(jobTypeColors).map(([type, color]) => {
                const count = searchFilteredJobs.filter(job => job.type === type).length;
                const total = searchFilteredJobs.length;
                const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={type} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: '0.5rem', backgroundColor: color, borderRadius: '2px', marginBottom: '0.25rem' }}></div>
                    <div>{type}</div>
                    <div style={{ fontWeight: '600', color: '#374151' }}>{percentage}%</div>
                  </div>
                );
              })}
            </div>
            
            {searchPin && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                backgroundColor: '#fef3c7', 
                borderRadius: '6px',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#92400e', marginBottom: '0.25rem' }}>
                  🎯 Local Search Active
                </div>
                <div style={{ fontSize: '0.7rem', color: '#78350f' }}>
                  Showing jobs within {searchRadius}km radius. Drag the orange pin to move your search area or adjust the radius slider.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}