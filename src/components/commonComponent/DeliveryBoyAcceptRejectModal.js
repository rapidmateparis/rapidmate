import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
import {orderRequestAction, updateShiftOrderStatus} from '../../data_manager';
import moment from 'moment';
import {localizationText, utcLocal} from '../../utils/common';

function DeliveryBoyAcceptRejectModal({
  isDeliveryBoyAcceptRejectModalModalVisible,
  setDeliveryBoyAcceptRejectModalModalVisible,
  deliveryBoyAcceptRejectMessage,
}) {
  const translateXAccept = useSharedValue(0);
  const translateXReject = useSharedValue(0);
  const {locationData} = useLocationData();

  const newDeliveryRequest =
    localizationText('Common', 'newDeliveryRequest') || 'New Delivery Request';
  const newShiftRequest =
    localizationText('Common', 'newShiftRequest') || 'New Shift Request';
  const estimatedCost =
    localizationText('Common', 'estimatedCost') || 'Estimated Cost';
  const totalDistance =
    localizationText('Common', 'totalDistance') || 'Total Distance';
  const orderIDText = localizationText('Common', 'orderID') || 'Order ID';
  const pickupFrom = localizationText('Common', 'pickupFrom') || 'Pickup From';
  const deliverTo = localizationText('Common', 'deliverTo') || 'Deliver To';
  const swipeToAccept =
    localizationText('Common', 'swipeToAccept') || 'Swipe to accept';
  const swipeToReject =
    localizationText('Common', 'swipeToReject') || 'Swipe to reject';
  const awayText = localizationText('Common', 'away') || 'away';
  const shiftOverview = localizationText('Common', 'shiftOverview') || 'Shift Overview';
  const totalDays = localizationText('Common', 'totalDays') || 'Total Days';
  const totalHours = localizationText('Common', 'totalHours') || 'Total Hours';
  const aproxEarning =
    localizationText('Common', 'aproxEarning') || 'Aprox Earning';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const forText = localizationText('Common', 'for') || 'For';

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
    let result = locationData.filter(
      location => location.id === Number(locationId),
    );

    if (result?.length > 0) {
      let location = result[0];
      return `${location.address}, ${location.city}, ${location.state}, ${location.country}`;
    }

    return 'Address not found';
  };

  const getLocationAddressByOrder = (address, city, state, country) => {
    return `${address}, ${city}, ${state}, ${country}`;
  };

  const handleOrderRequest = value => {
    let params = {
      delivery_boy_ext_id: deliveryBoyAcceptRejectMessage?.deliveryBoy?.ext_id,
      order_number: deliveryBoyAcceptRejectMessage?.order?.order_number,
      amount: deliveryBoyAcceptRejectMessage?.order?.amount,
      distance: deliveryBoyAcceptRejectMessage?.order?.distance,
      status: value ? 'Accepted' : 'Rejected',
    };
    orderRequestAction(
      params,
      successResponse => {
        // navigation.navigate('DeliveryboyDeliveryDetails', {
        //   order_number: deliveryBoyAcceptRejectMessage.order.order_number,
        //   package_photo: deliveryBoyAcceptRejectMessage.order.package_photo,
        //   orderItem: deliveryBoyAcceptRejectMessage.order,
        // });
        // TODO go to delivery details
        toggleModal();
      },
      errorResponse => {
        toggleModal();
      },
    );
  };

  console.log('first', deliveryBoyAcceptRejectMessage);

  const createShiftOrder = item => {
    return (
      <View style={styles.packageDetailCard}>
        <View style={styles.packageHeader}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../image/Big-Calender.png')}
          />
          <Text style={styles.deliveryTime}>{shiftOverview}</Text>
        </View>

        <View style={styles.overViewCard}>
          <View>
            <Text style={styles.requestOverview}>1</Text>
            <Text style={styles.requestOverviewInfo}>{totalDays}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              {item.total_hours ? item.total_hours.toFixed(2) : 0}
            </Text>
            <Text style={styles.requestOverviewInfo}>{totalHours}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              €
              <Text>
                {item.delivery_boy_amount
                  ? item.delivery_boy_amount.toFixed(2)
                  : 0}
              </Text>
            </Text>
            <Text style={styles.requestOverviewInfo}>{aproxEarning}</Text>
          </View>
        </View>

        <View style={styles.scheduleDateTimeCard}>
          <Text style={styles.schaduleInfo}>
            {fromText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
                utcLocal(deliveryBoyAcceptRejectMessage?.order.slot_date),
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
          <View style={styles.borderShowoff} />
          <Text style={styles.schaduleInfo}>
            {toText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
                utcLocal(deliveryBoyAcceptRejectMessage?.order.slot_date),
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </View>

        {/* <View style={styles.borderShow}></View> */}

        <View style={styles.footerCard}>
          <Text style={styles.orderId}>
            {forText} {deliveryBoyAcceptRejectMessage?.order.company_name}
          </Text>
          {/* <Text style={styles.valueMoney}>€34.00</Text> */}
        </View>
      </View>
    );
  };

  const changeCreateShiftOrder = (status, slot_id, hours) => {
    let parm = {
      order_number: deliveryBoyAcceptRejectMessage?.order?.order_number,
      status: status,
      slot_id: slot_id,
    };
    if (hours) {
      parm = {...parm, total_duration_text: hours};
    }
    updateShiftOrderStatus(
      parm,
      successRes => {
        toggleModal();
      },
      errorRes => {
        toggleModal();
      },
    );
  };

  const getOrderType = orderNumber => {
    let orderTypeMessage = 'Rapidmate Order';
    if (String(orderNumber).includes('ES')) {
      orderTypeMessage = 'Enterprise Shift Order : Shift Base';
    } else if (String(orderNumber).includes('EM')) {
      orderTypeMessage =
        'Enterprise Multiple Order : One or More drop locations';
    } else if (String(orderNumber).includes('EO')) {
      orderTypeMessage = 'Enterprise Onetime Order : One Drop location';
    } else if (String(orderNumber).includes('NS')) {
      orderTypeMessage = 'Customer Scheduled Order : One Drop location';
    } else if (String(orderNumber).includes('N')) {
      orderTypeMessage = 'Customer Order : One Drop Location';
    }
    return orderTypeMessage;
  };

  return (
    <Modal isVisible={isDeliveryBoyAcceptRejectModalModalVisible}>
      <GestureHandlerRootView>
        <View style={styles.modalContent}>
          {deliveryBoyAcceptRejectMessage?.order.delivery_type_id === 3 ? (
            <View style={styles.imageContainer}>
              <View style={styles.mainShiftcontainer}>
                <Image
                  style={styles.loaderMap}
                  source={require('../../image/Big-Calender.png')}
                />
                <Text style={styles.maintext}>{newShiftRequest}</Text>
              </View>

              <View style={styles.addressCard}>
                <View style={styles.devileryMap}>
                  <View style={styles.Delivering}>
                    <View style={{padding: 15}}>
                      <Text style={styles.DeliveringText}>
                        {deliveryBoyAcceptRejectMessage?.order?.company_name}
                      </Text>
                      <Text style={styles.subAddress}>
                        {deliveryBoyAcceptRejectMessage?.order?.address}
                      </Text>
                      <Text style={styles.distance}>{''}</Text>
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
              <View style={styles.shiftContainerCard}>
                {deliveryBoyAcceptRejectMessage?.slots &&
                  deliveryBoyAcceptRejectMessage?.slots?.length > 0 &&
                  deliveryBoyAcceptRejectMessage?.slots.map(slot => {
                    return createShiftOrder(slot);
                  })}
              </View>
              {/* <View style={styles.addressCard}>
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
                       <Text style={styles.distance}>{" "}</Text>
                     </View>
                   </View>
                   <View>
                     <Image
                       style={styles.mapAddress}
                       source={require('../../image/dummyMap.png')}
                     />
                   </View>
                 </View>
               </View> */}
              {/* <View style={styles.addressCard}>
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
                       <Text style={styles.distance}>{" "}</Text>
                     </View>
                   </View>
                   <View>
                     <Image
                       style={styles.mapAddress}
                       source={require('../../image/dummyMap.png')}
                     />
                   </View>
                 </View>
               </View> */}
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <View style={styles.container}>
                <Image
                  style={styles.loaderMap}
                  source={require('../../image/Big-Package.png')}
                />
                <Text style={styles.maintext}>{newDeliveryRequest}</Text>
                <Text style={styles.subText}>
                  {estimatedCost}:{' '}
                  <Text style={styles.boldSubText}>{`€${Number(
                    deliveryBoyAcceptRejectMessage?.order?.delivery_boy_amount,
                  ).toFixed(2)}`}</Text>
                </Text>
                <Text style={styles.subText}>
                  {totalDistance}:{' '}
                  <Text style={styles.boldSubText}>{`${Number(
                    deliveryBoyAcceptRejectMessage?.order?.distance,
                  ).toFixed(2)} Km`}</Text>
                </Text>
                <Text style={styles.subText}>
                  {orderIDText}:{' '}
                  <Text style={styles.boldSubText}>
                    {deliveryBoyAcceptRejectMessage?.order?.order_number}
                  </Text>
                </Text>
              </View>
              <View style={styles.addressCard}>
                <View style={styles.devileryMap}>
                  <View style={styles.Delivering}>
                    <View style={{padding: 15}}>
                      <Text style={styles.DeliveringText}>{pickupFrom}</Text>
                      <Text style={styles.subAddress}>
                        {getLocationAddressByOrder(
                          deliveryBoyAcceptRejectMessage?.order?.pickup_details
                            ?.address || 'Fetching...',
                          deliveryBoyAcceptRejectMessage?.order?.pickup_details
                            ?.city || '',
                          deliveryBoyAcceptRejectMessage?.order?.pickup_details
                            ?.state || '',
                          deliveryBoyAcceptRejectMessage?.order?.pickup_details
                            ?.country || '',
                        )}
                      </Text>
                      <Text style={styles.distance}>{''}</Text>
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
                      <Text style={styles.DeliveringText}>{deliverTo}</Text>
                      <Text style={styles.subAddress}>
                        {getLocationAddressByOrder(
                          deliveryBoyAcceptRejectMessage?.order?.drop_details
                            ?.address || 'Fetching...',
                          deliveryBoyAcceptRejectMessage?.order?.drop_details
                            ?.city || '',
                          deliveryBoyAcceptRejectMessage?.order?.drop_details
                            ?.state || '',
                          deliveryBoyAcceptRejectMessage?.order?.drop_details
                            ?.country || '',
                        )}
                      </Text>
                      <Text style={styles.distance}>{''}</Text>
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
              <View style={styles.container}>
                <Text style={styles.subText}>
                  <Text style={styles.orderTypeHighlight}>
                    {getOrderType(
                      deliveryBoyAcceptRejectMessage?.order?.order_number,
                    )}
                  </Text>
                </Text>
              </View>
            </View>
          )}
          <View style={styles.swipeAcceptContainer}>
            <PanGestureHandler
              onEnded={() => {
                if (
                  deliveryBoyAcceptRejectMessage?.order.delivery_type_id ===
                    3 &&
                  deliveryBoyAcceptRejectMessage?.slots?.length > 0
                ) {
                  changeCreateShiftOrder(
                    'Start',
                    deliveryBoyAcceptRejectMessage?.slots[0].id,
                  );
                } else {
                  handleOrderRequest(true);
                }
                toggleModal();
              }}
              onGestureEvent={gestureHandlerAccept}>
              <Animated.View
                style={[styles.swipeableAccept, animatedStyleAccept]}>
                <AntDesign name="check" size={24} color="#fff" />
              </Animated.View>
            </PanGestureHandler>

            <Text style={styles.text}>{swipeToAccept}</Text>
            <Image
              style={{marginLeft: 10}}
              source={require('../../image/swipe_right.png')}
            />
          </View>
          <View style={styles.swipeRejectContainer}>
            <PanGestureHandler
              onEnded={() => {
                if (
                  deliveryBoyAcceptRejectMessage?.order.delivery_type_id ===
                    3 &&
                  deliveryBoyAcceptRejectMessage?.slots?.length > 0
                ) {
                  changeCreateShiftOrder(
                    'End',
                    deliveryBoyAcceptRejectMessage?.slots[0].id,
                    '1',
                  );
                } else {
                  handleOrderRequest(false);
                }
                toggleModal();
              }}
              onGestureEvent={gestureHandlerReject}>
              <Animated.View
                style={[styles.swipeableReject, animatedStyleReject]}>
                <AntDesign name="close" size={24} color="#fff" />
              </Animated.View>
            </PanGestureHandler>
            <Text style={styles.text}>{swipeToReject}</Text>
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
    height: 50,
    backgroundColor:
      'background: linear-gradient(90deg, rgba(39, 174, 96, 0.12) 30.26%, rgba(39, 174, 96, 0.04) 80.04%);',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
  },
  swipeRejectContainer: {
    height: 50,
    backgroundColor:
      'background: linear-gradient(90deg, rgba(186, 26, 26, 0.12) 30.26%, rgba(186, 26, 26, 0.04) 80.04%);',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 10,
  },
  mainShiftcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#555',
    fontSize: 14,
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
    height: '95%',
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
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  subText: {
    color: colors.text,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginVertical: 4,
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
    fontFamily: 'Montserrat-Bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  boldSubText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },

  orderTypeHighlight: {
    marginTop: 10,
    color: colors.secondary,
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
  },

  packageDetailCard: {
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 17,
    color: colors.text,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  requestOverview: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  requestOverviewInfo: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  scheduleDateTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  schaduleInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  schaduleDateTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 20,
    marginHorizontal: 5,
  },
  shiftContainerCard: {
    width: '90%',
    paddingHorizontal: 15,
    marginTop: 20,
  },
});

export default DeliveryBoyAcceptRejectModal;
