import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  validateData,
} from '@utils/validation';
import {
  postReq,
  showErrorMessage,
  removeAuthCookie,
  setAuthCookie,
  postReqWithoutToken,
} from '@utils/apiHandlers';

export interface LoginData {
  email?: string;
  password?: string;
  [key: string]: any;
}

export interface RegisterData {
  email?: string;
  password?: string;
  name?: string;
  [key: string]: any;
}

export interface ForgotPasswordData {
  email: string;
  [key: string]: any;
}

export interface ForgotPasswordCodeData {
  email: string;
  [key: string]: any;
}

export interface AuthOtpData {
  email?: string;
  password?: string;
  type?: string;
  onError?: (err: string) => void;
  [key: string]: any;
}

export interface ChangePasswordData {
  oldPassword?: string;
  newPassword?: string;
  [key: string]: any;
}

export interface ResetPasswordData {
  email?: string;
  code?: string;
  newPassword?: string;
  confirmPassword?: string;
  [key: string]: any;
}

export interface UseAuthReturn {
  logout: () => Promise<boolean | undefined>;
  login: (data: LoginData, redirectPath?: string) => Promise<any>;
  register: (data: RegisterData, redirectPath?: string) => Promise<any>;
  authOtp: (data: AuthOtpData) => Promise<any>;
  changePassword: (data: ChangePasswordData) => Promise<any>;
  sendForgotPasswordCode: (data: ForgotPasswordCodeData) => Promise<any[]>;
  sendForgotPassword: (data: ForgotPasswordData) => Promise<any[]>;
  resetPassword: (data: ResetPasswordData) => Promise<any[]>;
}

