import { Image, StyleSheet, View, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Footer from '../components/Footter';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const [imagenPerfil, setImagenPerfil] = useState(null);
  const [fotosFeed, setFotosFeed] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const perfil = await AsyncStorage.getItem('perfilImagen');
      const feed = await AsyncStorage.getItem('fotosFeed');

      if (perfil) setImagenPerfil(perfil);
      if (feed) setFotosFeed(JSON.parse(feed));
    };

    cargarDatos();
  }, []);

  const seleccionarImagenPerfil = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      const destino = FileSystem.documentDirectory + 'perfil_imagen.jpg';

      await FileSystem.copyAsync({ from: uri, to: destino });
      await AsyncStorage.setItem('perfilImagen', destino);
      setImagenPerfil(destino);
    }
  };

  const agregarFotoAlFeed = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      const nombreArchivo = `feed_${Date.now()}.jpg`;
      const destino = FileSystem.documentDirectory + nombreArchivo;

      await FileSystem.copyAsync({ from: uri, to: destino });

      const nuevasFotos = [...fotosFeed, destino];
      setFotosFeed(nuevasFotos);
      await AsyncStorage.setItem('fotosFeed', JSON.stringify(nuevasFotos));
    }

    if (fotosFeed.length === 0) {{
        let mansajeVacio = 'No hay fotos en el feed'
    }}
    };


  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        {imagenPerfil && (
            <Image source={{ uri: imagenPerfil }} style={styles.imagePerfil} />
          )}
          <TouchableOpacity onPress={seleccionarImagenPerfil} style={styles.perfilButton}>
            <Text style={styles.perfilButtonText}>Editar Perfil</Text>
          </TouchableOpacity>

         
        </View>

        <Text style={styles.sectionTitle}>Mi Feed</Text>

        <FlatList
          data={fotosFeed}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imageFeed} />
          )}
          contentContainerStyle={styles.feedGrid}
          ListEmptyComponent={
            <Text style={styles.feedButtonText}>No hay fotos en el feed</Text>

          }

        />
        <TouchableOpacity onPress={agregarFotoAlFeed} style={styles.feedButton}>
          <Text style={styles.feedButtonText}>Foto</Text>
        </TouchableOpacity>
        
      </ScrollView>

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  perfilButton: {
    backgroundColor: '#3897f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    marginTop: 20,
  },
  perfilButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  feedButton: {
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    width: 60,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 630,
    marginLeft: 280,
    borderRadius: 100,
    position: 'absolute',

  },
  feedButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  feedGrid: {
    flex: 1,
    height: 600,
  },
  imageFeed: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
