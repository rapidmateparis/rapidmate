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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '../../colors';
import {
  fetchEnterprisePlans,
  getAllVehicleTypes,
  getEnterpriseBranch,
  getLocations,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import moment from 'moment';
import {useLoader} from '../../utils/loaderContext';
import {useFocusEffect} from '@react-navigation/native';
import {localizationText, titleFormat} from '../../utils/common';

const EnterprisePlanning = ({navigation}) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [selected, setSelected] = useState('');
  const [enterprisePlans, setEnterprisePlans] = useState([]);
  const {userDetails} = useUserDetails();
  const [locationList, setLocationList] = useState([]);
  const {setLoading} = useLoader();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);
  const [enterpriseBranches, setEnterpriseBranches] = useState([]);
  const noBranches = localizationText('Common', 'noBranches') || 'No Branches';
  const noPlannings =
    localizationText('Common', 'noPlannings') || 'No Plannings';
  const hoursShift = localizationText('Common', 'hoursShift') || 'hours shift';
  const fromText = localizationText('Common', 'from') || 'From';
  const toText = localizationText('Common', 'to') || 'To';
  const orderID = localizationText('Common', 'orderID') || 'Order Id';

  useFocusEffect(
    useCallback(() => {
      setSelected(moment(new Date()).format('YYYY-MM-DD'));
      getVehicleTypes();
      getLocationsData();
      getEnterprisePlans(moment(new Date()).format('YYYY-MM-DD'));
      getBranchesList();
    }, []),
  );

  const getEnterprisePlans = dateString => {
    let params = {
      enterprise_ext_id: userDetails.userDetails[0].ext_id,
      plan_date: dateString,
    };
    fetchEnterprisePlans(
      params,
      successResponse => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            setEnterprisePlans(successResponse[0]._response);
          }
        } else {
          setEnterprisePlans([]);
        }
      },
      errorResponse => {
        setEnterprisePlans([]);
        // Alert.alert('Error Alert', errorResponse[0]._errors.message, [
        //   {text: 'OK', onPress: () => {}},
        // ]);
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
        console.log(
          'successResponse =========>>',
          JSON.stringify(successResponse),
        );
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == 'NotAuthorizedException') {
              // Alert.alert('Error Alert', successResponse[0]._response.name, [
              //   {text: 'OK', onPress: () => {}},
              // ]);
              setEnterpriseBranches([]);
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
        setEnterpriseBranches([]);
        // Alert.alert('Error Alert*', errorResponse[0]._errors.message, [
        //   {text: 'OK', onPress: () => {}},
        // ]);
      },
    );
  };

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const getVehicleType = vehicleId => {
    let result = vehicleTypeList.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  const getBranchAddress = branchId => {
    let result = enterpriseBranches.filter(branch => branch.id == branchId);
    return result[0]?.address;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{backgroundColor: '#fff'}}>
        <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {localizationText('Common', 'planning')}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EnterpriseScheduleNewDelivery')
                }>
                <AntDesign name="pluscircle" size={25} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.calenderCard}>
        <Calendar
          onDayPress={day => {
            getEnterprisePlans(day.dateString);
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
            '2024-05-13': {marked: true, dotColor: colors.primary},
            '2024-05-14': {marked: true, dotColor: colors.MountainMeadow},
            '2024-05-15': {marked: true, dotColor: colors.CuriousBlue},
            '2024-05-16': {marked: true, dotColor: colors.Wisteria},
            // '2024-05-17': {selected: true, marked: true, dotColor: colors.secondary, selectedColor: 'yellow'},
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#ccc',
          }}
        />
      </View>
      <View style={styles.mainColorCard}>
        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.primary} />
          <Text style={styles.colorWiseText}>
            {localizationText('Common', 'restaurant')}
          </Text>
        </View>

        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.MountainMeadow} />
          <Text style={styles.colorWiseText}>
            {localizationText('Common', 'supermarkets')}
          </Text>
        </View>

        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.CuriousBlue} />
          <Text style={styles.colorWiseText}>
            {localizationText('Common', 'eCommerce')}
          </Text>
        </View>
      </View>

      <View style={styles.mainColorCard}>
        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.Wisteria} />
          <Text style={styles.colorWiseText}>
            {localizationText('Common', 'packersAndMovers')}
          </Text>
        </View>
      </View>

      {enterpriseBranches.length === 0 && (
        <View style={styles.noBranchedView}>
          <Text style={[styles.colorWiseText, {fontWeight: 'bold'}]}>
            {noBranches}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EnterpriseLocation');
            }}>
            <AntDesign name="pluscircle" size={25} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
      {enterprisePlans.length === 0 ? (
        <View style={styles.noBranchedView}>
          <Text style={[styles.colorWiseText, {fontWeight: 'bold'}]}>
            {noPlannings}
          </Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: 15, paddingTop: 5}}>
            {enterprisePlans.map((item, index) => {
              return (
                <View>
                  {item.delivery_type_id == 3 ? (
                    <View key={index} style={styles.packageDetailCard}>
                      <TouchableOpacity style={styles.packageDetailCard}>
                        <View style={styles.packageshiftHeader}>
                          <View style={styles.packageshiftHeader}>
                            <Image
                              style={styles.imagesManage}
                              source={require('../../image/Big-Calender.png')}
                            />
                            <Text style={styles.deliveryTime}>
                              {item.slots[0]
                                ? moment(
                                    item.slots[0].from_time,
                                    'HH:mm:ss',
                                  ).format('hh A')
                                : '--'}
                              {' to '}
                              {item.slots[0]
                                ? moment(
                                    item.slots[0].to_time,
                                    'HH:mm:ss',
                                  ).format('hh A')
                                : '--'}
                            </Text>
                          </View>
                          <Text style={styles.deliveryTime}>
                            {item.slots[0]
                              ? moment(item.slots[0].to_time, 'HH:mm:ss').diff(
                                  moment(item.slots[0].from_time, 'HH:mm:ss'),
                                ) / 3600000
                              : '0'}{' '}
                            {hoursShift}
                          </Text>
                        </View>

                        <View style={styles.packageMiddle}>
                          <Ionicons
                            name="location-outline"
                            size={15}
                            color="#717172"
                          />
                          <Text style={styles.fromshiftLocation}>
                            {getBranchAddress(item.branch_id)}
                          </Text>
                        </View>

                        <View style={styles.footerCard}>
                          <Text
                            style={[
                              styles.orderActive,
                              {
                                color: colors.Pending,
                                backgroundColor: '#F39C1212',
                              },
                            ]}>
                            {item.order_status.replace(/_/g, ' ')}
                          </Text>
                          <Text style={styles.orderId}>
                            {getVehicleType(item.vehicle_type_id)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View key={index} style={styles.packageDetailCard}>
                      <View style={styles.packageHeader}>
                        <Image
                          style={styles.manageImages}
                          source={require('../../image/Big-Package.png')}
                        />
                        <Text style={styles.deliveryTime}>
                          {item.consumer_order_title}{' '}
                          {item.is_show_datetime_in_title == 1
                            ? item.order_status === 'ORDER_PLACED'
                              ? titleFormat(
                                  item.schedule_date_time || item.order_date,
                                )
                              : titleFormat(item.updated_on)
                            : ''}
                        </Text>
                      </View>

                      <View style={styles.packageMiddle}>
                        <Ionicons
                          name="location-outline"
                          size={15}
                          color="#717172"
                        />
                        <Text style={styles.fromLocation}>
                          {fromText}{' '}
                          <Text style={styles.Location}>
                            {getLocationAddress(item.pickup_location)}
                          </Text>
                        </Text>
                      </View>

                      <View style={styles.packageMiddle}>
                        <MaterialIcons
                          name="my-location"
                          size={15}
                          color="#717172"
                        />
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
                        <Text style={styles.valueMoney}>
                          {getVehicleType(item.vehicle_type_id)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
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
    padding: 7,
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
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  valueMoney: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
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
  availbilityBt: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    padding: 8,
    marginLeft: 10,
  },
  availabilityText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
  },
  colorWiseText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginHorizontal: 8,
  },
  colorCardWise: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainColorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  manageImages: {
    width: 25,
    height: 25,
  },
  shiftCard: {
    flexDirection: 'row',
  },
  deliveryShiftTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
    width: '62%',
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
  imagesManage: {
    width: 20,
    height: 20,
  },
  noBranchedView: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    backgroundColor: '#E5E4E4',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 4,
  },
});

export default EnterprisePlanning;
