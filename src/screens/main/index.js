import React, { useState } from 'react';
import {SafeAreaView, Text, TouchableHighlight, View} from 'react-native';
import Events from './Events';
import News from './News';
import {Back, Icn_filters}  from '../../assets/icons';
import Background from '../../components/Background';
import { styleMainScreens } from '../../styles';
import { buttonPanelActive, buttonPanelNotActive } from '../../styles';
import CustomButton from "../../components/Button";

const Main = () => {
    const NEWS = 'Новости';
    const EVENTS = 'События';

    const [activePanel, setActive] = useState(NEWS);

    return (
      <Background>
          <SafeAreaView style={{width:'100%', alignItems: 'center'}}>
          <View style={styleMainScreens.header}>
              <TouchableHighlight><Back /></TouchableHighlight>
              <Text style={styleMainScreens.text}>{activePanel}</Text>
              <TouchableHighlight><Icn_filters /></TouchableHighlight>
          </View>
          </SafeAreaView>
          <View style={styleMainScreens.paper}>
              <View style={styleMainScreens.buttonsTabsWrapper}>
                  <CustomButton title={NEWS}  styles={buttonPanelActive} onPress={() => setActive(NEWS)}/>
                  <CustomButton title={EVENTS} styles={buttonPanelNotActive} onPress={() => setActive(EVENTS)}/>
              </View>
            {activePanel === NEWS ? <News /> : <Events />}
        </View>
      </Background>
    )
};

export default Main;