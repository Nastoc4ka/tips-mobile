import React, {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import PersonalData from './PersonalData';
import Security from './Security';
import Notifications from './Notifications';
import {useDispatch} from 'react-redux';
import {
  CHANGE_PASSWORD,
  PIN_CODE,
  LANGUAGE,
  NOTIFICATIONS,
  PERSONAL_DATA,
  SECURITY,
  SETTINGS,
  SMS_CONFIRMATION,
  PASSWORD_CONFIRMATION,
} from '../../constants/routeNames';
import {
  styleSettingsHeaderButtonRight,
  styleSettingsHeader,
} from '../../styles';
import {BackButton, CustomButton, SettingsTopPanel} from '../../components';
import {sendDataActive} from '../../redux/actions';
import ChangePassword from './ChangePassword';
import PINcode from './PINcode';
import Language from './Language';
import Settings from './Settings';
import passwordConfirmation from './passwordConfirmation';
import SmsConfirmation from './SmsConfirmation';

const screens = [
  {name: SETTINGS, component: Settings},
  {name: PERSONAL_DATA, component: PersonalData},
  {name: SECURITY, component: Security},
  {name: NOTIFICATIONS, component: Notifications},
  {name: CHANGE_PASSWORD, component: ChangePassword},
  {name: PIN_CODE, component: PINcode},
  {name: LANGUAGE, component: Language},
  {name: PASSWORD_CONFIRMATION, component: passwordConfirmation},
  {name: SMS_CONFIRMATION, component: SmsConfirmation},
];

const SettingsNavigator = () => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();

  const onSavePersonalData = () => {
    dispatch(sendDataActive());
  };

  const getTitleFromScene = ({
    descriptor: {
      options: {headerTitle, title},
    },
    route: {name},
  }) => {
    return headerTitle || title || name;
  };

  const createHeader = ({scene, previous, navigation}) => {
    const title = getTitleFromScene(scene);
    const myHeader = useMemo(
      () => (
        <SettingsTopPanel
          title={title}
          leftButton={<BackButton onPress={navigation.goBack} />}
          rightButton={
            title === PERSONAL_DATA ? (
              <CustomButton
                title={'Готово'}
                styles={styleSettingsHeaderButtonRight}
                onPress={onSavePersonalData}
              />
            ) : null
          }
          style={styleSettingsHeader}
        />
      ),
      [title],
    );

    return myHeader;
  };

  const stackScreens = screens.map(({name, component}) => (
    <Stack.Screen
      key={`${name}${component}`}
      name={name}
      component={component}
    />
  ));

  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: createHeader,
      }}>
      {stackScreens}
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
