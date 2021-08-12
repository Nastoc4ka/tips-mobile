import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Events from './Events';
import News from './News';
import { main, styleMainScreens } from '../../styles';
import { buttonPanelActive, buttonPanelNotActive } from '../../styles';
import { CustomButton, MainHeader, Background } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsSaga } from '../../redux/actions';

const Main = () => {
  const { id } = useSelector((state) => state.authLoginReducer.user);
  const dispatch = useDispatch();

  const NEWS = 'Новости';
  const EVENTS = 'События';

  const [activePanel, setActive] = useState(NEWS);

  useEffect(() => {
    dispatch(fetchNewsSaga());
  }, []);

  return (
    <Background>
      <MainHeader style={{ ...main.header, ...main.headerWitButtons }} activePanel={activePanel} />
      <View style={main.paper}>
        <View style={styleMainScreens.buttonsTabsWrapper}>
          <CustomButton
            title={NEWS}
            styles={activePanel === NEWS ? buttonPanelActive : buttonPanelNotActive}
            onPress={() => setActive(NEWS)}
          />

          <CustomButton
            title={EVENTS}
            styles={activePanel === EVENTS ? buttonPanelActive : buttonPanelNotActive}
            onPress={() => setActive(EVENTS)}
          />
        </View>

        <View style={styleMainScreens.wrapper}>
          {activePanel === NEWS ? <News userId={id} /> : <Events id={id} />}
        </View>
      </View>
    </Background>
  );
};

export default Main;
