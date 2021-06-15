import {UnauthorizedError} from "../errors";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {

        return await AsyncStorage.getItem('user')
            .then((data) => {
                return data != null ? JSON.parse(data) : null
            })
            .then((user) => {
                if (user && user.accessToken) {
                    return {'x-access-token': user.accessToken};
                } else {
                    throw new UnauthorizedError();
                }
            })
}