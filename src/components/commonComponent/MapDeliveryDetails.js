import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
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
    backgroundColor: colors.white,
    padding: 15,
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
  // borderShowOff: {
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   borderStyle: 'dashed',
  //   width: 25,
  //   transform: [{rotate: '90deg'}],
  //   position: 'absolute',
  //   top: 50,
  //   left: 11,
  // },
});

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

const polylineCoordinates = [
  {latitude: 48.85754309772872, longitude: 2.3513877855537912},
  {latitude: 48.857287428774825, longitude: 2.35238508352699},
  {latitude: 48.85985981067358, longitude: 2.3543350375785965},
  {latitude: 48.85956739763947, longitude: 2.3555714983279348},
  {latitude: 48.860283170322155, longitude: 2.3563025498806116},
];

export default function MapDeliveryDetails() {
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

  return (
    <View style={styles.container}>

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
            <Callout style={{width: 100, height: 50}}>
              <MyCustomCalloutView />
            </Callout>
          </Marker>
        ))}
        {/* Flag Marker */}
        <Marker
          coordinate={{
            latitude: 48.86020382046169,
            longitude: 2.3565536180821782,
          }}>
          <MyCustomFlagMarker />
        </Marker>
        {/* Polyline */}
        <Polyline
          coordinates={polylineCoordinates}
          strokeWidth={2}
          strokeColor={colors.secondary}
        />
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        ) : null}
      </MapView>
    </View>
  );
}
