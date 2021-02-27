import React, {useContext, useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, StatusBar, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { getData } from '../../AsyncActivities/getData';
import {storeData} from '../../AsyncActivities/storeData';
import { AuthContext } from '../../Context';
import CommonHeader from '../../components/StudentCommonHeader';
import Category from '../../components/CategoryScreen';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const StudentDashboard = ({route, navigation}: any) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allSubject, setAllSubject] = useState([]);

  const getStudentInformation = async () => {
    setLoading(true)
    let batchId;
    const _uid = user.uid;
    const userRemainingDetails = 
      await firestore()
        .collection('Users')
        .where('user_id', '==',_uid.toString())
        .get();
        userRemainingDetails.forEach(_batchId => {
          storeData('extra', {
            name: _batchId._data.name,
            batch_id: _batchId._data.batch_id,
            roll_number: _batchId._data.roll_number
          })
          batchId = _batchId._data.batch_id;
        })
    // console.log('AA', batchId)
    // Batch Details
    if(batchId) {
      const subjectArray: any = [];
      try {
        const allSubjects = 
          await firestore()
          .collection('subject_details')
          .where('batch_id', '==',batchId)
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
          />
          <SecondHeader 
            welcomeMSG={`${user.displayName}`}
          />
          <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
                <View style={styles.IntroductionMsg}>
                  <Text style={{fontSize: 0}}></Text>
                </View>

                <View style={styles.categoryBody}>
                  {allSubject ?
                    <Category 
                      navigation={navigation} 
                      route={route}
                      name='SeperateCourseDetails'
                      allSubjectInfo={allSubject}
                    />
                  : null}

                  {allSubject.length === 0 ? 
                    <View>
                      <Text style={{textAlign: 'center'}}>You don't have any Course</Text>
                    </View>
                  : null}
                </View>
      
            {/* </ScrollView> */}
          </View>
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
  currentDate: {
    marginTop: 3
  },
  bodyHeading: {
    fontSize: 20, 
    fontWeight: '700', 
    marginTop: 0,
    color: Colors.extremeBlue(),
  },
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
});
