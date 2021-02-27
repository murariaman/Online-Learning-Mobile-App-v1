import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import BottomRightFab from '../../components/StudentBottomRightFab';
import SecondHeader from '../../components/SecondHeader';
import Loader from '../../components/Loader';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const StudentSavedVideo = ({route, navigation}: any) => {
  const {subject_details} = route.params;
  const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const particularSubject: any = [];
      const fullSubjectDetails = 
        await firestore()
            .collection('saved_video')
            .where('subject_id', '==',subject_details.subject_id.toString())
            .get();

      fullSubjectDetails.forEach((res: any) => {
        const { name, video_url } = res.data();
        particularSubject.push({
          name,
          video_url
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
    loading ? <Loader /> : (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Pre Recorded Video'
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
              <View style={styles.categoryBody}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {empty ?
                      <View style={styles.zeroQuestion}>
                        <Text>No Video Material Found!</Text>
                      </View>
                    :
                    <FlatList 
                      data={singleSubjectDetails}
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      renderItem={ ({ item: videoDetails }) => {
                        return(
                          <TouchableWithoutFeedback
                            onPress={() => navigation.navigate('WebViewComponent', {
                              url: videoDetails.video_url
                            })}
                            style={styles.videoStyle}
                            >
                            <View style={{width: '20%'}}>
                              <Text>Video: </Text>
                            </View>
                            <View style={{width: '80%'}}>
                              <Text>{videoDetails.name}</Text>
                            </View>
                          </TouchableWithoutFeedback>
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
  categoryBody: {
    marginTop: 25, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
  zeroQuestion: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoStyle: {
    width,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.white(),
    shadowColor: Colors.shadowWhite(),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row'
  }
});
