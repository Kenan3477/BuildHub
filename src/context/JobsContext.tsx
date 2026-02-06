'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: number;
  title: string;
  description: string;
  projectType: string;
  location: string;
  postcode: string;
  budget: number;
  urgency: string;
  status: string;
  postedDate: string;
  lat?: number;
  lng?: number;
  userId?: string;
  skills: string[];
  type?: string; // For map compatibility
  timePosted?: string; // For map compatibility
  urgent?: boolean; // For map compatibility
}

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: number, updates: Partial<Job>) => void;
  deleteJob: (id: number) => void;
  getJobsByUser: (userId: string) => Job[];
  getAllJobs: () => Job[];
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};

// Sample job data for demonstration
const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Kitchen Renovation",
    description: "Complete kitchen renovation including new cabinets, countertops, and appliances. Modern design with island and high-end finishes.",
    projectType: "Kitchen Renovation",
    location: "Bournemouth",
    postcode: "BH2 5AU",
    budget: 15000,
    urgency: "Within 2 weeks",
    status: "matched",
    postedDate: "2024-01-10",
    lat: 50.7156, // Correct Bournemouth East Cliff coordinates
    lng: -1.8745,
    userId: "user1",
    skills: ["plumbing", "electrical", "carpentry"],
    type: "Residential", // For map
    timePosted: "3 days ago",
    urgent: false
  },
  {
    id: 2,
    title: "Emergency Roof Repair",
    description: "Urgent roof leak repair needed. Water damage visible in bedroom ceiling. Need immediate assessment and repair.",
    projectType: "Roofing",
    location: "Manchester", 
    postcode: "M1 5GD",
    budget: 2500,
    urgency: "ASAP",
    status: "pending",
    postedDate: "2024-01-12",
    lat: 53.4808,
    lng: -2.2426,
    userId: "user1",
    skills: ["roofing"],
    type: "Emergency",
    timePosted: "1 day ago",
    urgent: true
  },
  {
    id: 3,
    title: "Site Manager - Commercial Development",
    description: "Lead site management for major office development in central London.",
    projectType: "Commercial",
    location: "London",
    postcode: "SW1A 1AA",
    budget: 65000,
    urgency: "2 months",
    status: "active",
    postedDate: "2024-01-08",
    lat: 51.5074,
    lng: -0.1278,
    userId: "user2",
    skills: ["project management", "commercial construction"],
    type: "Commercial",
    timePosted: "2 days ago",
    urgent: false
  },
  {
    id: 4,
    title: "Residential Extension Specialist",
    description: "Specialist contractor needed for Victorian house extension.",
    projectType: "Extension",
    location: "Manchester",
    postcode: "M1 1AA",
    budget: 45000,
    urgency: "1 month",
    status: "active",
    postedDate: "2024-01-11",
    lat: 53.4808,
    lng: -2.2426,
    userId: "user3",
    skills: ["bricklaying", "extensions"],
    type: "Residential",
    timePosted: "1 hour ago",
    urgent: true
  },
  {
    id: 5,
    title: "Bridge Construction Engineer",
    description: "Lead engineer for new pedestrian bridge project.",
    projectType: "Infrastructure",
    location: "Edinburgh",
    postcode: "EH1 1YZ",
    budget: 75000,
    urgency: "6 months",
    status: "active",
    postedDate: "2024-01-09",
    lat: 55.9533,
    lng: -3.1883,
    userId: "user4",
    skills: ["civil engineering", "bridge construction"],
    type: "Infrastructure",
    timePosted: "1 day ago",
    urgent: false
  }
];

