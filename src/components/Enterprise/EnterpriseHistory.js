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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useLoader} from '../../utils/loaderContext';
import {
  getAllVehicleTypes,
  getDeliveryBoyViewOrdersList,
  getEnterpriseBranch,
  getEnterpriseOrders,
  getLocations,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import moment from 'moment';

const Tab = createMaterialTopTabNavigator();

const OneTimeList = ({orders, locations, navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  const getLocationAddress = locationId => {
    let result = locations.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  return (
    <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#FBFAF5'}}>
      {orders.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              paddingHorizontal: 15,
              paddingTop: 5,
              backgroundColor: '#FBFAF5',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DeliveryDetails', {
                  orderItem: item,
                  componentType: 'ENTERPRISE',
                })
              }
              style={styles.packageDetailCard}>
              <View style={styles.packageHeader}>
                <Image
                  source={require('../../image/package-medium-icon.png')}
                />
                <Text style={styles.deliveryTime}>
                  Delivered on{' '}
                  {moment(new Date(item.delivery_date)).format(
                    'MMMM DD, YYYY hh:mm A',
                  )}
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  From{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.pickup_location)}
                  </Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  To{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.dropoff_location)}
                  </Text>
                </Text>
              </View>

              <View style={styles.footerCard}>
                <Text
                  style={[
                    styles.orderActive,
                    {color: colors.Completed, backgroundColor: '#27AE6012'},
                  ]}>
                  Active
                </Text>
                <Text style={styles.orderId}>
                  Order ID: {item.order_number}
                </Text>
              </View>

              <View style={styles.borderShow}></View>
              <View style={styles.footerCard}>
                <Text style={styles.orderId}>Pickup Truck</Text>
                <Text style={styles.valueMoney}>
                  €{item.amount ? item.amount.toFixed(2) : '0.00'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const ShiftsList = ({orders, branches, vehicles, navigation}) => {

  const getBranchName = branchId => {
    let result = branches.filter(branch => branch.id == branchId);
    return result[0]?.branch_name;
  };

  const getBranchAddress = (branchId) => {
    let result = branches.filter(branch => branch.id == branchId);
    if (result.length > 0) {
      let branch = result[0];
      return `${branch.address}, ${branch.city}, ${branch.state}`;
    }
    return null;
  };

  const getVehicleType = vehicleId => {
    let result = vehicles.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  return (
    <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#FBFAF5'}}>
      {orders.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              paddingHorizontal: 15,
              paddingTop: 5,
              backgroundColor: '#FBFAF5',
            }}>
            <TouchableOpacity
              onPress={() => {
                let props = {
                  branchName : getBranchName(item.branch_id),
                  branchAddress: getBranchAddress(item.branch_id),
                  fromTime: moment(item.slots[0].from_time, 'HH:mm:ss').format('hh A'),
                  toTime : moment(item.slots[0].to_time, 'HH:mm:ss').format('hh A'),
                  shiftItem: item,
                  vehicleType : getVehicleType(item.vehicle_type_id)
                }
                navigation.navigate('EnterpriseShiftDetails',{...props});
              }}
              style={styles.packageDetailCard}>
              <View style={styles.packageshiftHeader}>
                <View style={styles.packageshiftHeader}>
                  <Image
                    style={styles.imagesManage}
                    source={require('../../image/Big-Calender.png')}
                  />
                  <Text style={styles.deliveryTime}>
                    {moment(item.slots[0].from_time, 'HH:mm:ss').format('hh A')}
                    {' to '}
                    {moment(item.slots[0].to_time, 'HH:mm:ss').format('hh A')}
                  </Text>
                </View>
                <Text style={styles.deliveryTime}>
                  {moment(item.slots[0].to_time, 'HH:mm:ss').diff(
                    moment(item.slots[0].from_time, 'HH:mm:ss'),
                  ) / 3600000}{' '}
                  hours shift
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromshiftLocation}>
                  {getBranchAddress(item.branch_id)}
                </Text>
              </View>
              {/* <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
                </Text>
              </View> */}

              <View style={styles.footerCard}>
                <Text
                  style={[
                    styles.orderActive,
                    {color: colors.Pending, backgroundColor: '#F39C1212'},
                  ]}>
                  {item.order_status.replace(/_/g, ' ')}
                </Text>
                <Text style={styles.orderId}>
                  {getVehicleType(item.vehicle_type_id)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

function EnterpriseHistory({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const [oneTimeOrderList, setOnetimeOrderList] = useState([]);
  const [shiftsList, setShiftsList] = useState([]);
  const [pastList, setpastList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [enterpriseBranches, setEnterpriseBranches] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);

  useEffect(() => {
    getVehicleTypes();
    getLocationsData();
    getBranchesList();
    getEnterpriseOrderList();
  }, []);

  const getVehicleTypes = () => {
    getAllVehicleTypes(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setVehicleTypeList(successResponse[0]._response);
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const getBranchesList = () => {
    getEnterpriseBranch(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == 'NotAuthorizedException') {
              Alert.alert('Error Alert', successResponse[0]._response.name, [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              var branches = [];
              for (
                let index = 0;
                index < successResponse[0]._response.length;
                index++
              ) {
                const element = successResponse[0]._response[index];
                element.isSelected = false;
                branches.push(element);
              }
              setEnterpriseBranches(branches);
            }
          }
        }
      },
      errorResponse => {
        console.log('errorResponse', errorResponse[0]._errors.message);
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  const getEnterpriseOrderList = () => {
    setLoading(true);
    getEnterpriseOrders(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          var currentOnetimeList = [];
          var currentShiftsList = [];
          var currentPastList = [];
          successResponse[0]._response.forEach(element => {
            if (element.delivery_type_id == 1) {
              currentOnetimeList.push(element);
            }
            if (element.delivery_type_id == 2) {
              currentOnetimeList.push(element);
            }
            if (
              element.delivery_type_id == 3 &&
              element.slots &&
              element.slots.length > 0
            ) {
              currentShiftsList.push(element);
            }
          });
          setOnetimeOrderList(currentOnetimeList);
          setShiftsList(currentShiftsList);
        }
      },
      errorResponse => {
        setLoading(false);
        console.log(
          'getEnterpriseOrderList==>errorResponse',
          '' + errorResponse[0],
        );
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
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
          <View style={styles.actionCard}>
            <TouchableOpacity>
              <AntDesign name="download" size={25} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign
                style={{marginLeft: 10}}
                name="filter"
                size={25}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
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
        <Tab.Screen name="One-time">
          {() => (
            <OneTimeList
              orders={oneTimeOrderList}
              locations={locationList}
              navigation={navigation}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Shifts">
          {() => (
            <ShiftsList
              orders={shiftsList}
              branches={enterpriseBranches}
              vehicles={vehicleTypeList}
              navigation={navigation}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => (
            <OneTimeList
              orders={oneTimeOrderList}
              locations={locationList}
              navigation={navigation}
            />
          )}
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
  orderActive: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    borderRadius: 10,
    padding: 5,
  },
  imagesManage: {
    width: 20,
    height: 20,
  },
  packageshiftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fromshiftLocation: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.subText,
    marginLeft: 10,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EnterpriseHistory;
