// App-wide configuration constants
export const APP_CONFIG = {
  API_BASE_URL: '/api',
  ITEMS_PER_PAGE: 25,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  DEFAULT_AVATAR: 'https://ui-avatars.com/api/?background=6366F1&color=fff'
} as const;

// Re-export all constants
export * from './preferences';
export * from './feed';
export * from './share';