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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', padding: '40px', width: '100%', maxWidth: '450px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: isAdmin ? '#dc2626' : '#f59e0b', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            fontSize: '24px'
          }}>
            {isAdmin ? '🛡️' : '🏗️'}
          </div>
          
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {isSignUp ? 'Join BuildHub' : (isAdmin ? 'Admin Access' : 'Welcome Back')}
          </h1>
          
          <p style={{ color: '#6b7280' }}>
            {isSignUp 
              ? 'Create your account to access construction jobs' 
              : (isAdmin ? 'Administrative Dashboard Access' : 'Sign in to BuildHub')
            }
          </p>

          {isAdmin && !isSignUp && (
            <div style={{ 
              backgroundColor: '#fef3c7', 
              border: '1px solid #f59e0b', 
              borderRadius: '8px', 
              padding: '12px', 
              margin: '16px 0',
              fontSize: '14px',
              color: '#92400e'
            }}>
              🔐 <strong>Admin Mode Detected</strong>
            </div>
          )}
        </div>

        {/* Sign Up / Sign In Toggle */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '8px', 
          padding: '4px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              backgroundColor: !isSignUp ? '#f59e0b' : 'transparent',
              color: !isSignUp ? 'white' : '#6b7280',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              backgroundColor: isSignUp ? '#f59e0b' : 'transparent',
              color: isSignUp ? 'white' : '#6b7280',
              transition: 'all 0.2s'
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Sign Up Fields */}
          {isSignUp && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={isSignUp}
                  style={{
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={isSignUp}
                  style={{
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              {/* User Type Selection */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                  I am a:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setUserType('customer')}
                    style={{
                      padding: '12px',
                      border: `2px solid ${userType === 'customer' ? '#f59e0b' : '#e5e7eb'}`,
                      backgroundColor: userType === 'customer' ? '#fef3c7' : 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: userType === 'customer' ? '#92400e' : '#6b7280'
                    }}
                  >
                    🏠 Homeowner/Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('contractor')}
                    style={{
                      padding: '12px',
                      border: `2px solid ${userType === 'contractor' ? '#f59e0b' : '#e5e7eb'}`,
                      backgroundColor: userType === 'contractor' ? '#fef3c7' : 'white',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: userType === 'contractor' ? '#92400e' : '#6b7280'
                    }}
                  >
                    🔨 Professional/Contractor
                  </button>
                </div>
              </div>
            </>
          )}

          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#d1d5db' : (isAdmin && !isSignUp ? '#dc2626' : '#f59e0b'),
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
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
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <strong>Admin Credentials:</strong><br />
            Email: Kennen_02@icloud.com<br />
            Password: Kenan3477!
          </div>
        )}

        {/* Sign Up Benefits */}
        {isSignUp && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #e0f2fe'
          }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0369a1', fontSize: '14px' }}>✨ Member Benefits:</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', color: '#374151' }}>
              <li>Access to detailed job information</li>
              <li>Interactive map with exact locations</li>
              <li>Direct contact with project owners</li>
              <li>Apply to multiple jobs instantly</li>
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ color: '#f59e0b', textDecoration: 'none' }}>
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
