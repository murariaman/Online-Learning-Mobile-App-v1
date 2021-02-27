import React, {useState, useEffect} from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, FlatList, Text } from 'react-native';
import {Provider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import SecondHeader from '../../components/SecondHeader';
import BottomRightFab from '../../components/StudentBottomRightFab';
import Colors from '../../utils/Color';
import MaterialMenu from '../../components/MaterialMenu';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const StudentSavedMaterial = ({route, navigation}: any) => {
  const {subject_details} = route.params; 
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
  const [empty, setEmpty] = useState(false);

  const getParticularCourseDetails = async () => {
    try{
      setLoading(true);
      const particularSubject: any = [];
      const fullSubjectDetails = 
        await firestore()
          .collection('saved_material')
          .where('subject_id', '==',subject_details.subject_id.toString())
        .get();
    
      fullSubjectDetails.forEach((res: any) => {
        const { file_url, file_name } = res.data();
        particularSubject.push({
          file_name,
          file_url
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
    {loading ?
      <Loader />
    :
    <Provider>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <SecondHeader 
          mainText='Lecture Material'
        />
        <View style={styles.mainBody}>
          {/* <ScrollView style={{}}> */}
            <View style={styles.categoryBody}>
              {empty ?
                <View style={styles.zeroQuestion}>
                  <Text>No Material Found!</Text>
                </View>
              :
              <View style={styles.materialContent}>
                <FlatList 
                  data={singleSubjectDetails}
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  renderItem={ ({ item: materialDetails }) => {
                    return(
                      <MaterialMenu 
                        materialDetails={materialDetails}  
                        navigation={navigation}
                      />
                    )
                  }}
                  keyExtractor={ (item, index) => index.toString() }
                  />
                </View>
              }
            </View>
          {/* </ScrollView> */}
        </View>
        <BottomRightFab
          backgroundColor={Colors.darkColor()}
          navigation={navigation}
        />
      </SafeAreaView>
    </Provider>
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
    marginBottom: 130,
    marginTop: 15, 
    paddingLeft: 15, 
    paddingRight: 15,
  },
  upperTop: {
    width, 
    height: 90, 
    backgroundColor: '#4B83F2', 
    paddingRight: 15, 
    paddingLeft: 15
  },
  zeroQuestion: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
});
