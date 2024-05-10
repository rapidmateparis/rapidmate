import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../colors'; // Assuming you have a colors module
import { useNavigation } from '@react-navigation/native';

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
  locationAddress: {
    flexDirection: 'row',
    alignItems: 'center',
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
    transform: [{ translateX: -50 }],
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

// Custom Marker Components
const MyCustomMarkerView = () => (
  <Image source={require('../../image/location-icon.png')} />
);

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

const MapPickupAddress = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* GooglePlacesAutocomplete */}
      <View style={{ zIndex: 1, paddingTop: 10 }}>
        <View style={styles.locationCard}>
          <View style={styles.locationAddress}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={18} color="#000000" />
            </TouchableOpacity>
            <GooglePlacesAutocomplete
              placeholder="Enter pickup address"
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              query={{
                key: 'YOUR API KEY', // Replace with your actual API key
                language: 'en',
              }}
              onFail={() => console.error('Error')}
            />
          </View>
        </View>
      </View>

      {/* MapView */}
      <MapView
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
      <TouchableOpacity style={styles.trackOrderBtn}>
        <Text style={styles.trackText}>Save pickup address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapPickupAddress;
