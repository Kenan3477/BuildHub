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
      backgroundColor: '#f1f5f9', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '20px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
        width: '100%', 
        maxWidth: '600px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        
        <div style={{ 
          padding: '48px 40px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
        }}>
          {/* Header Section */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '40px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '32px'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: isAdmin ? '#dc2626' : '#f59e0b', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px',
              fontSize: '32px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '4px solid white'
            }}>
              {isAdmin ? '🛡️' : '🏗️'}
            </div>
            
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '900', 
              color: '#0f172a', 
              marginBottom: '12px',
              lineHeight: '1.2',
              letterSpacing: '-0.025em'
            }}>
              {isSignUp ? 'Join BuildHub' : (isAdmin ? 'Admin Access' : 'Welcome Back')}
            </h1>
            
            <p style={{ 
              color: '#64748b',
              fontSize: '18px',
              lineHeight: '1.6',
              fontWeight: '500'
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
                borderRadius: '16px', 
                padding: '20px', 
                margin: '24px 0 0 0',
                fontSize: '16px',
                color: '#92400e',
                fontWeight: '700'
              }}>
                🔐 <strong>Admin Mode Detected</strong>
              </div>
            )}
          </div>

          {/* Sign Up / Sign In Toggle */}
          <div style={{ 
            display: 'flex', 
            backgroundColor: '#f1f5f9', 
            borderRadius: '16px', 
            padding: '8px',
            marginBottom: '40px',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: !isSignUp ? '#f59e0b' : 'transparent',
                color: !isSignUp ? '#ffffff' : '#64748b',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: !isSignUp ? '0 10px 15px -3px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.1)' : 'none',
                transform: !isSignUp ? 'translateY(-2px)' : 'none',
                fontFamily: 'inherit'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              style={{
                flex: 1,
                padding: '16px 20px',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: isSignUp ? '#f59e0b' : 'transparent',
                color: isSignUp ? '#ffffff' : '#64748b',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isSignUp ? '0 10px 15px -3px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.1)' : 'none',
                transform: isSignUp ? 'translateY(-2px)' : 'none',
                fontFamily: 'inherit'
              }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sign Up Fields */}
            {isSignUp && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px', 
                  marginBottom: '32px' 
                }}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={isSignUp}
                    style={{
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      fontFamily: 'inherit',
                      fontWeight: '500',
                      color: '#0f172a',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={isSignUp}
                    style={{
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      backgroundColor: '#ffffff',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      fontFamily: 'inherit',
                      fontWeight: '500',
                      color: '#0f172a',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                    }}
                  />
                </div>
                
                {/* User Type Selection */}
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '12px', 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#0f172a',
                    letterSpacing: '-0.025em'
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
                        padding: '16px 12px',
                        border: `3px solid ${userType === 'customer' ? '#f59e0b' : '#e2e8f0'}`,
                        backgroundColor: userType === 'customer' ? '#fef3c7' : '#ffffff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: userType === 'customer' ? '#92400e' : '#64748b',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: userType === 'customer' ? 'translateY(-2px)' : 'none',
                        boxShadow: userType === 'customer' ? '0 10px 15px -3px rgba(245, 158, 11, 0.2), 0 4px 6px -2px rgba(245, 158, 11, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        fontFamily: 'inherit',
                        lineHeight: '1.4'
                      }}
                    >
                      🏠 Homeowner/<br/>Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('contractor')}
                      style={{
                        padding: '16px 12px',
                        border: `3px solid ${userType === 'contractor' ? '#f59e0b' : '#e2e8f0'}`,
                        backgroundColor: userType === 'contractor' ? '#fef3c7' : '#ffffff',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: userType === 'contractor' ? '#92400e' : '#64748b',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: userType === 'contractor' ? 'translateY(-2px)' : 'none',
                        boxShadow: userType === 'contractor' ? '0 10px 15px -3px rgba(245, 158, 11, 0.2), 0 4px 6px -2px rgba(245, 158, 11, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                        fontFamily: 'inherit',
                        lineHeight: '1.4'
                      }}
                    >
                      🔨 Professional/<br/>Contractor
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
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  marginBottom: '16px',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                  color: '#0f172a',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                }}
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
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  fontWeight: '500',
                  color: '#0f172a',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#f59e0b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: loading ? '#cbd5e1' : (isAdmin && !isSignUp ? '#dc2626' : '#f59e0b'),
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: loading ? 'none' : '0 10px 15px -3px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.2)',
                transform: loading ? 'none' : 'translateY(-1px)',
                letterSpacing: '0.025em',
                fontFamily: 'inherit',
                opacity: loading ? '0.6' : '1'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 20px 25px -5px rgba(245, 158, 11, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  (e.target as HTMLButtonElement).style.boxShadow = '0 10px 15px -3px rgba(245, 158, 11, 0.4), 0 4px 6px -2px rgba(245, 158, 11, 0.2)';
                }
              }}
            >
              {loading 
                ? (isSignUp ? '🔄 Creating Account...' : '🔄 Signing In...')
                : (isSignUp 
                    ? '🚀 Create Account' 
                    : (isAdmin ? '🔐 Admin Sign In' : '✨ Sign In')
                  )
              }
            </button>
          </form>

          {/* Admin Credentials Display */}
          {isAdmin && !isSignUp && (
            <div style={{ 
              marginTop: '32px', 
              padding: '24px', 
              backgroundColor: '#f8fafc', 
              borderRadius: '16px',
              fontSize: '16px',
              border: '2px solid #e2e8f0',
              lineHeight: '1.8',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <strong style={{ color: '#0f172a', fontSize: '18px' }}>Admin Credentials:</strong><br />
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace', color: '#64748b', fontSize: '16px' }}>Email: Kennen_02@icloud.com</span><br />
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace', color: '#64748b', fontSize: '16px' }}>Password: Kenan3477!</span>
            </div>
          )}

          {/* Sign Up Benefits */}
          {isSignUp && (
            <div style={{ 
              marginTop: '32px', 
              padding: '32px', 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '20px',
              border: '2px solid #3b82f6',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}>
              <h4 style={{ 
                margin: '0 0 20px 0', 
                color: '#1e40af', 
                fontSize: '20px', 
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                ✨ Member Benefits:
              </h4>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '0', 
                listStyle: 'none',
                color: '#1e293b',
                fontSize: '17px',
                lineHeight: '2'
              }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                  <span style={{ fontWeight: '600' }}>Access to detailed job information</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                  <span style={{ fontWeight: '600' }}>Interactive map with exact locations</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                  <span style={{ fontWeight: '600' }}>Direct contact with project owners</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                  <span style={{ fontWeight: '600' }}>Apply to multiple jobs instantly</span>
                </li>
              </ul>
            </div>
          )}

          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '2px solid #e2e8f0'
          }}>
            <a 
              href="/" 
              style={{ 
                color: '#f59e0b', 
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                padding: '12px 24px',
                borderRadius: '12px',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = '#ffffff';
                (e.target as HTMLAnchorElement).style.backgroundColor = '#f59e0b';
                (e.target as HTMLAnchorElement).style.borderColor = '#f59e0b';
                (e.target as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = '#f59e0b';
                (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.target as HTMLAnchorElement).style.borderColor = 'transparent';
                (e.target as HTMLAnchorElement).style.transform = 'none';
              }}
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
