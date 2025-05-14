import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footter';

// Configurar cómo se muestran las notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Habit() {
  const [habit, setHabit] = useState('');
  const [hora, setHora] = useState(new Date());
  const [mostrarHora, setMostrarHora] = useState(false);
  const [habitos, setHabitos] = useState([]);

  useEffect(() => {
    cargarHabitos();
    pedirPermisoNotificaciones();
  }, []);

  const pedirPermisoNotificaciones = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso para notificaciones no concedido');
      }
    }
  };

  const cargarHabitos = async () => {
    const data = await AsyncStorage.getItem('habitos');
    if (data) {
      setHabitos(JSON.parse(data));
    }
  };

  const guardarHabitos = async (nuevoHabit) => {
    const nuevos = [...habitos, nuevoHabit];
    setHabitos(nuevos);
    await AsyncStorage.setItem('habitos', JSON.stringify(nuevos));
  };

  const programarNotificacion = async (nombre, horaNotificacion) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '¡Recordatorio de hábito!',
        body: `Es hora de: ${nombre}`,
      },
      trigger: {
        hour: horaNotificacion.getHours(),
        minute: horaNotificacion.getMinutes(),
        repeats: true, // todos los días
      },
    });
  };

  const agregarHábito = async () => {
    if (!habit) return;

    const nuevo = { nombre: habit, hora };
    await guardarHabitos(nuevo);
    await programarNotificacion(habit, hora);

    setHabit('');
    setHora(new Date());
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Hábito</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del hábito"
          value={habit}
          onChangeText={setHabit}
        />

        <Button title="Seleccionar hora" onPress={() => setMostrarHora(true)} />

        {mostrarHora && (
          <DateTimePicker
            value={hora}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || hora;
              setMostrarHora(Platform.OS === 'ios');
              setHora(currentDate);
            }}
          />
        )}

        <Button title="Guardar Hábito" onPress={agregarHábito} />

        <Text style={styles.subtitle}>Mis hábitos:</Text>
        <FlatList
          data={habitos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>{`${item.nombre} - ${item.hora.getHours()}:${item.hora.getMinutes().toString().padStart(2, '0')}`}</Text>
          )}
        />
      </View>

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  item: {
    padding: 10,
    fontSize: 16,
  },
});
