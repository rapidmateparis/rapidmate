import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import {FlatList, ActivityIndicator} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import {
  getDeliveryBoyViewOrdersList,
  getDeliveryBoyViewOrdersListBySearch,
  getLocations,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import {useLoader} from '../../utils/loaderContext';
import moment from 'moment';
import {localizationText, titleFormat, utcLocal} from '../../utils/common';
const Tab = createMaterialTopTabNavigator();

const TodayList = ({navigation, filterCriteria, searchText}) => {
  const [index, setIndex] = useState(0);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const {setLoading} = useLoader();
  const timeout = React.useRef(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [checkMoreData, setCheckMoreData] = useState(true);
  const shift = localizationText('Common', 'shift') || 'Shift';
  const totalDays = localizationText('Common', 'totalDays') || 'Total days';
  const totalHours = localizationText('Common', 'totalHours') || 'Total hours';
  const aproxEarning =
    localizationText('Common', 'aproxEarning') || 'Aprox earning';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const forText = localizationText('Common', 'for') || 'For';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';

  useFocusEffect(
    useCallback(() => {
      resetAll();
      getLocationsData();
      getOnGoingRecords(1);
      return () => {
        setCurrentOrderList([]);
      };
    }, [filterCriteria]),
  );

  const resetAll = () => {
    setCurrentOrderList([]);
    setPage(1);
    setCheckMoreData(true);
    getOnGoingRecords(1);
  };

  const getOnGoingRecords = newPage => {
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'current',
      orderType: filterCriteria,
      page: newPage ? newPage : page,
      size: size,
    };
    console.log('ongoing Rec parm ==== ', postParams);

    setLoading(true);
    getDeliveryBoyViewOrdersList(
      postParams,
      null,
      successResponse => {
        console.log(
          'ongoing Rec parm ==== ',
          successResponse[0]._response.length,
        );

        if (size === successResponse[0]._response.length) {
          setPage(page + 1);
          setCheckMoreData(true);
        } else if (size > successResponse[0]._response.length) {
          setCheckMoreData(false);
        }
        if (newPage === 1) {
          setCurrentOrderList([...successResponse[0]._response]);
        } else {
          setCurrentOrderList([
            ...currentOrderList,
            ...successResponse[0]._response,
          ]);
        }
        setLoading(false);
      },
      errorResponse => {
        console.log(errorResponse);
        setLoading(false);
      },
    );
  };

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
    setCurrentOrderList([]);
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'current',
      filterCriteria: filterCriteria,
      orderNumber: searchValue,
    };
    getDeliveryBoyViewOrdersListBySearch(
      postParams,
      successResponse => {
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setCurrentOrderList(tempOrderList);
        }
        setLoading(false);
      },
      errorResponse => {
        setLoading(false);
        if (errorResponse[0]._errors.message) {
          setCurrentOrderList([]);
        }
      },
    );
  };

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
    if (result[0]) {
      let location = result[0];
      return `${location.address}, ${location.city}, ${location.state}, ${location.country}`;
    }
    return null;
  };

  const createShiftOrder = item => {
    console.log('createShiftOrder ====>', item);

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('delivery_type_id ====>', item);
          if (item?.delivery_type_id === 3) {
            navigation.navigate('DeliveryboyShiftDetails', {
              orderItem: item,
            });
          } else if (
            item?.delivery_type_id === 2 &&
            item?.locations &&
            item?.locations?.length > 0
          ) {
            // navigation.navigate('DeliveryDetailsMultipleInvoice',{
            //     orderItem: item.item,
            // });
          } else {
            // navigation.navigate('DeliveryboyMainDeliveryDetails', {
            //   orderItem: item.item,
            //   componentType : 'DELIVERBOY'
            // })
          }
        }}
        style={styles.packageDetailCard}>
        <View style={styles.packageHeader}>
          <View style={styles.packageHeader}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../image/Big-Calender.png')}
            />
            <Text style={styles.deliveryTime}>{shift}</Text>
          </View>

          <View style={styles.packageShiftOrderIdCard}>
            <Text style={styles.esordernumber}>{item?.order_number}</Text>
          </View>
        </View>

        <View style={styles.overViewCard}>
          <View>
            <Text style={styles.requestOverview}>
              {/* {item.total_days ? item.total_days : 0} */}1
            </Text>
            <Text style={styles.requestOverviewInfo}>{totalDays}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              {item?.slots ? Number(item.slots[0]?.total_hours).toFixed(2) : 0}
            </Text>
            <Text style={styles.requestOverviewInfo}>{totalHours}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              €
              <Text>
                {item?.slots ? Number(item.slots[0]?.delivery_boy_amount).toFixed(2) : 0}
              </Text>
            </Text>
            <Text style={styles.requestOverviewInfo}>{aproxEarning}</Text>
          </View>
        </View>

        <View style={styles.scheduleDateTimeCard}>
          <Text style={styles.schaduleInfo}>
            {fromText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
               item?.slots ? item.slots[0]?.slot_date : new Date()
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
          <View style={styles.borderShowoff} />
          <Text style={styles.schaduleInfo}>
            {toText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
               item?.slots ? item.slots[0]?.slot_date : new Date()
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </View>

        <View style={styles.borderShow}></View>

        <View style={styles.footerCard}>
          <Text style={styles.orderId}>
            {forText}: {item?.company_name ? item?.company_name : '-'}
          </Text>
          <Text style={styles.valueMoney}>€{Number(item?.slots[0]?.delivery_boy_amount).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = item => (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        {item?.item?.delivery_type_id === 3 ? (
          createShiftOrder(item?.item)
        ) : (
          <TouchableOpacity
            onPress={() => {
              console.log('item?.item =====>', item?.item);
              if (item?.item?.delivery_type_id === 3) {
                navigation.navigate('DeliveryboyShiftDetails', {
                  orderItem: item.item,
                });
              } else if (
                item?.item?.delivery_type_id === 2 &&
                item?.item?.locations &&
                item?.item?.locations?.length > 0
              ) {
                navigation.navigate('DeliveryDetailsMultipleOrder', {
                  orderItem: item.item,
                });
              } else {
                navigation.navigate('DeliveryboyDeliveryDetails', {
                  order_number: item.item.order_number,
                  package_photo: item.item.package_photo,
                  orderItem: item.item,
                });
              }
            }}
            style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.packageManage}
                source={require('../../image/Big-Package.png')}
              />
              <Text style={styles.deliveryTime}>
                {item.item.delivery_boy_order_title}{' '}
                {item.item.is_show_datetime_in_title == 1
                  ? item.item.order_status === 'ORDER_PLACED'
                    ? titleFormat(
                        item.item.schedule_date_time || item.item.order_date,
                      )
                    : titleFormat(item.item.updated_on)
                  : ''}
                {/* Scheduled on{' '}
              {moment(new Date(item.item.delivery_date)).format(
                'dddd, DD MMMM YYYY',
              )} */}
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                {fromText}{' '}
                <Text style={styles.Location}>
                  {getLocationAddress(item.item.pickup_location_id)}
                </Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                {toText}{' '}
                <Text style={styles.Location}>
                  {getLocationAddress(item.item.dropoff_location_id)}
                </Text>
              </Text>
            </View>
            <View style={styles.footerCard}>
              <Text style={styles.orderId}>
                {orderID}: {item.item.order_number}
              </Text>
              <Text style={styles.orderId}>{item.item.company_name}</Text>
            </View>

            <View style={styles.borderShow}></View>

            <View style={styles.footerCard}>
            {console.log('ITEM DATA:', item)}
              <Text style={styles.orderId}>{item.item.company_name}</Text>
              <Text style={styles.valueMoney}>
                €
                {item.item.delivery_boy_amount
                  ? Number(item.item.delivery_boy_amount).toFixed(2)
                  : '34.00'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderFooter = () => {
    return (
      <View style={{padding: 10}}>
        <ActivityIndicator size="small" color="#d8d8d8" />
      </View>
    );
  };

  const handleLoadMoreOnGoingRecord = () => {
    if (checkMoreData) {
      getOnGoingRecords(page);
    }
  };
  return currentOrderList.length != 0 ? (
    <FlatList
      data={currentOrderList}
      renderItem={renderItem}
      onEndReached={handleLoadMoreOnGoingRecord}
      onEndReachedThreshold={0.5} // Trigger when 50% of the end is visible
      ListFooterComponent={renderFooter}
    />
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
          <Text style={styles.text}>{noOrdersToShow}</Text>
          <Text style={styles.subText}>{noOrdersDescription}</Text>
        </View>
      </View>
    </View>
  );
};

const PastList = ({navigation, filterCriteria, searchText}) => {
  const [pastOrderList, setPastOrderList] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const {setLoading} = useLoader();
  const timeout = React.useRef(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [checkMoreData, setCheckMoreData] = useState(true);
  const shift = localizationText('Common', 'shift') || 'Shift';
  const totalDays = localizationText('Common', 'totalDays') || 'Total days';
  const totalHours = localizationText('Common', 'totalHours') || 'Total hours';
  const aproxEarning =
    localizationText('Common', 'aproxEarning') || 'Aprox earning';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const forText = localizationText('Common', 'for') || 'For';
  const orderID = localizationText('Common', 'orderID') || 'Order ID';
  const noOrdersToShow =
    localizationText('Common', 'noOrdersToShow') || 'No orders to show';
  const noOrdersDescription =
    localizationText('Common', 'noOrdersDescription') || '';

  useFocusEffect(
    useCallback(() => {
      resetAll();
      getLocationsData();
      getPastRecords(1);
      return () => {
        setPastOrderList([]);
      };
    }, [filterCriteria]),
  );

  // useEffect(() => {
  //   getPastRecords(page);
  // }, [page]);

  const resetAll = () => {
    setPastOrderList([]);
    setPage(1);
    setCheckMoreData(true);
    getPastRecords(1);
  };

  const getPastRecords = newPage => {
    let postParams = {
      extentedId: userDetails.userDetails[0].ext_id,
      status: 'past',
      orderType: filterCriteria,
      page: newPage ? newPage : page,
      size: size,
    };
    setLoading(true);
    getDeliveryBoyViewOrdersList(
      postParams,
      null,
      successResponse => {
        if (size === successResponse[0]._response.length) {
          setPage(page + 1);
          setCheckMoreData(true);
        } else if (size > successResponse[0]._response.length) {
          setCheckMoreData(false);
        }

        if (newPage === 1) {
          setPastOrderList([...successResponse[0]._response]);
        } else {
          setPastOrderList([...pastOrderList, ...successResponse[0]._response]);
        }
        setPastOrderList([...pastOrderList, ...successResponse[0]._response]);
        setLoading(false);
      },
      errorResponse => {
        console.log(errorResponse);
        setLoading(false);
      },
    );
  };

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
      filterCriteria: filterCriteria,
      orderNumber: searchValue,
      page: page,
      size: size,
    };
    getDeliveryBoyViewOrdersListBySearch(
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
    setLoading(true)
    setLocationList([]);
    getLocations(
      null,
      successResponse => {
        setLoading(false)
        if (successResponse[0]._success) {
          let tempOrderList = successResponse[0]._response;
          setLocationList(tempOrderList);
        }
      },
      errorResponse => {
        setLoading(false)
        if (errorResponse[0]._errors.message) {
          setLocationList([]);
        }
      },
    );
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    if (result[0]) {
      let location = result[0];
      return `${location.address}, ${location.city}, ${location.state}, ${location.country}`;
    }
    return null;
  };

  const createShiftOrder = item => {
    console.log('item ====>', item);

    return (
      <TouchableOpacity
        onPress={() => {
          console.log('delivery_type_id ====>', item);
          if (item?.delivery_type_id === 3) {
            navigation.navigate('DeliveryboyMainShiftDetails', {
              orderItem: item,
            });
          } else if (
            item?.delivery_type_id === 2 &&
            item?.locations &&
            item?.locations?.length > 0
          ) {
            // navigation.navigate('DeliveryDetailsMultipleInvoice',{
            //     orderItem: item.item,
            // });
          } else {
            // navigation.navigate('DeliveryboyMainDeliveryDetails', {
            //   orderItem: item.item,
            //   componentType : 'DELIVERBOY'
            // })
          }
        }}
        style={styles.packageDetailCard}>
        <View style={styles.packageHeader}>
          <View style={styles.packageHeader}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../image/Big-Calender.png')}
            />
            <Text style={styles.deliveryTime}>{shift}</Text>
          </View>
          <View style={styles.packageShiftOrderIdCard}>
            <Text style={styles.esordernumber}>{item?.order_number}</Text>
          </View>
        </View>

        <View style={styles.overViewCard}>
          <View>
            <Text style={styles.requestOverview}>
              {/* {item.total_days ? item.total_days : 0} */}1
            </Text>
            <Text style={styles.requestOverviewInfo}>{totalDays}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              {item?.slots ? Number(item.slots[0]?.total_hours).toFixed(2) : 0}
            </Text>
            <Text style={styles.requestOverviewInfo}>{totalHours}</Text>
          </View>

          <View>
            <Text style={styles.requestOverview}>
              €
              <Text>
                {item?.slots ? Number(item.slots[0]?.delivery_boy_amount).toFixed(2) : 0}
              </Text>
            </Text>
            <Text style={styles.requestOverviewInfo}>{aproxEarning}</Text>
          </View>
        </View>

        <View style={styles.scheduleDateTimeCard}>
          <Text style={styles.schaduleInfo}>
            {fromText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
                utcLocal(item?.slots ? item.slots[0].slot_date : new Date()),
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
          <View style={styles.borderShowoff} />
          <Text style={styles.schaduleInfo}>
            {toText}{' '}
            <Text style={styles.schaduleDateTime}>
              {moment(
                utcLocal(item?.slots ? item.slots[0].slot_date : new Date()),
              ).format('DD-MM-YYYY')}
            </Text>
          </Text>
        </View>

        <View style={styles.borderShow}></View>

        <View style={styles.footerCard}>
          <Text style={styles.orderId}>
            {forText} {item?.company_name ? item?.company_name : '-'}
          </Text>
          <Text style={styles.valueMoney}>€{Number(item?.slots[0]?.delivery_boy_amount).toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = item => {
    console.log("Item====================>render",item)
    console.log(
      'item?.item?.delivery_type_id === 3 ====',
      item?.item?.delivery_type_id,
    );
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 5,
            backgroundColor: '#FBFAF5',
          }}>
          {item?.item?.delivery_type_id === 3 ? (
            createShiftOrder(item?.item)
          ) : (
            <TouchableOpacity
              onPress={() => {
                console.log('delivery_type_id ====>', item?.item);
                if (item?.item?.delivery_type_id === 3) {
                  navigation.navigate('DeliveryboyShiftDetails', {
                    orderItem: item.item,
                  });
                } else if (
                  item?.item?.delivery_type_id === 2 &&
                  item?.item?.locations &&
                  item?.item?.locations?.length > 0
                ) {
                  navigation.navigate('DeliveryDetailsMultipleInvoice', {
                    orderItem: item.item,
                  });
                } else {
                  navigation.navigate('DeliveryboyMainDeliveryDetails', {
                    orderItem: item.item,
                    componentType: 'DELIVERBOY',
                  });
                }
              }}
              style={styles.packageDetailCard}>
              <View style={styles.packageHeader}>
                <Image
                  style={styles.packageManage}
                  source={require('../../image/Big-Package.png')}
                />
                <Text style={styles.deliveryTime}>
                  {item.item.delivery_boy_order_title}{' '}
                  {item.item.is_show_datetime_in_title == 1
                    ? item.item.order_status === 'ORDER_PLACED'
                      ? titleFormat(
                          item.item.schedule_date_time || item.item.order_date,
                        )
                      : titleFormat(item.item.updated_on)
                    : ''}
                  {/* Scheduled on{' '}
              {moment(new Date(item.item.delivery_date)).format(
                'dddd, DD MMMM YYYY',
              )} */}
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <Ionicons name="location-outline" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {fromText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.item.pickup_location_id)}
                  </Text>
                </Text>
              </View>

              <View style={styles.packageMiddle}>
                <MaterialIcons name="my-location" size={15} color="#717172" />
                <Text style={styles.fromLocation}>
                  {toText}{' '}
                  <Text style={styles.Location}>
                    {getLocationAddress(item.item.dropoff_location_id)}
                  </Text>
                </Text>
              </View>
              <View style={styles.footerCard}>
                <Text style={styles.orderId}>
                  {orderID}: {item.item.order_number}
                </Text>
                <Text style={styles.orderId}>{item.item.company_name}</Text>
              </View>

              <View style={styles.borderShow}></View>

              <View style={styles.footerCard}>
                <Text style={styles.orderId}>{item.item.company_name}</Text>
                <Text style={styles.valueMoney}>€ {Number(item.item.delivery_boy_amount).toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* <View style={styles.packageDetailCard}>
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
        </View> */}
        </View>
      </View>
    );
  };

  const handleLoadMorePastRecord = () => {
    if (checkMoreData) {
      getPastRecords(page);
    }
  };

  const renderFooter = () => {
    return (
      <View style={{padding: 10}}>
        <ActivityIndicator size="small" color="#d8d8d8" />
      </View>
    );
  };

  return pastOrderList.length != 0 ? (
    <FlatList
      data={pastOrderList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleLoadMorePastRecord}
      onEndReachedThreshold={0.5} // Trigger when 50% of the end is visible
      ListFooterComponent={renderFooter}
    />
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
          <Text style={styles.text}>{noOrdersToShow}</Text>
          <Text style={styles.subText}>{noOrdersDescription}</Text>
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
  const [filterCriteria, setFilterCriteria] = useState('N');
  const [isEnabled, setIsEnabled] = useState(false);
  const ongoing = localizationText('Common', 'ongoing') || 'Ongoing';
  const past = localizationText('Common', 'past') || 'Past';

  // Toggle the switch and update filterCriteria
  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const newState = !previousState;
      setFilterCriteria(newState ? 'E' : 'N');
      return newState;
    });
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{paddingHorizontal: 15, paddingTop: 5, backgroundColor: '#fff'}}>
        {/* Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {localizationText('Common', 'history')}
          </Text>
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
            placeholder={localizationText('Common', 'searchYourDeliveries')}
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
      </View>

      <View style={styles.containerSwitch}>
        <Text style={styles.label}>
          {localizationText('Common', 'showEnterpriseOrders')}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#FFC72B'}}
          thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.subText,
          tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat-Regular'},
          tabBarIndicatorStyle: {backgroundColor: colors.secondary},
          tabBarStyle: [{display: 'flex', backgroundColor: '#fff'}],
        }}>
        <Tab.Screen name={ongoing}>
          {() => (
            <TodayList
              navigation={navigation}
              filterCriteria={filterCriteria}
              searchText={searchText}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name={past}>
          {() => (
            <PastList
              navigation={navigation}
              filterCriteria={filterCriteria}
              searchText={searchText}
            />
          )}
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
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  esordernumber: {
    fontSize: 13,
    color: colors.secondary,
    fontFamily: 'Montserrat-SemiBold',
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
  selectedOption: {
    backgroundColor: '#d3d3d3',
  },
  selectedText: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  defaultText: {
    color: 'black',
  },
  containerSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  packageShiftOrderIdCard: {
    marginLeft: 'auto',
  },
});

export default DeliveryboyHistory;
