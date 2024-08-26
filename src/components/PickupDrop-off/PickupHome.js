import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapLiveTracking from '../commonComponent/MapLiveTracking';
import {colors} from '../../colors';
import {
  useServiceTypeDetails,
  useUserDetails,
} from '../commonComponent/StoreContext';
import {getServiceTypeApi} from '../../data_manager';

const PickupHome = ({navigation}) => {
  const {userDetails} = useUserDetails();
  const {serviceTypeDetails, saveServiceTypeDetails} = useServiceTypeDetails();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);

  useEffect(() => {
    getServiceTypeApi(
      null,
      successResponse => {
        console.log('getServiceTypeApi', successResponse[0]._response);
        saveServiceTypeDetails(successResponse[0]._response);
      },
      errorResponse => {
        console.log('errorResponse', errorResponse);
      },
    );
  }, []);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View style={styles.welcomeHome}>
          <View>
            <Text style={styles.userWelcome}>
              Welcome{' '}
              <Text style={styles.userName}>
                {userDetails.userDetails[0].first_name +
                  ' ' +
                  userDetails.userDetails[0].last_name}
              </Text>
            </Text>
            <Text style={styles.aboutPage}>
              This is your Rapidmate dashboard!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <EvilIcons name="bell" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.requestPickup}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails ? serviceTypeDetails[0] : [],
            });
          }}>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>Request a Pick up</Text>
            <Text style={styles.packageDiscription}>
              Avail any service for fixed time and location
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
              pickupService: serviceTypeDetails ? serviceTypeDetails[0] : [],
            });
          }}>
          <View>
            <Image
              style={{width: 60, height: 112}}
              source={require('../../image/package-boy.png')}
            />
          </View>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>Request a Drop off</Text>
            <Text style={styles.packageDiscription}>
              Avail any service for fixed time and location
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.requestPickup}
          onPress={() => {
            navigation.push('PickupAddress', {
              pickupService: serviceTypeDetails ? serviceTypeDetails[1] : [],
            });
          }}>
          <View style={styles.pickcard}>
            <Text style={styles.packageRequst}>Request a Mover</Text>
            <Text style={styles.packageDiscription}>
              Avail service of our professional packer & movers
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
              pickupService: serviceTypeDetails ? serviceTypeDetails[1] : [],
            });
          }}>
          <View style={styles.packingCardImgas}>
            <Image
              style={{width: 125, height: 106}}
              source={require('../../image/package-packing.png')}
            />
          </View>
          <View style={styles.packagePack}>
            <Text style={styles.packageRequst}>Schedule your delivery</Text>
            <Text style={styles.packageDiscription}>
              Avail any service for fixed time and location
            </Text>
            <View style={styles.specialDiscount}>
              <MaterialCommunityIcons
                name="brightness-percent"
                size={15}
                color="#FF0058"
              />
              <Text style={styles.discountPercentage}>15% OFF</Text>
            </View>
          </View>
          <View style={styles.packingCardImgas}>
            <Image
              style={{width: 146, height: 112}}
              source={require('../../image/package-packing.png')}
            />
            <Image
              style={styles.timingIcon}
              source={require('../../image/timing-icon.png')}
            />
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
    width: '65%',
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
});

export default PickupHome;
