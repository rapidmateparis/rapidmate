import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {
  getDeliveryBoyViewOrdersList,
  getLocations,
  getLookupData,
  getCompanyList,
} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import {useLookupData, useUserDetails} from '../commonComponent/StoreContext';

const DeliveryboyHome = ({navigation}) => {
  const {setLoading} = useLoader();
  const [orderList, setOrderList] = useState([]);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const {userDetails} = useUserDetails();
  const {saveLookupData} = useLookupData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getLocationsData(),
          getOrderList(0), 
          getOrderList(1),
          getLookup(),
          getCompanyConnectionList(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCompanyConnectionList = () => {
    getCompanyList(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        if (successResponse[0]._success) {
          setCompanyList(successResponse[0]._response);
        }
      },
      errorResponse => {
        console.log(
          'getCompanyConnectionList==>errorResponse',
          '' + errorResponse[0],
        );
      },
    );
  };

  const getLookup = () => {
    getLookupData(
      null,
      successResponse => {
        saveLookupData(successResponse[0]._response);
      },
      errorResponse => {
        console.log('getLookup==>errorResponse', '' + errorResponse[0]);
      },
    );
  };

  const getLocationsData = () => {
    setLoading(true);
    getLocations(
      null,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          setLocationList(successResponse[0]._response);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('getLocationsData==>errorResponse', '' + errorResponse[0]);
      },
    );
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id === locationId);
    return result[0]?.address || 'Unknown Address';
  };

  const getOrderList = status => {
    setLoading(true);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: status === 0 ? 'upcoming' : 'past',
    };
    getDeliveryBoyViewOrdersList(
      postParams,
      null,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (status === 0) {
            setOrderList(successResponse[0]._response); // Set upcoming orders
          } else {
            setRecentOrderList(successResponse[0]._response); // Set past orders
          }
        }
      },
      errorResponse => {
        setLoading(false);
        console.log('getOrderList==>errorResponse', '' + errorResponse[0]);
      },
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.packageDetailCard}>
      <View style={styles.packageHeader}>
        <Image source={require('../../image/package-medium-icon.png')} />
        <Text style={styles.deliveryTime}>Pickup in {item.delivery_date}</Text>
      </View>

      <View style={styles.packageMiddle}>
        <Ionicons name="location-outline" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          From{' '}
          <Text style={styles.Location}>
            {getLocationAddress(item.pickup_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <MaterialIcons name="my-location" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          To{' '}
          <Text style={styles.Location}>
            {getLocationAddress(item.dropoff_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.orderId}>Order ID: {item.order_number}</Text>
      </View>
    </View>
  );

  const renderDeliveryItem = ({item}) => (
    <View style={styles.packageDetailCard}>
      <View style={styles.packageHeader}>
        <Image source={require('../../image/package-medium-icon.png')} />
        <Text style={styles.deliveryTime}>Delivered 2hrs ago</Text>
      </View>

      <View style={styles.packageMiddle}>
        <Ionicons name="location-outline" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          From{' '}
          <Text style={styles.Location}>
            {getLocationAddress(item.pickup_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.packageMiddle}>
        <MaterialIcons name="my-location" size={15} color="#717172" />
        <Text style={styles.fromLocation}>
          To{' '}
          <Text style={styles.Location}>
            {getLocationAddress(item.dropoff_location_id)}
          </Text>
        </Text>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.orderId}>Order ID: {item.order_number}</Text>
      </View>
    </View>
  );

  const renderCompanyItem = ({item}) => (
    <View style={styles.companyInfo}>
      <Image
        style={styles.companyLogosImage}
        source={require('../../image/Subway-logo.png')}
      />
      <Text style={styles.companyNames}>{item.company_name}</Text>
    </View>
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
              This is your Rapidmate dashboard!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <EvilIcons name="bell" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>Upcoming deliveries</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryboyHistory')}
            style={styles.allinfoSee}>
            <Text style={styles.seAllText}>See All</Text>
            <AntDesign name="right" size={15} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.allDeleveryCard}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 5,
              backgroundColor: '#FBFAF5',
            }}>
            {orderList.length === 0 ? (
              <Text style={styles.userName}>No orders to show</Text>
            ) : (
              <FlatList horizontal data={orderList} renderItem={renderItem} />
            )}
          </View>
        </View>

        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>Recently delivered</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryboyHistory')}
            style={styles.allinfoSee}>
            <Text style={styles.seAllText}>See All</Text>
            <AntDesign name="right" size={15} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingTop: 5,
            backgroundColor: '#FBFAF5',
          }}>
          {recentOrderList.length === 0 ? (
            <Text style={styles.userName}>No orders to show</Text>
          ) : (
            <FlatList
              horizontal
              data={recentOrderList}
              renderItem={renderDeliveryItem}
            />
          )}
        </View>

        <ScrollView horizontal={true}>
          <View style={styles.allDeleveryCard}></View>
        </ScrollView>

        <View style={styles.recentlyInfo}>
          <Text style={styles.deliveryRecently}>My companies</Text>
        </View>

        <View style={styles.companyLogoCard}>
          {companyList.length === 0 ? (
            <Text style={styles.userName}>No Company Details</Text>
          ) : (
            <FlatList
              data={companyList}
              horizontal
              renderItem={renderCompanyItem}
              keyExtractor={item => item.id.toString()} // Add keyExtractor if needed
            />
          )}
        </View>
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
    marginBottom: 5,
  },
  recentlyInfo: {
    marginTop: 10,
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
    paddingHorizontal: 15,
    paddingTop: 5,
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
});

export default DeliveryboyHome;
