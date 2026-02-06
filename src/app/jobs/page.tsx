'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, MapPin, Clock, DollarSign, Lock, Unlock, CreditCard, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCredits, UNLOCK_COSTS } from '../../context/CreditsContext';
import { useJobs } from '../../context/JobsContext';
import { CreditStore } from '../../components/CreditStore';

const JobsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { credits, unlockJob, isJobUnlocked } = useCredits();
  const { getAllJobs } = useJobs();
  const [showCreditStore, setShowCreditStore] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Redirect non-contractors
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login?redirect=' + encodeURIComponent('/jobs');
      return;
    }
    if (user?.userType !== 'contractor') {
      window.location.href = '/marketplace';
      return;
    }
  }, [isAuthenticated, user]);

  const jobs = getAllJobs();

  const getJobUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'ASAP':
      case 'Emergency':
        return { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' };
      case 'Within 1 week':
        return { bg: '#fef3c7', color: '#d97706', border: '#fed7aa' };
      case 'Within 2 weeks':
        return { bg: '#ecfdf5', color: '#059669', border: '#bbf7d0' };
      default:
        return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
    }
  };

  const getUnlockCost = (job: any) => {
    if (job.urgency === 'ASAP' || job.urgent) return UNLOCK_COSTS.emergency_job;
    if (job.budget > 20000) return UNLOCK_COSTS.exclusive_job;
    if (job.projectType === 'Commercial') return UNLOCK_COSTS.premium_job;
    return UNLOCK_COSTS.basic_job;
  };

  const handleUnlockJob = (job: any) => {
    const cost = getUnlockCost(job);
    if (credits < cost) {
      setShowCreditStore(true);
      return;
    }
    
    const success = unlockJob(job.id);
    if (success) {
      alert(`✅ Job unlocked! You spent ${cost} credits.`);
    } else {
      alert('❌ Failed to unlock job. Please try again.');
    }
  };

  const BlurredText: React.FC<{ text: string; isUnlocked: boolean }> = ({ text, isUnlocked }) => {
    if (isUnlocked) return <>{text}</>;
    
    return (
      <span style={{
        filter: 'blur(4px)',
        userSelect: 'none',
        cursor: 'not-allowed'
      }}>
        {text.replace(/./g, '●')}
      </span>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' 
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb', 
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => window.history.back()} 
              style={{ 
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
              }}
            >
              <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
              Back to Dashboard
            </button>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                Available Jobs
              </h1>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
                {jobs.length} jobs available • Unlock details with credits
              </p>
            </div>
          </div>
          
          {/* Credits Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px'
            }}>
              <CreditCard style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#92400e' }}>
                {credits} Credits
              </span>
            </div>
            <button
              onClick={() => setShowCreditStore(true)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Buy Credits
            </button>
          </div>
        </div>
      </header>

      {/* Jobs List */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {jobs.map(job => {
            const isUnlocked = isJobUnlocked(job.id);
            const unlockCost = getUnlockCost(job);
            const urgencyStyle = getJobUrgencyColor(job.urgency);
            
            return (
              <div 
                key={job.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  border: isUnlocked ? '2px solid #10b981' : '2px solid #e5e7eb',
                  position: 'relative'
                }}
              >
                {/* Unlock Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: isUnlocked ? '#dcfce7' : '#fef3c7',
                  color: isUnlocked ? '#166534' : '#92400e',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {isUnlocked ? (
                    <>
                      <Unlock style={{ height: '0.875rem', width: '0.875rem' }} />
                      Unlocked
                    </>
                  ) : (
                    <>
                      <Lock style={{ height: '0.875rem', width: '0.875rem' }} />
                      {unlockCost} credits to unlock
                    </>
                  )}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                        {job.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <div style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: urgencyStyle.bg,
                          color: urgencyStyle.color,
                          border: `1px solid ${urgencyStyle.border}`,
                          borderRadius: '16px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {job.urgency}
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          borderRadius: '16px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          {job.projectType}
                        </span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#059669', marginBottom: '0.25rem' }}>
                        £{job.budget.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        Budget
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                      <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                        {isUnlocked ? job.location : '●●●●●●●●'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                      <span style={{ fontSize: '0.9rem', color: '#374151' }}>
                        Posted {job.timePosted || 'recently'}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: '#6b7280', 
                      lineHeight: '1.6',
                      margin: 0,
                      filter: isUnlocked ? 'none' : 'blur(2px)',
                      userSelect: isUnlocked ? 'auto' : 'none'
                    }}>
                      {isUnlocked ? job.description : job.description.slice(0, 100) + '...'}
                    </p>
                  </div>

                  {/* Skills Required */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {job.skills?.map((skill: string, index: number) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          filter: isUnlocked ? 'none' : 'blur(1px)'
                        }}
                      >
                        {isUnlocked ? skill : '●●●●'}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {isUnlocked ? (
                      <>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          Contact: <span style={{ color: '#374151', fontWeight: '500' }}>Available</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                          Postcode: <span style={{ color: '#374151', fontWeight: '500' }}>{job.postcode}</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        🔒 Contact details hidden - unlock to view
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {!isUnlocked ? (
                      <button
                        onClick={() => handleUnlockJob(job)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        disabled={credits < unlockCost}
                      >
                        <Unlock style={{ height: '0.875rem', width: '0.875rem' }} />
                        Unlock ({unlockCost} credits)
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedJob(job)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          View Details
                        </button>
                        <button
                          style={{
                            padding: '0.5rem 1.5rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Apply Now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {jobs.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>
              No jobs available
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              Check back later for new opportunities.
            </p>
          </div>
        )}
      </div>

      {/* Credit Store Modal */}
      <CreditStore 
        isOpen={showCreditStore} 
        onClose={() => setShowCreditStore(false)} 
      />

      {/* Job Detail Modal */}
      {selectedJob && (
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
        onClick={() => setSelectedJob(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem'
          }}
          onClick={(e) => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                {selectedJob.title}
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
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

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '1rem', color: '#374151', lineHeight: '1.6' }}>
                {selectedJob.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Budget</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#059669' }}>
                  £{selectedJob.budget.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Location</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                  {selectedJob.location}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Timeline</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                  {selectedJob.urgency}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Project Type</div>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                  {selectedJob.projectType}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Apply for This Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;