'use client';

import { ArrowLeft, Search, Users, MessageSquare, CreditCard, Star, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#fff', 
        borderBottom: '1px solid #e2e8f0', 
        padding: '1rem 2rem' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>
            How It Works
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Getting Started is Simple
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            Whether you're a homeowner looking for construction services or a professional 
            seeking new opportunities, BuildHub makes it easy to connect and collaborate.
          </p>
        </div>

        {/* For Homeowners */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '3rem', textAlign: 'center' }}>
            🏠 For Homeowners
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                step: "1",
                icon: <Search size={40} style={{ color: '#f59e0b' }} />,
                title: "Post Your Project",
                description: "Describe your construction project, timeline, and budget. Upload photos and specify your requirements."
              },
              {
                step: "2",
                icon: <Users size={40} style={{ color: '#3b82f6' }} />,
                title: "Get Matched",
                description: "Our system matches you with verified professionals in your area who specialize in your type of project."
              },
              {
                step: "3",
                icon: <MessageSquare size={40} style={{ color: '#10b981' }} />,
                title: "Review Quotes",
                description: "Receive detailed quotes, compare profiles, read reviews, and communicate directly with contractors."
              },
              {
                step: "4",
                icon: <CheckCircle size={40} style={{ color: '#8b5cf6' }} />,
                title: "Hire & Complete",
                description: "Choose your preferred contractor, agree on terms, and let them bring your project to life safely and efficiently."
              }
            ].map((step) => (
              <div key={step.step} style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1e293b',
                  color: '#fff',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {step.step}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  {step.icon}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {step.title}
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* For Contractors */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '3rem', textAlign: 'center' }}>
            🔨 For Construction Professionals
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {[
              {
                step: "1",
                icon: <Users size={40} style={{ color: '#f59e0b' }} />,
                title: "Create Profile",
                description: "Sign up and create your professional profile. Upload your portfolio, certifications, and insurance details."
              },
              {
                step: "2",
                icon: <CheckCircle size={40} style={{ color: '#3b82f6' }} />,
                title: "Get Verified",
                description: "Complete our verification process including background checks, license validation, and insurance verification."
              },
              {
                step: "3",
                icon: <Search size={40} style={{ color: '#10b981' }} />,
                title: "Browse Jobs",
                description: "Access our job marketplace with 50 free credits. Use credits to unlock full job details and client contact information."
              },
              {
                step: "4",
                icon: <CreditCard size={40} style={{ color: '#8b5cf6' }} />,
                title: "Win Projects",
                description: "Submit competitive quotes, communicate with clients, and build your reputation through successful project completion."
              }
            ].map((step) => (
              <div key={step.step} style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#1e293b',
                  color: '#fff',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {step.step}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  {step.icon}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {step.title}
                </h4>
                <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit System Explanation */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '3rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '4rem'
        }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
            💳 Understanding the Credit System
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                How Credits Work
              </h4>
              <ul style={{ color: '#64748b', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>New contractors receive 50 free credits</li>
                <li style={{ marginBottom: '0.5rem' }}>Credits unlock full job details and client contact info</li>
                <li style={{ marginBottom: '0.5rem' }}>Different job types cost different credit amounts</li>
                <li style={{ marginBottom: '0.5rem' }}>Purchase credit packages at competitive rates</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b' }}>
                Credit Costs
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { type: 'Basic Jobs', cost: '5 credits', color: '#10b981' },
                  { type: 'Commercial/Premium', cost: '10 credits', color: '#3b82f6' },
                  { type: 'Emergency/Urgent', cost: '15 credits', color: '#f59e0b' },
                  { type: 'Exclusive High-Value', cost: '25 credits', color: '#8b5cf6' }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px'
                  }}>
                    <span style={{ fontWeight: '500' }}>{item.type}</span>
                    <span style={{ fontWeight: '600', color: item.color }}>{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose BuildHub */}
        <div style={{ 
          backgroundColor: '#1e293b', 
          color: '#fff',
          padding: '3rem 2rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem' }}>
            Why Choose BuildHub?
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.5rem' }}>
                50,000+
              </div>
              <p style={{ opacity: '0.9' }}>Verified Professionals</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>
                98%
              </div>
              <p style={{ opacity: '0.9' }}>Customer Satisfaction</p>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3b82f6', marginBottom: '0.5rem' }}>
                £2B+
              </div>
              <p style={{ opacity: '0.9' }}>Project Value</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/post-job"
              style={{
                backgroundColor: '#f59e0b',
                color: '#fff',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Post Your First Project
            </a>
            <a
              href="/auth/login"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                border: '2px solid #fff'
              }}
            >
              Join as Professional
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}