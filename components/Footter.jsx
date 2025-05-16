import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import UserIcon from '../assets/svgs/userIcon'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <Button onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#fff" />
      </Button>
      <Button onPress={() => navigation.navigate('ToDo')}>
        <Icon name="check-circle" size={24} color="#fff" />
      </Button>
      <Button onPress={() => navigation.navigate('Habit')}>
        <Icon name="repeat" size={24} color="#fff" />
      </Button>
      <Button onPress={() => navigation.navigate('Perfil')}>
        <Icon name="person" size={24} color="#fff" />
      </Button>
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
    zIndex: 1,
  }
})
