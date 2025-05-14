import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
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
      const parsed = JSON.parse(data);
      const transformados = parsed.map(h => ({
        ...h,
        hora: new Date(h.hora),
      }));
      setHabitos(transformados);
    }
  };

  const guardarHabitos = async (nuevoHabit) => {
    const nuevos = [...habitos, nuevoHabit];
    setHabitos(nuevos);
    await AsyncStorage.setItem('habitos', JSON.stringify(nuevos));
  };
  const eliminarHabito = async (index) => {
    const nuevos = [...habitos];
    nuevos.splice(index, 1);
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
          renderItem={({ item, index }) => (
            <View style={styles.habitoItem}>
              <Text style={styles.itemText}>
                {`${item.nombre} - ${item.hora.getHours()}:${item.hora.getMinutes().toString().padStart(2, '0')}`}
              </Text>
              <TouchableOpacity onPress={() => eliminarHabito(index)} style={styles.eliminarBtn}>
                <Text style={styles.eliminarTexto}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',  // Fondo suave para toda la app
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    color: '#333',  // Título más oscuro
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    color: '#555',  // Subtítulo en tono gris
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginVertical: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,  // Sombra para dar profundidad
  },
  item: {
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  habitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,  // Sombra para dar profundidad a cada ítem
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  eliminarBtn: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,  // Sombra para darle un toque de profundidad
  },
  eliminarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4caf50', // Botón verde
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,  // Sombra para darle profundidad al botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dateTimePicker: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,  // Sombra ligera para el picker
  },
});
