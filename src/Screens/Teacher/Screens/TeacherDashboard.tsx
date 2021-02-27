import React, {useContext, useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getData } from '../../../AsyncActivities/getData';
import {storeData} from '../../../AsyncActivities/storeData';
import { AuthContext } from '../../../Context';
import CommonHeader from '../../../components/StudentCommonHeader';
import TeacherCategory from '../../../components/TeacherCategory';
import SecondHeader from '../../../components/SecondHeader';
import AddNewSubject from '../components/TeacherDashboardFab';
import Colors from '../../../utils/Color';
import Loader from '../../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const TeacherDashboard = ({route, navigation}: any) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allSubject, setAllSubject] = useState([]);

  const getStudentInformation = async () => {
    setLoading(true)
    const _uid = user.uid;
    const userRemainingDetails = 
      await firestore()
        .collection('Users')
        .where('user_id', '==',_uid.toString())
        .get();
        userRemainingDetails.forEach(_batchId => {
          storeData('extra', {
            name: _batchId._data.name
          })
        })

    const subjectArray: any = [];
    try {
      const allSubjects = 
        await firestore()
        .collection('subject_details')
        .where('teacher_id', '==',user.uid)
        .get();
      allSubjects.forEach((res: any) => {
        const { subject_name, teacher_name, subject_id } = res.data();
        subjectArray.push({
          subject_name,
          teacher_name,
          subject_id
        });
      })
      setAllSubject(subjectArray);
      setLoading(false);
    } catch(e) {
      console.log(e)
    }
  };

  useEffect(() => {
    try{
      getStudentInformation()
    } catch(e){
      console.log(e)
    }
  }, []);

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          backgroundColor={Colors.headerBlue()}
          title="My Dashboard"
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
          bookmark={true}
          notification={true}
        />
        <SecondHeader 
          welcomeMSG='Mr. Teacher'
        />
        <View style={styles.mainBody}>
          {/* <ScrollView style={{}}> */}
              <View style={styles.IntroductionMsg}>
                <Text style={{fontSize: 0}}></Text>
              </View>
              <View style={styles.categoryBody}>
                <TeacherCategory 
                  navigation={navigation} 
                  route={route}
                  name='SeperateSubjectDetails'
                  allSubjectInfo={allSubject}
                />
              </View>
          {/* </ScrollView> */}
        </View>
        {/* <AddNewSubject 
          navigation={navigation}
          backgroundColor={Colors.headerBlue()}
        /> */}
      </SafeAreaView>
    </>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  IntroductionMsg: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
  },
  mainBody: {
    width,
    minHeight: height * .75, 
    backgroundColor: Colors.F9Background(), 
    borderTopRightRadius: 30, 
    position: 'relative', 
    top: -30
  },
  bodyHeading: {
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 0,
    color: Colors.extremeBlue(),
  },
  currentDate: {
    marginTop: 3
  },
  categoryBody: {
    marginTop: 15, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
});
