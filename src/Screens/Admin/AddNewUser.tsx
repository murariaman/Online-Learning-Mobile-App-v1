import React, {useState, useContext} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { RadioButton, Button, Caption } from 'react-native-paper';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import TextField from '../../components/TextInput';
import Colors from '../../utils/Color';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const AddNewUser = ({navigation}: any) => {
  const { signIn } = useContext(AuthContext);
  const [user, setUserType] = useState('student');
  const [checked, setChecked] = useState(false);
  const [adminNewUserLoading, setAdminNewUserLoading] = useState(false);

  if(adminNewUserLoading) {
    return(
        <Loader />
    );
  }

  return(
    <KeyboardAvoidingView>
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor="#4B83F2"
                title="Add New User"
                fontColor={'#F2F2F2'}
                navigation={navigation}
                bookmark={true}
                notification={true}
            />
            <SecondHeader 
                blank={true}
            />
            <View style={styles.mainBody}>
                <View style={{marginTop: 20}}>
                <View style={ styles.FormArea }>
                <>
                    {/* FORM BODY */}
                    <Formik
                    initialValues={{
                        fullname: '',
                        email: '',
                        password: '',
                        batchId: '',
                        type: 'student',
                        roll_number: ''
                    }}
                    onSubmit={async (values) => {
                    try{
                        if(values.email === '' || values.fullname === '' || values.password === '' || values.roll_number === '') {
                        Alert.alert('Empty Field');
                        } else {
                            try{
                                setAdminNewUserLoading(true)
                                await auth()
                                .createUserWithEmailAndPassword(values.email, values.password)
                                .then( userCredentials => {  
                                    firestore()
                                    .collection('Users')
                                    .add({
                                        user_id: userCredentials.user.uid,
                                        name: values.fullname,
                                        batch_id: values.batchId,
                                        roll_number: values.roll_number
                                    })
                                    .then(() => {
                                        console.log('DATA ADDED AT THE TIME OF REG', values.type)
                                        return userCredentials.user.updateProfile({
                                            displayName: values.type,
                                        })
                                    })
                                    .then(() => {
                                        try{
                                            auth().signOut();
                                            signIn('admin@padhai.com', 'admin@123')
                                            setAdminNewUserLoading(false)
                                        } catch(e) {
                                            Alert.alert(e)
                                        }
                                    })
                                    .catch((Regerror) => Alert.alert(Regerror));
                                })
                                .catch((error: any) => {
                                    if (error.code === 'auth/email-already-in-use') {
                                    Alert.alert('That email address is already in use!');
                                    } else if (error.code === 'auth/invalid-email') {
                                    Alert.alert('That email address is invalid!');
                                    } else if (error.code === 'auth/weak-password') {
                                    Alert.alert('weak password');
                                    } else
                                    Alert.alert(error);
                                });
                            } catch(e) {
                                Alert.alert(e)
                            }
                        }
                    } catch(e) {
                        console.log(e)
                    }
                    }}>
                    {({handleChange, handleSubmit, setFieldValue, values}) => (
                        <View>
                            <View>
                                <TextField
                                    label="Full Name"
                                    handleChange={handleChange('fullname')}
                                    value={values.fullname}
                                    style={styles.inputBackground}
                                />

                                <TextField
                                    label="Email Id"
                                    handleChange={handleChange('email')}
                                    value={values.email}
                                    style={styles.inputBackground}
                                />

                                <TextField
                                    label="Batch Id"
                                    handleChange={handleChange('batchId')}
                                    value={values.batchId}
                                    style={styles.inputBackground}
                                />

                                <TextField
                                    label="Roll Number"
                                    handleChange={handleChange('roll_number')}
                                    value={values.roll_number}
                                    style={styles.inputBackground}
                                />  

                                <View style={styles.radioGroup}>
                                    <RadioButton.Group
                                        onValueChange={(value) => {
                                            setUserType(value);
                                            setFieldValue('type', value);
                                        }}
                                        value={user}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={styles.radioBtn}>
                                                <RadioButton.Android
                                                    value="student"
                                                    color={Colors.darkBlue()}
                                                />
                                                <Caption>Student</Caption>
                                            </View>

                                            <View style={styles.radioBtn}>
                                                <RadioButton.Android
                                                    value="teacher"
                                                    color={Colors.darkBlue()}
                                                />
                                                <Caption>Teacher</Caption>
                                            </View>
                                        </View>
                                    </RadioButton.Group>
                                </View>

                                <TextField
                                    label="Enter Password"
                                    secure={true}
                                    handleChange={handleChange('password')}
                                    value={values.password}
                                    style={styles.inputBackground}
                                />
                            </View>
                            <View>
                                <Button
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={styles.btn}>
                                    <Text style={styles.btnText}>Add New User</Text>
                                </Button>
                            </View>
                        </View>
                    )}
                    </Formik>
                </>
                </View>
                </View>
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {},
    mainBody: {
        width,
        minHeight: height * .85, 
        backgroundColor: Colors.F9Background(), 
        borderTopRightRadius: 30, 
        position: 'relative', 
        top: -30,
        paddingLeft: 15,
        paddingRight: 15
    },
    submitBody: {},
    btn: { 
        backgroundColor: '#28AAD8', 
        width: width*.92, 
        borderRadius: 10,
        height: 45,
        marginTop: '10%',
        shadowColor: "#28AAD8",
        shadowOffset: {
        width: 0,
        height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 17,
        textTransform: 'uppercase',
        paddingLeft: '42.5%',
    },
    FormArea: {
        width: width - 30,
    },
    FormContent: {
        marginBottom: '1.5%',
    },
    accountText: {
        textAlign: 'center',
        marginTop: '5%',
        fontSize: 16,
    },
    inputBackground: {
        backgroundColor: Colors.F9Background()
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioBtn: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
