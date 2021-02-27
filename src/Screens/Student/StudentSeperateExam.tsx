import React, {useState} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import SeperateExamCard from './components/SeperateExamCard';
import ExamDetailDesc from './components/ExamDetailDesc';
import ShowResultGraphCard from './components/ShowResultGraphCard';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const StudentSeperateExam = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  const [visible, setVisible] = useState(false)
  
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
            back={true}
            backgroundColor="#4B83F2"
            title={`${subject_details.subject_name} Exam`}
            fontColor={'#F2F2F2'}
            navigation={navigation}
        />
        <SecondHeader 
            mainText={`By ${subject_details.teacher_name}`}
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
              <View style={styles.categoryBody}>
                <View>
                    <ShowResultGraphCard />
                    <SeperateExamCard setVisible={setVisible} />
                    <SeperateExamCard setVisible={setVisible} />
                </View>
              </View>
            {/* </ScrollView> */}
        </View>
        <BottomRightFab
            backgroundColor={Colors.darkColor()}
            navigation={navigation}
        />
        <ExamDetailDesc visible={visible} setVisible={setVisible} />
      </SafeAreaView>
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
});
