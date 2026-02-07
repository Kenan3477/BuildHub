'use client';

import { ArrowLeft, HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HelpPage() {
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
            Help Centre
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <HelpCircle size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            How can we help you?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* FAQ Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </h3>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                question: "How do I post a project?",
                answer: "Click 'Post Project' in the navigation, fill in your project details, and we'll match you with verified professionals in your area."
              },
              {
                question: "How does the credit system work?",
                answer: "Contractors use credits to unlock job details. Basic jobs cost 5 credits, premium jobs cost 10-25 credits. New contractors receive 50 free credits."
              },
              {
                question: "How are professionals verified?",
                answer: "All professionals undergo identity verification, insurance checks, and previous work portfolio review before joining our platform."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and bank transfers. Payments are processed securely through Stripe."
              },
              {
                question: "How do I contact a professional?",
                answer: "Once you've posted a project, interested professionals will send you quotes. You can review their profiles and contact them directly."
              },
              {
                question: "Is there a mobile app?",
                answer: "Yes! BuildHub is fully responsive and works great on mobile devices. Native apps are coming soon to iOS and Android."
              }
            ].map((faq, index) => (
              <div key={index} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#1e293b'
                }}>
                  {faq.question}
                </h4>
                <p style={{ 
                  color: '#64748b', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>
            Still need help?
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <a href="/contact" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1e293b',
              transition: 'all 0.2s'
            }}>
              <MessageSquare size={24} style={{ color: '#f59e0b' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Contact Support
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                  Send us a message
                </p>
              </div>
            </a>

            <a href="tel:+44-20-1234-5678" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1e293b',
              transition: 'all 0.2s'
            }}>
              <Phone size={24} style={{ color: '#10b981' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Call Us
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                  +44 20 1234 5678
                </p>
              </div>
            </a>

            <a href="mailto:support@buildhub.co.uk" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#1e293b',
              transition: 'all 0.2s'
            }}>
              <Mail size={24} style={{ color: '#3b82f6' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                  Email Support
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                  support@buildhub.co.uk
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}