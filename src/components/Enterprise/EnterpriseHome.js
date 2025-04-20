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
import {getEnterpriseDashboardInfo, getNotificationCount} from '../../data_manager';
import {useFocusEffect} from '@react-navigation/native';
import { localizationText, saveCurrentUserDetailsInStore } from '../../utils/common';
const screenWidth = Dimensions.get('window').width;

const EnterpriseHome = ({navigation}) => {
  const dropdownData2 = [
    {label: 'All', value: 'all'},
    {label: 'Today', value: 'today'},
    {label: 'This week', value: 'week'},
    {label: 'This month', value: 'month'},
    {label: 'This year', value: 'year'},
  ];

  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [selectedDropdownBranch, setSelectedDropdownBranch] = useState({});
  const [dropdownWeek, setDropdownWeek] = useState(dropdownData2[0]);
  const [dropdownBranches, setDropdownBranches] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isBranchFocus, setIsBranchFocus] = useState(false);
  const [isWeekFocus, setIsWeekFocus] = useState(false);
  const {saveUserDetails, userDetails} = useUserDetails();
  const {setLoading} = useLoader();
  const [dashboardData, setDashboardData] = useState(null);
  const [bookingHour, setBookingHour] = useState(0);
  const activeBookings = localizationText('Common', 'activeBookings') || 'Active Bookings';
  const scheduledBookings = localizationText('Common', 'scheduledBookings') || 'Scheduled Bookings';
  const allBookings = localizationText('Common', 'allBookings') || 'All Bookings';
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [branches, setBranches] = useState([]);

  useEffect(()=>{
    if(selectedDropdownBranch?.value){
      getEnterpriseDashboardAllInfo(selectedDropdownBranch.value)
    }else if(dropdownWeek?.value){
      getEnterpriseDashboardAllInfo()
    }
  },[selectedDropdownBranch,dropdownWeek])


  useEffect(()=>{
    getNotificationAllCount()
  },[])

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
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

  const displayChartData = branch => {
    const days = branch.map((day)=>day.month)
    const hours = branch.map((day)=>day.count)

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
      getEnterpriseDashboardAllInfo()
    }, []),
  );

  const getEnterpriseDashboardAllInfo =(branchId)=>{
    setLoading(true);
    let url = userDetails.userDetails[0].ext_id
    if(branchId && dropdownWeek?.value){
      url = url+'?branch='+branchId+'&type='+dropdownWeek?.value
    }else if(branchId){
      url = url+'?branch='+branchId
    }else if(dropdownWeek?.value){
      url = url+'?type='+dropdownWeek?.value
    }

    getEnterpriseDashboardInfo(
      url,
      successResponse => {
        console.log('successResponse ------>',successResponse)
        setLoading(false);
        if (successResponse[0]._response) {
          
          setDashboardData(successResponse[0]._response);
          var tempdropDownBranches = [];
          if(successResponse[0]?._response?.branchOverviewData && successResponse[0]?._response?.branchOverviewData.length > 0){
            const branchList = successResponse[0]?._response?.branchOverviewData
            const getList = branchList.map(branch=>{
              return{
                label : branch.branch_name,
                value : branch.id,
              }
            })
            tempdropDownBranches = getList
          }
          if (successResponse[0]._response) {
            setDropdownBranches(tempdropDownBranches);
            displayChartData(
              successResponse[0]._response.weekData,
            );
          }
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }



  const getNotificationAllCount = () => {
    setLoading(true);
    getNotificationCount(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        console.log('getNotificationAllCount==>successResponse', '' + JSON.stringify(successResponse[0]._response.notificationCount));
        const newUserDetails = userDetails.userDetails[0]
        if (successResponse[0]?._response?.notificationCount) {
          newUserDetails['notificationCount']=successResponse[0]._response.notificationCount  
        }else{
          newUserDetails['notificationCount']=0
        }
        saveUserDetails({...userDetails,userDetails:[newUserDetails]});
        saveCurrentUserDetailsInStore(userDetails);
      },
      errorResponse => {
        setLoading(false);
        console.log('getNotificationAllCount==>errorResponse', '' + errorResponse[0]);
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
            onPress={() =>{ 
                const newUserDetails = userDetails.userDetails[0]
                newUserDetails['notificationCount']=0
                saveUserDetails({...userDetails,userDetails:[newUserDetails]});
                navigation.navigate('Notifications')
              }}>
            <EvilIcons name="bell" size={40} color="#000" />
            {userDetails.userDetails[0].notificationCount > 0 && <View style={styles.notificationCountStyle}>
              <Text style={styles.notificationCountText}>{userDetails.userDetails[0].notificationCount}</Text>
            </View>}
          </TouchableOpacity>
        </View>

        <View style={styles.allInformatinCard}>
          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={styles.informationText}>{localizationText('Common', 'activeBookings')}</Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>
              {dashboardData &&
                (dashboardData?.overviewData?.active_order < 10 &&
                dashboardData?.overviewData?.active_order > 0
                  ? '0' + dashboardData?.overviewData?.active_order
                  : dashboardData?.overviewData?.active_order)}
            </Text>
          </View>

          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={styles.informationText}>{localizationText('Common', 'scheduledBookings')}</Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>
              {dashboardData &&
                (dashboardData?.overviewData?.schedule_order < 10 &&
                dashboardData?.overviewData?.schedule_order > 0
                  ? '0' + dashboardData?.overviewData?.schedule_order
                  : dashboardData?.overviewData?.schedule_order)}
            </Text>
          </View>

          <View style={styles.informatinMainCard}>
            <View style={styles.informatinCard}>
              <Text style={[styles.informationText, {paddingRight: 22}]}>
              {localizationText('Common', 'allBookings')}
              </Text>
              <TouchableOpacity>
                <Image source={require('../../image/Info-Cricle.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.bookingsInfo}>
              {' '}
              {dashboardData &&
                (dashboardData?.overviewData?.total_order < 10 &&
                dashboardData?.overviewData?.total_order > 0
                  ? '0' + dashboardData?.overviewData?.total_order
                  : dashboardData?.overviewData?.total_order)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.barChartCard}>
        <View style={styles.hoursInfoCard}>
          <Text style={styles.hoursBooked}>{localizationText('Common', 'bookingOverview')}</Text>
          <Text style={styles.hoursNumberCount}>{bookingHour}</Text>
        </View>
        <View style={styles.dropdownCard}>
          <View style={styles.containerCountryFirst}>
            <Dropdown
              data={dropdownBranches}
              search
              maxHeight={300}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              labelField="label"
              valueField="value"
              placeholder={
                !isBranchFocus ? selectedDropdownBranch?.label : '...'
              }
              searchPlaceholder="Search.."
              value={selectedDropdownBranch}
              onFocus={() => setIsBranchFocus(true)}
              onBlur={() => setIsBranchFocus(false)}
              onChange={item => {
                setSelectedDropdownBranch(item);
                setIsBranchFocus(false);
                // displayChartData(
                //   branches.filter(br => br.id == item.value)[0],
                // );
              }}
            />
          </View>

          <View style={styles.containerCountrySecond}>
            <Dropdown
              data={dropdownData2}
              itemTextStyle={styles.itemtextStyle}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isWeekFocus ? 'This Week' : '...'}
              searchPlaceholder="Search.."
              value={dropdownWeek}
              onFocus={() => setIsWeekFocus(true)}
              onBlur={() => setIsWeekFocus(false)}
              onChange={item => {
                setDropdownWeek(item);
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
            showValuesOnTopOfBars = {true}
            showBarTops = {true}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>{localizationText('Common', 'companyLocations')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterpriseCompanyLocations',{branches:dashboardData?.branchOverviewData?.length > 0 ? dashboardData?.branchOverviewData : []})}>
            <Text style={styles.seAllText}>{localizationText('Common', 'seeAll')}</Text>
          </TouchableOpacity>
        </View>
        {dashboardData?.branchOverviewData?.length > 0 && dashboardData?.branchOverviewData.map((item, index) => {
          if(index < 5 ){
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
                    <Text style={styles.bookedInfo}>Active booking</Text>
                    <Text style={styles.bookedDetails}>{item.active_order? item.active_order:0}</Text>
                  </View>

                  <View>
                    <Text style={styles.bookedInfo}>Scheduled booking</Text>
                    <Text style={styles.bookedDetails}>{item.schedule_order ? item.schedule_order :0}</Text>
                  </View>

                  <View>
                    <Text style={styles.bookedInfo}>All booking</Text>
                    <Text style={styles.bookedDetails}>{item.total ? item.total:0}</Text>
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
          }
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
    color: '#999',
    fontSize: 12,
  },
  selectedTextStyle: {
    color: '#999',
    fontSize: 12,
  },
  inputSearchStyle: {
    color: '#999',
    fontSize: 12,
  },
  itemtextStyle: {
    color: colors.text,
    fontSize: 12,
  },
  notificationCountStyle:{
    position:'absolute',
    right:0,
    backgroundColor:'red',
    borderRadius:50,
    height:16, 
    width:16,
    justifyContent:'center',
    alignItems:'center' 
  },
  notificationCountText:{
    color:'#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  }

});

export default EnterpriseHome;
