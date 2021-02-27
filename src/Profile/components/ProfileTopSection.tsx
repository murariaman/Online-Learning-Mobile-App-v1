import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Colors from '../../utils/Color';

const ProfileTopSection = (props: any) => {
  const {name} = props;
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5}}>
        <Image 
          style={{width: 100, height: 100}}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKAow4o83Lcyh1oR4Huj3F837w8DKc0s6-wg&usqp=CAU'}}
        />
      </View>
      <Text style={{textAlign: 'center'}}>{name}</Text>
      <Text style={{marginTop: 3}}></Text>
    </View>
  );
};

export default ProfileTopSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white(),
  },
});
