import { useAppTheme } from '@/lib/hooks/useAppTheme';
import { registerSchema, type RegisterSchema } from '@/lib/schemas/auth.schema';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface RegisterProps {
  onNavigateToLogin: () => void
  onRegister: () => void
}

const Register = ({ onNavigateToLogin, onRegister }: RegisterProps) => {
  const { currentTheme } = useAppTheme();
  
  const [formData, setFormData] = useState<RegisterSchema>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Partial<RegisterSchema>>({});

  const handleInputChange = (field: keyof RegisterSchema, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = () => {
    // Usar safeParse para validar
    const result = registerSchema.safeParse(formData);
    
    if (result.success) {
      // Si la validación pasa, limpiar errores y proceder
      setErrors({});
      console.log('Datos válidos:', formData);
      onRegister();
    } else {
      // Si hay errores de validación, mostrarlos
      const newErrors: Partial<RegisterSchema> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterSchema;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
    }
  };

  // Función para determinar color de texto contrastante
  const getContrastTextColor = (backgroundColor: string) => {
    return currentTheme.id === 'dark' || currentTheme.id === 'brawlstars' ? '#FFFFFF' : '#000000';
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.header}>
        <Ionicons name="checkbox-outline" size={72} color={currentTheme.primary} />
        <Text style={[styles.title, { color: currentTheme.text }]}>Crear Cuenta</Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Únete a Tasklist y organiza tu vida</Text>
      </View>

      <View style={styles.form}>
        {/* Campo Nombre */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Nombre completo</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: errors.name ? currentTheme.error : currentTheme.divider,
              borderWidth: errors.name ? 2 : 1,
            }
          ]}>
            <Ionicons 
              name="person-outline" 
              size={20} 
              color={errors.name ? currentTheme.error : currentTheme.textSecondary} 
              style={styles.inputIcon} 
            />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="Tu nombre"
              placeholderTextColor={currentTheme.textSecondary}
              autoCapitalize="words"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>
          {errors.name && (
            <Text style={[styles.errorText, { color: currentTheme.error }]}>
              {errors.name}
            </Text>
          )}
        </View>

        {/* Campo Email */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Correo electrónico</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: errors.email ? currentTheme.error : currentTheme.divider,
              borderWidth: errors.email ? 2 : 1,
            }
          ]}>
            <Ionicons 
              name="mail-outline" 
              size={20} 
              color={errors.email ? currentTheme.error : currentTheme.textSecondary} 
              style={styles.inputIcon} 
            />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="tu@email.com"
              placeholderTextColor={currentTheme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          {errors.email && (
            <Text style={[styles.errorText, { color: currentTheme.error }]}>
              {errors.email}
            </Text>
          )}
        </View>

        {/* Campo Contraseña */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Contraseña</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: errors.password ? currentTheme.error : currentTheme.divider,
              borderWidth: errors.password ? 2 : 1,
            }
          ]}>
            <Ionicons 
              name="lock-closed-outline" 
              size={20} 
              color={errors.password ? currentTheme.error : currentTheme.textSecondary} 
              style={styles.inputIcon} 
            />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor={currentTheme.textSecondary}
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
            />
          </View>
          {errors.password && (
            <Text style={[styles.errorText, { color: currentTheme.error }]}>
              {errors.password}
            </Text>
          )}
        </View>

        {/* Campo Confirmar Contraseña */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Confirmar contraseña</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: errors.confirmPassword ? currentTheme.error : currentTheme.divider,
              borderWidth: errors.confirmPassword ? 2 : 1,
            }
          ]}>
            <Ionicons 
              name="lock-closed-outline" 
              size={20} 
              color={errors.confirmPassword ? currentTheme.error : currentTheme.textSecondary} 
              style={styles.inputIcon} 
            />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="Repite tu contraseña"
              placeholderTextColor={currentTheme.textSecondary}
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={[styles.errorText, { color: currentTheme.error }]}>
              {errors.confirmPassword}
            </Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, { backgroundColor: currentTheme.primary }]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.registerButtonText, { color: getContrastTextColor(currentTheme.primary) }]}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: currentTheme.divider }]} />
          <Text style={[styles.dividerText, { color: currentTheme.textSecondary }]}>O</Text>
          <View style={[styles.dividerLine, { backgroundColor: currentTheme.divider }]} />
        </View>

        <TouchableOpacity style={[
          styles.googleButton, 
          { 
            backgroundColor: currentTheme.surface, 
            borderColor: currentTheme.divider 
          }
        ]}>
          <Ionicons name="logo-google" size={20} color={currentTheme.text} style={styles.googleIcon} />
          <Text style={[styles.googleButtonText, { color: currentTheme.text }]}>Registrarse con Google</Text>
        </TouchableOpacity>

        <View style={styles.terms}>
          <Text style={[styles.termsText, { color: currentTheme.textSecondary }]}>
            Al registrarte, aceptas vender tu{' '}
            <Text style={[styles.termsLink, { color: currentTheme.primary }]}>ALMA</Text>
            {' '}a{' '}
            <Text style={[styles.termsLink, { color: currentTheme.primary }]}>XimenchOf</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: currentTheme.textSecondary }]}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={[styles.loginText, { color: currentTheme.primary }]}>Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500',
  },
  registerButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Register;