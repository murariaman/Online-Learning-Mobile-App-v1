import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { AdminHome } from '../Screens/Admin';
import { ProfileStack } from '../Profile';
import Colors from '../utils/Color';
const Tab = createBottomTabNavigator();

export const AdminBottomTab = ({navigation}: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'AdminHome') {
            iconName = focused ? 'home' : 'home';
            return <AntIcon name={iconName} size={28} color={color} />;
          } else if (route.name === 'AdminProfile') {
            iconName = focused ? 'user' : 'user';
            return <Feather name={iconName} size={28} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.darkColor(),
        inactiveTintColor: Colors.black(),
        showLabel: false
      }}
      >
      <Tab.Screen 
        name="AdminHome" 
        component={AdminHome} 
        options={{
          tabBarLabel: 'Home',
        }} 
      />

      <Tab.Screen 
        name="AdminProfile" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
        }} 
      />
    </Tab.Navigator>
  );
};