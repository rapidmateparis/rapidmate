import React, {useState} from 'react';
import AppNavigator from './src/AppNavigator';
import {StoreContext} from './src/components/commonComponent/StoreContext';
import {NetworkProvider} from './src/utils/networkContext';
import {StripeProvider} from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import { requestNotificationPermission } from './src/utils/common';
import crashlytics from '@react-native-firebase/crashlytics';

const App = () => {
  useState(async () => {
    var permission = true;
    if (Platform.Version >= 33) {
      permission = await requestNotificationPermission();
    }

    if (permission) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcmtoken', fcmToken);
      }

      messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });
    }
    onSignIn()
  }, []);

  async function onSignIn() {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId('Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9'),
      crashlytics().setAttribute('credits', '1'),
      crashlytics().setAttributes({
        role: 'user',
        followers: '13',
        email: 'syszoomail@gmail.com',
        username: 'syszoo',
      }),
    ]);
  }
  
  return (
    <StripeProvider
      publishableKey="pk_test_51PgiLhLF5J4TIxENPZOMh8xWRpEsBxheEx01qB576p0vUZ9R0iTbzBFz0QvnVaoCZUwJu39xkym38z6nfNmEgUMX00SSmS6l7e"
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <StoreContext>
        <NetworkProvider>
          <AppNavigator />
        </NetworkProvider>
      </StoreContext>
    </StripeProvider>
  );
};

export default App;
