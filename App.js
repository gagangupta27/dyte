import React from 'react';
import {View} from 'react-native';
import { createAppContainer } from 'react-navigation';

import Mainflow from './MainFlow';


const App = () => {

  return (
      <View style={{flex:1}}>
        <Mainflow />
      </View>
  );
};


export default App;
