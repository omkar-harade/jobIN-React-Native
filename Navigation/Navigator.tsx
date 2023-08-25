import React, { Component } from 'react'
import 'react-native-gesture-handler';
import Login from '../components/Login';
import Home from '../components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export class Navigator extends Component {
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
            headerShown: false
            }}
            >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />


            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default Navigator
