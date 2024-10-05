import React, {useCallback, useEffect, useState} from 'react';
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
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import {getEnterpriseDashboardInfo} from '../../data_manager';
import {useFocusEffect} from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;

const EnterpriseHome = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [selectedDropdownBranch, setSelectedDropdownBranch] = useState({});
  const [dropdownWeek, setDropdownWeek] = useState(null);
  const [dropdownBranches, setDropdownBranches] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isBranchFocus, setIsBranchFocus] = useState(false);
  const [isWeekFocus, setIsWeekFocus] = useState(false);
  const {saveUserDetails, userDetails} = useUserDetails();
  const {setLoading} = useLoader();
  const [dashboardData, setDashboardData] = useState(null);
  const [bookingHour, setBookingHour] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [branches, setBranches] = useState([]);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const dropdownData2 = [
    {label: 'This week', value: 'This week'},
    {label: 'This Month', value: 'This Month'},
  ];

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

  const displayChartData = branch => {
    console.log('branch', branch);
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let hours = [0, 0, 0, 0, 0, 0, 0];
    branch.chartData.forEach(element => {
      if (element.day == 'Monday') {
        hours[0] = element.booked_hours;
      } else if (element.day == 'Tuesday') {
        hours[1] = element.booked_hours;
      } else if (element.day == 'Wednesday') {
        hours[2] = element.booked_hours;
      } else if (element.day == 'Thursday') {
        hours[3] = element.booked_hours;
      } else if (element.day == 'Friday') {
        hours[4] = element.booked_hours;
      } else if (element.day == 'Saturday') {
        hours[5] = element.booked_hours;
      } else if (element.day == 'Sunday') {
        hours[6] = element.booked_hours;
      }
    });
    const data = {
      labels: days,
      datasets: [
        {
          data: hours,
        },
      ],
    };
    setChartData(data);
    setBookingHour(branch.bookinghr);
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getEnterpriseDashboardInfo(
        userDetails.userDetails[0].ext_id,
        successResponse => {
          setLoading(false);
          if (successResponse[0]._response.length > 0) {
            setDashboardData(successResponse[0]._response[0].dashboard);
            setBranches(successResponse[0]._response[0].dashboard.branch);
            var tempdropDownBranches = [];
            successResponse[0]._response[0].dashboard.branch.forEach(
              element => {
                var item = {};
                item.label = element.branch_name;
                item.value = element.branch_id;
                tempdropDownBranches.push(item);
              },
            );
            setDropdownBranches(tempdropDownBranches);
            setSelectedDropdownBranch(tempdropDownBranches[0]);
            setDropdownWeek(dropdownData2[0]);
            displayChartData(
              successResponse[0]._response[0].dashboard.branch[0],
            );
          }
        },
        errorResponse => {
          setLoading(false);
          Alert.alert('Error Alert', errorResponse[0]._errors.message, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    }, []),
  );

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
            <Text style={styles.bookingsInfo}>
              {dashboardData &&
                (dashboardData.bookings.active < 10 &&
                dashboardData.bookings.active > 0
                  ? '0' + dashboardData.bookings.active
                  : dashboardData.bookings.active)}
            </Text>
          </View>

          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={styles.informationText}>Scheduled bookings</Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>
              {dashboardData &&
                (dashboardData.bookings.scheduled < 10 &&
                dashboardData.bookings.scheduled > 0
                  ? '0' + dashboardData.bookings.scheduled
                  : dashboardData.bookings.scheduled)}
            </Text>
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
            <Text style={styles.bookingsInfo}>
              {' '}
              {dashboardData &&
                (dashboardData.bookings.all < 10 &&
                dashboardData.bookings.all > 0
                  ? '0' + dashboardData.bookings.all
                  : dashboardData.bookings.all)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.barChartCard}>
        <View style={styles.hoursInfoCard}>
          <Text style={styles.hoursBooked}>Hours booked</Text>
          <Text style={styles.hoursNumberCount}>{bookingHour}</Text>
        </View>
        <View style={styles.dropdownCard}>
          <View style={styles.containerCountryFirst}>
            <Dropdown
              data={dropdownBranches}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !isBranchFocus ? selectedDropdownBranch.label : '...'
              }
              searchPlaceholder="Search.."
              value={selectedDropdownBranch}
              itemTextStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              onFocus={() => setIsBranchFocus(true)}
              onBlur={() => setIsBranchFocus(false)}
              onChange={item => {
                setSelectedDropdownBranch(item);
                setIsBranchFocus(false);
                displayChartData(
                  branches.filter(br => br.branch_id == item.value)[0],
                );
              }}
            />
          </View>

          <View style={styles.containerCountrySecond}>
            <Dropdown
              data={dropdownData2}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isWeekFocus ? 'This Week' : '...'}
              searchPlaceholder="Search.."
              value={dropdownWeek}
              itemTextStyle={styles.placeholderStyle}
              selectedTextStyle={styles.placeholderStyle}
              onFocus={() => setIsWeekFocus(true)}
              onBlur={() => setIsWeekFocus(false)}
              onChange={item => {
                setDropdownWeek(item.value);
                setIsWeekFocus(false);
              }}
            />
          </View>
        </View>
        <View>
          <BarChart
            style={graphStyle}
            data={chartData}
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
            onPress={() => navigation.navigate('EnterpriseCompanyLocations',{branches:branches})}>
            <Text style={styles.seAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {branches.slice(0, 1).map((item, index) => {
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
                  <Text style={styles.bookedInfo}>Hours booked</Text>
                  <Text style={styles.bookedDetails}>{item.bookinghr}</Text>
                </View>

                <View>
                  <Text style={styles.bookedInfo}>Hours spent</Text>
                  <Text style={styles.bookedDetails}>{item.spenthr}</Text>
                </View>

                <View>
                  <Text style={styles.bookedInfo}>Bookings</Text>
                  <Text style={styles.bookedDetails}>{item.bookings}</Text>
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
        })}
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
