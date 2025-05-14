import { View, Text, StyleSheet, Image } from 'react-native';
import Footer from '../components/Footter';
import 'react-native-reanimated';



export default function HomeScrees() {

    const user = 'usuario';

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
        <View style={styles.header}>
            <Text style={{ color: '#777', fontSize: 30, fontWeight: 'bold', marginRight: 10 }}>
               {saludo}
            </Text>
            <Text style={{ color: '#777', fontSize: 30 }}>
               {user}
            </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/manzano.avif')} alt='manzano' style={{ width: 300, height: 300, resizeMode: 'contain' }} />
        </View>

        <Footer />
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 20,

    },

});