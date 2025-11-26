import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAppTheme } from '@/lib/hooks/useAppTheme' // Importamos el hook del tema

interface LoginProps {
  onNavigateToRegister: () => void
  onLogin: () => void
}

const Login = ({ onNavigateToRegister, onLogin }: LoginProps) => {
  const { currentTheme } = useAppTheme() // Obtenemos el tema actual

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
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Correo electrónico</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: currentTheme.divider 
            }
          ]}>
            <Ionicons name="mail-outline" size={20} color={currentTheme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="tu@email.com"
              placeholderTextColor={currentTheme.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Contraseña</Text>
          <View style={[
            styles.inputWrapper, 
            { 
              backgroundColor: currentTheme.surface, 
              borderColor: currentTheme.divider 
            }
          ]}>
            <Ionicons name="lock-closed-outline" size={20} color={currentTheme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: currentTheme.text }]}
              placeholder="••••••••"
              placeholderTextColor={currentTheme.textSecondary}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[styles.forgotPasswordText, { color: currentTheme.primary }]}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: currentTheme.primary }]} 
          onPress={onLogin}
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