import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TeacherDashboard, SeperateSubjectDetails} from '../Screens/Teacher/Screens';
const Stack = createStackNavigator();
const TeacherHomeStack = ({navigation}: any) => {
  return (
    <Stack.Navigator
        initialRouteName={'TeacherDashboard'}
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="SeperateSubjectDetails" component={SeperateSubjectDetails} />
    </Stack.Navigator>
  );
};
export default TeacherHomeStack;