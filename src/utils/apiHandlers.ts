import { toast } from 'sonner';

const getBaseUrl = () => {
  // Can be API_URL or NEXT_PUBLIC_API_URL
  const envUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    try {
      const url = new URL(envUrl);
      return url.origin;
    } catch (e) {
      return 'https://sandbox-api.chainpay.biz';
    }
  }
  return 'https://sandbox-api.chainpay.biz';
};

const BASE_URL = getBaseUrl();

export async function postReq(url: string, data?: any): Promise<any> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
  const message = typeof error === 'string' ? error : (error?.message || 'Operation failed');
  toast.error(message);
}

export function removeAuthCookie() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export function setAuthCookie(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}
