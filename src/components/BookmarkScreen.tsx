import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import CommonHeader from '../components/StudentCommonHeader';
import SecondHeader from '../components/SecondHeader';
import Colors from '../utils/Color';

const {width, height} = Dimensions.get('screen');
const BookmarkScreen = ({navigation}: any) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
      <SafeAreaView style={styles.container}>
        <CommonHeader
            x={true}
            bookmark={true}
            backgroundColor={Colors.headerBlue()}
            title="My Bookmark"
            fontColor={Colors.headerFontColor()}
            navigation={navigation}
        />
        <SecondHeader 
            blank={true}
        />
        <View style={styles.mainBody}>
            <ScrollView style={{}}>
                <View style={styles.categoryBody}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>You don't have any Bookmark yet</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BookmarkScreen;

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
});
