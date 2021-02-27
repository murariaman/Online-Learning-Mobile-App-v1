import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {ProfileStack} from '../Profile';
import TeacherHomeStack from '../Navigator/TeacherHomeStack';
import Colors from '../utils/Color';
const Tab = createBottomTabNavigator();
const TeacherBottomTab = ({navigation}: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'TeacherDashboardStack') {
            iconName = focused ? 'home' : 'home';
            return <AntIcon name={iconName} size={28} color={color} />;
          } else if (route.name === 'TeacherProfile') {
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
        name="TeacherDashboardStack" 
        component={TeacherHomeStack} 
        options={{
          tabBarLabel: 'Home',
          // tabBarBadge: number
        }} 
      />

      <Tab.Screen 
        name="TeacherProfile" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
          // tabBarBadge: number
        }} 
      />
    </Tab.Navigator>
  );
};

export default TeacherBottomTab;