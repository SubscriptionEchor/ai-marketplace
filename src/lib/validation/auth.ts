export interface ValidationError {
  field: string;
  message: string;
}

export function validateProfile(data: {
  name: string;
  email: string;
  phone: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }

  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  // Phone is optional, but validate format if provided
  if (data.phone && !/^\+?[\d\s-()]+$/.test(data.phone)) {
    errors.push({ field: 'phone', message: 'Invalid phone format' });
  }

  return errors;
}