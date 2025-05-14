import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function Button ({ title, onPress, style }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
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