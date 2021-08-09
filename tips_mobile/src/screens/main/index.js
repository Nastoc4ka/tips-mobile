import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import Events from './Events';
import News from './News';
import { main, styleMainScreens } from '../../styles';
import { buttonPanelActive, buttonPanelNotActive } from '../../styles';
import {CustomButton, MainHeader, Background} from '../../components';

const Main = () => {

  const NEWS = 'Новости';
  const EVENTS = 'События';
  const userId = 10001;  

  const [activePanel, setActive] = useState(NEWS);  

  return (
    <Background>
      <MainHeader style={{...main.header, ...main.headerWitButtons}} activePanel={activePanel}/>
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
            { activePanel === NEWS ? <News userId={userId} /> : <Events id={userId} /> }
        </View>
      </View>
    </Background>
  )
};

export default Main;