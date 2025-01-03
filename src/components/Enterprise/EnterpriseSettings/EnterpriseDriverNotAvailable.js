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
import {colors} from '../../../colors';

const EnterpriseDriverNotAvailable = ({route,navigation}) => {
  const params = route.params;

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../../image/Driver-Bg2.png')}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../../image/Driver-Not-Found.png')}
          />
          <Text style={styles.text}>Couldn’t find driver</Text>
          <Text style={styles.subText}>
            No drivers available in your area for now, please try again later
          </Text>
        </View>
        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity
            style={styles.requestTouch}
            onPress={() => {
              navigation.navigate('EnterpriseBottomNav');
            }}>
            <Text style={styles.cancelRequest}>Go Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.requestTouch}
            onPress={() => {
              navigation.navigate('EnterpriseLookingForDriver',{
                cancellable:params?.cancellable
              });
            }}>
            <Text style={styles.cancelRequest}>Try Again</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 50,
    paddingVertical: 12,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default EnterpriseDriverNotAvailable;
