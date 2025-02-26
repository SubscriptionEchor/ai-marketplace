import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData, Preferences } from '@/lib/types';

export function useAuth() {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    username: '',
    email: '',
    phone: ''
  });
  const [preferences, setPreferences] = useState<Preferences>({
    aiModels: false,
    dataScience: false,
    blockchain: false,
    automation: false,
    nlp: false,
    computerVision: false,
    robotics: false
  });

  const handleNextStep = useCallback(async () => {
    if (currentStep === 3) {
      setIsLoading(true);
      let timeout: NodeJS.Timeout;
      try {
        // Simulate API call
        await new Promise(resolve => {
          timeout = setTimeout(resolve, 2000);
          timeoutRef.current = timeout;
        });
        navigate('/dashboard/home');
      } catch (error) {
        console.error('Error during account creation:', error);
      } finally {
        setIsLoading(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = undefined;
        }
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, navigate]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return {
    termsAccepted,
    setTermsAccepted,
    isCreateAccount,
    setIsCreateAccount,
    isLoading,
    currentStep,
    profileData,
    setProfileData,
    preferences,
    setPreferences,
    handleNextStep
  };
}