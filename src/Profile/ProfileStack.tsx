import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileHome from './ProfileHome';
const Stack = createStackNavigator();
export const ProfileStack = ({navigation}: any) => {
  return (
    <Stack.Navigator
        initialRouteName="ProfileHome"
        screenOptions={{
            headerShown: false
        }}
        >
        <Stack.Screen name="ProfileHome2" component={ProfileHome} />
    </Stack.Navigator>
  );
};