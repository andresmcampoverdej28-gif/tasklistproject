import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useAppTheme } from '@/lib/hooks/useAppTheme' // Importamos el hook del tema

const Dashboard = () => {
  const { currentTheme } = useAppTheme() // Obtenemos el tema actual

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
        <Text style={[styles.title, { color: currentTheme.text }]}>Dashboard</Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Bienvenido a Tasklist</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Ionicons name="checkmark-circle" size={48} color={currentTheme.success} />
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>0</Text>
          <Text style={[styles.cardLabel, { color: currentTheme.textSecondary }]}>Tareas Completadas</Text>
        </View>

        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Ionicons name="time-outline" size={48} color={currentTheme.warning} />
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>0</Text>
          <Text style={[styles.cardLabel, { color: currentTheme.textSecondary }]}>Tareas Pendientes</Text>
        </View>

        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Ionicons name="stats-chart" size={48} color={currentTheme.primary} />
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>0%</Text>
          <Text style={[styles.cardLabel, { color: currentTheme.textSecondary }]}>Progreso del Día</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 16,
  },
})

export default Dashboard