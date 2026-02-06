'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Phone, Mail, Award, Users, Calendar, Filter, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock professional data
const professionals = [
  {
    id: 1,
    name: "James Mitchell",
    company: "Mitchell Construction Ltd",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialties: ["Kitchen Renovation", "Bathroom Refit", "Extensions"],
    location: "London",
    radius: "25km",
    experience: "15+ years",
    rating: 4.9,
    reviewCount: 127,
    pricePerDay: 350,
    pricePerHour: 45,
    avgJobCost: 15000,
    verified: true,
    responseTime: "< 2 hours",
    completedJobs: 245,
    description: "Specialist in high-end residential renovations with focus on kitchens and bathrooms. Fully insured and certified.",
    services: ["Plumbing", "Electrical", "Tiling", "Carpentry", "Project Management"],
    availability: "Available",
    phone: "07700 123456",
    email: "james@mitchellconstruction.co.uk",
    portfolio: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1556185781-a47769abb7b4?w=200&h=150&fit=crop"
    ],
    reviews: [
      { rating: 5, text: "Excellent work on our kitchen renovation. Very professional and finished on time.", author: "Sarah T.", date: "2 weeks ago" },
      { rating: 5, text: "James did an amazing job on our extension. Highly recommended!", author: "Mike R.", date: "1 month ago" }
    ]
  },
  {
    id: 2,
    name: "Sarah Thompson",
    company: "Thompson Electrical Services",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b8b3?w=150&h=150&fit=crop&crop=face",
    specialties: ["Electrical Installation", "Rewiring", "Smart Home"],
    location: "Manchester",
    radius: "30km",
    experience: "12+ years",
    rating: 4.8,
    reviewCount: 89,
    pricePerDay: 280,
    pricePerHour: 38,
    avgJobCost: 4500,
    verified: true,
    responseTime: "< 1 hour",
    completedJobs: 156,
    description: "Certified electrician specializing in residential and commercial electrical work. Smart home automation expert.",
    services: ["Electrical Installation", "Smart Home Setup", "Emergency Repairs", "Testing & Certification"],
    availability: "Busy until Feb 15th",
    phone: "07700 234567",
    email: "sarah@thompsonelectrical.co.uk",
    portfolio: [
      "https://images.unsplash.com/photo-1558618666-fbd1a4be9e10?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop"
    ],
    reviews: [
      { rating: 5, text: "Sarah rewired our entire house. Professional, clean work and great communication.", author: "John D.", date: "3 weeks ago" },
      { rating: 4, text: "Good electrical work, finished on schedule.", author: "Lisa M.", date: "2 months ago" }
    ]
  },
  {
    id: 3,
    name: "Robert Chen",
    company: "Chen Plumbing & Heating",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Plumbing", "Central Heating", "Boiler Installation"],
    location: "Birmingham",
    radius: "40km",
    experience: "18+ years",
    rating: 4.9,
    reviewCount: 203,
    pricePerDay: 320,
    pricePerHour: 42,
    avgJobCost: 8500,
    verified: true,
    responseTime: "< 30 min",
    completedJobs: 312,
    description: "Gas Safe registered plumber with extensive experience in boiler installations and central heating systems.",
    services: ["Plumbing Repairs", "Boiler Installation", "Central Heating", "Emergency Callouts", "Bathroom Installation"],
    availability: "Available",
    phone: "07700 345678",
    email: "robert@chenplumbing.co.uk",
    portfolio: [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=200&h=150&fit=crop"
    ],
    reviews: [
      { rating: 5, text: "Robert installed our new boiler quickly and efficiently. Great service!", author: "Emma W.", date: "1 week ago" },
      { rating: 5, text: "Fixed our heating emergency within 2 hours. Lifesaver!", author: "David L.", date: "3 weeks ago" }
    ]
  },
  {
    id: 4,
    name: "Amanda Foster",
    company: "Foster Landscaping Design",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    specialties: ["Garden Design", "Landscaping", "Patios & Decking"],
    location: "Bristol",
    radius: "35km",
    experience: "10+ years",
    rating: 4.7,
    reviewCount: 67,
    pricePerDay: 250,
    pricePerHour: 35,
    avgJobCost: 12000,
    verified: true,
    responseTime: "< 4 hours",
    completedJobs: 89,
    description: "Award-winning garden designer creating beautiful outdoor spaces. Specialist in contemporary and traditional designs.",
    services: ["Garden Design", "Patio Installation", "Decking", "Water Features", "Maintenance"],
    availability: "Available from March",
    phone: "07700 456789",
    email: "amanda@fosterlandscaping.co.uk",
    portfolio: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1573652223-b6fc471a8b88?w=200&h=150&fit=crop"
    ],
    reviews: [
      { rating: 5, text: "Amanda designed and built our dream garden. Absolutely stunning work!", author: "Karen S.", date: "2 months ago" },
      { rating: 4, text: "Professional garden design service. Very happy with the result.", author: "Tom B.", date: "4 months ago" }
    ]
  },
  {
    id: 5,
    name: "Michael Edwards",
    company: "Edwards Roofing Solutions",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    specialties: ["Roofing", "Guttering", "Emergency Repairs"],
    location: "Leeds",
    radius: "50km",
    experience: "20+ years",
    rating: 4.8,
    reviewCount: 145,
    pricePerDay: 380,
    pricePerHour: 48,
    avgJobCost: 6500,
    verified: true,
    responseTime: "< 1 hour",
    completedJobs: 278,
    description: "Experienced roofer with expertise in all types of roofing work. 24/7 emergency service available.",
    services: ["Roof Repairs", "New Roofs", "Guttering", "Chimney Work", "Emergency Repairs"],
    availability: "Available",
    phone: "07700 567890",
    email: "michael@edwardsroofing.co.uk",
    portfolio: [
      "https://images.unsplash.com/photo-1565402030566-6c1ac9dde0ce?w=200&h=150&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=150&fit=crop"
    ],
    reviews: [
      { rating: 5, text: "Michael fixed our roof leak emergency quickly and professionally.", author: "Helen P.", date: "1 week ago" },
      { rating: 5, text: "Great roofing work, fair price and excellent service.", author: "James K.", date: "2 weeks ago" }
    ]
  }
];

