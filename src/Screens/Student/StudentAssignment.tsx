import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import AssignmentCard from './components/AssignmentCard';
import AssignmentModal from './components/AssignmentModal';
import Colors from '../../utils/Color';
import Loader from '../../components/Loader';
import { getData } from '../../AsyncActivities/getData';
const {width, height} = Dimensions.get('screen');

export const StudentAssignment = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
  const [empty, setEmpty] = useState(false);

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const particularSubject: any = [];
      const fullSubjectDetails = 
        await firestore()
          .collection('all_assignments')
          .where('subject_id', '==',subject_details.subject_id.toString())
          .get();
    
      fullSubjectDetails.forEach((res: any) => {
        const { file_name, details, file_url, published_on, last_date, assignment_id, subject_id } = res.data();
        particularSubject.push({
          file_name,
          details,
          file_url,
          published_on,
          last_date,
          assignment_id,
          subject_id
        });
      })
      // console.log(particularSubject)
      if(particularSubject.length === 0) setEmpty(true)
      setSingleSubjectdetails(particularSubject)
      setLoading(false);
    } catch(e) {
      console.log(e)
    }
  }   
    
  useEffect(() => {
    setLoading(true)
    getParticularCourseDetails()
    setLoading(false);
  }, []);

  return (
    <>
    {loading ? <Loader />
    :
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          back={true}
          backgroundColor="#4B83F2"
          title={subject_details.subject_name}
          fontColor={'#F2F2F2'}
          navigation={navigation}
        />
        <SecondHeader 
          mainText={subject_details.teacher_name}
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
              <View style={styles.categoryBody}>
                <View style={{}}>
                  {/* Card */}
                  {empty ?
                    <View style={styles.zeroQuestion}>
                      <Text>No Assignment Found!</Text>
                    </View>
                  :
                    <FlatList 
                      data={singleSubjectDetails}
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      renderItem={ ({ item: assignmentDetails }) => {
                        return(
                          <AssignmentCard 
                            visible={visible}
                            setVisible={setVisible} 
                            assignmentDetails={assignmentDetails}
                            navigation={navigation} 
                            setLoading={setLoading}
                          />
                        )
                      }}
                      keyExtractor={ (item, index) => index.toString() }
                    />
                  }
                </View>
              </View>
            {/* </ScrollView> */}
        </View>
        <BottomRightFab
            backgroundColor={Colors.darkColor()}
            navigation={navigation}
        />
        
      </SafeAreaView>
    </>
    }
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
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
  answerInput: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 15
  },
  zeroQuestion: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});
