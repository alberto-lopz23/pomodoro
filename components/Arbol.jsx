import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import Svg, { Line, Circle, G } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const ArbolDinamicoSVG = () => {
  const [ramas, setRamas] = useState([]); // Estado para las ramas
  const [hojas, setHojas] = useState([]); // Estado para las hojas

  // Animación general de la escala del árbol
  const escalaGeneralAnimada = useRef(new Animated.Value(1)).current;

  // Función para manejar el clic y hacer crecer el árbol
  const manejarClick = () => {
    // Cada vez que se hace clic, se añaden nuevas ramas y hojas
    const nuevaRama = {
      id: ramas.length,
      longitud: new Animated.Value(0), // Longitud animada de la rama
      opacidad: new Animated.Value(0), // Opacidad de la rama
    };
    const nuevaHoja = {
      id: hojas.length,
      radio: new Animated.Value(0), // Radio animado de la hoja
      opacidad: new Animated.Value(0), // Opacidad de la hoja
    };

    // Añadir nuevas ramas y hojas a los estados
    setRamas([...ramas, nuevaRama]);
    setHojas([...hojas, nuevaHoja]);

    // Animaciones para cada nueva rama y hoja
    const animaciones = [
      // Animación de la escala general del árbol (puedes dejarlo fijo en 1 si no quieres que crezca en tamaño)
      Animated.spring(escalaGeneralAnimada, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ];

    // Animar cada nueva rama
    ramas.forEach((rama, index) => {
      animaciones.push(
        Animated.timing(rama.longitud, {
          toValue: 50, // Longitud final de la rama
          duration: 700,
          useNativeDriver: false, // 'y2' no es compatible con el driver nativo directamente en SVG
        }),
        Animated.timing(rama.opacidad, {
          toValue: 1, // Opacidad completa para que la rama sea visible
          duration: 400,
          useNativeDriver: false,
        })
      );
    });

    // Animar cada nueva hoja
    hojas.forEach((hoja, index) => {
      animaciones.push(
        Animated.timing(hoja.radio, {
          toValue: 5, // Radio final de la hoja
          duration: 300,
          delay: 500, // Aparece después de que la rama crezca
          useNativeDriver: false,
        }),
        Animated.timing(hoja.opacidad, {
          toValue: 1, // Opacidad completa para que la hoja sea visible
          duration: 200,
          delay: 500, // Aparece después de la rama
          useNativeDriver: false,
        })
      );
    });

    // Ejecutar todas las animaciones en paralelo
    Animated.parallel(animaciones).start();
  };

  const estiloGeneralAnimado = {
    transform: [{ scale: escalaGeneralAnimada }],
  };

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity onPress={manejarClick} activeOpacity={0.8}>
        <Animated.View style={[styles.contenedorSvg, estiloGeneralAnimado]}>
          <Svg width="100%" height="100%" viewBox="0 0 200 250">
            <G x="100" y="230" scaleY="-1">
              {/* Tronco */}
              <Line
                x1="0" y1="0"
                x2="0" y2="60"
                stroke="#8B4513"
                strokeWidth="15"
                strokeLinecap="round"
              />

              {/* Ramas */}
              <G x="0" y="55">
                {ramas.map((rama, index) => (
                  <AnimatedG key={index} x="0" y="0">
                    <AnimatedLine
                      x1="0" y1="0"
                      x2="0" y2={rama.longitud} // La longitud es animada
                      stroke="#704214"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity={rama.opacidad}
                    />
                    {/* Hojas */}
                    <AnimatedCircle
                      cx="0" cy={rama.longitud}
                      r={hojas[index] ? hojas[index].radio : 0}
                      fill="#32CD32" // Verde para las hojas
                      opacity={hojas[index] ? hojas[index].opacidad : 0}
                    />
                  </AnimatedG>
                ))}
              </G>
            </G>
          </Svg>
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.textoInstruccion}>
        Haz clic para hacer crecer el árbol
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
  },
  contenedorSvg: {
    width: 280,
    height: 350,
  },
  textoInstruccion: {
    marginTop: 30,
    fontSize: 16,
    color: '#E0E0E0',
  },
});

export default ArbolDinamicoSVG;
