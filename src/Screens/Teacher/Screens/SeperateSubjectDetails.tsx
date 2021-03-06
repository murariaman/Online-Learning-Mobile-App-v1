import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import BottomRightFab from '../components/TeacherBottomRightFab';
import Loader from '../../../components/Loader';
import Colors from '../../../utils/Color';
const {width, height} = Dimensions.get('screen');

export const SeperateSubjectDetails = ({route, navigation}: any) => {
    const [singleSubjectDetails, setSingleSubjectdetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const subjectId = route.params.subjectId;

    const getParticularCourseDetails = async () => {
        try{
            setLoading(true);
            const particularSubject: any = [];
            const fullSubjectDetails = 
                await firestore()
                    .collection('subject_details')
                    .where('subject_id', '==',subjectId.toString())
                    .get();

            fullSubjectDetails.forEach((res: any) => {
                const { subject_name, subject_id, teacher_name } = res.data();
                particularSubject.push({
                    subject_name,
                    subject_id,
                    teacher_name
                });
            })
            // console.log(particularSubject)
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
        !loading && !singleSubjectDetails.length ? <Loader /> : (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={false}
                backgroundColor={Colors.headerBlue()}
                title={singleSubjectDetails ? singleSubjectDetails[0].subject_name : 'Loading...'}
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText={singleSubjectDetails ? `By ${singleSubjectDetails[0].teacher_name}` : 'Not Available'}
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                    <View style={styles.categoryBody}>
                        <View style={{}}>
                            <View style={[styles.liveNowStyle]}>
                                <Text>Live class Details</Text>
                            </View>
                        </View>
                        <View style={{padding: 15, marginTop: 10}}>
                            <View style={styles.mainRow}>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherSavedLectureTopBar', {
                                        subject_details: singleSubjectDetails[0]
                                    })}>
                                        <Text style={styles.mainHeading}>Upload Lecture</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Ionicons name='ios-videocam-outline' size={45} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherBlogPost', {
                                        teacher: true,
                                        subject_details: singleSubjectDetails[0]
                                        })}>
                                        <Text style={styles.mainHeading}>Subject Doubts</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <SimpleLineIcons name='info' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                            <View style={{marginTop: 20}}></View>
                            <View style={styles.mainRow}>
                                <View style={styles.categoryViewStyle}>
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherAssignment', {
                                        subject_details: singleSubjectDetails[0]
                                    })}>
                                        <Text style={styles.mainHeading}>Assignments</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Feather name='edit' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.categoryViewStyle}>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('TeacherExam', {
                                    subject_details: singleSubjectDetails[0]
                                })}>
                                        <Text style={styles.mainHeading}>Exam</Text>
                                        <Text style={styles.description}>Teacher Name</Text>
                                        <Text></Text>
                                        <View style={styles.iconDiv}>
                                            <Text style={styles.mainIcon}>
                                                <Feather name='clipboard' size={40} color={Colors.darkColor()} />
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    liveNowStyle: {
        padding: 15, 
        marginTop: '1%', 
        backgroundColor: Colors.headerFontColor(), 
        height: 120, 
        borderRadius: 15, 
        borderTopRightRadius: 0
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
    categoryScreen: {},
    categoryViewStyle: {
        backgroundColor: '#F2F2FA',
        width: '47%',
        height: 160,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    mainRow: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    mainHeading: {
        fontSize: 16, 
        color: Colors.black(), 
        fontWeight: '700'
    },
    description: {
        fontSize: 12, 
        paddingTop: 4
    },
    iconDiv: {
        width: '100%', 
        height: 70,
        alignItems: 'center',
    },
    mainIcon: {
        textAlign: 'left', 
        marginLeft: 5
    },
});
