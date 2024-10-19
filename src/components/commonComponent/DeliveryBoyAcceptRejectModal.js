import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useLocationData} from './StoreContext';
import {orderRequestAction} from '../../data_manager';

function DeliveryBoyAcceptRejectModal({
  isDeliveryBoyAcceptRejectModalModalVisible,
  setDeliveryBoyAcceptRejectModalModalVisible,
  deliveryBoyAcceptRejectMessage,
}) {
  const translateXAccept = useSharedValue(0);
  const translateXReject = useSharedValue(0);
  const {locationData} = useLocationData();

  const toggleModal = () => {
    setDeliveryBoyAcceptRejectModalModalVisible(
      !isDeliveryBoyAcceptRejectModalModalVisible,
    );
  };

  const gestureHandlerAccept = useAnimatedGestureHandler({
    onActive: event => {
      translateXAccept.value = event.translationX;
    },
    onEnd: () => {
      if (translateXAccept.value > 100) {
        console.log('Accept action triggered', translateXAccept);
      }
      translateXAccept.value = withSpring(0);
    },
  });

  const gestureHandlerReject = useAnimatedGestureHandler({
    onActive: event => {
      translateXReject.value = event.translationX;
    },
    onEnd: () => {
      if (translateXReject.value > 100) {
        console.log('Reject action triggered', translateXReject);
      }
      translateXReject.value = withSpring(0); // Reset animation
    },
  });

  const animatedStyleAccept = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateXAccept.value}],
    };
  });

  const animatedStyleReject = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateXReject.value}],
    };
  });

  const getLocationAddress = locationId => {
    let result = locationData.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const handleOrderRequest = value => {
    let params = {
      delivery_boy_ext_id: deliveryBoyAcceptRejectMessage?.deliveryBoy?.ext_id,
      order_number: deliveryBoyAcceptRejectMessage?.order?.order_number,
      status: value ? 'Accepted' : 'Rejected',
    };
    orderRequestAction(
      params,
      successResponse => {
        console.log('successResponse==>', JSON.stringify(successResponse));
      },
      errorResponse => {
        console.log('errorResponse==>', JSON.stringify(errorResponse));
      },
    );
  };

  return (
    <Modal isVisible={isDeliveryBoyAcceptRejectModalModalVisible}>
      {console.log(
        'deliveryBoyAcceptRejectMessage===>',
        deliveryBoyAcceptRejectMessage?.order?.order_number,
      )}
      <GestureHandlerRootView>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <View style={styles.container}>
              <Image
                style={styles.loaderMap}
                source={require('../../image/Big-Package.png')}
              />
              <Text style={styles.maintext}>New delivery request!</Text>
              <Text style={styles.subText}>
                There is a new delivery request on your route, you can accept
                they request also{' '}
                {`\n\n ${deliveryBoyAcceptRejectMessage?.order?.order_number}`}
              </Text>
            </View>
            <View style={styles.addressCard}>
              <View style={styles.devileryMap}>
                <View style={styles.Delivering}>
                  <View style={{padding: 15}}>
                    <Text style={styles.DeliveringText}>Pickup from</Text>
                    <Text style={styles.subAddress}>
                      {getLocationAddress(
                        deliveryBoyAcceptRejectMessage?.order
                          ?.pickup_location_id,
                      )}
                    </Text>
                    <Text style={styles.distance}>0.3 km away</Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={styles.mapAddress}
                    source={require('../../image/dummyMap.png')}
                  />
                </View>
              </View>
            </View>
            <View style={styles.addressCard}>
              <View style={styles.devileryMap}>
                <View style={styles.Delivering}>
                  <View style={{padding: 15}}>
                    <Text style={styles.DeliveringText}>Drop on</Text>
                    <Text style={styles.subAddress}>
                      {getLocationAddress(
                        deliveryBoyAcceptRejectMessage?.order
                          ?.dropoff_location_id,
                      )}
                    </Text>
                    <Text style={styles.distance}>0.3 km away</Text>
                  </View>
                </View>
                <View>
                  <Image
                    style={styles.mapAddress}
                    source={require('../../image/dummyMap.png')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.swipeAcceptContainer}>
            <PanGestureHandler
              onEnded={() => {
                handleOrderRequest(true);
                toggleModal();
              }}
              onGestureEvent={gestureHandlerAccept}>
              <Animated.View
                style={[styles.swipeableAccept, animatedStyleAccept]}>
                <AntDesign name="check" size={24} color="#fff" />
              </Animated.View>
            </PanGestureHandler>

            <Text style={styles.text}>Swipe to accept</Text>
            <Image
              style={{marginLeft: 10}}
              source={require('../../image/swipe_right.png')}
            />
          </View>
          <View style={styles.swipeRejectContainer}>
            <PanGestureHandler
              onEnded={() => {
                handleOrderRequest(false);
                toggleModal();
              }}
              onGestureEvent={gestureHandlerReject}>
              <Animated.View
                style={[styles.swipeableReject, animatedStyleReject]}>
                <AntDesign name="close" size={24} color="#fff" />
              </Animated.View>
            </PanGestureHandler>
            <Text style={styles.text}>Swipe to reject</Text>
            <Image
              style={{marginLeft: 10}}
              source={require('../../image/swipe_right.png')}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  swipeAcceptContainer: {
    height: 60,
    backgroundColor:
      'background: linear-gradient(90deg, rgba(39, 174, 96, 0.12) 30.26%, rgba(39, 174, 96, 0.04) 80.04%);',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    margin: 10,
  },
  swipeRejectContainer: {
    height: 60,
    backgroundColor:
      'background: linear-gradient(90deg, rgba(186, 26, 26, 0.12) 30.26%, rgba(186, 26, 26, 0.04) 80.04%);',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    margin: 10,
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: '#555',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 30,
  },
  swipeableAccept: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableReject: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#BA1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    height: '90%',
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#a57046',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '30%',
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  loaderMap: {
    width: 100,
    height: 100,
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  devileryMap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 10,
  },
  Delivering: {
    flex: 1,
  },
  DeliveringText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subAddress: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 3,
  },
  addressCard: {
    paddingHorizontal: 15,
    height: 100,
    width: '100%',
    marginBottom: 15,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  mapAddress: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  maintext: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  timerCount: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default DeliveryBoyAcceptRejectModal;
