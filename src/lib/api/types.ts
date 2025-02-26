// Common API types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  hasMore: boolean;
  nextCursor?: string;
  total: number;
}

// Error handling types
export class ApiError extends Error {
  code: string;
  status: number;

  constructor({ message, code, status }: { message: string; code: string; status: number }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}