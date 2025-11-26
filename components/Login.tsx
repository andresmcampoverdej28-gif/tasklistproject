import { useAppTheme } from '@/lib/hooks/useAppTheme'
import { loginSchema, type LoginSchema } from '@/lib/schemas/auth.schema'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface LoginProps {
  onNavigateToRegister: () => void
  onLogin: () => void
}

const Login = ({ onNavigateToRegister, onLogin }: LoginProps) => {
  const { currentTheme } = useAppTheme()
  const [formData, setFormData] = useState<LoginSchema>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<LoginSchema>>({})

  const handleInputChange = (field: keyof LoginSchema, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleSubmit = () => {
    // Usar safeParse en lugar de parse para manejar errores mejor
    const result = loginSchema.safeParse(formData)
    
    if (result.success) {
      // Si la validación pasa, limpiar errores y proceder
      setErrors({})
      console.log('Datos válidos:', formData)
      onLogin()
    } else {
      // Si hay errores de validación, mostrarlos
      const newErrors: Partial<LoginSchema> = {}
      result.error.issues.forEach((issue) => { // Cambié "errors" por "issues"
        const field = issue.path[0] as keyof LoginSchema
        newErrors[field] = issue.message
      })
      setErrors(newErrors)
    }
  }

  // Función para determinar color de texto contrastante
  const getContrastTextColor = (backgroundColor: string) => {
    return currentTheme.id === 'dark' || currentTheme.id === 'brawlstars' ? '#FFFFFF' : '#000000'
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={styles.header}>
        <Ionicons name="checkbox-outline" size={72} color={currentTheme.primary} />
        <Text style={[styles.title, { color: currentTheme.text }]}>Tasklist</Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Organiza tu día de forma simple</Text>
      </View>

      <View style={styles.form}>
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
              placeholder="••••••••"
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[styles.forgotPasswordText, { color: currentTheme.primary }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: currentTheme.primary }]} 
          onPress={handleSubmit}
        >
          <Text style={[styles.loginButtonText, { color: getContrastTextColor(currentTheme.primary) }]}>
            Iniciar Sesión
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
          <Text style={[styles.googleButtonText, { color: currentTheme.text }]}>Continuar con Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: currentTheme.textSecondary }]}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={[styles.signupText, { color: currentTheme.primary }]}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  signupText: {
    fontSize: 14,
    fontWeight: '600',
  },
})

export default Login