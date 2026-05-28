/**
 * Example Test File for Global Error Handling Interceptors
 * يمكنك استخدام هذا الملف للاختبار المحلي والتطوير
 */

import httpClient from '../src/modules/shared/api/httpClient';
import type { AxiosError } from 'axios';

// ==================== اختبارات يدوية ====================

/**
 * اختبار معالجة 401 (Unauthorized)
 * ✅ يجب: تسجيل الخطأ + مسح الجلسة + التوجيه للـ login
 */
export async function test401Error() {
  try {
    // محاكاة طلب يرجع 401
    await httpClient.get('/protected-endpoint-with-expired-token');
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('❌ 401 Error Test:', {
      status: axiosError.response?.status,
      message: axiosError.message,
    });
    // يجب أن ترى في الكونسول:
    // ❌ [401] غير مصرح - يرجى تسجيل الدخول
  }
}

/**
 * اختبار معالجة 403 (Forbidden)
 * ✅ يجب: تسجيل الخطأ فقط (بدون توجيه)
 */
export async function test403Error() {
  try {
    // محاكاة طلب يرجع 403
    await httpClient.get('/admin-only-endpoint');
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('❌ 403 Error Test:', {
      status: axiosError.response?.status,
      message: axiosError.message,
    });
    // يجب أن ترى في الكونسول:
    // ❌ [403] ممنوع - ليس لديك صلاحيات
  }
}

/**
 * اختبار معالجة 500 (Server Error)
 * ✅ يجب: تسجيل الخطأ مع كود الحالة
 */
export async function test500Error() {
  try {
    // محاكاة طلب يرجع 500
    await httpClient.get('/broken-endpoint');
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('❌ 500 Error Test:', {
      status: axiosError.response?.status,
      message: axiosError.message,
    });
    // يجب أن ترى في الكونسول:
    // ❌ [500] خطأ في الخادم
  }
}

/**
 * اختبار معالجة Network Error
 * ✅ يجب: تسجيل خطأ الشبكة
 */
export async function testNetworkError() {
  try {
    // محاكاة خطأ شبكة (لا يوجد اتصال)
    await httpClient.get('http://invalid-host-that-does-not-exist.local');
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('❌ Network Error Test:', {
      message: axiosError.message,
    });
    // يجب أن ترى في الكونسول:
    // ⚠️ [خطأ] شبكة أو خطأ آخر
  }
}

/**
 * اختبار النجاح (2xx)
 * ✅ يجب: تمرير الـ Response مباشرة بدون معالجة خطأ
 */
export async function testSuccessRequest() {
  try {
    const response = await httpClient.get('/health-check');
    console.log('✅ Success Test:', response.data);
  } catch (error) {
    console.log('❌ Unexpected error:', error);
  }
}

// ==================== اختبارات Mock ====================

/**
 * استخدم هذه الدالة لمحاكاة أخطاء في البيئة التطويرية
 * 
 * مثال الاستخدام في Component:
 * ```tsx
 * import { simulateError } from './tests/errorHandlingTests';
 * 
 * export function TestComponent() {
 *   return (
 *     <div>
 *       <button onClick={() => simulateError(401)}>
 *         Test 401 Error
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function simulateError(statusCode: number) {
  const mockError: AxiosError = {
    config: {} as any,
    code: String(statusCode),
    isAxiosError: true,
    toJSON: () => ({}),
    message: `Simulated ${statusCode} error`,
    name: 'AxiosError',
    response: {
      status: statusCode,
      statusText: getStatusText(statusCode),
      data: { message: `Simulated error: ${statusCode}` },
      config: {} as any,
      headers: {},
    },
  };

  console.log(`🧪 Simulating ${statusCode} error...`);
  // معالجة الخطأ عبر الـ Interceptor
  throw mockError;
}

/**
 * دالة مساعدة للحصول على وصف كود الحالة
 */
function getStatusText(status: number): string {
  const statusTexts: Record<number, string> = {
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };
  return statusTexts[status] || 'Unknown Error';
}

// ==================== مثال على استخدام في Component ====================

/**
 * مثال لـ Component يستخدم معالجة الأخطاء
 */
export function ExampleComponentWithErrorHandling() {
  const handleTest = async (statusCode: number) => {
    try {
      simulateError(statusCode);
    } catch (error) {
      // الـ Interceptor تولى معالجة الخطأ
      // هنا يمكنك إضافة معالجة إضافية إذا احتجت
      console.log('Component caught error:', error);
    }
  };

  return (
    <div>
      <h2>Error Handling Test</h2>
      <button onClick={() => handleTest(401)}>Test 401</button>
      <button onClick={() => handleTest(403)}>Test 403</button>
      <button onClick={() => handleTest(500)}>Test 500</button>
    </div>
  );
}

// ==================== معلومات مفيدة ====================

/**
 * خريطة أكواز الأخطاء الشائعة:
 * 
 * 4xx (Client Errors):
 * - 400: Bad Request
 * - 401: Unauthorized (غير مصرح)
 * - 403: Forbidden (ممنوع)
 * - 404: Not Found (غير موجود)
 * - 409: Conflict (تعارض)
 * - 422: Unprocessable Entity
 * 
 * 5xx (Server Errors):
 * - 500: Internal Server Error (خطأ داخلي)
 * - 502: Bad Gateway
 * - 503: Service Unavailable
 * - 504: Gateway Timeout
 */

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;
