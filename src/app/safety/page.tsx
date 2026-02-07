'use client';

import { ArrowLeft, Shield, Lock, Eye, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SafetyPage() {
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
            Safety Guidelines
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
            Your Safety is Our Priority
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            BuildHub is committed to ensuring safe, secure, and positive experiences 
            for all users. Here are our comprehensive safety guidelines.
          </p>
        </div>

        {/* Safety Tips for Homeowners */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#1e293b' }}>
            🏠 Safety Tips for Homeowners
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              "Always verify a contractor's credentials and insurance before hiring",
              "Request and check references from recent projects",
              "Get multiple quotes to understand fair pricing",
              "Never pay large sums upfront - use BuildHub's secure payment system",
              "Ensure all agreements are documented in writing",
              "Verify that proper permits are obtained for your project",
              "Meet contractors in person before making decisions",
              "Trust your instincts - if something feels wrong, get a second opinion"
            ].map((tip, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <CheckCircle size={20} style={{ color: '#10b981', marginTop: '0.25rem', flexShrink: 0 }} />
                <p style={{ margin: 0, color: '#374151' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips for Contractors */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', color: '#1e293b' }}>
            🔨 Safety Tips for Contractors
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              "Always carry valid insurance and provide proof to clients",
              "Use BuildHub's messaging system for initial communications",
              "Provide detailed, written quotes with clear scope of work",
              "Never request payment outside of BuildHub's secure system",
              "Be transparent about timelines, costs, and potential issues",
              "Follow all local building codes and safety regulations",
              "Provide regular project updates to maintain trust",
              "Address client concerns promptly and professionally"
            ].map((tip, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <CheckCircle size={20} style={{ color: '#3b82f6', marginTop: '0.25rem', flexShrink: 0 }} />
                <p style={{ margin: 0, color: '#374151' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <div style={{ 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca',
          padding: '2rem', 
          borderRadius: '12px',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <AlertTriangle size={24} style={{ color: '#dc2626' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0, color: '#dc2626' }}>
              Red Flags to Watch Out For
            </h3>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              "Door-to-door solicitation or high-pressure sales tactics",
              "Requests for full payment upfront",
              "No physical address or proper business credentials",
              "Significantly lower quotes than all other contractors",
              "Refusal to provide references or proof of insurance",
              "Cash-only payment demands",
              "Verbal agreements without written contracts",
              "Unlicensed contractors for work requiring permits"
            ].map((flag, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <div style={{ 
                  width: '6px', 
                  height: '6px', 
                  backgroundColor: '#dc2626', 
                  borderRadius: '50%',
                  marginTop: '0.5rem',
                  flexShrink: 0
                }} />
                <p style={{ margin: 0, color: '#7f1d1d' }}>{flag}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Report Safety Concerns
          </h3>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            If you encounter any safety issues, suspicious behavior, or violations of our guidelines, 
            please report them immediately. We take all reports seriously and investigate promptly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
              Report an Issue
            </a>
            <a
              href="tel:+44-20-1234-5678"
              style={{
                backgroundColor: '#1e293b',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Emergency: +44 20 1234 5678
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}