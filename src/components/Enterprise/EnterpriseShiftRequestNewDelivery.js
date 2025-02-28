import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useLoader} from '../../utils/loaderContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getLocationId, uploadDocumentsApi} from '../../data_manager';
import moment from 'moment';
import {useUserDetails} from '../commonComponent/StoreContext';
import MapAddress from '../commonComponent/MapAddress';
import {colors} from '../../colors';

const EnterpriseShiftRequestNewDelivery = ({route, navigation}) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [sourceLocation, setSourceLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const {setLoading} = useLoader();
  const [sourceLocationId, setSourceLocationId] = useState();
  const [destinationLocationId, setDestinationLocationId] = useState();
  const [distanceTime, setDistanceTime] = useState();
  const {userDetails} = useUserDetails();
  const routeParams = route.params;

  const onFetchDistanceAndTime = value => {
    setDistanceTime(value);
  };

  const onBranchSourceLocation = location => {
    let locationParams = {
      location_name: location.branch_name || '',
      address: location.address || '',
      city: location.city || '',
      state: location.state || '',
      country: location.country || '',
      postal_code: location.postal_code || '',
      latitude: location.latitude,
      longitude: location.longitude,
    };
    setSourceLocation(location);
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
          {text: 'OK'},
        ]);
      },
    );
  };

  const onSourceLocation = location => {
    setSourceLocation(location);

    const locationDetails = location.sourceDescription.split(',');
    const locationParams = {
      location_name: locationDetails[0] || '',
      address: locationDetails[0] || '',
      city: locationDetails[1] || '',
      state: locationDetails[2] || '',
      country: locationDetails[3] || '',
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
          {text: 'OK'},
        ]);
      },
    );
  };

  const onDestinationLocation = location => {
    setDestinationLocation(location);

    const locationDetails = location.destinationDescription.split(',');
    const locationParams = {
      location_name: locationDetails[0] || '',
      address: locationDetails[0] || '',
      city: locationDetails[1] || '',
      state: locationDetails[2] || '',
      country: locationDetails[3] || '',
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
          {text: 'OK'},
        ]);
      },
    );
  };

  return (
    <ScrollView>
      <View style={{height: 500, position: 'relative'}}>
        <MapAddress
          onFetchDistanceAndTime={onFetchDistanceAndTime}
          onSourceLocation={onSourceLocation}
          onDestinationLocation={onDestinationLocation}
        />
      </View>
      <View style={styles.driverCard}>
        <View>
          <Image
            style={{width: 60, height: 60, borderRadius: 30}}
            source={require('../../image/driver.jpeg')}
          />
        </View>
        <View style={{width: '40%', marginLeft: 10}}>
          <Text style={styles.driverName}>John Doe</Text>
          <Text style={styles.truckName}>VOLVO FH16 2022</Text>
        </View>
        <View>
          <Image
            style={{
              height: 40,
              resizeMode: 'center',
            }}
            source={require('../../image/Pickup-Icon.png')}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('EnterpriseShiftAddDetsils')}
        style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue to order details</Text>
        <AntDesign name="arrowright" size={20} color="#000000" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Location: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: '#0000001A',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 0.0625},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  continueText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },
});

export default EnterpriseShiftRequestNewDelivery;
