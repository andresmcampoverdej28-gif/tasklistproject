import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Bienvenido a Tasklist</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={48} color="#34C759" />
          <Text style={styles.cardNumber}>0</Text>
          <Text style={styles.cardLabel}>Tareas Completadas</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="time-outline" size={48} color="#FF9500" />
          <Text style={styles.cardNumber}>0</Text>
          <Text style={styles.cardLabel}>Tareas Pendientes</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="stats-chart" size={48} color="#007AFF" />
          <Text style={styles.cardNumber}>0%</Text>
          <Text style={styles.cardLabel}>Progreso del Día</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
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
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
  },
})

export default Dashboard