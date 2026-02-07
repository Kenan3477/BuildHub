'use client';

import { ArrowLeft, Newspaper } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PressPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
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
            Press & Media
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <Newspaper size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
          Press & Media
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
          For press inquiries and media resources, please contact our media team.
        </p>
        <a
          href="/contact"
          style={{
            backgroundColor: '#f59e0b',
            color: '#fff',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Contact Media Team
        </a>
      </div>
    </div>
  );
}