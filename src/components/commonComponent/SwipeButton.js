import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Button,
  StyleSheet,
} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import iconAccept from '../../image/correct.png';
import iconReject from '../../image/multiply.png';
import { color } from 'react-native-reanimated';
import { colors } from '../../colors';

const SwipeButtonComponent = () => {
  const [disableCBButton, setDisableCBButton] = useState(false);
  const defaultStatusMessage = 'Swipe to accept the request';
  const [swipeStatusMessage, setSwipeStatusMessage] =
    useState(defaultStatusMessage);
  const [forceResetLastButton, setForceResetLastButton] = useState(null);

  useEffect(() => {
    const interval = setInterval(
      () => setSwipeStatusMessage(defaultStatusMessage),
      5000,
    );
    return () => clearInterval(interval);
  }, [defaultStatusMessage]);

  const updateSwipeStatusMessage = message => setSwipeStatusMessage(message);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
          <SwipeButton
            onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
              updateSwipeStatusMessage('Request accepted')
            }
            thumbIconImageSource={iconAccept}
            railBackgroundColor="#27AE601F"
            title="Swipe to accept"
            enable
            railStyles={{
              backgroundColor: '#27AE601F',
              borderColor: '#27AE60',
            }}
            thumbIconBackgroundColor="#4BAE4F"
            thumbIconStyles={{padding: 0, width: 0, borderWidth: 0,}}
            thumbIconWidth={50} 
            titleStyles={{color: '#19151C', fontSize: 14, fontFamily: 'Montserrat-Regular', }}
          />
          <SwipeButton
            onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            onSwipeSuccess={() =>
              updateSwipeStatusMessage('Request rejected')
            }
            thumbIconImageSource={iconReject}
            railBackgroundColor="#BA1A1A0A"
            railStyles={{
              backgroundColor: '#BA1A1A0A',
              borderColor: '#BA1A1A',
            }}
            thumbIconBackgroundColor="#E21B1B"
            thumbIconStyles={{padding: 0, width: 0, borderWidth: 0,}}
            thumbIconWidth={50} 
            title="Swipe to reject"
            enable
            titleStyles={{color: '#19151C', fontSize: 14, fontFamily: 'Montserrat-Regular', }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {padding: 15, paddingTop: 20},
  swipeStatus: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular', 
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {color: '#fff', fontSize: 15},
});

export default SwipeButtonComponent;
