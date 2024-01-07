import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/screens/login'; // Update with the correct path
import SignupScreen from './components/screens/signup'; // Update with the correct path

// Tailwind Below
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';

const Stack = createStackNavigator();

function App() {
  return (
    <TailwindProvider utilities={utilities} as any>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;
