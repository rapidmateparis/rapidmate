import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const LoaderForDriver = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {placedOrderDetails} = usePlacedOrderDetails();
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();

  const toggleModal = vehicleDetails => {
    setModalVisible(!isModalVisible);
  };

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
              navigation.navigate('OrderPickup', {
                driverDetails: successResponse[0]._response,
                locationList: tempOrderList,
              });
            },
            errorResponse => {
              navigation.navigate('DriverNotAvailable', errorResponse);
              Alert.alert('Error Alert', errorResponse[0]._errors.message, [
                {text: 'OK', onPress: () => {}},
              ]);
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

  useEffect(() => {
    getLocationsData();
  }, []);

  const submitCancelOrder = () => {
    setLoading(true);
    cancelOrderConsumer(
      placedOrderDetails[0]?.order_number,
      successResponse => {
        setLoading(false);
        console.log('order_cancel===>successResponse', '' + JSON.stringify(successResponse));
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
            <Text style={styles.text}>Looking for driver</Text>
            <Text style={styles.subText}>
              please wait, we are looking for a driver to pick up and deliver
              your order..
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
        <Text style={styles.cancelRequest}>Cancel request</Text>
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
    marginTop: '20%',
  },
});

export default LoaderForDriver;
