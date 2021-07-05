import {UpdateUserError} from '../errors';
import authHeader from './authHeader';
import {catchError, client} from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const updateUserDataService = async userData => {
  console.log('userData', userData);
  return client
    .put('/userData', userData, {headers: await authHeader()})
    .then(async response => {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user', jsonValue);

      return {
        userData,
        ...response.data,
      };
    })
    .catch(catchError(UpdateUserError));
};
export default updateUserDataService;
