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
import {colors} from '../../colors';
import {getEnterpriseBranch} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useUserDetails} from '../commonComponent/StoreContext';
import { localizationText } from '../../utils/common';

const EnterpriseCompanyLocations = ({route, navigation}) => {
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const noCompanyLocation = localizationText('Common', 'noCompanyLocation') || 'No Company Location';
  const activeBookings = localizationText('Common', 'activeBookings') || 'Active booking';
  const scheduledBookings = localizationText('Common', 'scheduledBookings') || 'Scheduled Bookings';
  const allBookings = localizationText('Common', 'allBookings') || 'All Bookings';
  const pleaseAddCompanyLocation = localizationText('Common', 'pleaseAddCompanyLocation') || 'Please add a company location from the manage company locations.';
  const [enterpriseBranches, setEnterpriseBranches] = useState(
    route.params.branches,
  );

  useEffect(() => {
    // getEnterpriseBranch(
    //   userDetails.userDetails[0].ext_id,
    //   successResponse => {
    //     setLoading(false);
    //     if (successResponse[0]._success) {
    //       if (successResponse[0]._response) {
    //         if (successResponse[0]._response.name == 'NotAuthorizedException') {
    //           Alert.alert('Error Alert', successResponse[0]._response.name, [
    //             {text: 'OK', onPress: () => {}},
    //           ]);
    //         } else {
    //           setEnterpriseBranches(successResponse[0]._response);
    //         }
    //       }
    //     }
    //   },
    //   errorResponse => {
    //     console.log('errorResponse', errorResponse[0]._errors.message);
    //     setLoading(false);
    //     Alert.alert('Error Alert', errorResponse[0]._errors.message, [
    //       {text: 'OK', onPress: () => {}},
    //     ]);
    //   },
    // );
  }, []);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        {enterpriseBranches.length > 0 ? (
          enterpriseBranches.map((item, index) => {
            return (
              <View key={index} style={styles.franchiseCard}>
                <View style={styles.franchiseCardHeader}>
                  <Image
                    style={styles.companyImga}
                    source={require('../../image/home.png')}
                  />
                  <Text style={styles.franchiseStreet}>{item.branch_name}</Text>
                </View>

                <View style={styles.bookedCardInfo}>
                  <View>
                    <Text style={styles.bookedInfo}>{activeBookings}</Text>
                    <Text style={styles.bookedDetails}>
                      {item.active_order || 0}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.bookedInfo}>{scheduledBookings}</Text>
                    <Text style={styles.bookedDetails}>
                      {item.schedule_order || 0}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.bookedInfo}>{allBookings}</Text>
                    <Text style={styles.bookedDetails}>{item.total || 0}</Text>
                  </View>
                </View>

                <View style={styles.companyLocation}>
                  <EvilIcons name="location" size={22} color="#000" />
                  <Text style={styles.locationAddress}>
                    {item.address +
                      ', ' +
                      item.city +
                      ', ' +
                      item.state +
                      ', ' +
                      item.country}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.scrollViewContainer}>
            <View style={styles.noDataContainer}>
              <Image
                style={styles.loaderMap}
                source={require('../../image/No-Data-Table.png')}
              />
              <Text style={styles.textCompany}>{noCompanyLocation}</Text>
              <Text style={styles.subText}>
                {pleaseAddCompanyLocation}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('EnterpriseBottomNav')}
          style={styles.nextBt}>
          <Text style={styles.btnText}>{localizationText('Common', 'goHome')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  informatinMainCard: {
    width: '32%',
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
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
  informatinCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allInformatinCard: {
    flexDirection: 'row',
  },
  informationText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  bookingsInfo: {
    fontSize: 30,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  welcomeHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  userWelcome: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  aboutPage: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  deliveryRecently: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 5,
  },
  recentlyInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seAllText: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  packageDetailCard: {
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
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
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 5,
  },
  fromLocation: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 15,
  },
  Location: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  borderShow: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 15,
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  valueMoney: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  allDeleveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyImga: {
    width: 30,
    height: 30,
  },
  franchiseStreet: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginLeft: 10,
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
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  textCompany: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

export default EnterpriseCompanyLocations;
