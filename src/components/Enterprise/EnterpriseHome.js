import React, {useState} from 'react';
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

const EnterpriseHome = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);

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
              Welcome <Text style={styles.userName}>John!</Text>
            </Text>
            <Text style={styles.aboutPage}>
              This is your Rapidmate enterprise dashboard!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <EvilIcons name="bell" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.allInformatinCard}>
          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={styles.informationText}>Active bookings</Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>08</Text>
          </View>

          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={styles.informationText}>Scheduled bookings</Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>52</Text>
          </View>

          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={[styles.informationText, {paddingRight: 22}]}>
                All bookings
              </Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>362</Text>
          </View>
        </View>

        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>Company locations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EnterpriseCompanyLocations')}>
            <Text style={styles.seAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.franchiseCard}>
          <View style={styles.franchiseCardHeader}>
            <Image
              style={styles.companyImga}
              source={require('../../image/home.png')}
            />
            <Text style={styles.franchiseStreet}>North Street Franchise</Text>
          </View>

          <View style={styles.bookedCardInfo}>
            <View>
              <Text style={styles.bookedInfo}>Hours booked</Text>
              <Text style={styles.bookedDetails}>05</Text>
            </View>

            <View>
              <Text style={styles.bookedInfo}>Hours spent</Text>
              <Text style={styles.bookedDetails}>03</Text>
            </View>

            <View>
              <Text style={styles.bookedInfo}>Bookings</Text>
              <Text style={styles.bookedDetails}>04</Text>
            </View>
          </View>

          <View style={styles.companyLocation}>
            <EvilIcons name="location" size={22} color="#000" />
            <Text style={styles.locationAddress}>North Street, ABC</Text>
          </View>
        </View>

        <View style={styles.franchiseCard}>
          <View style={styles.franchiseCardHeader}>
            <Image
              style={styles.companyImga}
              source={require('../../image/home.png')}
            />
            <Text style={styles.franchiseStreet}>West Street Franchise</Text>
          </View>

          <View style={styles.bookedCardInfo}>
            <View>
              <Text style={styles.bookedInfo}>Hours booked</Text>
              <Text style={styles.bookedDetails}>08</Text>
            </View>

            <View>
              <Text style={styles.bookedInfo}>Hours spent</Text>
              <Text style={styles.bookedDetails}>02</Text>
            </View>

            <View>
              <Text style={styles.bookedInfo}>Bookings</Text>
              <Text style={styles.bookedDetails}>05</Text>
            </View>
          </View>

          <View style={styles.companyLocation}>
            <EvilIcons name="location" size={22} color="#000" />
            <Text style={styles.locationAddress}>West Street, ABC</Text>
          </View>
        </View>
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
});

export default EnterpriseHome;
