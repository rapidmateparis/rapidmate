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
import {colors} from '../../colors';
import { localizationText } from '../../utils/common';

const PickupFeedbackThanks = ({navigation}) => {
  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
      <ImageBackground
        style={{width: '100%', marginTop: '25%', paddingTop: '20%'}}
        source={require('../../image/DeliveryRequest-bg.png')}>
        <View style={{paddingHorizontal: 15}}>
          <View style={styles.boxCard}>
            <Image source={require('../../image/Thumb-Imgas.png')} />
            <Image
              style={styles.cloud1}
              source={require('../../image/Cloud-Graphic.png')}
            />
            <Image
              style={styles.cloud2}
              source={require('../../image/Cloud-Graphic.png')}
            />
          </View>

          <View>
            <Text style={styles.mainTitle}>
              {localizationText('Common', 'thanksForFeedback')}
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.oderIdText}>
                {localizationText('Common', 'thanksForFeedbackDes')}
              </Text>
            </View>
          </View>

          <View style={styles.mainBtnCard}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PickupBottomNav')}
              style={styles.remindlaterBtn}>
              <Text style={styles.trackText}>
                {localizationText('Common', 'goHome')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('')}
              style={styles.trackOrderBtn}>
              <Text style={styles.trackText}>
                {localizationText('Common', 'orderAgain')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 50,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  text: {
    marginRight: 5,
    color: colors.text,
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  copyIcon: {
    marginLeft: 5,
  },
  copiedMessage: {
    textAlign: 'center',
    color: colors.text,
    marginTop: 5,
  },
  oderIdText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  devileryMap: {
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
  },
  Delivering: {
    flex: 1,
    padding: 15,
  },
  DeliveringText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subAddress: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
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
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  trackOrderBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
  },
  trackText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  boxCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '20%',
    position: 'relative',
  },
  cloud1: {
    position: 'absolute',
    left: '5%',
    top: '20%',
  },
  cloud2: {
    position: 'absolute',
    right: '5%',
    top: '50%',
  },
  deliveryboyRate: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  ratingByCat: {
    fontSize: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  mainRatingCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  remindlaterBtn: {
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 12,
    borderRadius: 10,
    width: '48%',
  },
  mainBtnCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '30%',
    marginBottom: 150,
  },
  invoiceDownload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 25,
  },
});

export default PickupFeedbackThanks;
