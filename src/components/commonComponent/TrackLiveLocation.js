import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  usePickupAddress,
  useDropAddress,
} from '../commonComponent/StoreContext';
import {MAPS_API_KEY} from '../../common/GoogleAPIKey';
import {colors} from '../../colors';
// import { locationPermission, getCurrentLocation } from '../../common/CurrentLocation';

// Constants
const LATITUDE_DELTA = 0.0922; // Adjusted for more zoom
const ASPECT_RATIO = 0.752;

// Custom Marker Components
const MyCustomMarkerView = () => (
  <Image
    source={require('../../image/location-icon.png')}
    style={{width: 24, height: 24}}
  />
);

const MyCustomFlagMarker = () => (
  <Image
    source={require('../../image/destination-flag-icon.png')}
    style={{width: 24, height: 24}}
  />
);

const TrackLiveLocation = () => {
  const mapViewRef = useRef(null);
  const navigation = useNavigation();
  const {setPickupAddress} = usePickupAddress();
  const {setDropAddress} = useDropAddress();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    getLiveLocation();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getLiveLocation();
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, []);

  const getLiveLocation = async () => {
    try {
      const locationPermissionDenied = await locationPermission();
      if (locationPermissionDenied) {
        const {latitude, longitude} = await getCurrentLocation();
        setOrigin({latitude, longitude});
        moveToLocation({latitude, longitude});
      }
      // Example code (without actual location logic)
      const latitude = 48.85754309772872;
      const longitude = 2.3513877855537912;
      setOrigin({latitude, longitude});
      moveToLocation({latitude, longitude});
    } catch (error) {
      console.error('Error getting live location:', error);
    }
  };

  const moveToLocation = location => {
    if (location) {
      mapViewRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
      });
    }
  };

  const fetchTime = (d, t) => {
    setDistance(d);
    setTime(t);
  };

  return (
    <View style={styles.container}>
      {/* GooglePlacesAutocomplete */}

      {/* Time And Distance  */}
      {distance !== 0 && time !== 0 && (
        <View style={styles.distanceCard}>
          <Text style={[styles.distanceText, {marginBottom: 5}]}>
            Distance: {distance} km
          </Text>
          <Text style={styles.distanceText}>Time: {time} min</Text>
        </View>
      )}

      {/* MapView */}
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 48.85754309772872,
          longitude: 2.3513877855537912,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
        }}>
        {origin && (
          <Marker coordinate={origin}>
            <MyCustomMarkerView />
          </Marker>
        )}
        {destination && (
          <Marker coordinate={destination}>
            <MyCustomFlagMarker />
          </Marker>
        )}
        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#FF0058"
            optimizeWaypoints
            onStart={params => {
              console.log(
                `Started routing between '${params.origin}' and '${params.destination}'`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min`);
              fetchTime(result.distance, result.duration);
            }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  locationCard: {
    marginHorizontal: 10,
    position: 'relative',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    marginBottom: 5,
    marginTop: 5,
  },
  locationAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderDummy: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderStyle: 'dashed',
    marginHorizontal: 9,
  },
  distanceCard: {
    zIndex: 2,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    width: '50%',
  },
  distanceText: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
});

export default TrackLiveLocation;
