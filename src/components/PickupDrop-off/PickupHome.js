import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import {
  useServiceTypeDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {getNotificationCount, getServiceTypeApi} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {localizationText} from '../../utils/common';

const PickupHome = ({navigation}) => {
  const {userDetails, saveUserDetails} = useUserDetails();
  const {serviceTypeDetails, saveServiceTypeDetails} = useServiceTypeDetails();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const {setLoading} = useLoader();

  useEffect(() => {
    setLoading(true)
    getServiceTypeApi(
      null,
      successResponse => {
        setLoading(false)
        console.log('getServiceTypeApi===>', successResponse[0]._response);
        saveServiceTypeDetails(successResponse[0]._response);
      },
      errorResponse => {
        setLoading(false)
        console.log('errorResponse', errorResponse);
      },
    );
    getNotificationAllCount();
  }, []);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const getScheduledServiceDetails = () => {
    return serviceTypeDetails.find(
      service => service.service_name === 'Scheduled',
    );
  };

  const getNonScheduledServiceDetails = () => {
    return serviceTypeDetails.find(
      service => service.service_name !== 'Scheduled',
    );
  };

  const getNotificationAllCount = () => {
    setLoading(true);
    getNotificationCount(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        console.log(
          'getNotificationAllCount==>successResponse',
          '' + JSON.stringify(successResponse[0]._response.notificationCount),
        );
        const newUserDetails = userDetails.userDetails[0];
        if (successResponse[0]?._response?.notificationCount) {
          newUserDetails['notificationCount'] =
            successResponse[0]._response.notificationCount;
        } else {
          newUserDetails['notificationCount'] = 0;
        }
        saveUserDetails({...userDetails, userDetails: [newUserDetails]});
      },
      errorResponse => {
        setLoading(false);
        console.log(
          'getNotificationAllCount==>errorResponse',
          '' + errorResponse[0],
        );
      },
    );
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View style={styles.welcomeHome}>
          <View>
            <Text style={styles.userWelcome}>
              {localizationText('Common', 'welcome')}{' '}
              <Text style={styles.userName}>
                {userDetails.userDetails[0].first_name +
                  ' ' +
                  userDetails.userDetails[0].last_name}
              </Text>
            </Text>
            <Text style={styles.aboutPage}>
              {localizationText('Main', 'consumerWelcomeDescription')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const newUserDetails = userDetails.userDetails[0];
              newUserDetails['notificationCount'] = 0;
              saveUserDetails({...userDetails, userDetails: [newUserDetails]});
              navigation.navigate('Notifications');
            }}>
            <EvilIcons name="bell" size={40} color="#000" />
            {userDetails.userDetails[0].notificationCount > 0 && (
              <View style={styles.notificationCountStyle}>
                <Text style={styles.notificationCountText}>
                  {userDetails.userDetails[0].notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.requestPickup}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails
                ? getNonScheduledServiceDetails()
                : [],
            });
          }}>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>
              {localizationText('Main', 'consumerRequestPickup')}
            </Text>
            <Text style={styles.packageDiscription}>
              {localizationText('Main', 'consumerRequestPickupDescription')}
            </Text>
          </View>
          <View>
            <Image
              style={{width: 55, height: 112}}
              source={require('../../image/package-girl.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestPickup}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails
                ? getNonScheduledServiceDetails()
                : [],
            });
          }}>
          <View>
            <Image
              style={{width: 60, height: 112}}
              source={require('../../image/package-boy.png')}
            />
          </View>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>
              {localizationText('Main', 'consumerRequestDropoff')}
            </Text>
            <Text style={styles.packageDiscription}>
              {localizationText('Main', 'consumerRequestDropoffDescription')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestPickup}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails
                ? getNonScheduledServiceDetails()
                : [],
            });
          }}>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>
              {localizationText('Main', 'consumerRequestMover')}
            </Text>
            <Text style={styles.packageDiscription}>
              {localizationText('Main', 'consumerRequestMoverDescription')}
            </Text>
          </View>
          <View>
            <Image
              style={{width: 125, height: 106}}
              source={require('../../image/PackageMove-img.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestPickupPack}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails
                ? getScheduledServiceDetails()
                : [], //
            });
          }}>
          <View style={styles.packingCardImgas}>
            <Image
              style={{width: 125, height: 106}}
              source={require('../../image/package-packing.png')}
            />
          </View>
          <View style={styles.packagePack}>
            <Text style={styles.packageRequst}>
              {localizationText('Main', 'consumerScheduleDelivery')}
            </Text>
            <Text style={styles.packageDiscription}>
              {localizationText('Main', 'consumerScheduleDeliveryDescription')}
            </Text>
            <View style={styles.specialDiscount}>
              <MaterialCommunityIcons
                name="brightness-percent"
                size={15}
                color="#FF0058"
              />
              {serviceTypeDetails && (
                <Text style={styles.discountPercentage}>
                  {serviceTypeDetails[0]?.discount}% OFF
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  recentlyInfo: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allinfoSee: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seAllText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
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
    marginBottom: 10,
    marginTop: 10,
    marginRight: 10,
  },
  packageRequst: {
    fontSize: 14,
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
    paddingTop: 20,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 10,
    marginTop: 7,
    marginRight: 10,
  },
  pickcard: {
    width: '60%',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  packagePack: {
    width: '65%',
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 35,
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
    marginRight: 30,
  },
  timingIcon: {
    position: 'absolute',
    top: '-10%',
    left: '30%',
    width: 35,
    height: 35,
  },
  notificationCountStyle: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    height: 16,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
});

export default PickupHome;
