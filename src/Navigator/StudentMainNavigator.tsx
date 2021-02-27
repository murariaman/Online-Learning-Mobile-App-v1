import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { StudentBottomTab } from '../../src/Navigator/StudentBottomTab';
import { QuestionAnswer, StudentAssignment, StudentSeperateExam } from '../../src/Screens/Student';
import SubjectBlogPost from '../../src/components/SubjectBlogPost';
import BlogAnswer from '../../src/components/BlogAnswer';
import AddANewQuesction from '../../src/components/AddANewQuesction';
import StudentSavedLectureTopBar from '../Navigator/StudentSavedLectureTopBar';
import Bookmark from '../../src/components/BookmarkScreen';
import Notification from '../../src/components/NotificationScreen';
import WebViewComponent from '../components/WebViewComponent';
import { LiveVideo } from '../Screens/Video';
// import SeperateSubjectChat from './src/components/SeperateSubjectChat';
const StudentStack = createStackNavigator();

const StudentMainNavigator = () => {
    return(
        <StudentStack.Navigator
            initialRouteName={'StudentBottomTab'}
            screenOptions={{headerShown: false}}
            >
            <StudentStack.Screen name="StudentBottomTab" component={StudentBottomTab} />
            <StudentStack.Screen name="StudentSavedLectureTopBar" component={StudentSavedLectureTopBar} />    
            <StudentStack.Screen name="StudentCourseAssignment" component={StudentAssignment} />
            <StudentStack.Screen name="StudentBlogPost" component={SubjectBlogPost} />
            <StudentStack.Screen name="AddAQuesction" component={AddANewQuesction} />
            <StudentStack.Screen name="QuestionAnswer" component={QuestionAnswer} />
            <StudentStack.Screen name="BlogAnswer" component={BlogAnswer} />
            <StudentStack.Screen name="StudentSeperateExam" component={StudentSeperateExam} />
            <StudentStack.Screen name="Bookmark" component={Bookmark} />
            <StudentStack.Screen name="Notification" component={Notification} />
            <StudentStack.Screen name="WebViewComponent" component={WebViewComponent} />
            <StudentStack.Screen name="LiveVideo" component={LiveVideo} /> 
            {/* <StudentStack.Screen name="SeperateSubjectChat" component={SeperateSubjectChat} /> */}
        </StudentStack.Navigator>
    );
}

export default StudentMainNavigator;