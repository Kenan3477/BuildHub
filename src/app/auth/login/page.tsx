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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${isAdmin ? 'bg-red-600' : 'bg-amber-500'} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
              {isAdmin ? '🛡️' : '🏗️'}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Join BuildHub' : (isAdmin ? 'Admin Access' : 'Welcome Back')}
            </h1>
            
            <p className="text-gray-600">
              {isSignUp 
                ? 'Create your account to access construction jobs' 
                : (isAdmin ? 'Administrative Dashboard Access' : 'Sign in to BuildHub')
              }
            </p>

            {isAdmin && !isSignUp && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-sm text-amber-800">
                🔐 <strong>Admin Mode Detected</strong>
              </div>
            )}
          </div>

          {/* Sign Up / Sign In Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isSignUp 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isSignUp 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="space-y-5 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={isSignUp}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={isSignUp}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
                
                {/* User Type Selection */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    I am a:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('customer')}
                      className={`p-3 border-2 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
                        userType === 'customer' 
                          ? 'border-amber-500 bg-amber-50 text-amber-800' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      🏠 Homeowner/Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('contractor')}
                      className={`p-3 border-2 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
                        userType === 'contractor' 
                          ? 'border-amber-500 bg-amber-50 text-amber-800' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      🔨 Professional/Contractor
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
              />
              
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : isAdmin && !isSignUp 
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-amber-500 hover:bg-amber-600 shadow-lg hover:shadow-xl'
              }`}
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
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
              <strong>Admin Credentials:</strong><br />
              Email: Kennen_02@icloud.com<br />
              Password: Kenan3477!
            </div>
          )}

          {/* Sign Up Benefits */}
          {isSignUp && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">✨ Member Benefits:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Access to detailed job information</li>
                <li>• Interactive map with exact locations</li>
                <li>• Direct contact with project owners</li>
                <li>• Apply to multiple jobs instantly</li>
              </ul>
            </div>
          )}

          <div className="text-center mt-6">
            <a href="/" className="text-amber-500 hover:text-amber-600 font-medium transition-colors">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
