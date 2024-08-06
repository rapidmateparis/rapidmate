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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;

const EnterpriseHome = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [dropdownStreet, setDropdownStreet] = useState(null);
  const [dropdownWeek, setDropdownWeek] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const dropdownData1 = [
    {label: 'North Street Franchise', value: 'North Street Franchise'},
    {label: 'South Street Franchise', value: 'South Street Franchise'},
  ];

  const dropdownData2 = [
    {label: 'This week', value: 'This week'},
    {label: 'This Month', value: 'This Month'},
  ];

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [0, 2, 4, 6, 8, 10, 12],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 0, 88, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const graphStyle = {
    marginVertical: 8,
    borderRadius: 16,
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
      </View>
      <View style={styles.barChartCard}>
        <View style={styles.hoursInfoCard}>
          <Text style={styles.hoursBooked}>Hours booked</Text>
          <Text style={styles.hoursNumberCount}>32</Text>
        </View>
        <View style={styles.dropdownCard}>
          <View style={styles.containerCountryFirst}>
            <Dropdown
              data={dropdownData1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'North Street Franchise' : '...'}
              searchPlaceholder="Search.."
              value={dropdownStreet}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownStreet(item.value);
                setIsFocus(false);
              }}
              placeholderStyle={styles.placeholderStyle}
            />
          </View>

          <View style={styles.containerCountrySecond}>
            <Dropdown
              data={dropdownData2}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'This Week' : '...'}
              searchPlaceholder="Search.."
              value={dropdownWeek}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownWeek(item.value);
                setIsFocus(false);
              }}
              placeholderStyle={styles.placeholderStyle}
            />
          </View>
        </View>
        <View>
          <BarChart
            style={graphStyle}
            data={data}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>Company locations</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseCompanyLocations')}>
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
  barChartCard: {
    backgroundColor: colors.white,
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
  },
  hoursBooked: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  hoursInfoCard: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  hoursNumberCount: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  containerCountryFirst: {
    borderRadius: 5,
    marginBottom: 20,
    width: '48%',
  },
  containerCountrySecond: {
    borderRadius: 5,
    marginBottom: 20,
    width: '30%',
  },
  dropdownCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
});

export default EnterpriseHome;
