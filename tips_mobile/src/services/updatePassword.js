import {UpdatePasswordError} from '../errors';
import authHeader from './authHeader';
import {catchError, client} from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const updatePassword = async password => {
  return client
    .put('/updatePassword', {password}, {headers: await authHeader()})
    .then(async response => {
      const jsonValue = JSON.stringify(response.data.userData);
      await AsyncStorage.setItem('user', jsonValue);
      return response.data;
    })
    .catch(catchError(UpdatePasswordError));
};

export default updatePassword;
