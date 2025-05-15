import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footter';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button 
            title="ToDo"
            onPress={() => navigation.navigate('Retos')}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/manzano.avif')} alt='manzano' style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </View>
        </View>

        <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 20,

    },

});