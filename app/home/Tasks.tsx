import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Modal, 
  TextInput,
  Alert 
} from 'react-native'
import axios from 'axios'
import { useAppTheme } from '@/lib/hooks/useAppTheme'

interface Task {
  id: string
  title: string
  description: string
  priority: 'important' | 'not-important'
  completed: boolean
  createdAt: string
}

const Tasks = () => {
  const { currentTheme } = useAppTheme()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [modalVisible, setModalVisible] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskPriority, setTaskPriority] = useState<'important' | 'not-important'>('not-important')

  const API_URL = 'http://localhost:3000/tasks'

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    applyFilter()
  }, [tasks, filter])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL)
      setTasks(response.data)
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las tareas')
    }
  }

  const applyFilter = () => {
    let filtered = tasks
    if (filter === 'pending') {
      filtered = tasks.filter(task => !task.completed)
    } else if (filter === 'completed') {
      filtered = tasks.filter(task => task.completed)
    }
    setFilteredTasks(filtered)
  }

  const createTask = async () => {
    if (!taskTitle.trim()) {
      Alert.alert('Error', 'El título es requerido')
      return
    }

    const newTask: Omit<Task, 'id'> = {
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      completed: false,
      createdAt: new Date().toISOString()
    }

    try {
      await axios.post(API_URL, newTask)
      setTaskTitle('')
      setTaskDescription('')
      setTaskPriority('not-important')
      setModalVisible(false)
      fetchTasks()
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la tarea')
    }
  }

  const toggleTaskComplete = async (task: Task) => {
    try {
      await axios.patch(`${API_URL}/${task.id}`, {
        completed: !task.completed
      })
      fetchTasks()
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea')
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`)
      fetchTasks()
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la tarea')
    }
  }

  const confirmDelete = (taskId: string) => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro de eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteTask(taskId) }
      ]
    )
  }

  // Función para determinar color de texto contrastante
  const getContrastTextColor = (backgroundColor: string) => {
    // Para simplificar, asumimos que si el tema es oscuro, el texto debe ser claro y viceversa
    return currentTheme.id === 'dark' || currentTheme.id === 'brawlstars' ? '#FFFFFF' : '#000000'
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
        <Text style={[styles.title, { color: currentTheme.text }]}>Mis Tareas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle" size={32} color={currentTheme.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              { backgroundColor: currentTheme.surface, borderColor: currentTheme.divider },
              filter === 'all' && [styles.filterButtonActive, { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }]
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterText, 
              { color: currentTheme.textSecondary },
              filter === 'all' && [styles.filterTextActive, { color: getContrastTextColor(currentTheme.primary) }]
            ]}>
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              { backgroundColor: currentTheme.surface, borderColor: currentTheme.divider },
              filter === 'pending' && [styles.filterButtonActive, { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }]
            ]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[
              styles.filterText, 
              { color: currentTheme.textSecondary },
              filter === 'pending' && [styles.filterTextActive, { color: getContrastTextColor(currentTheme.primary) }]
            ]}>
              Pendientes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              { backgroundColor: currentTheme.surface, borderColor: currentTheme.divider },
              filter === 'completed' && [styles.filterButtonActive, { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }]
            ]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[
              styles.filterText, 
              { color: currentTheme.textSecondary },
              filter === 'completed' && [styles.filterTextActive, { color: getContrastTextColor(currentTheme.primary) }]
            ]}>
              Completadas
            </Text>
          </TouchableOpacity>
        </View>

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkbox-outline" size={80} color={currentTheme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: currentTheme.text }]}>No hay tareas</Text>
            <Text style={[styles.emptySubtitle, { color: currentTheme.textSecondary }]}>
              Comienza agregando tu primera tarea
            </Text>
            <TouchableOpacity 
              style={[styles.emptyButton, { backgroundColor: currentTheme.primary }]} 
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add" size={20} color={getContrastTextColor(currentTheme.primary)} />
              <Text style={[styles.emptyButtonText, { color: getContrastTextColor(currentTheme.primary) }]}>Crear Tarea</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tasksList}>
            {filteredTasks.map((task) => (
              <View key={task.id} style={[styles.taskCard, { backgroundColor: currentTheme.cardBackground }]}>
                <TouchableOpacity 
                  style={styles.taskLeft}
                  onPress={() => toggleTaskComplete(task)}
                >
                  <Ionicons 
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={task.completed ? currentTheme.success : currentTheme.primary} 
                  />
                  <View style={styles.taskInfo}>
                    <Text style={[
                      styles.taskTitle, 
                      { color: currentTheme.text },
                      task.completed && [styles.taskTitleCompleted, { color: currentTheme.textSecondary }]
                    ]}>
                      {task.title}
                    </Text>
                    {task.description ? (
                      <Text style={[styles.taskDescription, { color: currentTheme.textSecondary }]}>{task.description}</Text>
                    ) : null}
                    <View style={styles.taskMeta}>
                      <View style={[
                        styles.priorityBadge,
                        task.priority === 'important' 
                          ? [styles.priorityImportant, { backgroundColor: currentTheme.error + '20' }] 
                          : [styles.priorityNotImportant, { backgroundColor: currentTheme.primary + '20' }]
                      ]}>
                        <Text style={[
                          styles.priorityText,
                          { color: task.priority === 'important' ? currentTheme.error : currentTheme.primary }
                        ]}>
                          {task.priority === 'important' ? 'Importante' : 'No tan importante'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => confirmDelete(task.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={currentTheme.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: currentTheme.text }]}>Nueva Tarea</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={currentTheme.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.input, 
                { 
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.divider,
                  color: currentTheme.text
                }
              ]}
              placeholder="Título de la tarea"
              placeholderTextColor={currentTheme.textSecondary}
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <TextInput
              style={[
                styles.input, 
                styles.textArea,
                { 
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.divider,
                  color: currentTheme.text
                }
              ]}
              placeholder="Descripción (opcional)"
              placeholderTextColor={currentTheme.textSecondary}
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
              numberOfLines={4}
            />

            <Text style={[styles.label, { color: currentTheme.text }]}>Prioridad</Text>
            <View style={styles.priorityContainer}>
              <TouchableOpacity
                style={[
                  styles.priorityOption,
                  { borderColor: currentTheme.divider },
                  taskPriority === 'important' && [
                    styles.priorityOptionActive, 
                    { backgroundColor: currentTheme.error, borderColor: currentTheme.error }
                  ]
                ]}
                onPress={() => setTaskPriority('important')}
              >
                <Ionicons 
                  name="alert-circle" 
                  size={20} 
                  color={taskPriority === 'important' ? getContrastTextColor(currentTheme.error) : currentTheme.error} 
                />
                <Text style={[
                  styles.priorityOptionText,
                  { color: taskPriority === 'important' ? getContrastTextColor(currentTheme.error) : currentTheme.textSecondary }
                ]}>
                  Importante
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityOption,
                  { borderColor: currentTheme.divider },
                  taskPriority === 'not-important' && [
                    styles.priorityOptionActive, 
                    { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                  ]
                ]}
                onPress={() => setTaskPriority('not-important')}
              >
                <Ionicons 
                  name="information-circle" 
                  size={20} 
                  color={taskPriority === 'not-important' ? getContrastTextColor(currentTheme.primary) : currentTheme.primary} 
                />
                <Text style={[
                  styles.priorityOptionText,
                  { color: taskPriority === 'not-important' ? getContrastTextColor(currentTheme.primary) : currentTheme.textSecondary }
                ]}>
                  No tan importante
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.createButton, { backgroundColor: currentTheme.primary }]} 
              onPress={createTask}
            >
              <Text style={[styles.createButtonText, { color: getContrastTextColor(currentTheme.primary) }]}>Crear Tarea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

// Los estilos se mantienen igual que en la versión anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonActive: {
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tasksList: {
    padding: 16,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskInfo: {
    marginLeft: 12,
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityImportant: {},
  priorityNotImportant: {},
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 8,
  },
  priorityOptionActive: {},
  priorityOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  createButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Tasks