import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Login from '@/components/Login'
import Register from '@/components/Register'

const Index = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <View style={styles.container}>
      {isLogin ? (
        <Login onNavigateToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onNavigateToLogin={() => setIsLogin(true)} />
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