const getErrorMessage = (response: any): string => {
  if (!response) return 'Operation failed';
  if (response.error?.message) {
    return response.error.message;
  }
  if (Array.isArray(response.message)) {
    return response.message.join(', ');
  }
  if (typeof response.message === 'string' && response.message) {
    return response.message;
  }
  if (typeof response.error === 'string' && response.error) {
    return response.error;
  }
  return 'Operation failed';
};

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const navigate = (path: string) => router.push(path);

  const logout = useCallback(async (): Promise<boolean | undefined> => {
    try {
      await postReq('/auth/logout');
    } catch (e) {
      console.error(e);
    }
    removeAuthCookie();
    localStorage.removeItem('token');
    localStorage.removeItem('loginSuccessRoyalGame');
    localStorage.removeItem('registered_user');
    localStorage.removeItem('email');
    navigate('/login');
    toast.success('Logout Successfully');
    return true;
  }, [navigate]);

  const navigateAuthenticatedUser = useCallback((): void => {
    if (Object.prototype.hasOwnProperty.call(localStorage, 'lastUrl')) {
      // Turned off to enable new auth redirection
      // const lastUrl = localStorage.getItem('lastUrl');
      // localStorage.removeItem('lastUrl');
      // navigate(lastUrl);
      navigate('/home');
    } else {
      navigate('/home');
    }
    localStorage.setItem('newAuth', 'true');
  }, [navigate]);

  const login = useCallback(
    async (data: LoginData, redirectPath?: string): Promise<any> => {
      const [valid, error] = await validateData(loginSchema, data);
      if (error) return error;
      if (valid) {
        const response = await postReqWithoutToken('/auth/login', data);
        const token = response?.data?.accessToken || response?.accessToken || response?.tokens?.access?.token || response?.token;
        const isSuccess = response && response.status !== false && response.status !== 400 && response.status !== 500 && (response.status === true || response.status === 200 || response.status === 201 || !!token || !!response.user);
        
        if (isSuccess) {
          if (token) {
            setAuthCookie(token);
            localStorage.setItem('token', token);
            localStorage.setItem('loginSuccessRoyalGame', JSON.stringify(token));
          }
          if (data.email) {
            localStorage.setItem('registered_user', JSON.stringify({ email: data.email }));
            localStorage.setItem('email', data.email);
          }
          if (redirectPath) {
            window.location.href = redirectPath;
          } else {
            navigateAuthenticatedUser();
            window.location.reload();
          }
          toast.success('Welcome! You have successfully logged in');
          return null;
        } else {
          const errMsg = getErrorMessage(response);
          showErrorMessage(errMsg);
          return errMsg;
        }
      }
    },
    [navigateAuthenticatedUser],
  );

  const register = useCallback(
    async (data: RegisterData, redirectPath?: string): Promise<any> => {
      const [valid, error] = await validateData(registerSchema, data);
      console.log(valid, error);
      if (error) return [null, error];
      if (valid) {
        const { confirmPassword, ...registerPayload } = data;
        const response = await postReqWithoutToken('/auth/register', registerPayload);
        const token = response?.data?.accessToken || response?.accessToken || response?.tokens?.access?.token || response?.token;
        const isSuccess = response && response.status !== false && response.status !== 400 && response.status !== 500 && (response.status === true || response.status === 200 || response.status === 201 || !!token || !!response.user);
        
        if (isSuccess) {
          if (token) {
            setAuthCookie(token);
            localStorage.setItem('token', token);
            localStorage.setItem('loginSuccessRoyalGame', JSON.stringify(token));
          }
          if (data.email) {
            localStorage.setItem('registered_user', JSON.stringify({ email: data.email }));
            localStorage.setItem('email', data.email);
          }
          if (redirectPath) {
            window.location.href = redirectPath;
          } else {
            navigateAuthenticatedUser();
            window.location.reload();
          }
          toast.success('Welcome! You have successfully logged in');
          return [response.data || response, null];
        } else {
          const errMsg = getErrorMessage(response);
          showErrorMessage(errMsg);
          return [null, errMsg];
        }
      }
      return [null, 'Validation failed'];
    },
    [navigateAuthenticatedUser],
  );

  const sendForgotPassword = useCallback(async (data: ForgotPasswordData): Promise<any[]> => {
    const [valid, error] = await validateData(forgotPasswordSchema, {
      email: data.email,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReqWithoutToken('/auth/forgot-password', {
        email: data.email,
      });
      const isSuccess = response && 
        response.status !== false && 
        response.status !== 500 && 
        response.status !== 400 && 
        response.statusCode !== 400 && 
        response.statusCode !== 500 && 
        (response.email || response.data || response.status === true || response.status === 200 || response.status === 201);

      if (isSuccess) {
        return [response.data || response];
      } else {
        const errMsg = getErrorMessage(response);
        showErrorMessage(errMsg);
        return [null, errMsg];
      }
    }
    return [null];
  }, []);

  const sendForgotPasswordCode = useCallback(async (data: ForgotPasswordCodeData): Promise<any[]> => {
    const [valid, error] = await validateData(forgotPasswordSchema, {
      email: data.email,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReqWithoutToken('/auth/send-code', {
        email: data.email,
        type: 'email',
      });
      const isSuccess = response && 
        response.status !== false && 
        response.status !== 500 && 
        response.status !== 400 && 
        response.statusCode !== 400 && 
        response.statusCode !== 500 && 
        (response.email || response.data || response.status === true || response.status === 200 || response.status === 201);

      if (isSuccess) {
        return [response.data || response];
      } else {
        const errMsg = getErrorMessage(response);
        showErrorMessage(errMsg);
        return [null, errMsg];
      }
    }
    return [null];
  }, []);

  const authOtp = useCallback(async (data: AuthOtpData): Promise<any> => {
    const response = await postReqWithoutToken('/auth/send-code', {
      email: data?.email,
      password: data?.password,
      type: data?.type,
    });
    const isSuccess = response && 
      response.status !== false && 
      response.status !== 500 && 
      response.status !== 400 && 
      (response.email || response.data || response.status === true || response.status === 200 || response.status === 201);

    if (isSuccess) {
      return response.data || response;
    } else {
      const errorMsg = getErrorMessage(response);
      showErrorMessage(errorMsg);
      if (data?.onError) {
        data.onError(errorMsg);
      }
      return false;
    }
  }, []);

  const changePassword = useCallback(async (data: ChangePasswordData): Promise<any> => {
    const [valid, error] = await validateData(changePasswordSchema, data);

    if (error) return { error };
    if (valid) {
      const response = await postReq('admin/change-password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.status) {
        toast.success('Your Password has changed successfully');
        return { success: true };
      } else {
        const errMsg = getErrorMessage(response);
        showErrorMessage(errMsg);
        toast.error(errMsg);
      }
    }
    return [null];
  }, []);

  const resetPassword = useCallback(async (data: ResetPasswordData): Promise<any[]> => {
    try {
      const response = await postReqWithoutToken('/auth/reset-password', {
        email: data.email,
        code: data.code,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      if (response.status) {
        toast.success('Your password has been reset successfully');
        return [response.data, null];
      } else {
        const errMsg = getErrorMessage(response);
        showErrorMessage(errMsg);
        return [null, errMsg];
      }
    } catch (err) {
      const errMsg = getErrorMessage(err);
      showErrorMessage(errMsg);
      return [null, errMsg];
    }
  }, []);

  return {
    logout,
    login,
    register,
    authOtp,
    changePassword,
    sendForgotPasswordCode,
    sendForgotPassword,
    resetPassword,
  };
};

export default useAuth;
