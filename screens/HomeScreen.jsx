import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footter'; // Si tienes un Footer
import InspirationalQuote from '../constants/inspiracion';
import Button from '@/components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(''); // Estado para guardar el nombre de usuario

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
        console.log('Usuario cargado desde AsyncStorage:', storedUser); // Verifica si se cargó correctamente
        if (storedUser) {
          setUser(storedUser); // Si existe, lo cargamos en el estado
        }
      } catch (error) {
        console.error('Error al cargar el nombre del usuario:', error);
      }
    };

    loadUser();
  }, []);

  const hora = new Date().getHours();

  // Determinar el saludo
  let saludo = 'Hola';
  if (hora >= 1 && hora < 5) {
    saludo = 'A dormir';
  } else if (hora >= 6 && hora < 12) {
    saludo = 'Buenos días';
  } else if (hora >= 12 && hora < 18) {
    saludo = 'Buenas tardes';
  } else {
    saludo = 'Buenas noches';
  }

  return (
    <ImageBackground
      source={require('../assets/images/fondo.webp')} // Imagen de fondo
      style={styles.container} // Estilo para el contenedor
      imageStyle={styles.backgroundImage} // Estilo para la imagen de fondo (opcional)
    >
      {/* Contenido sobre la imagen de fondo */}
      <View style={styles.header}>
        <Text style={styles.saludo}>{saludo}</Text>
        <Text style={styles.userName}>{user || 'Usuario'}</Text> {/* Muestra el nombre del usuario */}
      </View>

      {/* Cita inspiradora */}
      <View style={styles.quoteContainer}>
        <InspirationalQuote />
      </View>

      {/* Botón */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Retos')}
        style={styles.button}
      >
        <View style={styles.iconContainer}>
          <Icon
            name="accessibility-new"
            size={24}
            color="#fff"
          />
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <Footer />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover', // Para asegurarnos de que cubra toda la pantalla
    opacity: 1, // Ajusta la opacidad si lo deseas
    width: '100%',
    height: '100%',
    position: 'absolute', // Asegura que la imagen de fondo esté fija y cubra toda la pantalla
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
    paddingTop: 40, // Añadido para mejorar el espaciado
    zIndex: 1, // Para asegurarse de que el contenido esté sobre el fondo
  },
  saludo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Asegura que el contenido se coloque por encima del fondo
    zIndex: 1, // Asegura que el contenido esté por encima del fondo
  },
  button: {
    position: 'absolute',
    top: '20%',
    left: '80%',
    zIndex: 1, // Asegura que el botón esté por encima del fondo
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo morado para que el botón sea visible
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
