import React from 'react';
import AppNavigator from './src/AppNavigator';
import { StoreContext } from './src/components/commonComponent/StoreContext';
import { NetworkProvider } from './src/utils/networkContext';

const App = () => {
  return (
    <StoreContext>
      <NetworkProvider>
        <AppNavigator />
      </NetworkProvider>
    </StoreContext>
  );
};

export default App;
