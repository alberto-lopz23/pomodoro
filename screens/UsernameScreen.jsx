// UsernameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UsernameScreen({ navigation }) {
  const [username, setUsername] = useState('');

  // Guardar el nombre de usuario en AsyncStorage
  const saveUsername = async () => {
    if (username.trim()) {
      try {
        await AsyncStorage.setItem('username', username);
        navigation.replace('Home');  // Navegar a la pantalla principal después de guardar
      } catch (error) {
        console.error('Error al guardar el nombre de usuario:', error);
      }
    } else {
      alert('Por favor, ingresa un nombre de usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa tu nombre de usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Guardar nombre" onPress={saveUsername} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});
