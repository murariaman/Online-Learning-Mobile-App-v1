import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import Colors from '../../utils/Color';
const {width, height} = Dimensions.get('screen');
export const SeperateLiveClass = ({navigation}: any) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
          backgroundColor={Colors.headerBlue()}
          title="My Live Class"
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
        />
        <SecondHeader 
            mainText='All The Live Classes'
            secondText='Last Class Was On : 20th Jul 2020'
        />
        <View style={styles.mainBody}>
          <ScrollView style={{}}>
            <View style={styles.contentBody}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>You don't have any Live Class</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
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
    contentBody: {
        marginTop: 25, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
});
