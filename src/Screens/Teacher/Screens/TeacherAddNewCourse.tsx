import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions } from 'react-native';
import CommonHeader from '../components/TeacherCommonHeader';
import Colors from '../../../utils/Color';
import AddCourseAPI from './components/AddCourseAPI';
import AddCourseName from './components/AddCourseName';

const {width, height} = Dimensions.get('screen');
export const TeacherAddNewCourse = ({navigation}: any) => {
  const [courseName, setCourseName] = useState('');
  return (
    <>
    <StatusBar backgroundColor="#4B83F2" barStyle='light-content' />
    <SafeAreaView style={styles.container}>
        <CommonHeader
            back={true}
            backgroundColor={Colors.headerBlue()}
            title="Add A New Subject"
            fontColor={Colors.headerFontColor()}
            navigation={navigation}
        />
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            >
            <AddCourseName setCourseName={setCourseName} />
            <AddCourseAPI courseName={courseName} />
        </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height
    },
    liveNowStyle: {
    },
    addNewCourseForm: {
        marginTop: 10
    },
    textInputStyle: {
        borderTopRightRadius: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    submitBtn: {
        backgroundColor: Colors.darkBlue(),
        height: 40,
        borderRadius: 5,
    },
});
