import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import CommonHeader from '../components/StudentCommonHeader';
import SecondHeader from '../components/SecondHeader';
import Colors from '../utils/Color';
import Chatbot from '../Screens/Chatbot/Chatbot';

const {width, height} = Dimensions.get('screen');
const SeperateSubjectChat = ({navigation}: any) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
            x={true}
            backgroundColor={Colors.headerBlue()}
            title="Subject Chat"
            fontColor={Colors.headerFontColor()}
            navigation={navigation}
        />
        <SecondHeader 
            blank={true}
        />
        <View style={styles.mainBody}>
            {/* <ScrollView style={{}}>
              <View style={styles.categoryBody}>
                <Text>Chat Body</Text>
                
              </View>
            </ScrollView> */}
            <Chatbot />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SeperateSubjectChat;

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
        minHeight: height * .83, 
        backgroundColor: Colors.F9Background(), 
        borderTopRightRadius: 30, 
        position: 'relative', 
        top: -30
    },
    // categoryBody: {
    //     marginTop: 25, 
    //     paddingLeft: 15, 
    //     paddingRight: 15,
    //     marginBottom: 130
    // },
});
