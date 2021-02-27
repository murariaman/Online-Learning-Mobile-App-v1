import * as React from 'react';
import {
  View, StyleSheet, Dimensions, SafeAreaView, Text, Image 
} from 'react-native';
import { Button } from 'react-native-paper';
const {width} = Dimensions.get('screen');

export const IntroScreen = ({navigation}: any) => {
  return (
    <>
      <SafeAreaView style={ styles.FullBody }>
        <View>
          <Image
            source={require('../../assets/Intro.png')}
            style={ styles.IntroImage }
          />
          <Text style={ styles.MainHeading }>
            Padhai
          </Text>
          <Button 
            style={ styles.btn } 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={ styles.btnText }>Login</Text>
          </Button>
          <Text style={ styles.accountText }>Wants to join? 
            {/* <Text 
              style={ styles.LoginText } 
              onPress={() => navigation.navigate('Signup')}
              > Click Here
            </Text> */}
            <Text 
              style={ styles.LoginText }
              > Contact Admin
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
FullBody: {
  flex: 1,
  backgroundColor: '#fff',
  paddingLeft: '4.5%',
  paddingRight: '4.5%',
  justifyContent: 'center',
  alignItems: 'center',
},
IntroImage: {
  width: 220,
  height: 172,
  alignSelf: 'center'
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
btn: { 
  backgroundColor: '#28AAD8', 
  width: width*.85, 
  borderRadius: 10,
  height: '11.5%',
  marginTop: '5%',
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
  paddingLeft: '26%',
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
});
