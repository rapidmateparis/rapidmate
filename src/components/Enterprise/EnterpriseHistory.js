import React, {useEffect, useState, useCallback} from 'react';
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
  searchOrderApi,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import moment from 'moment';
import EnterpriseShiftFillter from './EnterpriseShiftFillter';
import {useFocusEffect} from '@react-navigation/native';
import {
  localizationText,
  localToUTC,
  titleFormat,
  utcLocal,
} from '../../utils/common';

const Tab = createMaterialTopTabNavigator();

const OneTimeList = ({orders, locations, vehicles, navigation, onActive}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';
  const activeText = localizationText('Common', 'active') || 'Active';

  const getLocationAddress = locationId => {
    let result = locations.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const getVehicleType = vehicleId => {
    let result = vehicles.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  useFocusEffect(
    useCallback(() => {
      onActive();
    }, []),
  );

  return (
    <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#FBFAF5'}}>
      {orders.length > 0 ? (
        orders.map((item, index) => (
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
                  {item.consumer_order_title}{' '}
                  {item.is_show_datetime_in_title == 1
                    ? item.order_status === 'ORDER_PLACED'
                      ? titleFormat(item.schedule_date_time || item.order_date)
                      : titleFormat(item.updated_on)
                    : ''}
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {fromText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.pickup_location)}
                  </Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {toText}{' '}
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
                  {activeText}
                </Text>
                <Text style={styles.orderId}>
                  {orderID}: {item.order_number}
                </Text>
              </View>

              <View style={styles.borderShow}></View>
              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {getVehicleType(item.vehicle_type_id)}
                </Text>
                <Text style={styles.valueMoney}>
                  €{item.amount ? item.amount.toFixed(2) : '0.00'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.scrollViewContainer}>
          <View
            style={{
              width: 350,
              height: 350,
              position: 'relative',
              marginVertical: 40,
            }}>
            <View style={styles.container}>
              <Image
                style={styles.loaderMap}
                source={require('../../image/No-Data-Table.png')}
              />
              <Text style={styles.text}>{noOrdersToShow}</Text>
              <Text style={styles.subText}>{noOrdersDescription}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const MultipleList = ({orders, locations, vehicles, navigation, onActive}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';
  const activeText = localizationText('Common', 'active') || 'Active';

  const getLocationAddress = locationId => {
    let result = locations.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const getVehicleType = vehicleId => {
    let result = vehicles.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  useFocusEffect(
    useCallback(() => {
      onActive();
    }, []),
  );

  return (
    <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#FBFAF5'}}>
      {orders.length > 0 ? (
        orders.map((item, index) => (
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
                  {item.consumer_order_title}{' '}
                  {item.is_show_datetime_in_title == 1
                    ? item.order_status === 'ORDER_PLACED'
                      ? titleFormat(item.schedule_date_time || item.order_date)
                      : titleFormat(item.updated_on)
                    : ''}
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {fromText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.pickup_location)}
                  </Text>
                </Text>
              </View>

              {item?.locations?.length > 0 &&
                item?.locations.map((location, locIndex) => (
                  <View key={locIndex} style={styles.packageMiddle}>
                    <MaterialIcons
                      name="my-location"
                      size={15}
                      color="#717172"
                    />
                    <Text style={styles.fromLocation}>
                      {toText}{' '}
                      <Text style={styles.Location}>
                        {location.destination_description}
                      </Text>
                    </Text>
                  </View>
                ))}

              <View style={styles.footerCard}>
                <Text
                  style={[
                    styles.orderActive,
                    {color: colors.Completed, backgroundColor: '#27AE6012'},
                  ]}>
                  {activeText}
                </Text>
                <Text style={styles.orderId}>
                  {orderID}: {item.order_number}
                </Text>
              </View>

              <View style={styles.borderShow}></View>
              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {getVehicleType(item.vehicle_type_id)}
                </Text>
                <Text style={styles.valueMoney}>
                  €{item.amount ? item.amount.toFixed(2) : '0.00'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View style={styles.scrollViewContainer}>
          <View
            style={{
              width: 350,
              height: 350,
              position: 'relative',
              marginVertical: 40,
            }}>
            <View style={styles.container}>
              <Image
                style={styles.loaderMap}
                source={require('../../image/No-Data-Table.png')}
              />
              <Text style={styles.text}>{noOrdersToShow}</Text>
              <Text style={styles.subText}>{noOrdersDescription}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const ShiftsList = ({orders, branches, vehicles, navigation, onActive}) => {
  const shift = localizationText('Common', 'shift') || 'Shift';
  const totalDays = localizationText('Common', 'totalDays') || 'Total days';
  const totalHours = localizationText('Common', 'totalHours') || 'Total hours';
  const totalAmount =
    localizationText('Common', 'totalAmount') || 'Total Amount';
  const forText = localizationText('Common', 'for') || 'For';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';

  useFocusEffect(
    useCallback(() => {
      onActive();
    }, []),
  );

  const getBranchName = branchId => {
    let result = branches.filter(branch => branch.id == branchId);
    return result[0]?.branch_name;
  };

  const getBranchAddress = branchId => {
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
      {orders.length > 0 ? (
        orders.map((item, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: 15,
              paddingTop: 5,
              backgroundColor: '#FBFAF5',
            }}>
            <TouchableOpacity
              style={styles.packageDetailCard}
              onPress={() => {
                console.log('item ====>', item);
                let props = {
                  branchName: getBranchName(item.branch_id),
                  branchAddress: getBranchAddress(item.branch_id),
                  fromTime: moment(item.slots[0].from_time, 'HH:mm:ss').format(
                    'hh A',
                  ),
                  toTime: moment(item.slots[0].to_time, 'HH:mm:ss').format(
                    'hh A',
                  ),
                  shiftItem: item,
                  vehicleType: getVehicleType(item.vehicle_type_id),
                };
                navigation.navigate('EnterpriseShiftDetails', {...props});
              }}>
              <View style={styles.packageHeader}>
                <Image
                  style={{width: 25, height: 25}}
                  source={require('../../image/Big-Calender.png')}
                />
                <Text style={styles.deliveryTime}>{shift}</Text>
              </View>

              <View style={styles.overViewCard}>
                <View>
                  <Text style={styles.requestOverview}>
                    {item.total_days ? item.total_days : 0}
                  </Text>
                  <Text style={styles.requestOverviewInfo}>{totalDays}</Text>
                </View>

                <View>
                  <Text style={styles.requestOverview}>
                    {item.total_hours ? item.total_hours.toFixed(2) : 0}
                  </Text>
                  <Text style={styles.requestOverviewInfo}>{totalHours}</Text>
                </View>

                <View>
                  <Text style={styles.requestOverview}>
                    €
                    <Text>
                      {item.total_amount ? item.total_amount.toFixed(2) : 0}
                    </Text>
                  </Text>
                  <Text style={styles.requestOverviewInfo}>{totalAmount}</Text>
                </View>
              </View>

              <View style={styles.scheduleDateTimeCard}>
                <Text style={styles.schaduleInfo}>
                  {fromText}{' '}
                  <Text style={styles.schaduleDateTime}>
                    {moment(utcLocal(item.shift_from_date)).format(
                      'DD-MM-YYYY',
                    )}
                  </Text>
                </Text>
                <View style={styles.borderShowoff} />
                <Text style={styles.schaduleInfo}>
                  {toText}{' '}
                  <Text style={styles.schaduleDateTime}>
                    {moment(utcLocal(item.shift_tp_date)).format('DD-MM-YYYY')}
                  </Text>
                </Text>
              </View>

              <View style={styles.borderShow}></View>

              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {forText} {item?.company_name ? item?.company_name : '-'}
                </Text>
                {/* <Text style={styles.valueMoney}>€34.00</Text> */}
              </View>
            </TouchableOpacity>
          </View>

          // <View
          //   key={index}
          //   style={{
          //     paddingHorizontal: 15,
          //     paddingTop: 5,
          //     backgroundColor: '#FBFAF5',
          //   }}>
          //   <TouchableOpacity
          //     onPress={() => {
          //       console.log('item ====>',item)
          //       let props = {
          //         branchName: getBranchName(item.branch_id),
          //         branchAddress: getBranchAddress(item.branch_id),
          //         fromTime: moment(item.slots[0].from_time, 'HH:mm:ss').format(
          //           'hh A',
          //         ),
          //         toTime: moment(item.slots[0].to_time, 'HH:mm:ss').format(
          //           'hh A',
          //         ),
          //         shiftItem: item,
          //         vehicleType: getVehicleType(item.vehicle_type_id),
          //       };
          //       // navigation.navigate('EnterpriseShiftDetails', {...props});
          //     }}
          //     style={styles.packageDetailCard}>
          //     <View style={styles.packageshiftHeader}>
          //       <View style={styles.packageshiftHeader}>
          //         <Image
          //           style={styles.imagesManage}
          //           source={require('../../image/Big-Calender.png')}
          //         />
          //         <Text style={styles.deliveryTime}>
          //           {item.slots[0] &&
          //             moment(item.slots[0].from_time, 'HH:mm:ss').format(
          //               'hh A',
          //             )}
          //           {' to '}
          //           {item.slots[0] &&
          //             moment(item.slots[0].to_time, 'HH:mm:ss').format('hh A')}
          //         </Text>
          //       </View>
          //       <Text style={styles.deliveryTime}>
          //         {item.slots[0] &&
          //           moment(item.slots[0].to_time, 'HH:mm:ss').diff(
          //             moment(item.slots[0].from_time, 'HH:mm:ss'),
          //           ) / 3600000}{' '}
          //         hours shift
          //       </Text>
          //     </View>

          //     <View style={styles.packageMiddle}>
          //       <Ionicons name="location-outline" size={15} color="#717172" />
          //       <Text style={styles.fromshiftLocation}>
          //         {getBranchAddress(item.branch_id)}
          //       </Text>
          //     </View>

          //     <View style={styles.footerCard}>
          //       <Text
          //         style={[
          //           styles.orderActive,
          //           {color: colors.Pending, backgroundColor: '#F39C1212'},
          //         ]}>
          //         {item.order_status.replace(/_/g, ' ')}
          //       </Text>
          //       <Text style={styles.orderId}>
          //         {getVehicleType(item.vehicle_type_id)}
          //       </Text>
          //     </View>
          //   </TouchableOpacity>
          // </View>
        ))
      ) : (
        <View style={styles.scrollViewContainer}>
          <View
            style={{
              width: 350,
              height: 350,
              position: 'relative',
              marginVertical: 40,
            }}>
            <View style={styles.container}>
              <Image
                style={styles.loaderMap}
                source={require('../../image/No-Data-Table.png')}
              />
              <Text style={styles.text}>{noOrdersToShow}</Text>
              <Text style={styles.subText}>{noOrdersDescription}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const PastList = ({orders, locations, vehicles, navigation, onActive}) => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const shift = localizationText('Common', 'shift') || 'Shift';
  const totalDays = localizationText('Common', 'totalDays') || 'Total days';
  const totalHours = localizationText('Common', 'totalHours') || 'Total hours';
  const totalAmount =
    localizationText('Common', 'totalAmount') || 'Total Amount';
  const forText = localizationText('Common', 'for') || 'For';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';

  const getLocationAddress = locationId => {
    let result = locations.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const getVehicleType = vehicleId => {
    let result = vehicles.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  useFocusEffect(
    useCallback(() => {
      onActive();
    }, []),
  );

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
                  {item.consumer_order_title}{' '}
                  {item.is_show_datetime_in_title == 1
                    ? item.order_status === 'ORDER_PLACED'
                      ? titleFormat(item.schedule_date_time || item.order_date)
                      : titleFormat(item.updated_on)
                    : ''}
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {fromText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.pickup_location)}
                  </Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {toText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.dropoff_location)}
                  </Text>
                </Text>
              </View>

              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {orderID}: {item.order_number}
                </Text>
              </View>

              <View style={styles.borderShow}></View>
              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {' '}
                  {getVehicleType(item.vehicle_type_id)}
                </Text>
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

function EnterpriseHistory({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const [enterpriseOrderList, setEnterpriseOrderList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [enterpriseBranches, setEnterpriseBranches] = useState([]);
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [isShiftModalVisible, setShiftModalVisible] = useState(false);
  const oneTime = localizationText('Common', 'oneTime') || 'One-Time';
  const multiple = localizationText('Common', 'multiple') || 'Multiple';
  const shifts = localizationText('Common', 'shifts') || 'Shifts';
  const past = localizationText('Common', 'past') || 'Past';

  const toggleShiftModal = () => {
    setShiftModalVisible(!isShiftModalVisible);
  };

  useEffect(() => {
    getVehicleTypes();
    getLocationsData();
    getBranchesList();
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

  const getLocationsData = () => {
    setLoading(true);
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        console.log('list of all location ', successResponse[0]);
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

  const searchFunction = params => {
    params.enterprise_ext_id = userDetails.userDetails[0].ext_id;
    setLoading(true);
    searchOrderApi(
      params,
      successResponse => {
        console.log('one time responce ===>', JSON.stringify(successResponse));
        setLoading(false);
        if (successResponse[0]._success) {
          if (params.tab_id == 2) {
            setEnterpriseOrderList(
              successResponse[0]._response.filter(
                item => item.locations.length > 0,
              ),
            );
          } else {
            setEnterpriseOrderList(successResponse[0]._response);
          }
        }
      },
      errorResponse => {
        setLoading(false);
        setEnterpriseOrderList([]);
      },
    );
  };

  const onOneTimeActive = () => {
    console.log("onOneTimeActive - Tab - Loader");
    setSearchText('');
    let params = {
      tab_id: 1,
    };
    searchFunction(params);
  };

  const onMultipleActive = () => {
    setSearchText('');
    let params = {
      tab_id: 2,
    };
    searchFunction(params);
  };

  const onShiftActive = () => {
    setSearchText('');
    let params = {
      tab_id: 3,
    };
    searchFunction(params);
  };

  const onPastActive = () => {
    setSearchText('');
    let params = {
      tab_id: 4,
    };
    searchFunction(params);
  };

  const onFilterSelected = date => {
    let params = {
      from_date: moment(localToUTC(date.fromDate)).format('YYYY-MM-DD'),
      to_date: moment(localToUTC(date.toDate)).format('YYYY-MM-DD'),
    };
    searchFunction(params);
    setShiftModalVisible(false);
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
          <Text style={styles.headerText}>
            {localizationText('Common', 'history')}
          </Text>
          <View style={styles.actionCard}>
            <TouchableOpacity>
              <AntDesign name="download" size={25} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleShiftModal}>
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
            placeholder={localizationText('Common', 'searchYourDeliveries')}
            placeholderTextColor={colors.subText}
            value={searchText}
            onChangeText={value => {
              setSearchText(value);
            }}
            onSubmitEditing={event => {
              let params = {
                order_number: searchText,
              };
              searchFunction(params);
            }}
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
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 120,
            alignItems: 'center',
          },
        }}>
        <Tab.Screen name={oneTime}>
          {() => (
            <OneTimeList
              orders={enterpriseOrderList}
              locations={locationList}
              vehicles={vehicleTypeList}
              navigation={navigation}
              onActive={onOneTimeActive}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name={multiple}>
          {() => (
            <MultipleList
              orders={enterpriseOrderList}
              locations={locationList}
              vehicles={vehicleTypeList}
              navigation={navigation}
              onActive={onMultipleActive}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name={shifts}>
          {() => (
            <ShiftsList
              orders={enterpriseOrderList}
              branches={enterpriseBranches}
              vehicles={vehicleTypeList}
              navigation={navigation}
              onActive={onShiftActive}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name={past}>
          {() => (
            <PastList
              orders={enterpriseOrderList}
              locations={locationList}
              vehicles={vehicleTypeList}
              navigation={navigation}
              onActive={onPastActive}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* End of Tab Navigator */}

      {/* Modal start here  */}
      <EnterpriseShiftFillter
        isShiftModalVisible={isShiftModalVisible}
        setShiftModalVisible={setShiftModalVisible}
        onFilterSelected={onFilterSelected}
      />
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
});

export default EnterpriseHistory;
