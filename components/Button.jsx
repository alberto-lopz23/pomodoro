import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function Button({ title, onPress, children }) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {children ? (
          children // Renderiza íconos o contenido personalizado
        ) : (
          <Text style={styles.text}>{title}</Text> // Si no hay children, usa title
        )}
      </TouchableOpacity>
    );
  }
const styles = StyleSheet.create({

    button: {
        backgroundColor: '#333',
        padding: 10

        },
    text: {
        color: '#fff',
        textAlign: 'center',
    }
})