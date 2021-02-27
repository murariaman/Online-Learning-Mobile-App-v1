import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import StudentCommonHeader from './StudentCommonHeader';
import Colors from '../utils/Color';

const WebViewComponent = ({route, navigation}: any) => {
    const {url} = route.params;
    return (
      <View style={styles.container}>
        <StudentCommonHeader 
          back={true} 
          title={'Video Material'} 
          backgroundColor={Colors.headerBlue()}
          fontColor={Colors.headerFontColor()}
          navigation={navigation}
          bookmark={true}
          notification={true}
        />
        <WebView source={{ uri: url }} />
      </View>
    );
};

export default WebViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
