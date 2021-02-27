import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StudentDashboard, SeperateCourseDetails} from '../Screens/Student';
const Stack = createStackNavigator();
const StudentHomeStack = ({navigation}: any) => {
  return (
    <Stack.Navigator
        initialRouteName={'StudentDashboard'}
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="SeperateCourseDetails" component={SeperateCourseDetails} />
    </Stack.Navigator>
  );
};
export default StudentHomeStack;