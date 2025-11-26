// Mensajes de error para Email
export const EMAIL_MESSAGES = {
    EMAIL_REQUIRED: 'El correo electrónico es requerido',
    EMAIL_INVALID: 'El correo electrónico no es válido',
    EMAIL_MAX_LENGTH: 'El correo electrónico no puede tener más de 255 caracteres',
  } as const;
  
  // Mensajes de error para Password
  export const PASSWORD_MESSAGES = {
    PASSWORD_REQUIRED: 'La contraseña es requerida',
    PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
    PASSWORD_MAX_LENGTH: 'La contraseña no puede tener más de 100 caracteres',
    PASSWORD_WEAK: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
    PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  } as const;
  
  // Mensajes de error para Name
  export const NAME_MESSAGES = {
    NAME_REQUIRED: 'El nombre es requerido',
    NAME_MIN_LENGTH: 'El nombre debe tener al menos 3 caracteres',
    NAME_MAX_LENGTH: 'El nombre no puede tener más de 50 caracteres',
    NAME_INVALID_CHARACTERS: 'El nombre solo puede contener letras y espacios',
  } as const;