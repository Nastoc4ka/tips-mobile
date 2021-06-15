import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native';
import Events from './Events';
import News from './News';
import { Back, Icn_filters }  from '../../assets/icons';
import Background from '../../components/Background';
import { main, styleMainScreens } from '../../styles';
import { buttonPanelActive, buttonPanelNotActive } from '../../styles';
import {CustomButton} from '../../components';

const Main = () => {
  const NEWS = 'Новости';
  const EVENTS = 'События';
  const userId = 10001;  

  const [activePanel, setActive] = useState(NEWS);  

  return (
    <Background>
      <SafeAreaView style={{width:'100%', alignItems: 'center'}}>
        <View style={main.header}>
          <TouchableHighlight>
            <Back />
          </TouchableHighlight>

          <Text style={styleMainScreens.text}>{activePanel}</Text>

          <TouchableHighlight>
            <Icn_filters />
          </TouchableHighlight>
        </View>
      </SafeAreaView>

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
            { activePanel === NEWS ? <News id={userId} /> : <Events id={userId} /> }
        </View>
      </View>
    </Background>
  )
};

export default Main;