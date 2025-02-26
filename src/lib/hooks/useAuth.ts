import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileData, Preferences } from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, navigate]);

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