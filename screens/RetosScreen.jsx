import Footer from '@/components/Footter';
import { View, Text, StyleSheet } from 'react-native';
import { retos } from '@/constants/retos';



export default function RetoScreen() {
    

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);

    // Usamos el día del año para seleccionar el reto correspondiente
    const retoDelDia = retos[dayOfYear % retos.length];
    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>{retoDelDia}</Text>
            </View>
            <Footer />
        </>
    );
}



