import React, {useState} from 'react';
import AppNavigator from './src/AppNavigator';
import {StoreContext} from './src/components/commonComponent/StoreContext';
import {NetworkProvider} from './src/utils/networkContext';
import {StripeProvider} from '@stripe/stripe-react-native';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e"
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <StoreContext>
        <NetworkProvider>
          <MenuProvider>
            <AppNavigator />
          </MenuProvider>
        </NetworkProvider>
      </StoreContext>
    </StripeProvider>
  );
};

export default App;
