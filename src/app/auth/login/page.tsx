'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState<'customer' | 'contractor'>('customer');
  
  const { login } = useAuth();

  // Get redirect URL from query parameters
  const getRedirectUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect') || '/marketplace';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isSignUp) {
      // Handle sign up
      try {
        // Simulate API call for sign up
        setTimeout(() => {
          const newUser = {
            id: Math.floor(Math.random() * 1000),
            email: email,
            firstName: firstName || 'New',
            lastName: lastName || 'User',
            phone: '',
            verified: true,
            userType: userType
          };
          
          const token = 'user-token-' + newUser.id;
          login(token, newUser);
          
          alert('Account created successfully!');
          // Redirect based on user type
          const defaultRedirect = userType === 'contractor' ? '/dashboard' : '/marketplace';
          const redirectUrl = getRedirectUrl();
          window.location.href = redirectUrl === '/marketplace' ? defaultRedirect : redirectUrl;
        }, 1000);
      } catch (error) {
        alert('Sign up error: ' + (error as Error).message);
      }
    } else {
      // Handle sign in
      if (email === 'Kennen_02@icloud.com') {
        // Admin login
        try {
          const response = await fetch('/api/auth/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          
          const result = await response.json();
          
          if (response.ok) {
            login(result.token, result.user);
            alert('Admin login successful!');
            window.location.href = getRedirectUrl();
          } else {
            alert('Invalid admin credentials: ' + result.error);
          }
        } catch (error) {
          alert('Login error: ' + (error as Error).message);
        }
      } else {
        // Regular user login
        try {
          setTimeout(() => {
            const userData = {
              id: 1,
              email: email,
              firstName: 'Demo',
              lastName: 'User',
              phone: '',
              verified: true,
              userType: 'customer' as 'customer' | 'contractor'
            };
            
            const token = 'user-token-123';
            login(token, userData);
            
            alert('Login successful!');
            window.location.href = getRedirectUrl();
          }, 1000);
        } catch (error) {
          alert('Login error: ' + (error as Error).message);
        }
      }
    }
    
    setLoading(false);
  };

  const isAdmin = email === 'Kennen_02@icloud.com';

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        width: '100%', 
        maxWidth: '480px',
        overflow: 'hidden'
      }}>
        
        <div style={{ padding: '48px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: isAdmin ? '#dc2626' : '#f59e0b', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px',
              fontSize: '28px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              {isAdmin ? '🛡️' : '🏗️'}
            </div>
            
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '800', 
              color: '#111827', 
              marginBottom: '8px',
              lineHeight: '1.2'
            }}>
              {isSignUp ? 'Join BuildHub' : (isAdmin ? 'Admin Access' : 'Welcome Back')}
            </h1>
            
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              {isSignUp 
                ? 'Create your account to access construction jobs' 
                : (isAdmin ? 'Administrative Dashboard Access' : 'Sign in to BuildHub')
              }
            </p>

            {isAdmin && !isSignUp && (
              <div style={{ 
                backgroundColor: '#fef3c7', 
                border: '2px solid #f59e0b', 
                borderRadius: '12px', 
                padding: '16px', 
                margin: '20px 0',
                fontSize: '14px',
                color: '#92400e',
                fontWeight: '600'
              }}>
                🔐 <strong>Admin Mode Detected</strong>
              </div>
            )}
          </div>

          {/* Sign Up / Sign In Toggle */}
          <div style={{ 
            display: 'flex', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '12px', 
            padding: '6px',
            marginBottom: '32px',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
          }}>
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: !isSignUp ? '#f59e0b' : 'transparent',
                color: !isSignUp ? 'white' : '#6b7280',
                transition: 'all 0.3s ease',
                boxShadow: !isSignUp ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: isSignUp ? '#f59e0b' : 'transparent',
                color: isSignUp ? 'white' : '#6b7280',
                transition: 'all 0.3s ease',
                boxShadow: isSignUp ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sign Up Fields */}
            {isSignUp && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '16px', 
                  marginBottom: '24px' 
                }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={isSignUp}
                    style={{
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#fafafa',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={isSignUp}
                    style={{
                      padding: '16px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#fafafa',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                
                {/* User Type Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '12px', 
                    fontSize: '16px', 
                    fontWeight: '700', 
                    color: '#374151' 
                  }}>
                    I am a:
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '12px' 
                  }}>
                    <button
                      type="button"
                      onClick={() => setUserType('customer')}
                      style={{
                        padding: '16px',
                        border: `3px solid ${userType === 'customer' ? '#f59e0b' : '#e5e7eb'}`,
                        backgroundColor: userType === 'customer' ? '#fef3c7' : '#fafafa',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: userType === 'customer' ? '#92400e' : '#6b7280',
                        transition: 'all 0.3s ease',
                        transform: userType === 'customer' ? 'translateY(-2px)' : 'none',
                        boxShadow: userType === 'customer' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                    >
                      🏠 Homeowner/Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('contractor')}
                      style={{
                        padding: '16px',
                        border: `3px solid ${userType === 'contractor' ? '#f59e0b' : '#e5e7eb'}`,
                        backgroundColor: userType === 'contractor' ? '#fef3c7' : '#fafafa',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: userType === 'contractor' ? '#92400e' : '#6b7280',
                        transition: 'all 0.3s ease',
                        transform: userType === 'contractor' ? 'translateY(-2px)' : 'none',
                        boxShadow: userType === 'contractor' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                      }}
                    >
                      🔨 Professional/Contractor
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '16px',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: loading ? '#d1d5db' : (isAdmin && !isSignUp ? '#dc2626' : '#f59e0b'),
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: loading ? 'none' : 'translateY(-1px)',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              {loading 
                ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                : (isSignUp 
                    ? '🚀 Create Account' 
                    : (isAdmin ? '🔐 Admin Sign In' : 'Sign In')
                  )
              }
            </button>
          </form>

          {/* Admin Credentials Display */}
          {isAdmin && !isSignUp && (
            <div style={{ 
              marginTop: '32px', 
              padding: '20px', 
              backgroundColor: '#f9fafb', 
              borderRadius: '12px',
              fontSize: '14px',
              border: '2px solid #e5e7eb',
              lineHeight: '1.6'
            }}>
              <strong style={{ color: '#374151' }}>Admin Credentials:</strong><br />
              <span style={{ fontFamily: 'monospace', color: '#6b7280' }}>Email: Kennen_02@icloud.com</span><br />
              <span style={{ fontFamily: 'monospace', color: '#6b7280' }}>Password: Kenan3477!</span>
            </div>
          )}

          {/* Sign Up Benefits */}
          {isSignUp && (
            <div style={{ 
              marginTop: '32px', 
              padding: '24px', 
              backgroundColor: '#f0f9ff', 
              borderRadius: '16px',
              border: '2px solid #dbeafe',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
              <h4 style={{ 
                margin: '0 0 16px 0', 
                color: '#0369a1', 
                fontSize: '16px', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                ✨ Member Benefits:
              </h4>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '0', 
                listStyle: 'none',
                color: '#374151',
                fontSize: '15px',
                lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  Access to detailed job information
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  Interactive map with exact locations
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  Direct contact with project owners
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  Apply to multiple jobs instantly
                </li>
              </ul>
            </div>
          )}

          <div style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <a 
              href="/" 
              style={{ 
                color: '#f59e0b', 
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d97706'}
              onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#f59e0b'}
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
