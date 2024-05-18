import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {StoreContext} from './src/components/commonComponent/StoreContext';

const App = () => {
  return (
    <StoreContext>
      <AppNavigator />
    </StoreContext>
  );
};

export default App;
