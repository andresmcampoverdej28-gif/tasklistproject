import { z } from 'zod';
import { NAME_MESSAGES } from '../constants/error-messages';

export const nameSchema = z.object({
  name: z
    .string()
    .min(3, NAME_MESSAGES.NAME_MIN_LENGTH)
    .max(50, NAME_MESSAGES.NAME_MAX_LENGTH)
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      NAME_MESSAGES.NAME_INVALID_CHARACTERS
    )
    .trim(),
});

// Schema solo para el campo name (sin objeto wrapper)
export const nameFieldSchema = z
  .string()
  .min(3, NAME_MESSAGES.NAME_MIN_LENGTH)
  .max(50, NAME_MESSAGES.NAME_MAX_LENGTH)
  .regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    NAME_MESSAGES.NAME_INVALID_CHARACTERS
  )
  .trim();

// Tipos inferidos
export type NameSchema = z.infer<typeof nameSchema>;
export type NameField = z.infer<typeof nameFieldSchema>;