const specialtyOptions = ["All Services", "Kitchen Renovation", "Bathroom Refit", "Extensions", "Electrical Installation", "Plumbing", "Roofing", "Garden Design", "Landscaping", "Central Heating", "Emergency Repairs"];
const locationOptions = ["All Locations", "London", "Manchester", "Birmingham", "Bristol", "Leeds", "Liverpool", "Newcastle", "Cardiff"];
const availabilityOptions = ["All", "Available Now", "Available This Month", "Busy"];
const ratingOptions = ["All Ratings", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"];

export default function ProfessionalsPage() {
  const { isAuthenticated, user } = useAuth();
  
  // Redirect non-authenticated users to login
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login?redirect=' + encodeURIComponent('/professionals');
      return;
    }
  }, [isAuthenticated]);

  const [selectedProfessional, setSelectedProfessional] = useState<typeof professionals[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [filters, setFilters] = useState({
    specialty: 'All Services',
    location: 'All Locations',
    availability: 'All',
    rating: 'All Ratings',
    maxPricePerDay: 500,
    maxPricePerHour: 60
  });
  const [sortBy, setSortBy] = useState('rating');

  // Authentication check function
  const handleContactNow = (professional: typeof professionals[0]) => {
    if (!isAuthenticated || !user?.verified) {
      setShowAuthPrompt(true);
      return;
    }
    // Handle actual contact flow for authenticated users
    alert(`Contacting ${professional.name}...`);
  };

  const handleViewProfile = (professional: typeof professionals[0]) => {
    if (!isAuthenticated || !user?.verified) {
      setShowAuthPrompt(true);
      return;
    }
    setSelectedProfessional(professional);
  };

  // Filter professionals based on search and filters
  const filteredProfessionals = professionals
    .filter(prof => {
      if (searchQuery && !prof.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !prof.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !prof.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      if (filters.specialty !== 'All Services' && !prof.specialties.includes(filters.specialty)) {
        return false;
      }
      if (filters.location !== 'All Locations' && prof.location !== filters.location) {
        return false;
      }
      if (filters.availability === 'Available Now' && prof.availability !== 'Available') {
        return false;
      }
      if (filters.rating === '4.5+ Stars' && prof.rating < 4.5) {
        return false;
      }
      if (filters.rating === '4.0+ Stars' && prof.rating < 4.0) {
        return false;
      }
      if (filters.rating === '3.5+ Stars' && prof.rating < 3.5) {
        return false;
      }
      if (prof.pricePerDay > filters.maxPricePerDay || prof.pricePerHour > filters.maxPricePerHour) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.pricePerDay - b.pricePerDay;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

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
                Find Construction Professionals
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                {filteredProfessionals.length} verified professionals • Browse profiles, reviews & pricing
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem',
                backgroundColor: 'white'
              }}
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="experience">Sort by Experience</option>
              <option value="reviews">Sort by Reviews</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        
        {/* Filters Sidebar */}
        <div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Filter style={{ height: '1.25rem', width: '1.25rem', color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                Filters
              </h3>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Search
              </label>
              <div style={{ position: 'relative' }}>
                <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', height: '1rem', width: '1rem', color: '#6b7280' }} />
                <input
                  type="text"
                  placeholder="Name, company, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.5rem 0.5rem 2.25rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Service Specialty */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Service Type
              </label>
              <select 
                value={filters.specialty}
                onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                {specialtyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Location
              </label>
              <select 
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                {locationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Availability
              </label>
              <select 
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Minimum Rating
              </label>
              <select 
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                {ratingOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Max Price per Day: £{filters.maxPricePerDay}
              </label>
              <input
                type="range"
                min="100"
                max="500"
                value={filters.maxPricePerDay}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPricePerDay: Number(e.target.value) }))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                Max Price per Hour: £{filters.maxPricePerHour}
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={filters.maxPricePerHour}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPricePerHour: Number(e.target.value) }))}
                style={{ width: '100%' }}
              />
            </div>

            <button
              onClick={() => setFilters({
                specialty: 'All Services',
                location: 'All Locations', 
                availability: 'All',
                rating: 'All Ratings',
                maxPricePerDay: 500,
                maxPricePerHour: 60
              })}
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Professionals List */}
        <div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredProfessionals.map(professional => (
              <div 
                key={professional.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: selectedProfessional?.id === professional.id ? '2px solid #f59e0b' : '2px solid transparent'
                }}
                onClick={() => setSelectedProfessional(professional)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {/* Profile Image */}
                  <div style={{ position: 'relative' }}>
                    <img
                      src={professional.profileImage}
                      alt={professional.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '12px',
                        objectFit: 'cover'
                      }}
                    />
                    {professional.verified && (
                      <div style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        ✓
                      </div>
                    )}
                  </div>

                  {/* Professional Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                          {professional.name}
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0.25rem 0' }}>
                          {professional.company}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                          <Star style={{ height: '1rem', width: '1rem', color: '#fbbf24', fill: '#fbbf24' }} />
                          <span style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>
                            {professional.rating}
                          </span>
                          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            ({professional.reviewCount})
                          </span>
                        </div>
                        <div style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: professional.availability === 'Available' ? '#dcfce7' : '#fef3c7',
                          color: professional.availability === 'Available' ? '#166534' : '#92400e',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          {professional.availability}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      {professional.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                      {professional.specialties.length > 3 && (
                        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          +{professional.specialties.length - 3} more
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                          {professional.location} ({professional.radius})
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Award style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                          {professional.experience}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                          Responds {professional.responseTime}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                          {professional.completedJobs} jobs completed
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>
                      {professional.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Per Day</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
                            £{professional.pricePerDay}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Per Hour</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
                            £{professional.pricePerHour}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Avg Job</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
                            £{professional.avgJobCost.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          onClick={() => handleViewProfile(professional)}
                          style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}>
                          View Profile
                        </button>
                        <button 
                          onClick={() => handleContactNow(professional)}
                          style={{
                          padding: '0.5rem 1.5rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}>
                          Contact Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProfessionals.length === 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
                  No professionals found
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  Try adjusting your filters or search terms to find more professionals.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Detail Modal */}
      {selectedProfessional && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}
        onClick={() => setSelectedProfessional(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem'
          }}
          onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <img
                  src={selectedProfessional.profileImage}
                  alt={selectedProfessional.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {selectedProfessional.name}
                  </h2>
                  <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: '0.25rem 0' }}>
                    {selectedProfessional.company}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <Star style={{ height: '1.25rem', width: '1.25rem', color: '#fbbf24', fill: '#fbbf24' }} />
                    <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
                      {selectedProfessional.rating}
                    </span>
                    <span style={{ fontSize: '1rem', color: '#6b7280' }}>
                      ({selectedProfessional.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProfessional(null)}
                style={{
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '1.5rem'
                }}
              >
                ×
              </button>
            </div>

            {/* Services */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Services Offered
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedProfessional.services.map((service, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Recent Work
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {selectedProfessional.portfolio.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Work example ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '150px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                Recent Reviews
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedProfessional.reviews.map((review, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#f9fafb',
                      padding: '1rem',
                      borderRadius: '8px',
                      borderLeft: '4px solid #f59e0b'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.125rem' }}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} style={{ height: '0.875rem', width: '0.875rem', color: '#fbbf24', fill: '#fbbf24' }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>
                        {review.author}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        • {review.date}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.5', margin: 0 }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Per Day</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#059669' }}>
                    £{selectedProfessional.pricePerDay}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Per Hour</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#059669' }}>
                    £{selectedProfessional.pricePerHour}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Avg Job</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#059669' }}>
                    £{selectedProfessional.avgJobCost.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  <Phone style={{ height: '1rem', width: '1rem' }} />
                  Call Now
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  <Mail style={{ height: '1rem', width: '1rem' }} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Prompt Modal */}
      {showAuthPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#f59e0b',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px'
            }}>
              🔐
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
              Sign In Required
            </h2>
            
            <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
              Only verified users can view professional details and contact information. 
              Please sign in or create an account to continue.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowAuthPrompt(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  window.location.href = '/auth/login?redirect=' + encodeURIComponent('/professionals');
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Sign In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}