// Core exports
export { apiClient } from './client';
export { ApiError } from './types';
export type { PaginationParams, PaginatedResponse } from './types';

// API Endpoints
export { authApi } from './endpoints/auth';
export { feedApi } from './endpoints/feed';
export { marketplaceApi } from './endpoints/marketplace';
export { creatorsApi } from './endpoints/creators';

// Development Mocks
export * as mockApi from './mock';