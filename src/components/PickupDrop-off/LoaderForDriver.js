import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
  BackHandler,
} from 'react-native';
import CancellationModal from '../commonComponent/CancellationModal';
import {colors} from '../../colors';
import {
  usePlacedOrderDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {
  cancelOrderConsumer,
  getAllocatedDeliveryBoy,
  getLocations,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useIsFocused} from '@react-navigation/native';
import {localizationText} from '../../utils/common';

const LoaderForDriver = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {placedOrderDetails} = usePlacedOrderDetails();
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();
  const isVisible = useIsFocused();

  const [reTryCount, updateReTryCount] = useState(0);

  const timeout = React.useRef(null);

  const toggleModal = vehicleDetails => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const onBackPress = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocationsData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isVisible && reTryCount !== null && reTryCount <= 5) {
      getLocationsData();
    }
  }, [reTryCount, isVisible]);

  const getLocationsData = () => {
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          const params = {
            userRole: userDetails?.userDetails[0]?.role,
            orderNumber: placedOrderDetails[0]?.order_number,
          };
          getAllocatedDeliveryBoy(
            params,
            successResponse => {
              updateReTryCount(null);
              clearTimeout(timeout.current);
              navigation.navigate('OrderPickup', {
                driverDetails: successResponse[0]._response,
                locationList: tempOrderList,
              });
            },
            errorResponse => {
              timeout.current = setTimeout(() => {
                updateReTryCount(reTryCount + 1);
                if (reTryCount === 5) {
                  navigation.navigate('DriverNotAvailable', errorResponse);
                }
              }, 30000);
            },
          );
        }
      },
      errorResponse => {
        if (errorResponse[0]._errors.message) {
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        }
      },
    );
  };

  const submitCancelOrder = selectedReason => {
    setLoading(true);
    let params = {
      order_number: placedOrderDetails[0]?.order_number,
      cancel_reason_id: selectedReason.id,
      cancel_reason: selectedReason.reason,
    };
    cancelOrderConsumer(
      params,
      successResponse => {
        setLoading(false);
        console.log(
          'order_cancel===>successResponse',
          '' + JSON.stringify(successResponse),
        );
        navigation.navigate('PickupOrderCancelled');
      },
      errorResponse => {
        setLoading(false);
        console.log('order_cancel===>errorResponse', '' + errorResponse);
      },
    );
  };

  return (
    <ScrollView
      style={{width: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
          marginVertical: 40,
        }}>
        <ImageBackground
          source={require('../../image/Driver-Bg.png')}
          style={styles.background}>
          {/* Your content */}
          <View style={styles.container}>
            <Image
              style={styles.loaderMap}
              source={require('../../image/Driver-Looking-Map.png')}
            />
            <Text style={styles.text}>
              {localizationText('Common', 'lookingForDriver')}
            </Text>
            <Text style={styles.subText}>
              {localizationText('Common', 'lookingForDriverDescription')}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{width: '100%', height: '100%', position: 'absolute', top: 0}}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../image/Driver-Bg2.png')}
        />
      </View>
      <TouchableOpacity
        onPress={() => toggleModal()}
        style={styles.requestTouch}>
        <Text style={styles.cancelRequest}>
          {localizationText('Common', 'cancelRequest')}
        </Text>
      </TouchableOpacity>

      {/* CancellationModal Modal  */}
      <CancellationModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        submitCancelOrder={submitCancelOrder}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 10,
    marginTop: 20,
  },
});

export default LoaderForDriver;
