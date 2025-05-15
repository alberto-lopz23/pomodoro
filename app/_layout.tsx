import 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ToDoScreen from '../screens/ToDoScreen';
import HabitScreen from '../screens/HabitScreen';
import UsernameScreen from '../screens/UsernameScreen';
import RetosScreen from '../screens/RetosScreen';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el nombre de usuario ya está guardado
    const checkUsername = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setIsUserLoggedIn(true);  // El usuario ya tiene un nombre
        }
      } catch (error) {
        console.error('Error al verificar el nombre de usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUsername();
  }, []);

  if (loading) {
    // Mientras cargamos la información de AsyncStorage, mostramos un cargando
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={[styles.container]}>
      <Stack.Navigator initialRouteName={isUserLoggedIn ? 'Home' : 'Username'}
        screenOptions={{
          headerShown: false,  // Ocultar los encabezados
          gestureEnabled: true,  // Permitir gestos para las transiciones
          animation: 'fade',  // Usar animación de desvanecimiento para las transiciones
          // Configurar transiciones, sin necesidad de `transitionSpec`
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="Username"
          component={UsernameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{
            title: 'ToDo',
          }}
        />
        <Stack.Screen
          name="Habit"
          component={HabitScreen}
          options={{
            title: 'Habit',
          }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            title: 'Perfil',
          }}
        />
        <Stack.Screen
          name="Retos"
          component={RetosScreen}
          options={{
            title: 'Retos',
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
