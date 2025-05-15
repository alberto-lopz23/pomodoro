import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footter';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import Arbol from '../components/Arbol';
import { useNavigation } from '@react-navigation/native';


{/*terminar de hacer que diga "buenas tardes con el nombre del usuario"*/}


export default function HomeScrees() {
  const navigation = useNavigation();
    const [user, setUser] = useState(''); // Estado para guardar el nombre de usuario

  // Cargar el nombre de usuario desde AsyncStorage cuando el componente se monte
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user'); // Cargar el nombre de usuario
      if (storedUser) {
        setUser(storedUser); // Si existe, lo cargamos en el estado
      }
    };

    loadUser();
  }, []);


    const hora = new Date().getHours();

    // Determinar el saludo
    let saludo = 'Hola';
    if (hora >= 1 && hora < 5){
        saludo = 'A dormir'
    } if (hora >= 6 && hora < 12) {
      saludo = 'Buenos días';
    } else if (hora >= 12 && hora < 18) {
      saludo = 'Buenas tardes';
    }  else {
      saludo = 'Buenas noches';
    }
    return (
        <>
        <View style={styles.container}>
        <View style={[styles.header]}>
            <Text style={{ color: '#777', fontSize: 30, fontWeight: 'bold', marginRight: 10 }}>
               {saludo}
            </Text>
            <Text style={{ color: '#777', fontSize: 30 }}>
            {user || 'Usuario'} {/* Si no hay usuario, muestra 'Usuario' como texto por defecto */}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
           <Arbol />
        </View>
       
        <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Retos')}
    >
      <Image
        source={require('../assets/images/manzano.avif')} // Ajusta la ruta a tu imagen
        style={styles.image}
      />
    </TouchableOpacity>

        </View>
        

        <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 20,

    },
    button: {
        padding: 10,
        width: 100,
        height: 100,
        position: 'absolute',
        left: '70%',
        top: '20%',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});