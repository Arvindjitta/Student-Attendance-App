import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/home';
import Criminal from './screens/criminal';
import Render from './screens/render';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Criminal Face Recognition App', headerShown: false
          }}
        /> */}
        <Stack.Screen name="Criminal" component={Criminal} options={{
            title: 'Criminal Screen', headerShown: false
          }}/>
        <Stack.Screen name="Render" component={Render} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}