import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, Dimensions, Alert, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import {Button} from 'react-native-paper';
import {Formik} from 'formik';
import TextField from '../../components/TextInput';
import { AuthContext } from '../../Context';
import {capitalize} from '../../utils/Utilities';
const width = Dimensions.get('screen').width;

export const Login = ({navigation}: any) => {
    const [showLoading, setShowLoading] = useState(false);
    const { signIn } = useContext(AuthContext);

    return (
      <KeyboardAvoidingView style={ styles.FullBody }>
        <SafeAreaView>
          <View>
            <Text style={ styles.MainHeading }>Padhai</Text>
            <View style={ styles.FormArea }>
              <>
                {/* FORM BODY */}
                <Formik
                    initialValues={{
                    email: '',
                    password: '',
                    }}
                    onSubmit={async (values) => {
                        try{
                          if(values.email === '' || values.password === '') {
                            Alert.alert('Empty Field')
                          } else {
                              signIn(values.email, values.password)
                              // console.log(values)
                              // navigation.navigate('StudentBottomTab');
                              // const res = await handleLogin(values);
                              // if (res) {
                              //     console.log(res.data);
                              //     setUser(res.data);
                              //     // navigation.reset({
                              //     //   index: 0,
                              //     //   routes: [{name: capitalize(`${res.data.type}`)}],
                              //     // });
                              // }
                          }
                        } catch(err) {
                          Alert.alert(err);
                        }
                    }}>
                    {({handleChange, handleSubmit, values}) => (
                    <View>

                        <View>
                            <TextField
                                label="Email"
                                handleChange={handleChange('email')}
                                value={values.email}
                            />
                            <TextField
                                label="Password"
                                secure={true}
                                handleChange={handleChange('password')}
                                value={values.password}
                            />
                        </View>

                        <View style={styles.submitBody}>
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Sign In</Text>
                        </Button>
                        </View>
                    </View>
                    )}
                </Formik>
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