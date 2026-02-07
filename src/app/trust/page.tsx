'use client';

import { ArrowLeft, Shield, Lock, UserCheck, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrustAndSafetyPage() {
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
            Trust & Safety
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Shield size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Building Trust Through Safety
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            At BuildHub, we've implemented comprehensive measures to ensure safe, 
            secure, and trustworthy interactions between homeowners and construction professionals.
          </p>
        </div>

        {/* Trust Measures */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem', color: '#1e293b' }}>
            How We Build Trust
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <UserCheck size={48} style={{ color: '#3b82f6', marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Rigorous Verification
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                All contractors undergo comprehensive background checks, insurance verification, 
                license validation, and portfolio review before joining our platform.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Star size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Review System
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Our transparent review and rating system helps you make informed decisions 
                based on real experiences from verified customers.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <Lock size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Secure Payments
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                All payments are processed through our secure platform with milestone-based 
                releases, protecting both homeowners and contractors.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem', color: '#1e293b' }}>
            Our Verification Process
          </h3>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                {
                  step: "1",
                  title: "Identity Verification",
                  description: "Government-issued ID verification and address confirmation"
                },
                {
                  step: "2", 
                  title: "Business Credentials",
                  description: "Business license, registration, and tax compliance verification"
                },
                {
                  step: "3",
                  title: "Insurance & Bonding",
                  description: "Current liability insurance and bonding documentation review"
                },
                {
                  step: "4",
                  title: "Portfolio Review",
                  description: "Previous work samples and customer references verification"
                },
                {
                  step: "5",
                  title: "Background Check",
                  description: "Criminal background screening and professional misconduct review"
                },
                {
                  step: "6",
                  title: "Ongoing Monitoring",
                  description: "Continuous performance monitoring and periodic re-verification"
                }
              ].map((item) => (
                <div key={item.step} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: '#64748b', margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Guarantees */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '2rem', color: '#1e293b' }}>
            Our Safety Guarantees
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              {
                icon: <CheckCircle size={32} style={{ color: '#10b981' }} />,
                title: "Verified Professionals Only",
                description: "Every contractor has passed our comprehensive verification process"
              },
              {
                icon: <Shield size={32} style={{ color: '#3b82f6' }} />,
                title: "Insurance Protected",
                description: "All work is covered by contractor insurance and our additional protection"
              },
              {
                icon: <Lock size={32} style={{ color: '#8b5cf6' }} />,
                title: "Secure Communication",
                description: "All initial communications happen through our secure messaging system"
              },
              {
                icon: <Star size={32} style={{ color: '#f59e0b' }} />,
                title: "Quality Assurance",
                description: "Regular quality checks and customer satisfaction monitoring"
              }
            ].map((guarantee, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ flexShrink: 0 }}>
                  {guarantee.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {guarantee.title}
                  </h4>
                  <p style={{ color: '#64748b', margin: 0 }}>
                    {guarantee.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issues */}
        <div style={{ 
          backgroundColor: '#1e293b', 
          color: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <AlertTriangle size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Report Safety Concerns
          </h3>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            opacity: '0.9'
          }}>
            If you encounter any issues or have safety concerns, please contact us immediately. 
            We take all reports seriously and investigate them thoroughly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{
                backgroundColor: '#dc2626',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AlertTriangle size={18} />
              Report Issue
            </a>
            <a
              href="mailto:safety@buildhub.co.uk"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                border: '2px solid #fff'
              }}
            >
              safety@buildhub.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}