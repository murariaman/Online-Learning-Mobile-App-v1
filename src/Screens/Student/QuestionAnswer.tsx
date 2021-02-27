import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, Text, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import Loader from '../../components/Loader';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const QuestionAnswer = ({route, navigation}: any) => {
  const {questionDetails} = route.params;
  const [singleSubjectAnswer, setSingleSubjectAnswer] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const particularSubjectAnswer: any = [];
      const fullSubjectAnswer = 
        await firestore()
          .collection('all_answers')
          .where('question_id', '==',questionDetails.question_id.toString())
          .get();

      fullSubjectAnswer.forEach((res: any) => {
        const { answer } = res.data();
        particularSubjectAnswer.push({
          answer
        });
      })
      if(particularSubjectAnswer.length === 0) setEmpty(true)
      setSingleSubjectAnswer(particularSubjectAnswer)
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
    !empty && !loading && !singleSubjectAnswer.length ? <Loader /> : (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          back={true}
          backgroundColor={Colors.headerBlue()}
          title={'All Answers'}
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
        />
        <SecondHeader 
          blank={true}
        />
        <View style={styles.mainBody}>
          {/* <ScrollView style={{}}> */}
            <View style={styles.categoryBody}>
              <View style={styles.mainListBody}>
                <View style={styles.questionView}>
                  <Text style={styles.questionStyle}>{questionDetails.question}</Text>
                </View>
                <View style={styles.allAnswerView}>
                  {empty ?
                    <View style={styles.zeroQuestion}>
                      <Text>No Answer Found!</Text>
                    </View>
                  :
                  <FlatList 
                    data={singleSubjectAnswer}
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    renderItem={ ({ item: setOfAnswer }) => {
                      return(
                        <View style={styles.particularAnswer}>
                          <Text>{setOfAnswer.answer}</Text>
                        </View>
                      )
                    }}
                      keyExtractor={ (item, index) => index.toString() }
                  />
                  }
                </View>
              </View>
            </View>
          {/* </ScrollView> */}
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('BlogAnswer', {
            allDetails: questionDetails
          })}
        />
    </SafeAreaView>
    </>
    )
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
    minHeight: height * .85, 
    backgroundColor: Colors.F9Background(), 
    borderTopRightRadius: 30, 
    position: 'relative', 
    top: -30
  },
  mainListBody: {
    padding: 15,
  },
  categoryBody: {
    marginBottom: 130
  },
  zeroQuestion: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionView: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1, 
    backgroundColor: Colors.white(),
    borderColor: Colors.appWhite(), 
    borderRadius: 2, 
    marginBottom: 20,
    shadowColor: Colors.shadowWhite(),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  questionStyle: {
    fontWeight: '700'
  },
  allAnswerView: {
    paddingHorizontal: 15,
  },
  particularAnswer: {
    paddingTop: 15,
    borderBottomColor: Colors.shadowWhite(),
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.darkBlue()
  },
});
