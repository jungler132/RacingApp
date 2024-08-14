import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriversScreen from '../screens/DriversScreen';
import DriverDetailsScreen from '../screens/DriverDetailScreen';
import RacesScreen from '../screens/RacesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Drivers">
        <Stack.Screen 
          name="Drivers" 
          component={DriversScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DriverDetails" 
          component={DriverDetailsScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Races" 
          component={RacesScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
