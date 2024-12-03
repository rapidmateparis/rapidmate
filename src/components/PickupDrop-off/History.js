import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useLoader} from '../../utils/loaderContext';
import {
  getConsumerViewOrdersList,
  getConsumerViewOrdersListBySearch,
  getLocations,
} from '../../data_manager';
import {RefreshControl} from 'react-native-gesture-handler';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import { color } from 'react-native-reanimated';

const Tab = createMaterialTopTabNavigator();

const TodayList = ({navigation, searchText}) => {
  const [index, setIndex] = useState(0);
  const {setLoading} = useLoader();
  const [orderList, setOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const timeout = React.useRef(null);

  useFocusEffect(
    useCallback(() => {
      getLocationsData();
      getOrderList();
    }, []),
  );

  useEffect(() => {
    if (searchText) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        getOrderListinSearch(searchText);
      }, 2000);
    }
  }, [searchText]);

  const getOrderListinSearch = searchValue => {
    setLoading(true);
    setOrderList([]);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'current',
      orderNumber: searchValue,
    };
    getConsumerViewOrdersListBySearch(
      postParams,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setOrderList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
        if (errorResponse[0]._errors.message) {
          setOrderList([]);
        }
      },
    );
  };

  const getLocationsData = () => {
    setLoading(true);
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
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

  const getOrderList = () => {
    setLoading(true);
    setOrderList([]);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'current',
    };
    getConsumerViewOrdersList(
      postParams,
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setOrderList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
      },
    );
  };

  const renderCurrentOrderItem = currentOrderItem => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DeliveryDetails', {
          orderItem: currentOrderItem.item,
        });
      }}
      style={styles.packageDetailCard}>
      <View style={styles.packageHeader}>
        <Image
          style={styles.packageManage}
          source={require('../../image/Big-Package.png')}
        />
        <Text style={styles.deliveryTime}>
          {/* Delivered on{' '}
          {moment(currentOrderItem.item.delivery_date).format('MMM DD, YYYY')}{' '}
          at {moment(currentOrderItem.item.delivery_date).format('hh:mm A')} */}
          {currentOrderItem.item.consumer_order_title}
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <Ionicons name="location-outline" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          From{' '}
          <Text style={styles.Location}>
            {getLocationAddress(currentOrderItem.item.pickup_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <MaterialIcons name="my-location" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          To{' '}
          <Text style={styles.Location}>
            {getLocationAddress(currentOrderItem.item.dropoff_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.borderShow}></View>

      <View style={styles.footerCard}>
        <Text style={styles.orderId}>
          Order ID: {currentOrderItem.item.order_number}
        </Text>
        <Text style={styles.valueMoney}>
          {`€ ${
            typeof currentOrderItem.item.amount === 'number'
              ? currentOrderItem.item.amount.toFixed(2)
              : currentOrderItem.item.amount
          }`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        {orderList.length === 0 ? (
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
                  If there is any active order, it will be shown here.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList data={orderList} renderItem={renderCurrentOrderItem} />
        )}
      </View>
    </View>
  );
};

const PastList = ({navigation, searchText}) => {
  const {setLoading} = useLoader();
  const [pastOrderList, setPastOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const timeout = React.useRef(null);

  useFocusEffect(
    useCallback(() => {
      getLocationsData();
      getOrderList();
    }, []),
  );

  useEffect(() => {
    if (searchText) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        getOrderListinSearch(searchText);
      }, 2000);
    }
  }, [searchText]);

  const getOrderListinSearch = searchValue => {
    setLoading(true);
    setPastOrderList([]);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'past',
      orderNumber: searchValue,
    };
    getConsumerViewOrdersListBySearch(
      postParams,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setPastOrderList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
        if (errorResponse[0]._errors.message) {
          setPastOrderList([]);
        }
      },
    );
  };

  const getLocationsData = () => {
    setLoading(true);
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
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

  const getOrderList = () => {
    setLoading(true);
    setPastOrderList([]);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'past',
    };
    getConsumerViewOrdersList(
      postParams,
      null,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setPastOrderList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
      },
    );
  };

  const renderPastOrderItem = pastOrderItem => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DeliveryDetails', {
          orderItem: pastOrderItem.item,
        });
      }}
      style={styles.packageDetailCard}>
      <View style={styles.packageHeader}>
        <Image
          style={styles.packageManage}
          source={require('../../image/Big-Package.png')}
        />
        <Text style={styles.deliveryTime}>
          {pastOrderItem.item.consumer_order_title}
          {/* Delivered on{' '}
          {moment(pastOrderItem.item.delivery_date).format(
            'MMM DD, YYYY',
          )} at {moment(pastOrderItem.item.delivery_date).format('hh:mm A')} */}
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <Ionicons name="location-outline" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          From{' '}
          <Text style={styles.Location}>
            {getLocationAddress(pastOrderItem.item.pickup_location_id)}{' '}
          </Text>
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <MaterialIcons name="my-location" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          To{' '}
          <Text style={styles.Location}>
            {getLocationAddress(pastOrderItem.item.dropoff_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.borderShow}></View>

      <View style={styles.footerCard}>
        <Text style={styles.orderId}>
          Order ID: {pastOrderItem.item.order_number}
        </Text>
        <Text style={styles.valueMoney}>€{pastOrderItem.item.amount}</Text>
      </View>
    </TouchableOpacity>
  );
  return pastOrderList.length != 0 ? (
    <FlatList data={pastOrderList} renderItem={renderPastOrderItem} />
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

function History({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        {/* Your Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>History</Text>
          <TouchableOpacity>
            <AntDesign name="filter" size={25} color={colors.secondary} />
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
            placeholderTextColor="#999"
            placeholder="Search your deliveries"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText && (
            <AntDesign
              name="close"
              size={20}
              color="#000"
              style={styles.searchIcon}
              onPress={() => setSearchText('')}
            />
          )}
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
          {() => <TodayList navigation={navigation} searchText={searchText} />}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => <PastList navigation={navigation} searchText={searchText} />}
        </Tab.Screen>
      </Tab.Navigator>
      {/* End of Tab Navigator */}
    </View>
  );
}

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
    color: colors.text,
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
  packageManage: {
    width: 25,
    height: 25,
  },
});

export default History;
