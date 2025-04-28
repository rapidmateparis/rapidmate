import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StatusBar, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwipeButton from 'rn-swipe-button';
import iconAccept from '../../image/correct.png';
import iconReject from '../../image/multiply.png';
import {colors} from '../../colors';
import DeliveryboyScheduleCancellationModal from '../DeliveryBoy/DeliveryboyScheduleCancellationModal';
import { localizationText } from '../../utils/common';

const ScheduledDeliverySwipe = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = vehicleDetails => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <SwipeButton
            onSwipeFail={() => console.log('Incomplete swipe')}
            onSwipeStart={() => console.log('Swipe started')}
            onSwipeSuccess={() => {
              console.log('Request accepted');
              toggleModal();
            }}
            thumbIconImageSource={iconAccept}
            railBackgroundColor="#27AE601F"
            enable
            railStyles={{
              backgroundColor: '#27AE601F',
              borderColor: '#27AE60',
            }}
            thumbIconBackgroundColor="#4BAE4F"
            thumbIconStyles={{padding: 0, width: 0, borderWidth: 0}}
            thumbIconWidth={50}
            title={
              <View style={styles.swipeTitleComp}>
                <Text>{localizationText('Common', 'iAmReady')}</Text>
                <AntDesign
                  name="doubleright"
                  size={18}
                  color="#000"
                  style={styles.arrowIcon}
                />
              </View>
            }
            titleStyles={{
              color: '#19151C',
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          />
          <SwipeButton
            onSwipeFail={() => console.log('Incomplete swipe!')}
            onSwipeStart={() => console.log('Swipe started!')}
            onSwipeSuccess={() => console.log('Request rejected')}
            thumbIconImageSource={iconReject}
            railBackgroundColor="#BA1A1A0A"
            railStyles={{
              backgroundColor: '#BA1A1A0A',
              borderColor: '#BA1A1A',
            }}
            thumbIconBackgroundColor="#E21B1B"
            thumbIconStyles={{padding: 0, width: 0, borderWidth: 0}}
            thumbIconWidth={50}
            title={
              <View style={styles.swipeTitleComp}>
                <Text>{localizationText('Common', 'notAvailable')}</Text>
                <AntDesign
                  name="doubleright"
                  size={18}
                  color="#000"
                  style={styles.copyIcon}
                />
              </View>
            }
            enable
            titleStyles={{
              color: '#19151C',
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          />
        </View>
        {/* CancellationModal Modal  */}
        <DeliveryboyScheduleCancellationModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {padding: 15, paddingTop: 30, paddingBottom: 30},
  swipeStatus: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {color: '#fff', fontSize: 15},
  swipeTitleComp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  copyIcon: {
    position: 'absolute',
    right: -120,
  },
  arrowIcon: {
    position: 'absolute',
    right: -127,
  },
});

export default ScheduledDeliverySwipe;
