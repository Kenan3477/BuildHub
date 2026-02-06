'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CreditsContextType {
  credits: number;
  setCredits: (credits: number) => void;
  spendCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  purchaseCredits: (creditPackage: CreditPackage) => Promise<boolean>;
  unlockedJobs: Set<number>;
  unlockJob: (jobId: number) => boolean;
  isJobUnlocked: (jobId: number) => boolean;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number; // in GBP
  popular?: boolean;
  savings?: string;
}

// Competitive pricing - cheaper than competitors but profitable
export const creditPackages: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 100,
    price: 9.99,
    savings: ''
  },
  {
    id: 'professional',
    name: 'Professional',
    credits: 250,
    price: 19.99,
    popular: true,
    savings: '20% OFF'
  },
  {
    id: 'business',
    name: 'Business',
    credits: 500,
    price: 34.99,
    savings: '30% OFF'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: 1000,
    price: 59.99,
    savings: '40% OFF'
  }
];

// Job unlock costs
export const UNLOCK_COSTS = {
  basic_job: 5,      // Basic residential jobs
  premium_job: 10,   // Commercial or high-value jobs  
  emergency_job: 15, // Urgent/emergency jobs
  exclusive_job: 25  // Exclusive high-end projects
};

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

interface CreditsProviderProps {
  children: ReactNode;
}

export const CreditsProvider: React.FC<CreditsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(user?.credits || 0);
  const [unlockedJobs, setUnlockedJobs] = useState<Set<number>>(new Set());

  const spendCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount: number): void => {
    setCredits(prev => prev + amount);
  };

  const purchaseCredits = async (creditPackage: CreditPackage): Promise<boolean> => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call payment API
      addCredits(creditPackage.credits);
      
      return true;
    } catch (error) {
      console.error('Purchase failed:', error);
      return false;
    }
  };

  const unlockJob = (jobId: number): boolean => {
    // Determine unlock cost based on job type
    const cost = UNLOCK_COSTS.basic_job; // Default cost, can be dynamic
    
    if (spendCredits(cost)) {
      setUnlockedJobs(prev => {
        const newSet = new Set(prev);
        newSet.add(jobId);
        return newSet;
      });
      return true;
    }
    return false;
  };

  const isJobUnlocked = (jobId: number): boolean => {
    return unlockedJobs.has(jobId);
  };

  return (
    <CreditsContext.Provider
      value={{
        credits,
        setCredits,
        spendCredits,
        addCredits,
        purchaseCredits,
        unlockedJobs,
        unlockJob,
        isJobUnlocked
      }}
    >
      {children}
    </CreditsContext.Provider>
  );
};