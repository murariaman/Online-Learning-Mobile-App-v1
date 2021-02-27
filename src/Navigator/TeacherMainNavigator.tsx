import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeacherBottomTab from '../Navigator/TeacherBottomTab';
import TeacherSavedLectureTopBar from '../Navigator/TeacherSavedLectureTopBar';
import {
    TeacherAddNewCourse, TeacherAssignment, ParticularAssignmentView, ParticularExamView, TeacherExam
} from '../Screens/Teacher/Screens';
import SubjectBlogPost from '../components/SubjectBlogPost';
import AddANewQuesction from '../components/AddANewQuesction';
import { QuestionAnswer } from '../Screens/Student';
import BlogAnswer from '../components/BlogAnswer';
import WebViewComponent from '../components/WebViewComponent';
const TeacherStack = createStackNavigator();

const TeacherMainNavigator = ({navigation}: any) => {
    return(
        <TeacherStack.Navigator
            initialRouteName={'TeacherBottomTab'}
            screenOptions={{headerShown: false}}
            >
            <TeacherStack.Screen name="TeacherBottomTab" component={TeacherBottomTab} />
            <TeacherStack.Screen name="TeacherAddNewCourse" component={TeacherAddNewCourse} />
            <TeacherStack.Screen name="TeacherSavedLectureTopBar" component={TeacherSavedLectureTopBar} />
            <TeacherStack.Screen name="TeacherBlogPost" component={SubjectBlogPost} />
            <TeacherStack.Screen name="AddAQuesction" component={AddANewQuesction} />
            <TeacherStack.Screen name="QuestionAnswer" component={QuestionAnswer} />
            <TeacherStack.Screen name="BlogAnswer" component={BlogAnswer} />
            <TeacherStack.Screen name="TeacherAssignment" component={TeacherAssignment} />
            <TeacherStack.Screen name="TeacherExam" component={TeacherExam} />
            <TeacherStack.Screen name="ParticularAssignmentView" component={ParticularAssignmentView} />
            <TeacherStack.Screen name="ParticularExamView" component={ParticularExamView} />
            <TeacherStack.Screen name="WebViewComponent" component={WebViewComponent} />
        </TeacherStack.Navigator>
    );
}
export default TeacherMainNavigator;