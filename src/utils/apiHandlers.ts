import { toast } from 'sonner';

const getBaseUrl = () => {
  // Can be API_URL or NEXT_PUBLIC_API_URL
  const envUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    try {
      const url = new URL(envUrl);
      return url.origin;
    } catch (e) {
      return 'https://staging-api.chainpay.biz';
    }
  }
  return 'https://staging-api.chainpay.biz';
};

const BASE_URL = getBaseUrl();

const isSandboxOffline = () => {
  return process.env.NEXT_PUBLIC_MOCK_AUTH === 'true';
};

const handleAuthMock = (url: string, data?: any) => {
  if (!isSandboxOffline()) return null;

  if (url === '/auth/logout') {
    return { status: true };
  }
  if (url === '/auth/login' || url === '/auth/register') {
    const email = data?.email || 'merchant@gmail.com';
    let mockToken = 'mock-session-token-' + Math.random().toString(36).substr(2);
    try {
      const payloadObj = { email };
      const payloadBase64 = typeof window !== 'undefined'
        ? window.btoa(JSON.stringify(payloadObj))
        : Buffer.from(JSON.stringify(payloadObj)).toString('base64');
      mockToken = `header.${payloadBase64}.signature`;
    } catch (e) {
      console.error(e);
    }
    return {
      status: true,
      accessToken: mockToken,
      user: { email, name: data?.name || 'Merchant' }
    };
  }
  if (url === '/auth/send-code') {
    const email = data?.email || 'merchant@gmail.com';
    let mockToken = 'mock-session-token';
    try {
      const payloadObj = { email };
      const payloadBase64 = typeof window !== 'undefined'
        ? window.btoa(JSON.stringify(payloadObj))
        : Buffer.from(JSON.stringify(payloadObj)).toString('base64');
      mockToken = `header.${payloadBase64}.signature`;
    } catch (e) { }
    return {
      status: true,
      email,
      accessToken: mockToken,
      data: {
        sentAt: new Date().toISOString(),
        timeout: 120000
      }
    };
  }
  if (url === '/auth/forgot-password' || url === '/auth/reset-password') {
    return {
      status: true,
      data: {
        sentAt: new Date().toISOString(),
        timeout: 120000
      }
    };
  }
  return null;
};

const getStoredAuthToken = () => {
  if (typeof window === 'undefined') return null;
  const directToken = localStorage.getItem('auth_token') || localStorage.getItem('token');
  if (directToken) return directToken;
  const raw = localStorage.getItem('loginSuccessRoyalGame');
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return null;
};

export async function postReq(url: string, data?: any): Promise<any> {
  const mockResponse = handleAuthMock(url, data);
  if (mockResponse) return mockResponse;

  try {
    const token = getStoredAuthToken();
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}

export async function postReqWithoutToken(url: string, data?: any): Promise<any> {
  const mockResponse = handleAuthMock(url, data);
  if (mockResponse) return mockResponse;

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}

export function showErrorMessage(error: any) {
  let message = 'Operation failed';
  if (typeof error === 'string') {
    message = error;
  } else if (error) {
    if (Array.isArray(error.message)) {
      message = error.message.join(', ');
    } else if (typeof error.message === 'string' && error.message) {
      message = error.message;
    } else if (typeof error.error === 'string' && error.error) {
      message = error.error;
    }
  }
  toast.error(message);
}

export function removeAuthCookie() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('loginSuccessRoyalGame');
  }
}

export function setAuthCookie(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token', token);
  }
}

export async function getReq(url: string): Promise<any> {
  if (isSandboxOffline()) {
    if (url.includes('/user') || url.includes('/profile') || url.includes('/me') || url.includes('/admin')) {
      return {
        status: true,
        data: {
          email: 'mindesmita30@gmail.com',
          name: 'Merchant User',
          role: 'merchant'
        }
      };
    }
  }

  try {
    const token = getStoredAuthToken();
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}

