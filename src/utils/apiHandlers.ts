import { toast } from 'sonner';

const getBaseUrl = () => {
  const envUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    try {
      const url = new URL(envUrl.trim());
      return url.origin;
    } catch (e) {
      return 'https://staging-api.chainpay.biz';
    }
  }
  return 'https://staging-api.chainpay.biz';
};

const BASE_URL = getBaseUrl();

const formatUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

export const getStoredAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  const directToken = localStorage.getItem('auth_token') || localStorage.getItem('token');
  if (directToken) {
    try {
      return JSON.parse(directToken);
    } catch {
      return directToken;
    }
  }
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

export function setAuthCookie(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('token', token);
    localStorage.setItem('loginSuccessRoyalGame', JSON.stringify(token));
  }
}

export function removeAuthCookie() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('loginSuccessRoyalGame');
    localStorage.removeItem('registered_user');
    localStorage.removeItem('email');
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
    } else if (error.error?.message) {
      message = typeof error.error.message === 'string' ? error.error.message : JSON.stringify(error.error.message);
    } else if (error.data?.message) {
      message = error.data.message;
    }
  }
  toast.error(message);
}

export async function postReq(url: string, data?: any): Promise<any> {
  try {
    const token = getStoredAuthToken();
    const endpoint = formatUrl(url);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}

export async function postReqWithoutToken(url: string, data?: any): Promise<any> {
  try {
    const endpoint = formatUrl(url);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}

export async function getReq(url: string): Promise<any> {
  try {
    const token = getStoredAuthToken();
    const endpoint = formatUrl(url);
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });
    const result = await response.json().catch(() => ({}));
    return result;
  } catch (error: any) {
    showErrorMessage(error.message || 'Something went wrong');
    return { status: false, error };
  }
}
