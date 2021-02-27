import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../utils/Color'; //path may vary

const TextField = (props) => {
  const {
    secure,
    label,
    handleChange,
    value,
    multiline = false,
    style = {},
  } = props;
  return (
    <TextInput
      multiline={multiline}
      autoCapitalize={'none'}
      label={label}
      secureTextEntry={secure}
      style={[styles.TextInput, {...style}]}
      underlineColor={'#28AAD8'}
      theme={{colors: {primary: '#28AAD8'}}}
      onChangeText={handleChange}
      value={value}
    />
  );
};

export default TextField;

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: '#fff',
  },
});
