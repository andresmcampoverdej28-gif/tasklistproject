import { ThemeId } from '@/lib/constants/theme'
import { useAppTheme } from '@/lib/hooks/useAppTheme'; // Cambio importante aquí
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Settings = () => {
  const router = useRouter()
  const { currentTheme, themeId, setTheme } = useAppTheme() // Usamos useAppTheme en lugar de useContext

  const handleLogout = () => {
    router.replace('/')
  }

  const themeOptions: { id: ThemeId; name: string; icon: string; colors: string[] }[] = [
    { 
      id: 'light', 
      name: 'Claro', 
      icon: 'sunny',
      colors: ['#FFFFFF', '#007AFF', '#34C759']
    },
    { 
      id: 'dark', 
      name: 'Oscuro', 
      icon: 'moon',
      colors: ['#000000', '#0A84FF', '#30D158']
    },
    { 
      id: 'brawlstars', 
      name: 'Brawl Stars', 
      icon: 'game-controller',
      colors: ['#1A0D3E', '#FFC800', '#FF4D9C']
    },
    { 
      id: 'pvz', 
      name: 'Plants vs Zombies', 
      icon: 'leaf',
      colors: ['#87CEEB', '#4CAF50', '#8BC34A']
    },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <View style={[styles.header, { backgroundColor: currentTheme.cardBackground }]}>
        <Text style={[styles.title, { color: currentTheme.text }]}>Configuración</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.textSecondary }]}>TEMA</Text>
          
          <View style={[styles.themesContainer, { backgroundColor: currentTheme.cardBackground }]}>
            {themeOptions.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeOption,
                  { backgroundColor: currentTheme.surface },
                  themeId === theme.id && { 
                    borderColor: currentTheme.primary,
                    borderWidth: 3
                  }
                ]}
                onPress={() => setTheme(theme.id)}
              >
                <View style={styles.themePreview}>
                  {theme.colors.map((color, index) => (
                    <View
                      key={index}
                      style={[
                        styles.colorBlock,
                        { backgroundColor: color }
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.themeInfo}>
                  <Ionicons name={theme.icon as any} size={20} color={currentTheme.text} />
                  <Text style={[styles.themeName, { color: currentTheme.text }]}>
                    {theme.name}
                  </Text>
                </View>
                {themeId === theme.id && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color={currentTheme.primary} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.textSecondary }]}>CUENTA</Text>
          
          <TouchableOpacity style={[styles.option, { backgroundColor: currentTheme.cardBackground, borderBottomWidth: 1, borderBottomColor: currentTheme.divider }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="person-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.optionText, { color: currentTheme.text }]}>Perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="key-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.optionText, { color: currentTheme.text }]}>Cambiar Contraseña</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.textSecondary }]}>PREFERENCIAS</Text>
          
          <TouchableOpacity style={[styles.option, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="notifications-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.optionText, { color: currentTheme.text }]}>Notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: currentTheme.textSecondary }]}>INFORMACIÓN</Text>
          
          <TouchableOpacity style={[styles.option, { backgroundColor: currentTheme.cardBackground, borderBottomWidth: 1, borderBottomColor: currentTheme.divider }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="help-circle-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.optionText, { color: currentTheme.text }]}>Ayuda</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, { backgroundColor: currentTheme.cardBackground }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle-outline" size={24} color={currentTheme.primary} />
              <Text style={[styles.optionText, { color: currentTheme.text }]}>Acerca de</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={currentTheme.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: currentTheme.cardBackground }]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={currentTheme.error} />
          <Text style={[styles.logoutText, { color: currentTheme.error }]}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 16,
  },
  themesContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  themePreview: {
    flexDirection: 'row',
    gap: 4,
    marginRight: 12,
  },
  colorBlock: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkmark: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -12,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 32,
    marginBottom: 32,
    borderRadius: 12,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Settings