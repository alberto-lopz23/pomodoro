import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footter'; // Asegúrate de tener este componente

export default function ToDo() {
  // Estado para las tareas
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Cargar las tareas desde AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks)); // Cargar las tareas desde el almacenamiento
        }
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    loadTasks(); // Llamar a la función cuando el componente se monta
  }, []);

  // Función para agregar tarea
  const addTask = async () => {
    if (!task.trim()) {
      alert('La tarea no puede estar vacía'); // Validar tarea vacía
      return;
    }

    if (tasks.includes(task.trim())) {
      alert('Ya has agregado esta tarea'); // Validar tarea duplicada
      return;
    }

    // Agregar nueva tarea
    const updatedTasks = [...tasks, task.trim()];
    setTasks(updatedTasks);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Guardar tareas en AsyncStorage
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }

    setTask(''); // Limpiar el campo de texto
  };

  // Función para eliminar tarea
  const removeTask = async (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks)); // Guardar la lista actualizada en AsyncStorage
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>

        {/* Input para nueva tarea */}
        <TextInput
          style={styles.input}
          placeholder="Agregar nueva tarea"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Agregar tarea" onPress={addTask} />

        {/* Lista de tareas */}
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item}</Text>
              <TouchableOpacity onPress={() => removeTask(index)}>
                <Text style={styles.removeText}>Eliminar</Text>
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
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: '#ff5c5c',
    fontWeight: 'bold',
  },
});
