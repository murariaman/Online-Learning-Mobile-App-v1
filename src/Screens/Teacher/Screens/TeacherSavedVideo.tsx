import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Button, Provider } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SecondHeader from '../../../components/SecondHeader';
import VideoUploadDialog from './components/VideoUploadDialog';
import BottomRightFab from '../components/TeacherBottomRightFab';
import Colors from '../../../utils/Color';

const {width, height} = Dimensions.get('screen');
export const TeacherSavedVideo = ({route, navigation}: any) => {
  const {subject_details} = route.params; 
  const [visible, setVisible] = useState(false);
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
    <Provider>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Pre Recorded Video'
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}> */}
              <View style={styles.categoryBody}>
                <View style={styles.materialContent}>
                  <View style={styles.uploadSection}>
                    <Text style={styles.uploadText}>Want to upload ? </Text>
                    <Button onPress={() => setVisible(true)}>
                      Click Here
                    </Button>
                  </View>
                </View>
                {/* Uploaded Video */}
                  <View style={{}}>
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
                {/*  */}
              </View>
            {/* </ScrollView> */}
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
          singleSubjectDetails={subject_details}
        />
        <VideoUploadDialog 
          subject_details={subject_details} 
          visible={visible} 
          setVisible={setVisible} 
        />
      </SafeAreaView>
    </Provider>
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
    marginTop: 15, 
    paddingLeft: 15, 
    paddingRight: 15,
    marginBottom: 130
  },
  materialContent: {
    backgroundColor: Colors.white(), 
    padding: 15,
    paddingTop: 0,
    borderRadius: 10,
    shadowColor: Colors.shadowWhite(),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  uploadSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    top: 6,
  },
  uploadText: {
    position: 'relative', 
    top: 10
  },
  zeroQuestion: {
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
