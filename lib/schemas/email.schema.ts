import { EMAIL_MESSAGES } from '@/lib/constants/error-messages';
import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, EMAIL_MESSAGES.EMAIL_REQUIRED)
    .email(EMAIL_MESSAGES.EMAIL_INVALID)
    .max(255, EMAIL_MESSAGES.EMAIL_MAX_LENGTH)
    .toLowerCase()
    .trim(),
});

// Schema solo para el campo email (sin objeto wrapper)
export const emailFieldSchema = z
  .string()
  .min(1, EMAIL_MESSAGES.EMAIL_REQUIRED)
  .email(EMAIL_MESSAGES.EMAIL_INVALID)
  .max(255, EMAIL_MESSAGES.EMAIL_MAX_LENGTH)
  .toLowerCase()
  .trim();

// Tipos inferidos
export type EmailSchema = z.infer<typeof emailSchema>;
export type EmailField = z.infer<typeof emailFieldSchema>;