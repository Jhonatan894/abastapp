//painel de controle da navegação do seu app

import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
//responsável por renderizar ícones
import { IconSymbol } from '@/components/ui/icon-symbol';
// Objeto com as cores do tema (light/dark)
import { Colors } from '@/constants/theme';
//detecta se o usuário está usando tema claro ou escuro
import { useColorScheme } from '@/hooks/use-color-scheme';

//Componente principal responsável pela navegação por abas (Tab Navigation)
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>

    {/* Tela Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    {/* Tela Explore */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
