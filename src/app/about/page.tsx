'use client';

import { ArrowLeft, Building2, Users, Award, Target, Heart, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
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
            About BuildHub
          </h1>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Building2 size={64} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            Building Dreams, Connecting Communities
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            BuildHub is the UK's leading platform connecting homeowners with verified 
            construction professionals. We're making home improvement projects safer, 
            easier, and more transparent for everyone.
          </p>
        </div>

        {/* Mission & Values */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <Target size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                To revolutionize the construction industry by creating a trusted, 
                transparent platform that connects skilled professionals with homeowners 
                who need their expertise.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <Heart size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Our Values
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Trust, Quality, Innovation, and Community. We believe every home 
                improvement project should be a positive experience that brings 
                people together.
              </p>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <Zap size={48} style={{ color: '#8b5cf6', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                To become the go-to platform for construction services across the UK, 
                empowering both homeowners and professionals to achieve their goals 
                with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '3rem 2rem', 
          borderRadius: '12px',
          marginBottom: '4rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            BuildHub by the Numbers
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                50,000+
              </div>
              <p style={{ color: '#64748b', fontWeight: '500' }}>
                Verified Professionals
              </p>
            </div>
            <div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                250,000+
              </div>
              <p style={{ color: '#64748b', fontWeight: '500' }}>
                Projects Completed
              </p>
            </div>
            <div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#3b82f6',
                marginBottom: '0.5rem'
              }}>
                98%
              </div>
              <p style={{ color: '#64748b', fontWeight: '500' }}>
                Customer Satisfaction
              </p>
            </div>
            <div>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: '#8b5cf6',
                marginBottom: '0.5rem'
              }}>
                £2B+
              </div>
              <p style={{ color: '#64748b', fontWeight: '500' }}>
                Project Value Facilitated
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Why Choose BuildHub?
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              {
                icon: <Award size={32} style={{ color: '#f59e0b' }} />,
                title: "Verified Professionals",
                description: "All contractors undergo rigorous verification including identity, insurance, and portfolio checks."
              },
              {
                icon: <Users size={32} style={{ color: '#10b981' }} />,
                title: "Trusted Community",
                description: "Join thousands of satisfied homeowners and professionals who trust BuildHub for their projects."
              },
              {
                icon: <Building2 size={32} style={{ color: '#3b82f6' }} />,
                title: "Quality Guaranteed",
                description: "Our platform ensures high-quality work through reviews, ratings, and our satisfaction guarantee."
              }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ flexShrink: 0 }}>
                  {feature.icon}
                </div>
                <div>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#1e293b'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{ 
                    color: '#64748b', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ 
          backgroundColor: '#1e293b', 
          color: '#fff',
          padding: '3rem 2rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>
            Ready to Start Your Project?
          </h3>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            opacity: '0.9'
          }}>
            Join thousands of satisfied customers who trust BuildHub for their construction needs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/post-job"
              style={{
                backgroundColor: '#f59e0b',
                color: '#fff',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              Post a Project
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
                border: '2px solid #fff',
                transition: 'all 0.2s'
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