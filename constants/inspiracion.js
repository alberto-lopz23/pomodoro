import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Frases inspiradoras
const frasesInspiradoras = [
  "La vida es como una caja de chocolates, nunca sabes lo que te va a tocar. - *Forrest Gump*",
  "Que el amor y la paz sean con ustedes. - *Star Wars*",
  "La vida no se mide por las veces que respiras, sino por los momentos que te dejan sin aliento. - *Hitch*",
  "En el corazón de cada hombre está el deseo de ser algo más grande. - *Batman Begins*",
  "No importa lo que suceda, siempre puedes contar con tu familia. - *Fast & Furious*",
  "Al final, no son los años en tu vida los que cuentan. Es la vida en tus años. - *Abraham Lincoln: Vampire Hunter*",
  "Lo que tenemos aquí es un fracaso en la comunicación. - *Cool Hand Luke*",
  "El futuro pertenece a aquellos que creen en la belleza de sus sueños. - *Cenicienta*",
  "A veces las cosas que más quieres son las que más te cuestan. - *The Pursuit of Happyness*",
  "Si puedes soñarlo, puedes hacerlo. - *Walt Disney*",
  "No se trata de cuántas veces caes, sino de cuántas veces te levantas. - *Rocky Balboa*",
  "La gente cambia cuando se da cuenta de lo que es importante en su vida. - *El Diario de Noa*",
  "No te preocupes, todo está bien. - *La vida es bella*",
  "Es lo que haces ahora lo que importa. - *El Regreso del Jedi*",
  "Hazlo o no lo hagas, pero no lo intentes. - *Star Wars*",
  "Nunca dejes que te digan que no puedes hacer algo. - *En busca de la felicidad*",
  "El destino de los hombres está determinado por lo que piensan. - *El Club de los Poetas Muertos*",
  "Hoy es el primer día del resto de tu vida. - *El Club de los Poetas Muertos*",
  "Al final, todo saldrá bien. Si no ha salido bien, es porque aún no es el final. - *El Exótico Hotel Marigold*"
];

export default function InspirationalQuote() {
  const [frase, setFrase] = useState('');

  // Función para obtener una frase aleatoria
  const obtenerFraseAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * frasesInspiradoras.length);
    return frasesInspiradoras[indiceAleatorio];
  };

  // Cargar la frase guardada en AsyncStorage o usar una nueva
  const cargarFrase = async () => {
    try {
      const fraseGuardada = await AsyncStorage.getItem('frase');
      if (fraseGuardada) {
        setFrase(fraseGuardada); // Si hay una frase guardada, la usamos
      } else {
        const nuevaFrase = obtenerFraseAleatoria(); // Si no hay frase, generamos una nueva
        setFrase(nuevaFrase);
        await AsyncStorage.setItem('frase', nuevaFrase); // Guardamos la nueva frase
      }
    } catch (error) {
      console.error('Error al cargar la frase:', error);
    }
  };

  // Cambiar la frase cada 20 minutos
  useEffect(() => {
    cargarFrase(); // Cargar la frase al principio

    // Configurar el temporizador para cambiar la frase cada 20 minutos (1200 segundos)
    const intervalo = setInterval(async () => {
      const nuevaFrase = obtenerFraseAleatoria();
      setFrase(nuevaFrase); // Cambiar la frase en el estado
      await AsyncStorage.setItem('frase', nuevaFrase); // Guardar la nueva frase
    }, 1200000); // 1200000 ms = 20 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.frase}>{frase}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  frase: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#333',
  },
});
