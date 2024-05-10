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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';

const Home = ({navigation}) => {
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
              This is your Rapidmate dashboard!
            </Text>
          </View>
          <View>
            <EvilIcons name="bell" size={40} color="#000" />
          </View>
        </View>

        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>Recently delivered</Text>
          <View style={styles.allinfoSee}>
            <Text style={styles.seAllText}>See All</Text>
            <AntDesign name="right" size={15} color="#000" />
          </View>
        </View>

        <ScrollView horizontal={true}>
          <View style={styles.allDeleveryCard}>
            <View style={styles.packageDetailCard}>
              <View style={styles.packageHeader}>
                <Image
                  source={require('../../image/package-medium-icon.png')}
                />
                <Text style={styles.deliveryTime}>Delivered 2hrs ago</Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  From <Text style={styles.Location}>North Street, ABC</Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
                </Text>
              </View>

              <View style={styles.footerCard}>
                <Text style={styles.orderId}>Order ID: 98237469</Text>
              </View>
            </View>

            <View style={styles.packageDetailCard}>
              <View style={styles.packageHeader}>
                <Image
                  source={require('../../image/package-medium-icon.png')}
                />
                <Text style={styles.deliveryTime}>Delivered 2hrs ago</Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  From <Text style={styles.Location}>North Street, ABC</Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
                </Text>
              </View>

              <View style={styles.footerCard}>
                <Text style={styles.orderId}>Order ID: 98237469</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeHome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 460,
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
});

export default Home;
