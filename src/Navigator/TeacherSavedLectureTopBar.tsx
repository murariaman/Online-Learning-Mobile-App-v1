import * as React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {TeacherSavedVideo, TeacherSavedMaterial} from '../Screens/Teacher/Screens';
import Colors from '../utils/Color';
const TopTab = createMaterialTopTabNavigator();
const {width} = Dimensions.get('screen');

const TeacherSavedLectureTopBar = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  return (
    <TopTab.Navigator
        initialRouteName='StudentSavedVideo'
        tabBarOptions={{
          labelStyle: { fontSize: 12, color: Colors.white() },
          tabStyle: { width: width / 2 },
          style: { backgroundColor: Colors.darkBlue(), elevation: 0 },
          indicatorStyle: {backgroundColor: Colors.darkBlue()},
        }}
        >
        <TopTab.Screen 
          name="TeacherSavedVideo" 
          component={TeacherSavedVideo} 
          options={{
            tabBarLabel: 'Upload Video'
          }}
          initialParams={{ subject_details: subject_details }}
        />
        <TopTab.Screen 
          name="TeacherSavedMaterial" 
          component={TeacherSavedMaterial} 
          options={{
            tabBarLabel: 'Upload Material'
          }}
          initialParams={{ subject_details: subject_details }}
        />
    </TopTab.Navigator>
  );
};

export default TeacherSavedLectureTopBar;