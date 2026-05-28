# دليل معالجة الأخطاء العامة (Global Error Handling)

## 📋 نظرة عامة

تم تحسين معالجة الأخطاء في المشروع بإضافة **Response Interceptor** موحد لـ Axios. هذا يعني أن جميع أخطاء الـ API سيتم معالجتها بشكل مركزي دون الحاجة لكتابة `try/catch` في كل مكان.

---

## 🎯 أكواد الأخطاء المعالجة

### ✅ 401 - Unauthorized (غير مصرح)
- **الوصف:** المستخدم لم يقم بتسجيل الدخول أو انتهت صلاحية الـ Token
- **الإجراء:** 
  - مسح الجلسة (`clearSession`)
  - تسجيل الخطأ في Console
  - إعادة التوجيه إلى صفحة تسجيل الدخول (`/login`)

### 🚫 403 - Forbidden (ممنوع)
- **الوصف:** المستخدم لا يملك صلاحيات كافية للوصول إلى المورد
- **الإجراء:**
  - تسجيل الخطأ في Console
  - يمكن إضافة Toast Notification في المستقبل

### ⚠️ 5xx - Server Error (خطأ في الخادم)
- **الوصف:** حدث خطأ على جانب الخادم
- **الإجراء:**
  - تسجيل الخطأ مع الكود (500, 502, إلخ)
  - يمكن إضافة Toast Notification في المستقبل

### 🔗 أخطاء أخرى (Network Errors)
- **الوصف:** مشاكل اتصال أو أخطاء غير متوقعة
- **الإجراء:**
  - تسجيل الخطأ في Console

---

## 📁 الملفات المحدثة

### 1. `src/modules/shared/api/httpClient.ts` ⭐ (الملف الرئيسي)
الـ Interceptor الرئيسي المستخدم في التطبيق.

```typescript
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const errorMessage = (error.response?.data as Record<string, unknown>)?.message || error.message;

    if (status === 401) {
      console.error('❌ [401]:', errorMessage);
      useAuthStore.getState().clearSession();
      window.location.href = '/login';
    }
    else if (status === 403) {
      console.error('❌ [403]:', errorMessage);
    }
    else if (status && status >= 500) {
      console.error(`❌ [${status}]`, errorMessage);
    }

    return Promise.reject(error);
  }
);
```

### 2. `src/shared/api/client.ts` (Backup Instance)
نفس الـ Interceptor مع بعض الاختلافات البسيطة.

### 3. `src/modules/shared/api/axiosInstance.ts` (Backup Instance)
نفس الـ Interceptor مع بعض الاختلافات البسيطة.

---

## 🔄 كيفية استخدام الـ API

### ✅ الطريقة الموصى بها (مع Error Handling Automatic)

```typescript
// في authService.ts
export const authService = {
  signIn: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await httpClient.post<AuthResponse>('/auth/login', payload);
    return data; // لا حاجة للـ try/catch هنا
  },
};
```

### 📝 في Components/Hooks

```typescript
// في useAuth.ts
const loginMutation = useMutation({
  mutationFn: authService.signIn,
  onSuccess: (data) => {
    setSession(data.user, data.accessToken);
    navigate({ to: '/dashboard' });
  },
  // Error handling تلقائي عبر Interceptor
});
```

### ⚠️ إذا كنت تريد معالجة أخطاء محددة

```typescript
const loginMutation = useMutation({
  mutationFn: authService.signIn,
  onError: (error: AxiosError) => {
    if (error.response?.status === 401) {
      // معالجة خاصة
    }
  },
});
```

---

## 🧪 الاختبار

### اختبار 401
```bash
# محاكاة رد Server بـ 401
const mockResponse = {
  response: {
    status: 401,
    data: { message: 'Token expired' }
  }
};
// سيتم تسجيل الدخول تلقائياً وتوجيه المستخدم للـ Login
```

### اختبار 403
```bash
# محاكاة رد Server بـ 403
const mockResponse = {
  response: {
    status: 403,
    data: { message: 'Permission denied' }
  }
};
// سيتم تسجيل الخطأ في Console
```

### اختبار 500
```bash
# محاكاة رد Server بـ 500
const mockResponse = {
  response: {
    status: 500,
    data: { message: 'Internal server error' }
  }
};
// سيتم تسجيل الخطأ مع الكود 500
```

---

## 🚀 التحسينات المستقبلية

### 1. إضافة Toast Notifications
```typescript
import toast from 'react-hot-toast';

if (status === 403) {
  console.error('❌ [403]:', errorMessage);
  toast.error('ليس لديك صلاحيات للقيام بهذه العملية');
}
```

### 2. إضافة Retry Logic
```typescript
import axios from 'axios';

httpClient.interceptors.response.use(
  response => response,
  async error => {
    // إعادة محاولة الطلب بعد عدة ثوانٍ
    return axios.get(error.config.url);
  }
);
```

### 3. إضافة Request Timeout
```typescript
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // 5 ثوانٍ
});
```

### 4. تتبع الأخطاء (Error Tracking)
```typescript
if (status && status >= 500) {
  // إرسال الخطأ إلى Sentry أو خدمة مشابهة
  reportError(error);
}
```

---

## 📊 Flow Diagram

```
HTTP Request
    ↓
Request Interceptor (إضافة Token)
    ↓
API Server
    ↓
Response Interceptor (معالجة الأخطاء)
    ↓
✅ Success → تمرير الـ Response للـ Component
❌ Error:
   - 401 → Clear Session + Navigate to /login
   - 403 → Log Error + (Optional) Toast
   - 5xx → Log Error + (Optional) Toast
   - Other → Log Error
```

---

## 🎓 أفضل الممارسات

1. **لا تضع try/catch حول كل API call** - الـ Interceptor سيتولى ذلك
2. **استخدم React Query/SWR** لإدارة الحالة وإعادة المحاولة التلقائية
3. **سجل الأخطاء بشكل واضح** مع أكواز الحالة
4. **أضف معرفات فريدة للأخطاء** لتتبعها بسهولة
5. **لا تعرض رسائل الخطأ الخام** - قم بتنسيقها للمستخدم

---

## ✅ الحالة الحالية

- ✅ تم إضافة Response Interceptor لـ 401, 403, 5xx
- ✅ تم إضافة console.error مع تنسيق واضح
- ✅ تم إضافة comments في الكود
- ✅ تم تحديث جميع Axios Instances الثلاثة
- ⏳ جاهز لإضافة Toast Notifications عند الحاجة
- ⏳ جاهز لإضافة Error Tracking (Sentry) عند الحاجة

---

**آخر تحديث:** 2025-05-28
