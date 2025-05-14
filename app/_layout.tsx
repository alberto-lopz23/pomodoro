import 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ToDoScreen from '../screens/ToDoScreen';
import HabitScreen from '../screens/HabitScreen';
import '../styles.css'


const Stack = createNativeStackNavigator();


export default function RootLayout() {


  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name='ToDo' 
        component={ToDoScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name='Habit' 
        component={HabitScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}