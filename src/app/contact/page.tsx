'use client';

import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'homeowner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to your backend
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      userType: 'homeowner'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            Contact Us
          </h1>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <MessageSquare size={48} style={{ color: '#f59e0b', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Get in Touch
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Have a question, need support, or want to learn more about BuildHub? 
            We'd love to hear from you.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '3rem'
        }}>
          {/* Contact Form */}
          <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  I am a *
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="homeowner">Homeowner</option>
                  <option value="contractor">Construction Professional</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '0.9rem', 
                  fontWeight: '500', 
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your question or how we can help..."
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.2s'
                }}
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Phone size={20} style={{ color: '#f59e0b' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      Phone Support
                    </h4>
                    <p style={{ color: '#64748b', margin: 0 }}>
                      +44 20 1234 5678
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0 }}>
                      Mon-Fri: 9:00 AM - 6:00 PM GMT
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: '#dbeafe',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={20} style={{ color: '#3b82f6' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      Email Support
                    </h4>
                    <p style={{ color: '#64748b', margin: 0 }}>
                      support@buildhub.co.uk
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0 }}>
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: '#dcfce7',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={20} style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>
                      Office Address
                    </h4>
                    <p style={{ color: '#64748b', margin: 0 }}>
                      123 Construction Street<br />
                      London, UK SW1A 1AA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{
              backgroundColor: '#1e293b',
              color: '#fff',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href="/help" style={{ 
                  color: '#e2e8f0', 
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #374151'
                }}>
                  Help Centre & FAQ
                </a>
                <a href="/safety" style={{ 
                  color: '#e2e8f0', 
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #374151'
                }}>
                  Safety Guidelines
                </a>
                <a href="/trust" style={{ 
                  color: '#e2e8f0', 
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #374151'
                }}>
                  Trust & Safety
                </a>
                <a href="/auth/login" style={{ 
                  color: '#e2e8f0', 
                  textDecoration: 'none',
                  padding: '0.5rem 0'
                }}>
                  Account Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}