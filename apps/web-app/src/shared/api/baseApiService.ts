/**
 * Base API Service with unified request/response handling
 * تم تعديل الكلاس ليكون متوافقاً مع إعدادات المشروع (erasableSyntaxOnly)
 */

import client from './client';
import type { AxiosError } from 'axios';

// ==================== Response Wrapper ====================

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// ==================== Error Handler ====================

export class ApiError extends Error {
  // تعريف الخصائص يدوياً لتجنب خطأ Parameter Properties
  public statusCode: number;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }

  static from(error: AxiosError): ApiError {
    if (error.response) {
      return new ApiError(
        error.response.status,
        typeof error.response.statusText === 'string' 
            ? error.response.statusText 
            : 'Unknown error',
        error.response.data
      );
    }

    return new ApiError(
      0,
      error.message || 'Network error'
    );
  }
}

// ==================== Base Service Methods ====================

export class BaseApiService {
  protected baseUrl = '';

  async get<T>(endpoint: string): Promise<T> {
    try {
      const { data } = await client.get<T>(endpoint);
      return data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  async post<T>(endpoint: string, payload: unknown): Promise<T> {
    try {
      const { data } = await client.post<T>(endpoint, payload);
      return data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  async put<T>(endpoint: string, payload: unknown): Promise<T> {
    try {
      const { data } = await client.put<T>(endpoint, payload);
      return data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  async patch<T>(endpoint: string, payload: unknown): Promise<T> {
    try {
      const { data } = await client.patch<T>(endpoint, payload);
      return data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const { data } = await client.delete<T>(endpoint);
      return data;
    } catch (error) {
      throw ApiError.from(error as AxiosError);
    }
  }
}

// ==================== Utility: Add delay for mock data ====================

export const addDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));