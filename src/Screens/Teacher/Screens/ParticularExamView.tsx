import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Dimensions, ScrollView, FlatList } from 'react-native';
import { Provider } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import Colors from '../../../utils/Color';
import Loader from '../../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const ParticularExamView = ({route, navigation}: any) => {
    const {assignmentDetails} = route.params;
    const [loading, setLoading] = useState(false);
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const [empty, setEmpty] = useState(false);

    const getParticularCourseDetails = async () => {
        try{
            setLoading(true);
            const particularSubject: any = [];
            const fullSubjectDetails = 
                await firestore()
                    .collection('submitted_exams')
                    .where('exam_id', '==',assignmentDetails.exam_id.toString())
                    .get();
        
            fullSubjectDetails.forEach((res: any) => {
                const { student_name, roll_number, file_url } = res.data();
                particularSubject.push({
                    student_name,
                    roll_number,
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
        getParticularCourseDetails()
    }, []);

    return (
        <>
        {loading ?
            <Loader />
        :
        <Provider>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                x={true}
                backgroundColor={Colors.headerBlue()}
                title={assignmentDetails.file_name}
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                secondText={'Last date : ' + assignmentDetails.end_time}
            />
            <View style={styles.mainBody}>
                {/* <ScrollView style={{}}> */}
                    <View style={styles.categoryBody}>
                        {empty ?
                            <View style={styles.zeroQuestion}>
                                <Text></Text>
                                <Text>No Submission Found!</Text>
                            </View>
                        :
                        <>
                            <View style={{marginTop: 5, marginBottom: 10}}>
                                <Text style={styles.onTimeHeading}>Submitted By</Text>
                            </View>
                            <FlatList 
                                data={singleSubjectDetails}
                                showsVerticalScrollIndicator={false}
                                horizontal={false}
                                renderItem={ ({ item: assignmentDetails }) => {
                                return(
                                    <TouchableWithoutFeedback
                                        onPress={() => navigation.navigate('WebViewComponent', {
                                            url: assignmentDetails.file_url
                                        })}
                                        >
                                        <View style={styles.materialContent}>
                                            <Text>{'Name: ' + assignmentDetails.student_name}</Text>
                                            <Text>{'Roll Number:'  + assignmentDetails.roll_number}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                                }}
                                keyExtractor={ (item, index) => index.toString() }
                            />
                        </>
                        }
                    </View>
                {/* </ScrollView> */}
            </View>
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
        marginTop: 15, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
    materialContent: {
        backgroundColor: Colors.white(), 
        padding: 15,
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
        top: 8
    },
    lateHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: Colors.extremeBlue()
    },
    onTimeHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: 'green'
    },
    missingHeading: {
        fontSize: 12, 
        fontWeight: '600', 
        color: 'red'
    },
    zeroQuestion: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