// Function to convert postcode to coordinates
const geocodePostcode = async (postcode: string): Promise<{ lat: number; lng: number } | null> => {
  const cleanPostcode = postcode.toUpperCase().replace(/\s+/g, ' ').trim();
  const area = cleanPostcode.replace(/\d+[A-Z]*\s.*$/, '');
  const district = cleanPostcode.split(' ')[0];
  
  console.log(`Geocoding: ${postcode} → Area: ${area}, District: ${district}`);
  
  // Comprehensive UK postcode mapping
  const postcodeMap: { [key: string]: { lat: number; lng: number } } = {
    // Bournemouth area - all BH postcodes
    'BH1': { lat: 50.7192, lng: -1.8808 }, // Town Centre
    'BH2': { lat: 50.7156, lng: -1.8745 }, // East Cliff
    'BH3': { lat: 50.7245, lng: -1.8675 }, // West Cliff
    'BH4': { lat: 50.7108, lng: -1.9088 }, // Westbourne
    'BH5': { lat: 50.7341, lng: -1.8512 }, // Boscombe
    'BH6': { lat: 50.7483, lng: -1.8347 }, // Charminster
    'BH7': { lat: 50.7547, lng: -1.8181 }, // Pokesdown
    'BH8': { lat: 50.7341, lng: -1.8512 }, // Boscombe East
    'BH9': { lat: 50.7245, lng: -1.8675 }, // Winton
    'BH10': { lat: 50.7547, lng: -1.8181 }, // Moordown
    'BH11': { lat: 50.7341, lng: -1.8512 }, // Kinson
    'BH12': { lat: 50.7108, lng: -1.9088 }, // Westbourne
    'BH13': { lat: 50.7108, lng: -1.9400 }, // Canford Cliffs
    'BH14': { lat: 50.7200, lng: -1.9300 }, // Branksome
    'BH15': { lat: 50.7159, lng: -1.9837 }, // Poole Centre
    'BH16': { lat: 50.7439, lng: -1.9857 }, // Broadstone
    'BH17': { lat: 50.7439, lng: -1.9857 }, // Creekmoor
    'BH18': { lat: 50.7439, lng: -1.9857 }, // Broadstone
    'BH19': { lat: 50.6881, lng: -1.9383 }, // Sandbanks
    'BH20': { lat: 50.6097, lng: -1.9597 }, // Swanage
    'BH21': { lat: 50.7999, lng: -1.9858 }, // Wimborne
    'BH22': { lat: 50.8074, lng: -1.9096 }, // Ferndown
    'BH23': { lat: 50.7357, lng: -1.7786 }, // Christchurch
    'BH24': { lat: 50.8496, lng: -1.7869 }, // Ringwood
    'BH25': { lat: 50.7577, lng: -1.6571 }, // New Milton
  };
  
  // Area-based fallback mapping
  const areaMap: { [key: string]: { lat: number; lng: number } } = {
    'BH': { lat: 50.7192, lng: -1.8808 }, // Bournemouth
    'M': { lat: 53.4808, lng: -2.2426 },  // Manchester
    'B': { lat: 52.4862, lng: -1.8904 },  // Birmingham
    'L': { lat: 53.4084, lng: -2.9916 },  // Liverpool
    'LS': { lat: 53.8008, lng: -1.5491 }, // Leeds
    'S': { lat: 53.3811, lng: -1.4701 },  // Sheffield
    'NE': { lat: 54.9783, lng: -1.6178 }, // Newcastle
    'EH': { lat: 55.9533, lng: -3.1883 }, // Edinburgh
    'G': { lat: 55.8642, lng: -4.2518 },  // Glasgow
    'CF': { lat: 51.4816, lng: -3.1791 }, // Cardiff
    'BT': { lat: 54.5973, lng: -5.9301 }, // Belfast
    'SW': { lat: 51.5074, lng: -0.1278 }, // London SW
    'SE': { lat: 51.4994, lng: -0.1270 }, // London SE
    'N': { lat: 51.5654, lng: -0.1057 },  // London N
    'E': { lat: 51.5148, lng: -0.0648 },  // London E
    'W': { lat: 51.5145, lng: -0.2191 },  // London W
    'NW': { lat: 51.5492, lng: -0.1955 }, // London NW
    'EC': { lat: 51.5155, lng: -0.0922 }, // London City
    'WC': { lat: 51.5165, lng: -0.1290 }, // London West Central
    'SO': { lat: 50.9097, lng: -1.4044 }, // Southampton
    'PO': { lat: 50.8198, lng: -1.0880 }, // Portsmouth
    'BN': { lat: 50.8225, lng: -0.1372 }, // Brighton
    'OX': { lat: 51.7520, lng: -1.2577 }, // Oxford
    'CB': { lat: 52.2053, lng: 0.1218 },  // Cambridge
    'BA': { lat: 51.3781, lng: -2.3597 }, // Bath
    'BS': { lat: 51.4545, lng: -2.5879 }, // Bristol
    'EX': { lat: 50.7236, lng: -3.5339 }, // Exeter
    'PL': { lat: 50.3755, lng: -4.1427 }, // Plymouth
    'TR': { lat: 50.2632, lng: -5.0510 }, // Truro
  };
  
  // Try district match first
  if (postcodeMap[district]) {
    const coords = postcodeMap[district];
    console.log(`✅ District match: ${district} → (${coords.lat}, ${coords.lng})`);
    return coords;
  }
  
  // Try area match
  if (areaMap[area]) {
    const coords = areaMap[area];
    console.log(`✅ Area match: ${area} → (${coords.lat}, ${coords.lng})`);
    return coords;
  }
  
  // Default to London
  console.warn(`❌ No match for ${postcode}, defaulting to London`);
  return { lat: 51.5074, lng: -0.1278 };
};

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Initialize with sample data on mount
  useEffect(() => {
    // Check if we have jobs in localStorage
    const savedJobs = localStorage.getItem('constructionJobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Use sample data if no saved jobs
      setJobs(sampleJobs);
      localStorage.setItem('constructionJobs', JSON.stringify(sampleJobs));
    }
  }, []);

  // Save to localStorage whenever jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem('constructionJobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = async (jobData: Omit<Job, 'id'>) => {
    // Generate new ID
    const newId = Math.max(...jobs.map(j => j.id), 0) + 1;
    
    // Get coordinates for the postcode
    const coords = await geocodePostcode(jobData.postcode);
    console.log(`Geocoding postcode "${jobData.postcode}" for location "${jobData.location}":`, coords);
    
    const newJob: Job = {
      ...jobData,
      id: newId,
      lat: coords?.lat || 51.5074, // Default to London, not Manchester
      lng: coords?.lng || -0.1278,
      type: jobData.projectType, // Map compatibility
      timePosted: 'Just now',
      urgent: jobData.urgency === 'ASAP' || jobData.urgency.includes('urgent')
    };

    setJobs(prev => [...prev, newJob]);
    return newJob;
  };

  const updateJob = (id: number, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
  };

  const deleteJob = (id: number) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJobsByUser = (userId: string) => {
    return jobs.filter(job => job.userId === userId);
  };

  const getAllJobs = () => {
    return jobs;
  };

  return (
    <JobsContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      deleteJob,
      getJobsByUser,
      getAllJobs
    }}>
      {children}
    </JobsContext.Provider>
  );
};