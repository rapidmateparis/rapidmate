import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {getDeliveryBoyViewOrdersList, getLocations} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import {FlatList} from 'react-native-gesture-handler';
import {useLoader} from '../../utils/loaderContext';
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();

const TodayList = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const {setLoading} = useLoader();

  useFocusEffect(
    useCallback(() => {
      getLocationsData();
      let postParams = {
        extentedId: userDetails.userDetails[0].ext_id,
        status: 'current',
      };
      setLoading(true);
      getDeliveryBoyViewOrdersList(
        postParams,
        null,
        successResponse => {
          console.log('ordr',successResponse[0]._response)
          setCurrentOrderList(successResponse[0]._response);
          setLoading(false);
        },
        errorResponse => {
          console.log(errorResponse);
          setLoading(false);
        },
      );

      return () => {
        setCurrentOrderList([]);
      };
    }, []),
  );

  const getLocationsData = () => {
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
      },
      errorResponse => {
        if (errorResponse[0]._errors.message) {
          setLocationList([]);
        }
      },
    );
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const renderItem = item => (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryboyDeliveryDetails',{order_number:item.item.order_number})}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Scheduled on{' '}
              {moment(new Date(item.item.delivery_date)).format(
                'dddd, DD MMMM YYYY',
              )}
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <Ionicons name="location-outline" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              From{' '}
              <Text style={styles.Location}>
                {getLocationAddress(item.item.pickup_location_id)}
              </Text>
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <MaterialIcons name="my-location" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              To{' '}
              <Text style={styles.Location}>
                {getLocationAddress(item.item.dropoff_location_id)}
              </Text>
            </Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.orderId}>
              Order ID: {item.item.order_number}
            </Text>
            <Text style={styles.orderId}>{item.item.company_name}</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>{item.item.company_name}</Text>
            <Text style={styles.valueMoney}>€{item.item.amount? item.item.amount : '34.00'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return currentOrderList.length != 0 ? (
    <FlatList data={currentOrderList} renderItem={renderItem} />
  ) : (
    <View style={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
          marginVertical: 40,
        }}>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/No-Data-Table.png')}
          />
          <Text style={styles.text}>No orders to show</Text>
          <Text style={styles.subText}>
            If there is any active order, it will be shown here..
          </Text>
        </View>
      </View>
    </View>
  );
};

const PastList = ({navigation}) => {
  const [pastOrderList, setPastOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const {setLoading} = useLoader();

  useFocusEffect(
    useCallback(() => {
      getLocationsData();
      let postParams = {
        extentedId: userDetails.userDetails[0].ext_id,
        status: 'past',
      };
      setLoading(true);
      getDeliveryBoyViewOrdersList(
        postParams,
        null,
        successResponse => {
          setPastOrderList(successResponse[0]._response);
          setLoading(false);
        },
        errorResponse => {
          console.log(errorResponse);
          setLoading(false);
        },
      );

      return () => {
        setPastOrderList([]);
      };
    }, []),
  );

  const getLocationsData = () => {
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
      },
      errorResponse => {
        if (errorResponse[0]._errors.message) {
          setLocationList([]);
        }
      },
    );
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const renderItem = item => (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryboyMainDeliveryDetails')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Scheduled on{' '}
              {moment(new Date(item.item.delivery_date)).format(
                'dddd, DD MMMM YYYY',
              )}
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <Ionicons name="location-outline" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              From{' '}
              <Text style={styles.Location}>
                {getLocationAddress(item.item.pickup_location_id)}
              </Text>
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <MaterialIcons name="my-location" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              To{' '}
              <Text style={styles.Location}>
                {getLocationAddress(item.item.dropoff_location_id)}
              </Text>
            </Text>
          </View>
          <View style={styles.footerCard}>
            <Text style={styles.orderId}>
              Order ID: {item.item.order_number}
            </Text>
            <Text style={styles.orderId}>{item.item.company_name}</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>{item.item.company_name}</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../image/Big-Calender.png')}
            />
            <Text style={styles.deliveryTime}>Shift</Text>
          </View>

          <View style={styles.overViewCard}>
            <View>
              <Text style={styles.requestOverview}>20</Text>
              <Text style={styles.requestOverviewInfo}>Total days</Text>
            </View>

            <View>
              <Text style={styles.requestOverview}>80</Text>
              <Text style={styles.requestOverviewInfo}>Total hours</Text>
            </View>

            <View>
              <Text style={styles.requestOverview}>
                €<Text>2.3k</Text>
              </Text>
              <Text style={styles.requestOverviewInfo}>Aprox earning</Text>
            </View>
          </View>

          <View style={styles.scheduleDateTimeCard}>
            <Text style={styles.schaduleInfo}>
              From <Text style={styles.schaduleDateTime}>20-02-24, 10 AM</Text>
            </Text>
            <View style={styles.borderShowoff} />
            <Text style={styles.schaduleInfo}>
              From <Text style={styles.schaduleDateTime}>20-02-24, 10 AM</Text>
            </Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('NewDeliveryPackageRequest')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryDetailsMultipleOrder')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryboyShiftDetails')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryboyShiftStaredRequest')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryPackageRequest')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryPackageScheduleRequest')}
          style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image
              style={styles.packageManage}
              source={require('../../image/Big-Package.png')}
            />

            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
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
            <Text style={styles.orderId}>For National Inc.</Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>For National Inc.</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return pastOrderList.length != 0 ? (
    <FlatList data={pastOrderList} renderItem={renderItem} />
  ) : (
    <View style={styles.scrollViewContainer}>
      <View
        style={{
          width: 350,
          height: 500,
          position: 'relative',
          marginVertical: 40,
        }}>
        <View style={styles.container}>
          <Image
            style={styles.loaderMap}
            source={require('../../image/No-Data-Table.png')}
          />
          <Text style={styles.text}>No orders to show</Text>
          <Text style={styles.subText}>
            If there is any active order, it will be shown here..
          </Text>
        </View>
      </View>
    </View>
  );
};

const Ongoing = () => {
  return (
    <View style={{flex: 1}}>
      <TodayList />
    </View>
  );
};

const Past = () => {
  return (
    <View style={{flex: 1}}>
      <PastList />
    </View>
  );
};
const DeliveryboyHistory = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <View
        style={{paddingHorizontal: 15, paddingTop: 5, backgroundColor: '#fff'}}>
        {/* Your Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>History</Text>
          <TouchableOpacity>
            <AntDesign name="filter" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchinput}
            placeholder="Search your deliveries"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* End of Search Bar */}
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.subText,
          tabBarLabelStyle: {fontSize: 14},
          tabBarIndicatorStyle: {backgroundColor: colors.secondary},
          tabBarStyle: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen name="Ongoing">
          {() => <TodayList navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => <PastList navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
      {/* End of Tab Navigator */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchinput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
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
  },
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
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
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  listText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  requestOverview: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  requestOverviewInfo: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  scheduleDateTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  schaduleInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  schaduleDateTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 20,
    marginHorizontal: 5,
  },
  packageManage: {
    width: 25,
    height: 25,
  },
});

export default DeliveryboyHistory;
