import React, {useEffect, useState} from 'react';
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
import {MAPS_API_KEY} from '../../common/GoogleAPIKey';

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
      Your Location
    </Text>
  </View>
);

export default function MapDeliveryDetails(probs = null) {
  const navigation = useNavigation();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    if (probs?.addressData) {
      setOrigin({
        latitude: probs.addressData.sourceAddress.latitude
          ? parseFloat(probs.addressData.sourceAddress.latitude)
          : 48.85754309772872,
        longitude: probs.addressData.sourceAddress.longitude
          ? parseFloat(probs.addressData.sourceAddress.longitude)
          : 2.3513877855537912,
      });

      setDestination({
        latitude: probs.addressData.destinationAddress.latitude
          ? parseFloat(probs.addressData.destinationAddress.latitude)
          : 48.86020382046169,
        longitude: probs.addressData.destinationAddress.longitude
          ? parseFloat(probs.addressData.destinationAddress.longitude)
          : 2.3565536180821782,
      });
    }
  }, [probs?.addressData]);

  const polylineCoordinates = [
    {
      latitude: probs.addressData.sourceAddress.latitude
        ? parseFloat(probs.addressData.sourceAddress.latitude)
        : 48.85754309772872,
      longitude: probs.addressData.sourceAddress.longitude
        ? parseFloat(probs.addressData.sourceAddress.longitude)
        : 2.3513877855537912,
    },
    {
      latitude: probs.addressData.destinationAddress.latitude
        ? parseFloat(probs.addressData.destinationAddress.latitude)
        : 48.86020382046169,
      longitude: probs.addressData.destinationAddress.longitude
        ? parseFloat(probs.addressData.destinationAddress.longitude)
        : 2.3565536180821782,
    },
  ];

  const markers = [
    {
      id: 1,
      title: 'My Location',
      description: 'I am here',
      coordinate: {
        latitude: probs.addressData.sourceAddress.latitude
          ? parseFloat(probs.addressData.sourceAddress.latitude)
          : 48.85754309772872,
        longitude: probs.addressData.sourceAddress.longitude
          ? parseFloat(probs.addressData.sourceAddress.longitude)
          : 2.3513877855537912,
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
          latitude: probs.addressData.sourceAddress.latitude
            ? parseFloat(probs.addressData.sourceAddress.latitude)
            : 48.85754309772872,
          longitude: probs.addressData.sourceAddress.longitude
            ? parseFloat(probs.addressData.sourceAddress.longitude)
            : 2.3513877855537912,
          latitudeDelta: 0.08,
          longitudeDelta: 0.07,
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
            latitude: probs.addressData.destinationAddress.latitude
              ? parseFloat(probs.addressData.destinationAddress.latitude)
              : 48.86020382046169,
            longitude: probs.addressData.destinationAddress.longitude
              ? parseFloat(probs.addressData.destinationAddress.longitude)
              : 2.3565536180821782,
          }}>
          <MyCustomFlagMarker />
        </Marker>
        {/* Polyline */}
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={MAPS_API_KEY}
            strokeWidth={3}
            strokeColor={colors.secondary}
            mode="DRIVING"
          />
        ) : null}
      </MapView>
    </View>
  );
}
