import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {useUserDetails} from '../commonComponent/StoreContext';
import moment from 'moment';
import {localizationText} from '../../utils/common';

const DeliveryboyMainShiftDetails = ({route, navigation}) => {
  const params = route.params;
  const {userDetails} = useUserDetails();
  const [totalHours, setTotalHours] = useState(0);
  const orderClosedEarned =
    localizationText('Common', 'orderClosedEarned') ||
    'This order is closed, you earned';
  console.log(route, '============');
  useEffect(() => {
    var hours = params?.shiftItem?.total_hours
      ? params?.shiftItem?.total_hours.toFixed(2)
      : 0;
    setTotalHours(hours);
  }, []);
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View>
          <View style={styles.franchiseCard}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../image/home.png')}
            />
            <View style={styles.franchiseCardHeader}>
              <Text style={styles.franchiseStreet}>North Street Franchise</Text>
              <View style={styles.locationCard}>
                <EvilIcons name="location" size={22} color="#000" />
                <Text style={styles.franchiseSubTitle}>North Street, ABC</Text>
              </View>
            </View>
          </View>

          <View style={styles.franchiseCard}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../image/Big-Calender.png')}
            />
            <View style={styles.franchiseCardHeader}>
              <Text style={styles.franchiseStreet}>
                {localizationText('Common', 'started')} 11 AM to 8 PM
              </Text>
              <View>
                <Text style={styles.franchiseSubTitle}>
                  {localizationText('Common', 'totalDuration')}:{' '}
                  <Text style={styles.boldTexts}>
                    12 {localizationText('Common', 'hours')}
                  </Text>
                </Text>
                <Text style={styles.franchiseSubTitle}>
                  {localizationText('Common', 'totalDeliveries')}:{' '}
                  <Text style={styles.boldTexts}>12</Text>
                </Text>
                <Text style={styles.franchiseSubTitle}>
                  {params.vehicleType}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.earningCard}>
            <Text style={styles.boyEarning}>
              {orderClosedEarned}{' '}
              <Text style={styles.earnedMoney}>
                €{' '}
                {parseFloat(route.params?.orderItem?.delivery_boy_amount || 0).toFixed(
                  2,
                )}
              </Text>
            </Text>
          </View>
          <View style={styles.earningCard}>
             <TouchableOpacity
                  onPress={() => navigation.navigate('DeliveryboyHistory', {
                    orderItem: route.params?.orderItem,
                  })}
                  style={styles.nextBt}>
                  <Text style={styles.btnText}>View Orders</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  informatinCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Location: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  requestPickup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
    marginRight: 10,
  },
  franchiseCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
    marginRight: 10,
  },
  packageRequst: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  packageDiscription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginVertical: 5,
  },
  requestPickupPack: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingBottom: 20,
    paddingTop: 45,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
    marginTop: 7,
    marginRight: 10,
  },
  pickcard: {
    width: '65%',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  packagePack: {
    width: '67%',
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 50,
  },
  specialDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF00580F',
    width: 80,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 7,
  },
  discountPercentage: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
    paddingLeft: 4,
  },
  packingCardImgas: {
    position: 'relative',
  },
  timingIcon: {
    position: 'absolute',
    top: '-10%',
    left: '30%',
  },
  companyLogoCard: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  companyInfo: {
    width: 80,
  },
  companyLogosImage: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  companyNames: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingVertical: 5,
  },
  franchiseCardHeader: {
    width: '87%',
    marginLeft: 10,
  },
  franchiseStreet: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  bookedInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  bookedDetails: {
    fontSize: 26,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  bookedCardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  companyLocation: {
    flexDirection: 'row',
  },
  locationAddress: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  nextBt: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
  },
  btnText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  scheduleboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  scheduleTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 8,
  },
  scheduleSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    textAlign: 'center',
  },
  schedulecard: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
  },
  franchiseSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginVertical: 3,
  },
  locationCard: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  driverCard: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
  boldTexts: {
    fontFamily: 'Montserrat-Bold',
  },
  invoiceCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
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
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Add this line
  },
  orderFare: {
    width: '75%',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#131314',
  },
  totalmoney: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  travel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 5,
  },
  orderFareValue: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginVertical: 5,
  },
  value: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidWith: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.subText,
    marginLeft: 5,
    marginVertical: 5,
  },
  boyEarning: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  earnedMoney: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  earningCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginVertical: 10,
    padding: 13,
  },
});

export default DeliveryboyMainShiftDetails;
