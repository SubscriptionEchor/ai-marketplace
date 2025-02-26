import type { PaginationParams } from './types';
import { ApiError } from './types';

const API_BASE_URL = '/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError({
        message: data.message || 'An error occurred',
        code: data.code || 'UNKNOWN_ERROR',
        status: response.status,
      });
    }

    return data;
  }

  get<T>(endpoint: string, params?: PaginationParams | Record<string, string>) {
    const url = params
      ? `${endpoint}?${new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)]))}`
      : endpoint;
    return this.request<T>(url);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();