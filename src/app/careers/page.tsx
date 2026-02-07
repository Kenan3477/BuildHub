'use client';

import { ArrowLeft, Users, Briefcase, MapPin, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
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
            Careers at BuildHub
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Briefcase size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Join the BuildHub Team
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Help us revolutionize the construction industry and build the future of home improvement.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            We're Growing!
          </h3>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            BuildHub is expanding rapidly, and we're always looking for talented individuals 
            to join our mission of connecting homeowners with trusted construction professionals.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Currently, we don't have any open positions, but we'd love to hear from you!
            </p>
            <p style={{ color: '#64748b' }}>
              Send us your CV and we'll keep you in mind for future opportunities.
            </p>
          </div>
          <a
            href="/contact"
            style={{
              backgroundColor: '#f59e0b',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Heart size={18} />
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}