import { useAppTheme } from '@/lib/hooks/useAppTheme'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

interface Task {
  id: string
  title: string
  description: string
  priority: 'important' | 'not-important'
  completed: boolean
  createdAt: string
}

const Dashboard = () => {
  const { currentTheme } = useAppTheme()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estadísticas calculadas
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    progress: 0
  })

  // URL de la API
  const API_URL = 'https://3000-firebase-tasklistproject-1763579776324.cluster-gizzoza7hzhfyxzo5d76y3flkw.cloudworkstations.dev/tasks'

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks()
  }, [])

  // Calcular estadísticas cuando cambien las tareas
  useEffect(() => {
    calculateStats()
  }, [tasks])

  const fetchTasks = async () => {
    try {
      setError(null)
      console.log('🔄 Cargando bajas desde el campo de batalla...')
      const response = await axios.get(API_URL)
      console.log('✅ Bajas cargadas:', response.data.length)
      setTasks(response.data)
    } catch (error: any) {
      console.error('❌ Error cargando bajas:', error)
      setError('No se pudieron cargar las bajas del campo de batalla')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const calculateStats = () => {
    if (tasks.length === 0) {
      setStats({ completed: 0, pending: 0, progress: 0 })
      return
    }

    const completed = tasks.filter(task => task.completed).length
    const pending = tasks.filter(task => !task.completed).length
    const progress = Math.round((completed / tasks.length) * 100)

    setStats({
      completed,
      pending,
      progress: isNaN(progress) ? 0 : progress
    })

    console.log(`🎯 Estadísticas de batalla: ${completed} derrotados, ${pending} por derrotar, ${progress}% de progreso`)
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchTasks()
  }

  // Función para determinar color de texto contrastante
  const getContrastTextColor = (backgroundColor: string) => {
    return currentTheme.id === 'dark' || currentTheme.id === 'brawlstars' ? '#FFFFFF' : '#000000'
  }

  // Función para obtener mensaje según el progreso
  const getProgressMessage = () => {
    if (stats.progress === 100) return '¡Campo de batalla dominado! 🏆'
    if (stats.progress >= 75) return '¡Victoria casi asegurada! ⚔️'
    if (stats.progress >= 50) return '¡La batalla está pareja! 🛡️'
    if (stats.progress >= 25) return '¡Sigue avanzando soldado! 💪'
    return '¡La batalla acaba de comenzar! 🔥'
  }

  // Función para obtener icono según el progreso
  const getProgressIcon = () => {
    if (stats.progress === 100) return 'trophy'
    if (stats.progress >= 75) return 'flag'
    if (stats.progress >= 50) return 'shield-checkmark'
    if (stats.progress >= 25) return 'sword'
    return 'alert-circle'
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.title, { color: currentTheme.text }]}>Centro de Mando</Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Analizando campo de batalla...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
          <Text style={[styles.loadingText, { color: currentTheme.text }]}>Escaneando enemigos...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
        <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.title, { color: currentTheme.text }]}>Centro de Mando</Text>
          <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>Estado del campo de batalla</Text>
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={64} color={currentTheme.error} />
          <Text style={[styles.errorText, { color: currentTheme.text }]}>{error}</Text>
          <Text style={[styles.errorSubtext, { color: currentTheme.textSecondary }]}>
            Desliza hacia abajo para reintentar la conexión
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
        <Text style={[styles.title, { color: currentTheme.text }]}>Centro de Mando</Text>
        <Text style={[styles.subtitle, { color: currentTheme.textSecondary }]}>
          {tasks.length === 0 ? 'Campo de batalla tranquilo' : `Total de objetivos: ${tasks.length}`}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[currentTheme.primary]}
            tintColor={currentTheme.primary}
            title="Actualizando campo de batalla..."
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta de Brawlers/Zombies Derrotados */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={32} color={currentTheme.success} />
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Derrotados</Text>
          </View>
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>
            {stats.completed}
          </Text>
          <Text style={[styles.cardLabel, { color: currentTheme.textSecondary }]}>
            Brawlers/Zombies Derrotados
          </Text>
          {tasks.length > 0 && (
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    backgroundColor: currentTheme.surface,
                    width: '100%'
                  }
                ]}
              >
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      backgroundColor: currentTheme.success,
                      width: `${(stats.completed / tasks.length) * 100}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.cardSubtext, { color: currentTheme.textSecondary }]}>
                {Math.round((stats.completed / tasks.length) * 100)}% del total
              </Text>
            </View>
          )}
        </View>

        {/* Tarjeta de Brawlers/Zombies Por Derrotar */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="alert-circle-outline" size={32} color={currentTheme.warning} />
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Por Derrotar</Text>
          </View>
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>
            {stats.pending}
          </Text>
          <Text style={[styles.cardLabel, { color: currentTheme.textSecondary }]}>
            Brawlers/Zombies Por Derrotar
          </Text>
          {tasks.length > 0 && (
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    backgroundColor: currentTheme.surface,
                    width: '100%'
                  }
                ]}
              >
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      backgroundColor: currentTheme.warning,
                      width: `${(stats.pending / tasks.length) * 100}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.cardSubtext, { color: currentTheme.textSecondary }]}>
                {Math.round((stats.pending / tasks.length) * 100)}% del total
              </Text>
            </View>
          )}
        </View>

        {/* Tarjeta de Progreso de Abatidos */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <View style={styles.cardHeader}>
            <Ionicons 
              name={getProgressIcon() as any} 
              size={32} 
              color={
                stats.progress === 100 ? currentTheme.success :
                stats.progress >= 75 ? currentTheme.primary :
                stats.progress >= 50 ? '#FFD700' : // Dorado para 50-74%
                currentTheme.warning
              } 
            />
            <Text style={[styles.cardTitle, { color: currentTheme.text }]}>Progreso de Abatidos</Text>
          </View>
          <Text style={[styles.cardNumber, { color: currentTheme.text }]}>
            {stats.progress}%
          </Text>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: currentTheme.surface,
                  width: '100%'
                }
              ]}
            >
              <View 
                style={[
                  styles.progressFill,
                  { 
                    backgroundColor: 
                      stats.progress === 100 ? currentTheme.success :
                      stats.progress >= 75 ? currentTheme.primary :
                      stats.progress >= 50 ? '#FFD700' : // Dorado
                      currentTheme.warning,
                    width: `${stats.progress}%`
                  }
                ]} 
              />
            </View>
          </View>
          <Text style={[styles.cardMessage, { color: currentTheme.textSecondary }]}>
            {getProgressMessage()}
          </Text>
        </View>

        {/* Sección de Bajas del Día */}
        {tasks.length > 0 && (
          <View style={[styles.statsCard, { backgroundColor: currentTheme.surface }]}>
            <View style={styles.statsHeader}>
              <Ionicons name="stats-chart" size={24} color={currentTheme.primary} />
              <Text style={[styles.statsTitle, { color: currentTheme.text }]}>Bajas del Día</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: currentTheme.text }]}>{tasks.length}</Text>
                <Text style={[styles.statLabel, { color: currentTheme.textSecondary }]}>Total Objetivos</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: currentTheme.success }]}>{stats.completed}</Text>
                <Text style={[styles.statLabel, { color: currentTheme.textSecondary }]}>Derrotados</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: currentTheme.warning }]}>{stats.pending}</Text>
                <Text style={[styles.statLabel, { color: currentTheme.textSecondary }]}>Por Derrotar</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: currentTheme.primary }]}>{stats.progress}%</Text>
                <Text style={[styles.statLabel, { color: currentTheme.textSecondary }]}>Eficiencia</Text>
              </View>
            </View>

            <View style={styles.missionStatus}>
              <Text style={[styles.missionText, { color: currentTheme.textSecondary }]}>
                {stats.progress === 100 ? '🎉 Misión Cumplida - ¡Todos los enemigos eliminados!' :
                 stats.pending > 0 ? `⚔️ Quedan ${stats.pending} objetivos por eliminar` :
                 '🎯 Preparando siguiente misión...'}
              </Text>
            </View>
          </View>
        )}

        {/* Estado vacío */}
        {tasks.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Ionicons name="game-controller-outline" size={80} color={currentTheme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>Campo de Batalla Vacío</Text>
            <Text style={[styles.emptySubtitle, { color: currentTheme.textSecondary }]}>
              No hay enemigos en el radar{'\n'}
              Dirígete a la base de operaciones para asignar nuevos objetivos
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  cardNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  cardSubtext: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
  cardMessage: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  missionStatus: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  missionText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.8,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },
})

export default Dashboard