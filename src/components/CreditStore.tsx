'use client';

import React, { useState } from 'react';
import { X, Star, Zap, Check } from 'lucide-react';
import { useCredits, creditPackages, CreditPackage } from '../context/CreditsContext';

interface CreditStoreProp {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditStore: React.FC<CreditStoreProp> = ({ isOpen, onClose }) => {
  const { purchaseCredits, addCredits } = useCredits();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (creditPackage: CreditPackage) => {
    setLoading(creditPackage.id);
    
    try {
      const success = await purchaseCredits(creditPackage);
      
      if (success) {
        alert(`🎉 Successfully purchased ${creditPackage.credits} credits!`);
        onClose();
      } else {
        alert('❌ Purchase failed. Please try again.');
      }
    } catch (error) {
      alert('❌ Purchase failed. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '32px 32px 0 32px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                💳 Buy Credits
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Unlock job details and connect with clients
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Packages */}
        <div style={{ padding: '32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px'
          }}>
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  border: pkg.popular ? '3px solid #f59e0b' : '2px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                  backgroundColor: pkg.popular ? '#fef3c7' : '#ffffff',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  transform: pkg.popular ? 'scale(1.05)' : 'none'
                }}
              >
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '4px 16px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={12} />
                    POPULAR
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: pkg.popular ? '#f59e0b' : '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '24px',
                    color: 'white'
                  }}>
                    <Zap />
                  </div>
                  
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                    {pkg.name}
                  </h3>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>
                      {pkg.credits}
                    </span>
                    <span style={{ fontSize: '16px', color: '#64748b', marginLeft: '4px' }}>
                      credits
                    </span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
                      £{pkg.price}
                    </span>
                    {pkg.savings && (
                      <div style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginTop: '4px'
                      }}>
                        {pkg.savings}
                      </div>
                    )}
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Check size={16} style={{ color: '#10b981' }} />
                      Unlock job details
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Check size={16} style={{ color: '#10b981' }} />
                      Contact information
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} style={{ color: '#10b981' }} />
                      Priority bidding
                    </li>
                  </ul>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={loading === pkg.id}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: loading === pkg.id ? '#cbd5e1' : (pkg.popular ? '#f59e0b' : '#3b82f6'),
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading === pkg.id ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading === pkg.id ? 'Processing...' : 'Purchase'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
              💡 Why Buy Credits?
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              fontSize: '14px',
              color: '#64748b'
            }}>
              <div>✅ See full job descriptions</div>
              <div>✅ Get client contact details</div>
              <div>✅ Access location information</div>
              <div>✅ Priority application status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};