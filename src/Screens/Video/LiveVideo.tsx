import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import StudentCommonHeader from '../../components/StudentCommonHeader';
import Colors from '../../utils/Color';

export const LiveVideo = ({route, navigation}: any) => {
    // const {url} = route.params;
    return (
      <View style={styles.container}>
        <StudentCommonHeader 
          back={true} 
          title={'Live Class'} 
          backgroundColor={Colors.headerBlue()}
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
          bookmark={true}
          notification={true}
        />
        <WebView source={{ uri: 'https://vimeo.com/504073796' }} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
