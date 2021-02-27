import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import StudentHomeStack from '../Navigator/StudentHomeStack';
import {StudentMainPageExam, SeperateLiveClass} from '../Screens/Student';
import { ProfileStack } from '../Profile';
import Colors from '../utils/Color';
const Tab = createBottomTabNavigator();
export const StudentBottomTab = ({navigation}: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'StudentHomeStack') {
            iconName = focused ? 'home' : 'home';
            return <AntIcon name={iconName} size={28} color={color} />;
          } else if (route.name === 'StudentLiveClass') {
            iconName = focused ? 'book' : 'book';
            return <Feather name={iconName} size={28} color={color} />;
          } else if (route.name === 'StudentExam') {
            iconName = focused ? 'clipboard' : 'clipboard';
            return <Feather name={iconName} size={28} color={color} />;
          } else if (route.name === 'StudentProfile') {
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
        name="StudentHomeStack" 
        component={StudentHomeStack} 
        options={{
          tabBarLabel: 'Home',
          // tabBarBadge: number
        }} 
      />

      <Tab.Screen 
        name="StudentExam" 
        component={StudentMainPageExam} 
        options={{
          tabBarLabel: 'Live Exam',
          // tabBarBadge: number
        }} 
      />

      <Tab.Screen 
        name="StudentLiveClass" 
        component={SeperateLiveClass} 
        options={{
          tabBarLabel: 'Live Class',
          // tabBarBadge: number
        }} 
      />

      <Tab.Screen 
        name="StudentProfile" 
        component={ProfileStack} 
        options={{
          tabBarLabel: 'Profile',
          // tabBarBadge: number
        }} 
      />
    </Tab.Navigator>
  );
};