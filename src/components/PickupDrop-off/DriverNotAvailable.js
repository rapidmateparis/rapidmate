import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {colors} from '../../colors';

const DriverNotAvailable = ({navigation}) => {

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../image/Driver-Bg2.png')}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/Driver-Not-Found.png')}
          />
          <Text style={styles.text}>Couldn’t find driver</Text>
          <Text style={styles.subText}>
            No drivers available in your area for now, please try again later
          </Text>
        </View>

        <TouchableOpacity style={styles.requestTouch}>
          <Text style={styles.cancelRequest}>Try Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  loaderMap: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
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
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  requestTouch: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 12,
    marginTop: '20%',
  },
});

export default DriverNotAvailable;
