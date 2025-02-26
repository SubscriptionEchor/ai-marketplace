// Common types used across components
export interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

export interface Preferences {
  aiModels: boolean;
  dataScience: boolean;
  blockchain: boolean;
  automation: boolean;
  nlp: boolean;
  computerVision: boolean;
  robotics: boolean;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  onContinue?: () => void;
  preventOutsideClick?: boolean;
  title: string;
  children: React.ReactNode;
}