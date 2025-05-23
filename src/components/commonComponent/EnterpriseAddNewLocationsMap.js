import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';
import {colors} from '../../colors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  usePickupAddress,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {useDropAddress} from '../commonComponent/StoreContext';
import {MAPS_API_KEY} from '../../common/GoogleAPIKey';
import {useLoader} from '../../utils/loaderContext';
import {
  createEnterpriseBranch,
  getLocationId,
  updateEnterpriseBranch,
} from '../../data_manager';
import { localizationText } from '../../utils/common';
// import { locationPermission, getCurrentLocation } from '../../common/CurrentLocation';

// Custom Marker Components
const MyCustomMarkerView = () => (
  <Image source={require('../../image/location-icon.png')} />
);

const MyCustomFlagMarker = () => (
  <Image source={require('../../image/destination-flag-icon.png')} />
);

const EnterpriseAddNewLocationsMap = props => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const {savePickupAddress} = usePickupAddress();
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const mapViewRef = useRef(null);
  const navigation = useNavigation();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const saveLocationAddress = localizationText('Common', 'saveLocationAddress') || '';
  const setLocationAddress = localizationText('Common', 'setLocationAddress') || '';
  const [location, setLocation] = useState(props.location);
  var sourceLocationText = '';
  if (location) {
    sourceLocationText = location.address;
    sourceLocationText += location.city ? ', ' + location.city : '';
    sourceLocationText += location.state ? ', ' + location.state : '';
    sourceLocationText += location.country ? ', ' + location.country : '';
  }

  useEffect(() => {
    setSelectedLocation(props.location);
  }, []);

  // Function to move map view to a specific location
  const moveToLocation = location => {
    if (location) {
      mapViewRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

  const saveLocation = () => {
    if (props.title == '') {
      Alert.alert('Error Alert', 'Please enter a title', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      setLoading(true);
      let requestParams = {
        enterprise_ext_id: userDetails.userDetails[0].ext_id,
        branch_name: props.title,
        address: selectedLocation.address,
        city: selectedLocation.city,
        state: selectedLocation.state,
        country: selectedLocation.country,
        postal_code: selectedLocation.postal_code,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      };
      if (props.location) {
        requestParams.id = props.location.id;
        requestParams.enterprise_id = props.location.enterprise_id;
        updateEnterpriseBranch(
          requestParams,
          successResponse => {
            if (successResponse[0]._success) {
              setLoading(false);
              navigation.goBack();
            }
          },
          errorResponse => {
            setLoading(false);
            Alert.alert('Error Alert', errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      } else {
        createEnterpriseBranch(
          requestParams,
          successResponse => {
            if (successResponse[0]._success) {
              setLoading(false);
              navigation.goBack();
            }
          },
          errorResponse => {
            setLoading(false);
            Alert.alert('Error Alert', errorResponse[0]._errors.message, [
              {text: 'OK', onPress: () => {}},
            ]);
          },
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* GooglePlacesAutocomplete */}
      <View style={{zIndex: 1, paddingTop: 10}}>
        <View style={styles.locationCard}>
          <View>
            <View style={styles.locationAddress}>
              <GooglePlacesAutocomplete
                styles={{
                  textInput: {
                    color: colors.black,
                  },
                  description: {color: colors.black},
                  color: colors.black,
                }}
                ref={ref => {
                  if (location) {
                    ref?.setAddressText(sourceLocationText);
                  }
                }}
                textInputProps={{
                  placeholderTextColor: colors.lightGrey,
                  returnKeyType: 'search',
                  onChangeText: text => {
                    if (text) {
                      setLocation(null);
                    }
                  },
                }}
                fetchDetails={true}
                placeholder={setLocationAddress}
                onPress={(data, details = null) => {
                  let originCoordinates = {
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                  };
                  let locationDetails = data.description.split(',');
                  let locationParams = {
                    location_name: locationDetails[0] ? locationDetails[0] : '',
                    address: locationDetails[0] ? locationDetails[0] : '',
                    city: locationDetails[1] ? locationDetails[1] : '',
                    state: locationDetails[2] ? locationDetails[2] : '',
                    country: locationDetails[3] ? locationDetails[3] : '',
                    postal_code: '23424',
                    latitude: originCoordinates.latitude,
                    longitude: originCoordinates.longitude,
                  };
                  setSelectedLocation(locationParams);
                  setOrigin(originCoordinates);
                  moveToLocation(originCoordinates);
                }}
                query={{
                  key: MAPS_API_KEY,
                  language: 'en',
                }}
                onFail={() => console.error('Error')}
              />

              {/* <AntDesign name="arrowright" size={18} color="#000000" /> */}
            </View>
          </View>
        </View>
      </View>

      {/* MapView */}
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 48.85754309772872,
          longitude: 2.3513877855537912,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {origin !== undefined ? (
          <Marker coordinate={origin}>
            <MyCustomMarkerView />
          </Marker>
        ) : null}
        {destination !== undefined ? (
          <Marker coordinate={destination}>
            <MyCustomFlagMarker />
          </Marker>
        ) : null}
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={MAPS_API_KEY}
          />
        ) : null}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          savePickupAddress(selectedLocation);
          saveLocation();
        }}
        style={styles.trackOrderBtn}>
        <Text style={styles.trackText}>{saveLocationAddress}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterpriseAddNewLocationsMap;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  locationCard: {
    marginHorizontal: 10,
    position: 'relative',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  locationAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TextInputAddress: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  borderDummy: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderStyle: 'dashed',
    marginHorizontal: 9,
  },
  trackOrderBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    width: '90%',
    paddingVertical: 12,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: '18%',
    transform: [{translateX: -50}],
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});
