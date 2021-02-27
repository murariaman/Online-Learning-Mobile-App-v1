import React, { useState, useContext } from 'react';
import { 
    View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import {Button} from 'react-native-paper';
import {Formik} from 'formik';
import { AuthContext } from '../../Context';
import TextField from '../../components/TextInput';
import {capitalize} from '../../utils/Utilities';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const Signup = ({navigation}: any) => {
    const [showLoading, setShowLoading] = useState(false);
    const { signUp } = useContext(AuthContext);

    return (
      <KeyboardAvoidingView style={ styles.FullBody }>
        <SafeAreaView>
          <View>
            <Text style={ styles.MainHeading }>Padhai</Text>
            <Text></Text>
            <View style={ styles.FormArea }>
              <>
                {/* FORM BODY */}
                <Formik
                initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    batchId: '123',
                    type: 'student',
                }}
                onSubmit={async (values) => {
                  try{
                    if(values.email === '' || values.fullname === '' || values.password === '') {
                      Alert.alert('Empty Field');
                    } else {
                      signUp(values)
                      // navigation.navigate('TeacherBottomTab')
                      // const res = await handleSignup(values);
                      // if (res.data) {
                      //   values.uid = res.data.id;
                      //   values.credits = 1000;
                      //   setUser({...values, token: res.data.token});
                      //   storeData('user', {...values, token: res.data.token});
                      //   navigation.navigate(capitalize(values.type));
                      // }
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
                            />
                            {/* <TextField
                                label="Mobile No."
                                handleChange={handleChange('contact')}
                                value={values.contact}
                            /> */}

                            <TextField
                                label="Email Id"
                                handleChange={handleChange('email')}
                                value={values.email}
                            />
                            <TextField
                                label="Enter Password"
                                secure={true}
                                handleChange={handleChange('password')}
                                value={values.password}
                            />
                        </View>
                        <View>
                            <Button
                                mode="contained"
                                onPress={handleSubmit}
                                style={styles.btn}>
                                <Text style={styles.btnText}>Sign Up</Text>
                            </Button>
                        </View>
                    </View>
                )}
                </Formik>
                
                <Text style={ styles.accountText }>Already have an Account ? <Text style={ styles.LoginText } onPress={ () => { navigation.navigate('Login') } }> Sign In Now</Text></Text>
              </>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  FullBody: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#fff',
    paddingLeft: '5%',
    paddingRight: '5.5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainHeading: {
    color: '#000',
    fontSize: 44,
    letterSpacing: 2.5,
    textAlign: 'center'
  },
  ColorHeading: {
    fontSize: 44,
    color: '#28AAD8'
  },
  accountText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
  },
  LoginText: {
    color: '#28AAD8',
    fontSize: 16,
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
    width: width,
    paddingLeft: '5%',
    paddingRight: '5.5%',
  },
  FormContent: {
    marginBottom: '1.5%',
  },
});