import Login from '@/components/Login'
import Register from '@/components/Register'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const Index = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación
    router.replace('/home/Dashboard')
  }

  const handleRegister = () => {
    // Aquí iría la lógica de registro
    router.replace('/home/Dashboard')
  }

  return (
    <View style={styles.container}>
      {isLogin ? (
        <Login 
          onNavigateToRegister={() => setIsLogin(false)}
          onLogin={handleLogin}
        />
      ) : (
        <Register 
          onNavigateToLogin={() => setIsLogin(true)}
          onRegister={handleRegister}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Index