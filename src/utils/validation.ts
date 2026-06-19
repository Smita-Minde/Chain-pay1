import { z, ZodError } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const changePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const WalletAddresswithPercentValidation = z.object({
  addresses: z.array(
    z.object({
      address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid EVM address format'),
      percent: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage cannot exceed 100'),
    })
  ),
});

export const WalletAddressTronwithPercentValidation = z.object({
  addresses: z.array(
    z.object({
      address: z.string().regex(/^T[a-zA-Z0-9]{33}$/, 'Invalid TRON address format'),
      percent: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage cannot exceed 100'),
    })
  ),
});

export async function validateData(schema: any, data: any): Promise<[boolean, any]> {
  try {
    schema.parse(data);
    return [true, null];
  } catch (err: any) {
    if (err instanceof ZodError) {
      const errors: Record<string, string> = {};
      err.issues.forEach((e) => {
        if (e.path.length > 0) {
          errors[e.path[0].toString()] = e.message;
        }
      });
      return [false, errors];
    }
    return [false, { _errors: err.message }];
  }
}

export async function WalletvalidateData(schema: any, data: any): Promise<[boolean, any]> {
  try {
    schema.parse(data);
    return [true, null];
  } catch (err: any) {
    if (err instanceof ZodError) {
      const formattedError = {
        inner: err.issues.map((e) => {
          const path = e.path
            .map((p: any, i: number) => (typeof p === 'number' ? `[${p}]` : i > 0 ? `.${p}` : p))
            .join('');
          return {
            path,
            message: e.message,
          };
        }),
      };
      return [false, formattedError];
    }
    return [false, err];
  }
}

export function renderError(error: any): string {
  if (!error) return '';
  return typeof error === 'string' ? error : error.message || '';
}
