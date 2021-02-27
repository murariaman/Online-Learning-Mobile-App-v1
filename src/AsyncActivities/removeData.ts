import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
