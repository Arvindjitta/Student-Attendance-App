import 'react-native-gesture-handler';
import  React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home';
import Criminal from './screens/criminal';


const Stack = createStackNavigator();

export default function App () {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'FirstScreen' }}
        />
        <Stack.Screen name="Criminal" component={Criminal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


