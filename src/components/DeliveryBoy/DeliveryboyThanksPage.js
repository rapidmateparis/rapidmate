import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CancellationModal from '../commonComponent/CancellationModal';
import {colors} from '../../colors';

const DeliveryboyThanksPage = ({navigation}) => {
  return (
    <ScrollView
      style={{width: '100%', backgroundColor: '#FBFAF5'}}
      contentContainerStyle={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 450,
          position: 'relative',
          marginVertical: 40,
        }}>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/ThanksPage-Timer.png')}
          />
          <Text style={styles.text}>Thank you for signing up</Text>
          <Text style={styles.subText}>
            We are reviewing your request and we will update you about it
            shortly.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('DeliveryboyBottomNav')}
        onPress={() => navigation.popToTop()}
        style={[styles.logbutton, {backgroundColor: colors.primary}]}>
        <Text style={styles.buttonText}>Ok</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  requestTouch: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  logbutton: {
    width: '90%',
    marginTop: '10%',
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  loaderMap: {
    width: 100,
    height: 180,
  },
});

export default DeliveryboyThanksPage;
