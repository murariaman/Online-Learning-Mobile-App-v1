import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomIcon from 'react-native-vector-icons/Feather';
import { Appbar } from 'react-native-paper';
import Colors from '../../../utils/Color';

const TeacherCommonHeader = (props: any) => {
  const {back, backgroundColor, title, fontColor, navigation, x, bookmark, notification} = props;
  return (
    <Appbar.Header style={[styles.headerStyle, {backgroundColor}]}>
      {x ? (
        <CustomIcon 
          name='x' 
          onPress={() => navigation.goBack()}
          size={25} 
          style={{ 
            marginLeft: 2,
            color: fontColor
          }} 
        />
        ) : (
          back ? (
            <CustomIcon 
              name='chevron-left' 
              onPress={() => navigation.goBack()}
              size={25} 
              style={{ 
                marginLeft: 2,
                color: fontColor
              }} 
            />
          ) : (
            <CustomIcon 
              name='bar-chart-2' 
              size={28} 
              onPress={() => Alert.alert('Coming Soon...')}
              style={{
                transform: [
                  { rotate: '90deg'}, 
                  { rotateY: '180deg'}
                ], 
                marginLeft: 2,
                color: fontColor
              }} 
            />
          )
        )
      }
      <Appbar.Content 
        title={title} 
        titleStyle={[styles.mainTitle, {backgroundColor, color: fontColor}]}
      />
      {!bookmark ?
        <CustomIcon 
          name='bookmark' 
          color={fontColor} 
          size={23} 
          onPress={() => navigation.navigate('Bookmark')}
        />
      : null}
      {!notification ? ( <>
        <View style={{paddingRight: 10}}></View>
        <CustomIcon 
          name='bell' 
          color={fontColor} 
          size={23} 
          onPress={() => navigation.navigate('Notification')}
        />
      </>) : null}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    shadowOpacity: 0,
    paddingLeft: '3%',
    paddingRight: '3%',
    shadowColor: '#fff',
    elevation: 0
  },
  mainTitle: {
    fontSize: 18,
  },
});

export default TeacherCommonHeader;