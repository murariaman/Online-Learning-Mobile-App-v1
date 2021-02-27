import React, {useState, useEffect, useContext} from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button, Provider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import CommonHeader from '../components/TeacherCommonHeader';
import SecondHeader from '../../../components/SecondHeader';
import Colors from '../../../utils/Color';
import AssignmentDialog from './components/AssignmentDialog';
import AssignmentBlockCard from './components/AssignmentBlockCard';
import Loader from '../../../components/Loader';

const {width, height} = Dimensions.get('screen');
export const TeacherAssignment = ({route, navigation}: any) => {
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
                    .collection('all_assignments')
                    .where('subject_id', '==',subject_details.subject_id.toString())
                    .get();
        
            fullSubjectDetails.forEach((res: any) => {
                const { file_name, details, file_url, published_on, last_date, assignment_id } = res.data();
                particularSubject.push({
                    file_name,
                    details,
                    file_url,
                    published_on,
                    last_date,
                    assignment_id
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
            <Loader name='file is uploading' />
        :
        <Provider>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor={Colors.headerBlue()}
                title="All Assignments"
                fontColor={Colors.headerFontColor()}
                navigation={navigation}
            />
            <SecondHeader 
                mainText={subject_details.subject_name}
            />
            <View style={styles.mainBody}>
                {/* <ScrollView style={{}}> */}
                    <View style={styles.categoryBody}>
                        {/* Upload View */}
                        <View style={styles.materialContent}>
                            <View style={styles.uploadSection}>
                                <Text style={styles.uploadText}>Want to upload ? </Text>
                                <Button onPress={() => setVisible(true)}>
                                    Click Here
                                </Button>
                            </View>
                        </View>
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
                                    <AssignmentBlockCard 
                                        navigation={navigation} 
                                        assignmentDetails={assignmentDetails}
                                    />
                                )
                            }}
                            keyExtractor={ (item, index) => index.toString() }
                            />
                        } 
                    </View>
                {/* </ScrollView> */}
            </View>
            <AssignmentDialog 
                visible={visible} 
                setVisible={setVisible} 
                loading={loading}
                setLoading={setLoading}
                subject_details={subject_details}
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
        top: 8
    },
    zeroQuestion: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});
