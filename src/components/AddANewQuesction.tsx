import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar, KeyboardAvoidingView, Alert } from 'react-native';
import SecondHeader from '../components/SecondHeader';
import {TextInput, Button} from 'react-native-paper';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../Context';
import CommonHeader from './StudentCommonHeader';
import Colors from '../utils/Color';

const {width, height} = Dimensions.get('screen');
const AddANewQuesction = ({route, navigation}: any) => {
    const {user} = React.useContext(AuthContext);
    const {subject_id} = route.params;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
    const getCurrentDate = () => {
        const today: Date = new Date();
        const date = today.getDate() + " - "+ (parseInt(`${today.getMonth()}`) + 1)+" - "+ today.getFullYear();
        return date;
    }
    const guidGenerator = () => {
        var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    return (
        <>
            <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
            <SafeAreaView style={styles.container}>
                <CommonHeader
                    back={false}
                    x={true}
                    backgroundColor={Colors.headerBlue()}
                    title="Add A Quesction"
                    fontColor={Colors.headerFontColor()}
                    navigation={navigation}
                />
                <SecondHeader 
                    mainText='Subject Name'
                    secondText='Question By Student Name'
                />
                <View style={styles.mainBody}>
                    <ScrollView style={{}}>
                        <View style={styles.categoryBody}>
                            <View style={styles.whiteBody}>
                                <View style={{padding: 8, paddingLeft: 15, paddingRight: 15}}>
                                    <Text></Text>
                                    <Text>Your quesction will be available everybody to answer</Text>
                                    <Text>Date: {getCurrentDate()}</Text>
                                </View>
                                <View style={{marginTop: 15, padding: 15}}> 
                                    <Formik
                                        initialValues={{
                                            question_id: guidGenerator(),
                                            subject_id: subject_id,
                                            user_id: user.uid,
                                            question: '',
                                            description: ''
                                        }}
                                        onSubmit={values => {
                                            console.log(values)
                                            firestore()
                                            .collection('subject_q_and_a')
                                            .add(values)
                                            .then(() => {
                                                values.question=''
                                                values.description=''
                                                Alert.alert('Question added Successfully!')
                                            })
                                            .catch(e => console.log(e));
                                        }}
                                        >
                                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                                        <View>
                                            <TextInput
                                                keyboardType="default"
                                                label="Type a Quesction"
                                                multiline={true}
                                                numberOfLines={8}
                                                onChangeText={handleChange('question')}
                                                onBlur={handleBlur('question')}
                                                value={values.question}
                                                style={styles.answerInput}
                                            />
                                            <TextInput
                                                keyboardType="default"
                                                label="Enter a Description"
                                                multiline={true}
                                                numberOfLines={3}
                                                onChangeText={handleChange('description')}
                                                onBlur={handleBlur('description')}
                                                value={values.description}
                                                style={styles.answerInput}
                                            />
                                            <Button 
                                                mode="contained"
                                                onPress={handleSubmit}
                                                style={styles.btn}
                                                >
                                                Add A Quesction
                                            </Button>
                                        </View>
                                        )}
                                    </Formik>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default AddANewQuesction;

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
    whiteBody: {
        backgroundColor: Colors.white(), 
        borderRadius: 10,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    quesction: {
        padding: 15,
        fontSize: 15, 
        fontWeight: '700',
        color: Colors.extremeBlue(),
    },
    answerInput: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 15
    },
    btn: {
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        backgroundColor: Colors.extremeBlue()
    }
});
