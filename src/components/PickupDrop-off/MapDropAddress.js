import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {useNavigation} from '@react-navigation/native';
import {MAPS_API_KEY} from '../../common/GoogleAPIKey';
import { useDropAddress } from '../commonComponent/StoreContext';

// Custom Marker Components
const MyCustomMarkerView = () => (
  <Image source={require('../../image/location-icon.png')} />
);

const MapDropAddress = () => {
  const { saveDropAddress } = useDropAddress();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const moveToLocation = (latitude, longitude) => {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  };

  const markers = selectedLocation ? [selectedLocation] : [];

  return (
    <View style={styles.container}>
      {/* GooglePlacesAutocomplete */}
      <View style={{zIndex: 1, paddingTop: 10}}>
        <View style={styles.locationCard}>
          <View style={styles.locationAddress}>
            <TouchableOpacity
              style={styles.backToIcon}
              onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={18} color="#000000" />
            </TouchableOpacity>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder="Enter drop address"
              onPress={(data, details = null) => {
                console.log(JSON.stringify(details?.geometry?.location));
                setSelectedLocation({
                  id: 1,
                  title: details?.formatted_address,
                  description: 'Selected Location',
                  coordinate: {
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                  },
                });
                moveToLocation(
                  details?.geometry?.location.lat,
                  details?.geometry?.location.lng,
                );
              }}
              query={{
                key: MAPS_API_KEY,
                language: 'en',
              }}
              onFail={() => console.error('Error')}
            />
          </View>
        </View>
      </View>

      {/* MapView */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 48.85754309772872,
          longitude: 2.3513877855537912,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* Markers */}
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}>
            <MyCustomMarkerView />
          </Marker>
        ))}
      </MapView>

      {/* Track Order Button */}
      <TouchableOpacity
        onPress={() => {
          saveDropAddress(selectedLocation);
          navigation.goBack();
        }}
        style={styles.trackOrderBtn}>
        <Text style={styles.trackText}>Save drop address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapDropAddress;

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
    position: 'relative',
    backgroundColor: colors.white,
    marginHorizontal: 10,
    paddingHorizontal: 5,
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
  backToIcon: {
    paddingTop: 15,
  },
  locationAddress: {
    flexDirection: 'row',
  },
  trackOrderBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    width: '90%',
    paddingVertical: 12,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
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
