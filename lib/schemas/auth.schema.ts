import { z } from 'zod';
import { emailSchema } from './email.schema';
import { passwordSchema } from './password.schema';
import { nameSchema } from './name.schema';
import { confirmPasswordSchema } from './password.schema';

// Schema para Login
export const loginSchema = z.object({
  ...emailSchema.shape,
  ...passwordSchema.shape,
});

// Schema para Register
export const registerSchema = z.object({
  ...nameSchema.shape,
  ...emailSchema.shape,
  ...passwordSchema.shape,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Tipos inferidos
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;