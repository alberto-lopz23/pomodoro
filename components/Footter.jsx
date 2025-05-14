import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <Button 
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button 
        title="ToDo"
        onPress={() => navigation.navigate('ToDo')}
      />
      <Button 
        title="Habit"
        onPress={() => navigation.navigate('Habit')}
      />
      <Button 
        title="Perfil"
        onPress={() => navigation.navigate('Perfil')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
footer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
}
})
