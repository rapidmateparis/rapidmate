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
  getLocations,
} from '../../data_manager';
import {useUserDetails} from '../commonComponent/StoreContext';
import moment from 'moment';
import {useLoader} from '../../utils/loaderContext';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    useCallback(() => {
      setSelected(moment(new Date()).format('YYYY-MM-DD'));
      getVehicleTypes();
      getLocationsData();
      getEnterprisePlans(moment(new Date()).format('YYYY-MM-DD'));
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

  const getLocationAddress = locationId => {
    let result = locationList.filter(location => location.id == locationId);
    return result[0]?.address;
  };

  const getVehicleType = vehicleId => {
    let result = vehicleTypeList.filter(vehicle => vehicle.id == vehicleId);
    return result[0]?.vehicle_type;
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{backgroundColor: '#fff'}}>
        <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Planning</Text>
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
            console.log('date', day);
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
          <Text style={styles.colorWiseText}>Restaurant</Text>
        </View>

        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.MountainMeadow} />
          <Text style={styles.colorWiseText}>Supermarkets</Text>
        </View>

        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.CuriousBlue} />
          <Text style={styles.colorWiseText}>E-Commerce</Text>
        </View>
      </View>

      <View style={styles.mainColorCard}>
        <View style={styles.colorCardWise}>
          <Octicons name="dot-fill" size={20} color={colors.Wisteria} />
          <Text style={styles.colorWiseText}>Packers & Movers</Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 15, paddingTop: 5}}>
          {enterprisePlans.map((item, index) => {
            return (
              <View key={index} style={styles.packageDetailCard}>
                <View style={styles.packageHeader}>
                  <Image
                    style={styles.manageImages}
                    source={require('../../image/Big-Package.png')}
                  />
                  <Text style={styles.deliveryTime}>
                    Delivered on{' '}
                    {moment(item.delivery_date).format('MMM DD, YYYY hh:mm A')}
                    {' at \n'}
                    {moment(item.delivery_date).format('hh:mm A')}
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
                  <Text style={styles.orderId}>
                    Order ID: {item.order_number}
                  </Text>
                  <Text style={styles.valueMoney}>
                    {getVehicleType(item.vehicle_type_id)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
});

export default EnterprisePlanning;
