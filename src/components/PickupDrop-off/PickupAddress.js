import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import VehicleDimensionsModal from '../commonComponent/VehicleDimensions';
import DateAndTimePickerModal from '../commonComponent/DateAndTimePicker';
import MapAddress from '../commonComponent/MapAddress';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Img.png';
import PartnerImage from '../../image/Partner.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import {
  getLocationId,
  getAllVehicleTypes,
  getDistancePriceList,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import moment from 'moment';

const PickupAddress = ({route, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState();
  const [sourceLocation, setSourceLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const [distanceTime, setDistanceTime] = useState();
  const {setLoading} = useLoader();
  const [sourceLocationId, setSourceLocationId] = useState();
  const [destinationLocationId, setDestinationLocationId] = useState();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [distancePriceList, setDistancePriceList] = useState([]);
  const [pickupDateTime, setPickupDateTime] = useState({});

  const toggleModal = vehicleDetails => {
    setVehicleDetails(vehicleDetails);
    setModalVisible(!isModalVisible);
  };

  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    setLoading(true);
    getAllVehiclesType();
  }, []);

  const getAllVehiclesType = () => {
    getAllVehicleTypes(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setVehicleTypeList(successResponse[0]._response);
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const onSourceLocation = location => {
    setSourceLocation(location);

    let locationDetails = location.sourceDescription.split(',');
    let locationParams = {
      location_name: locationDetails[0] ? locationDetails[0] : '',
      address: locationDetails[0] ? locationDetails[0] : '',
      city: locationDetails[1] ? locationDetails[1] : '',
      state: locationDetails[2] ? locationDetails[2] : '',
      country: locationDetails[3] ? locationDetails[3] : '',
      postal_code: '23424',
      latitude: location.originCoordinates.latitude,
      longitude: location.originCoordinates.longitude,
    };
    setLoading(true);
    getLocationId(
      locationParams,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setSourceLocationId(successResponse[0]._response.location_id);
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  useEffect(() => {
    getDistancePrice();
  }, [distanceTime]);

  const getDistancePrice = () => {
    getDistancePriceList(
      distanceTime?.distance,
      successResponse => {
        setDistancePriceList(successResponse[0]._response);
      },
      errorResponse => {
        console.log('errorResponse==>', '' + errorResponse[0]);
      },
    );
  };

  const getPriceUsingVechicelType = vehicleTypeId => {
    let finalPrice = 0;
    let result = distancePriceList.filter(
      priceList => priceList.vehicle_type_id == vehicleTypeId,
    );
    finalPrice = result[0]?.total_price;
    return finalPrice;
  };

  const onDestinationLocation = location => {
    setDestinationLocation(location);

    let locationDetails = location.destinationDescription.split(',');
    let locationParams = {
      location_name: locationDetails[0] ? locationDetails[0] : '',
      address: locationDetails[0] ? locationDetails[0] : '',
      city: locationDetails[1] ? locationDetails[1] : '',
      state: locationDetails[2] ? locationDetails[2] : '',
      country: locationDetails[3] ? locationDetails[3] : '',
      postal_code: '23425',
      latitude: location.destinationCoordinates.latitude,
      longitude: location.destinationCoordinates.longitude,
    };
    setLoading(true);
    getLocationId(
      locationParams,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setDestinationLocationId(successResponse[0]._response.location_id);
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const onFetchDistanceAndTime = value => {
    setDistanceTime(value);
  };

  const navigateToAddPickupAddress = () => {
    console.log('pickupDateTime ===>',pickupDateTime)
    if (
      selectedVehicle &&
      sourceLocation &&
      destinationLocation &&
      selectedVehiclePrice &&
      distanceTime &&
      selectedVehicleDetails &&
      sourceLocationId &&
      destinationLocationId 
     
    ) {

      if(route?.params?.pickupService?.id == 1 && (!pickupDateTime.pickupTime ||
        !pickupDateTime.pickupDate)){
          Alert.alert(
            'Alert',
            'Please choose the schedule date and time',
            [{text: 'OK', onPress: () => {}}],
          );
          return
        }


      if (route?.params?.pickupService?.id == 1) {
        var scheduleParam = {
          schedule_date_time: `${pickupDateTime.pickupDate} ${moment(
            pickupDateTime.time,
          ).format('hh:mm')}`,
        };
      }
      navigation.push('AddPickupdetails', {
        selectedVehicle: selectedVehicle,
        selectedVehicleDetails: selectedVehicleDetails,
        selectedVehiclePrice: selectedVehiclePrice,
        sourceLocation: sourceLocation,
        destinationLocation: destinationLocation,
        distanceTime: distanceTime,
        sourceLocationId: sourceLocationId,
        destinationLocationId: destinationLocationId,
        serviceTypeId: route?.params?.pickupService?.id || 2,
        paymentDiscount: route?.params?.pickupService?.discount,
        ...scheduleParam,
      });
    } else {
      Alert.alert(
        'Alert',
        'Please choose location and vehicle / Vehicle price or location not available',
        [{text: 'OK', onPress: () => {}}],
      );
    }
  };

  const getImage = vehicleData => {
    switch (vehicleData.vehicle_type_id) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return MiniTruckImage;
      case 6:
        return MiniVanImage;
      case 7:
        return SemiTruckImage;
      default:
        return OtherImage;
    }
  };

  const getDateAndTime = dateAndTime => {
    console.log('dateAndTime', dateAndTime);
    setPickupDateTime(dateAndTime);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{height: '50%', position: 'relative'}}>
        <MapAddress
          onFetchDistanceAndTime={onFetchDistanceAndTime}
          onSourceLocation={onSourceLocation}
          onDestinationLocation={onDestinationLocation}
        />
        {route?.params?.pickupService?.id == 1 && (
          <View style={styles.dateCard}>
            <EvilIcons name="calendar" size={25} color="#000" />
            <Text style={styles.dateCardText}>
              When do you need it?
              <Text>
                {pickupDateTime.pickupDate && (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      color: colors.secondary,
                    }}>
                    {'\n'}Date: {pickupDateTime.pickupDate}
                  </Text>
                )}
                {pickupDateTime.pickupTime && (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      color: colors.secondary,
                    }}>
                    {' '}
                    {'\n'}Time: {pickupDateTime.pickupTime}
                  </Text>
                )}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                toggleScheduleModal();
              }}>
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 14,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Schedule
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: colors.white,
          flexGrow: 1,
        }}>
        <View>
          <View style={styles.chooseVehicleCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              <Text style={styles.chooseVehicle}>Choose a Vehicle</Text>
              <Text style={styles.selectedVehiclePrice}>
                € {getPriceUsingVechicelType(selectedVehicleDetails?.id)}
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                {vehicleTypeList.filter(vehicle=>vehicle.vehicle_type_id !== 8).map((vehicle, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (sourceLocation && destinationLocation) {
                        setSelectedVehicle(vehicle.vehicle_type);
                        setSelectedVehicleDetails(vehicle);
                        const price = getPriceUsingVechicelType(vehicle.id);
                        setSelectedVehiclePrice(price);
                      } else {
                        Alert.alert(
                          'Error Alert',
                          'Please select source and distination',
                          [{text: 'OK', onPress: () => {}}],
                        );
                      }
                    }}
                    style={styles.cardVehicle}>
                    <View
                      style={[
                        styles.allVehicleCard,
                        selectedVehicle === vehicle.vehicle_type
                          ? styles.selectedCard
                          : null,
                      ]}>
                      <TouchableOpacity
                        onPress={() => toggleModal(vehicle)}
                        style={styles.infoIcons}>
                        <Image source={require('../../image/info.png')} />
                      </TouchableOpacity>
                      <Image
                        style={[styles.vehicleImage, {width: 80, height: 80}]}
                        source={getImage(vehicle)}
                      />
                    </View>
                    <Text style={styles.vehicleTypeName}>
                      {vehicle.vehicle_type}
                    </Text>
                    <Text style={styles.vehicleCap}>
                      {vehicle.vehicle_type_desc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          onPress={navigateToAddPickupAddress}
          style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue to order details</Text>
          <AntDesign name="arrowright" size={20} color="#000000" />
        </TouchableOpacity>
      </ScrollView>

      {/* ----------- Modal Start Here -----------------  */}
      <VehicleDimensionsModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        vehicleDetails={vehicleDetails}
      />

      <DateAndTimePickerModal
        isScheduleModalVisible={isScheduleModalVisible}
        setScheduleModalVisible={setScheduleModalVisible}
        getDateAndTime={getDateAndTime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateCard: {
    position: 'absolute',
    bottom: 1,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0.0625},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    marginBottom: 5,
    marginTop: 5,
  },
  dateCardText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 10,
    color: colors.text,
  },
  chooseVehicle: {
    fontSize: 18,
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  chooseVehicleCard: {
    backgroundColor: colors.white,
    paddingVertical: 15,
  },
  cardVehicle: {
    paddingHorizontal: 5,
  },
  allVehicleCard: {
    backgroundColor: colors.white,
    padding: 13,
    borderWidth: 1,
    borderColor: '#2C303336',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCard: {
    borderColor: colors.secondary,
  },
  vehicleImage: {
    height: 62,
    resizeMode: 'center',
  },
  vehicleTypeName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginTop: 5,
  },
  vehicleCap: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginBottom: 10,
    width: 100,
  },
  selectedVehiclePrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  continueText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  infoIcons: {
    position: 'absolute',
    top: -10,
    right: -11,
    padding: 10,
  },
  bicycleImage: {
    width: 48,
    height: 57,
  },
  motorbikeImage: {
    width: 51,
    height: 58,
  },
  miniTruckImage: {
    width: 74,
    height: 58,
  },
  miniVanImage: {
    width: 110,
    height: 58,
  },
  semiTruckImage: {
    width: 110,
    height: 58,
  },
});

export default PickupAddress;
