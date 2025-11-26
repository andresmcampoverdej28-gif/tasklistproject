import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { useAppTheme } from '@/lib/hooks/useAppTheme' // Importamos el hook del tema

const TabsLayout = () => {
  const { currentTheme } = useAppTheme() // Obtenemos el tema actual

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.textSecondary,
        tabBarStyle: {
          backgroundColor: currentTheme.cardBackground,
          borderTopWidth: 1,
          borderTopColor: currentTheme.divider,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "grid" : "grid-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "checkbox" : "checkbox-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "settings" : "settings-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout