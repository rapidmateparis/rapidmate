import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
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
import {usePickupAddress} from '../commonComponent/StoreContext';
import {useDropAddress} from '../commonComponent/StoreContext';
import {MAPS_API_KEY} from '../../common/GoogleAPIKey';
// import { locationPermission, getCurrentLocation } from '../../common/CurrentLocation';

// Custom Marker Components
const MyCustomMarkerView = () => (
  <Image source={require('../../image/location-icon.png')} />
);

const MyCustomFlagMarker = () => (
  <Image source={require('../../image/destination-flag-icon.png')} />
);

const MyCustomCalloutView = () => (
  <View>
    <Text
      style={{
        textAlign: 'center',
        color: colors.text,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
      }}>
      Hello
    </Text>
  </View>
);

export default function EnterpriseAddNewLocationsMap() {
  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locationPermissionDenied = await locationPermission();
    if (locationPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
    }
  };
  const mapViewRef = useRef(null);
  const navigation = useNavigation();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const markers = [
    {
      id: 1,
      title: 'My Location',
      description: 'I am here',
      coordinate: {
        latitude: 48.85754309772872,
        longitude: 2.3513877855537912,
      },
    },
    // Add more markers if needed
  ];

  const {pickupAddress, setPickupAddress} = usePickupAddress();
  const {dropAddress, setDropAddress} = useDropAddress();

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

  return (
    <View style={styles.container}>
      {/* GooglePlacesAutocomplete */}
      <View style={{zIndex: 1, paddingTop: 10}}>
        <View style={styles.locationCard}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EnterpriseSetLocationAddressMap')
            }>
            <View style={styles.locationAddress}>
              <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder="Set location address"
                onPress={(data, details = null) => {
                  let originCodinates = {
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                  };
                  setOrigin(originCodinates);
                  moveToLocation(originCodinates);
                }}
                query={{
                  key: MAPS_API_KEY,
                  language: 'en',
                }}
                onFail={() => console.error('Error')}
              />

              <AntDesign name="arrowright" size={18} color="#000000" />
            </View>
          </TouchableOpacity>
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
          navigation.goBack();
        }}
        style={styles.trackOrderBtn}>
        <Text style={styles.trackText}>Save location address</Text>
      </TouchableOpacity>
    </View>
  );
}

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
