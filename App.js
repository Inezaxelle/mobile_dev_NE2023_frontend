import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GenerateTokenScreen from './screens/GenerateTokenScreen';
import TokenHistoryScreen from './screens/TokenHistoryScreen';
import ValidateTokenScreen from './screens/ValidateTokenScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GenerateTokenScreen" component={GenerateTokenScreen}/>
        <Stack.Screen name="TokenHistoryScreen" component={TokenHistoryScreen}/>
        <Stack.Screen name="ValidateTokenScreen" component={ValidateTokenScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  