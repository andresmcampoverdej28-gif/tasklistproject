import { z } from 'zod';
import { PASSWORD_MESSAGES } from '../constants/error-messages';

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, PASSWORD_MESSAGES.PASSWORD_MIN_LENGTH)
    .max(100, PASSWORD_MESSAGES.PASSWORD_MAX_LENGTH)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      PASSWORD_MESSAGES.PASSWORD_WEAK
    )
    .trim(),
});

// Schema solo para el campo password (sin objeto wrapper)
export const passwordFieldSchema = z
  .string()
  .min(8, PASSWORD_MESSAGES.PASSWORD_MIN_LENGTH)
  .max(100, PASSWORD_MESSAGES.PASSWORD_MAX_LENGTH)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    PASSWORD_MESSAGES.PASSWORD_WEAK
  )
  .trim();

// Schema para confirmar contraseña
export const confirmPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: PASSWORD_MESSAGES.PASSWORD_MISMATCH,
  path: ['confirmPassword'],
});

// Tipos inferidos
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type PasswordField = z.infer<typeof passwordFieldSchema>;
export type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;