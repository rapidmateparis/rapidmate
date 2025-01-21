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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../colors';
import ChoosePhotoByCameraGallaryModal from '../commonComponent/ChoosePhotoByCameraGallaryModal';
import {
  handleCameraLaunchFunction,
  handleImageLibraryLaunchFunction,
  localizationText,
  localToUTC,
} from '../../utils/common';
import MapAddress from '../commonComponent/MapAddress';
import {useLoader} from '../../utils/loaderContext';
import {getLocationId, uploadDocumentsApi} from '../../data_manager';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MultpleMapAddress from '../commonComponent/MultipleMapAddress';
import {useUserDetails} from '../commonComponent/StoreContext';

const EnterpiseScheduleNewDetailsFill = ({route, navigation}) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [company, setCompany] = useState('');
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [pickupNotes, setPickupNotes] = useState('');
  const [orderid, setOrderid] = useState('');
  const [number, setNumber] = useState('');
  const [promoEmails, setPromoEmails] = useState(false);
  const [selectedRepeatMonth1, setSelectedRepeatMonth1] = useState(first);
  const [selectedRepeatEvery, setSelectedRepeatEvery] = useState('1');
  const [selectedRepeatType, setSelectedRepeatType] = useState(day);
  const [isFocusRepeatEvery, setIsFocusRepeatEvery] = useState(false);
  const [isFocusRepeatType, setIsFocusRepeatType] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [repeatOrder, setRepeatOrder] = useState(daily);
  const [isModalVisibleCamera, setModalVisibleCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoFileName, setPhotoFileName] = useState(''); // State for filename
  const [distanceTime, setDistanceTime] = useState();
  const [sourceLocation, setSourceLocation] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const {setLoading} = useLoader();
  const [sourceLocationId, setSourceLocationId] = useState();
  const [destinationLocationId, setDestinationLocationId] = useState();
  const [date, setDate] = useState(new Date());
  const [untilDate, setUntilDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [dateUntilOpen, setDateUntilOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupUntilDate, setPickupUntilDate] = useState('');

  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedWeekDay, setSelectedWeekDay] = useState(null);

  const [destinationBranches, setDestinationBranches] = useState([]);
  const [multipleDestinationAmount, setMultipleDestinationAmount] = useState(0);
  const [multipleDestinationDistance, setMultipleDestinationDistance] =
    useState(0);
  const [multipleDestinationHours, setMultipleDestinationHours] = useState(0);

  const [mapViewHeight, setMapViewHeight] = useState(200);

  const routeParams = route.params;
  const deliveryType = route.params.delivery_type_id;

  const {userDetails} = useUserDetails();

  const [imageViewId, setImageViewId] = useState(null);

  const [isInstantDate, setIsInstantDate] = useState(null);

  const handleDayPress = day => {
    let updatedSelectedDays;

    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it from the selectedDays array
      updatedSelectedDays = selectedDays.filter(
        selectedDay => selectedDay !== day,
      );
    } else {
      // If the day is not selected, add it to the selectedDays array
      updatedSelectedDays = [...selectedDays, day];
    }

    setSelectedDays(updatedSelectedDays);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const daily = localizationText('Common', 'daily') || 'Daily';
  const weekly = localizationText('Common', 'weekly') || 'Weekly';
  const monthly = localizationText('Common', 'monthly') || 'Monthly';
  const repeatEvery = localizationText('Common', 'repeatEvery') || '';
  const until = localizationText('Common', 'until') || 'until';
  const occursEveryDayUntil =
    localizationText('Common', 'occursEveryDayUntil') || '';
  const occursEvery =
    localizationText('Common', 'occursEvery') || 'Occurs Every';
  const week = localizationText('Common', 'week') || 'Week';
  const day = localizationText('Common', 'day') || 'Day';
  const first = localizationText('Common', 'first') || 'First';
  const second = localizationText('Common', 'second') || 'Second';
  const third = localizationText('Common', 'third') || 'Third';
  const fourth = localizationText('Common', 'fourth') || 'Fourth';
  const fifth = localizationText('Common', 'fifth') || 'Fifth';
  const sunday = localizationText('Common', 'sunday') || 'Sunday';
  const monday = localizationText('Common', 'monday') || 'Monday';
  const tuesday = localizationText('Common', 'tuesday') || 'Tuesday';
  const wednesday = localizationText('Common', 'wednesday') || 'Wednesday';
  const thursday = localizationText('Common', 'thursday') || 'Thursday';
  const friday = localizationText('Common', 'friday') || 'Friday';
  const saturday = localizationText('Common', 'saturday') || 'Saturday';
  const pickupDateText = localizationText('Common', 'pickupDate') || 'Pickup Date';
  const pickupTimeText = localizationText('Common', 'pickupTime') || 'Pickup Date';

  const repeatType = [{label: week, value: week}];

  const weeklyDay = [{label: day, value: day}];

  const monthValue1 = [
    {label: first, value: first},
    {label: second, value: second},
    {label: third, value: third},
    {label: fourth, value: fourth},
    {label: fifth, value: fifth},
  ];

  const monthDays = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
  ];

  const days = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const weekList = [
    {label: sunday, value: sunday},
    {label: monday, value: monday},
    {label: tuesday, value: tuesday},
    {label: wednesday, value: wednesday},
    {label: thursday, value: thursday},
    {label: friday, value: friday},
    {label: saturday, value: saturday},
  ];

  const toggleModal = () => {
    setModalVisibleCamera(!isModalVisibleCamera);
  };
  const handlePhotoOpenClose = visible => {
    setModalVisibleCamera(!visible);
  };

  const numberData = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  const handleCameraLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let cameraData = await handleCameraLaunchFunction();
      if (cameraData.status == 'success') {
        setPhotoFileName(getFileName(cameraData.data.uri));
        uploadImage(cameraData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const handleImageLibraryLaunch = async () => {
    setModalVisibleCamera(!isModalVisibleCamera);
    try {
      let imageData = await handleImageLibraryLaunchFunction();
      if (imageData.status == 'success') {
        setPhotoFileName(getFileName(imageData.data.uri));
        uploadImage(imageData);
      }
    } catch (error) {
      // Handle errors here
    }
  };

  const getFileName = uri => {
    if (!uri) return '';
    const startIndex = uri.lastIndexOf('/') + 1;
    let fileName = uri.substr(startIndex);
    // Get last 20 characters or the whole string if shorter
    fileName = fileName.substr(-35);
    return fileName.length > 35 ? '...' + fileName : fileName;
  };

  const uploadImage = async image => {
    if (image != null) {
      var photo = {
        uri: image.data.uri,
        type: image.data.type,
        name: image.data.fileName,
      };
      const formdata = new FormData();
      formdata.append('file', photo);
      setLoading(true);
      uploadDocumentsApi(
        formdata,
        successResponse => {
          setLoading(false);
          setImageViewId(JSON.parse(successResponse).id);
        },
        errorResponse => {
          console.log(
            'print_data==>errorResponseuploadDocumentsApi',
            '' + errorResponse,
          );
          setLoading(false);
          Alert.alert('Error Alert', '' + errorResponse, [
            {text: 'OK', onPress: () => {}},
          ]);
        },
      );
    } else {
      Alert.alert('Error Alert', 'Please choose a picture', [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  const onFetchDistanceAndTime = value => {
    console.log('onFetchDistanceAndTime', value);
    setDistanceTime(value);
  };

  useEffect(() => {
    setNumber(userDetails.userDetails[0].phone.substring(3));
    setCompany(userDetails.userDetails[0].company_name);
    if (deliveryType == 2) {
      onBranchSourceLocation(routeParams.sourceBranch);
    }
  }, []);

  const onBranchSourceLocation = location => {
    let locationParams = {
      location_name: location.branch_name ? location.branch_name : '',
      address: location.address ? location.address : '',
      city: location.city ? location.city : '',
      state: location.state ? location.state : '',
      country: location.country ? location.country : '',
      postal_code: location.postal_code ? location.postal_code : '',
      latitude: location.latitude,
      longitude: location.longitude,
    };
    location.sourceDescription =
      locationParams.address +
      ', ' +
      locationParams.city +
      ', ' +
      locationParams.country;
    setSourceLocation(location);
    setLoading(true);
    getLocationId(
      locationParams,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setSourceLocationId(successResponse[0]._response.location_id);
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

  const onMultpleDestinationLocation = locations => {
    var branches = [];
    var totalAmount = 0;
    var totalDistance = 0;
    var totalHours = 0;
    locations.forEach(element => {
      if (element.destinationDescription && element?.distance) {
        var currentElement = {};
        currentElement.distance = element.distance.toFixed(2);
        totalDistance = totalDistance + element.distance;
        currentElement.total_hours = element.duration.toFixed(2);
        totalHours = totalHours + element.duration;
        currentElement.to_latitude = element.destinationCoordinates.latitude;
        currentElement.to_longitude = element.destinationCoordinates.longitude;
        currentElement.amount = Math.round(
          route.params.vehicle_type.base_price +
            route.params.vehicle_type.km_price * element.distance,
        ).toFixed(2);
        totalAmount =
          totalAmount +
          Math.round(
            route.params.vehicle_type.base_price +
              route.params.vehicle_type.km_price * element.distance,
          );
        currentElement.delivery_date = moment(localToUTC(new Date())).format(
          'YYYY-MM-DD',
        );
        currentElement.destinationDescription = element.destinationDescription;
        branches.push(currentElement);
      }
    });
    console.log('distance', totalDistance);
    console.log('hours', totalHours);
    if (branches.length > 0) {
      setDestinationBranches(branches);
      onFetchDistanceAndTime({
        distance: branches[0].distance,
        time: branches[0].total_hours,
      });
      setDestinationLocation(locations[0]);
      setDestinationLocationId(locations[0].locationId);
      setMultipleDestinationAmount(totalAmount);
      setMultipleDestinationHours(totalHours);
      setMultipleDestinationDistance(totalDistance);
    }
  };

  const onSourceLocation = location => {
    setSourceLocation(location);

    let locationDetails = location.sourceDescription.split(',');
    let locationParams = {
      location_name: locationDetails[0] ? locationDetails[0] : '',
      address: locationDetails[0] ? locationDetails[0] : '',
      city: locationDetails[1] ? locationDetails[1] : '',
      state: locationDetails[2] ? locationDetails[2] : '',
      country: locationDetails[3] ? locationDetails[3] : '',
      postal_code: '23424',
      latitude: location.originCoordinates.latitude,
      longitude: location.originCoordinates.longitude,
    };
    setLoading(true);
    getLocationId(
      locationParams,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setSourceLocationId(successResponse[0]._response.location_id);
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

  const onDestinationLocation = location => {
    setDestinationLocation(location);

    let locationDetails = location.destinationDescription.split(',');
    let locationParams = {
      location_name: locationDetails[0] ? locationDetails[0] : '',
      address: locationDetails[0] ? locationDetails[0] : '',
      city: locationDetails[1] ? locationDetails[1] : '',
      state: locationDetails[2] ? locationDetails[2] : '',
      country: locationDetails[3] ? locationDetails[3] : '',
      postal_code: '23425',
      latitude: location.destinationCoordinates.latitude,
      longitude: location.destinationCoordinates.longitude,
    };
    setLoading(true);
    getLocationId(
      locationParams,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setDestinationLocationId(successResponse[0]._response.location_id);
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      style={{flex: 1}}>
      {deliveryType == 2 ? (
        <View style={{height: 400, position: 'relative'}}>
          <MultpleMapAddress
            sourceLocation={routeParams.sourceBranch}
            onFetchDistanceAndTime={onFetchDistanceAndTime}
            onDestinationLocation={location => {
              onMultpleDestinationLocation(location);
            }}
          />
        </View>
      ) : (
        <View style={{height: 200, position: 'relative'}}>
          <MapAddress
            // sourceLocation={routeParams.sourceBranch}
            onFetchDistanceAndTime={onFetchDistanceAndTime}
            onSourceLocation={onSourceLocation}
            onDestinationLocation={onDestinationLocation}
          />
        </View>
      )}

      <View style={{width: '100%', backgroundColor: '#FBFAF5'}}>
        <View style={{paddingHorizontal: 15, paddingTop: 8}}>
          <View>
            <View style={{flex: 1}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'companyName')}
              </Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={company}
                onChangeText={text => setCompany(text)}
              />
            </View>

            <View>
              <Text style={styles.textlable}>
                {localizationText('Common', 'phoneNumber')}
              </Text>
              <View style={styles.mobileNumberInput}>
                <View style={{width: 95}}>
                  <View style={styles.containerDropdown}>
                    <Dropdown
                      data={numberData}
                      search
                      itemTextStyle={styles.itemtextStyle}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? '+33' : '...'}
                      searchPlaceholder="+.."
                      value={dropdownValue}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDropdownValue(item.value);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <Image
                          style={{marginRight: 10}}
                          source={require('../../image/flagIcon.png')}
                        />
                      )}
                    />
                  </View>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    {fontFamily: 'Montserrat-Regular', fontSize: 16},
                  ]}
                  placeholder="00 00 00 00 00"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={11}
                  value={number}
                  onChangeText={text => setNumber(text)}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleModal}
              style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'packagePhoto')}
              </Text>
              <View style={styles.dottedLine}>
                <Entypo
                  name="attachment"
                  size={13}
                  color="#131314"
                  style={{marginTop: 13}}
                />
                <Text style={styles.packagePhoto}>
                  {localizationText('Common', 'packagePhoto')}
                </Text>
                <View style={styles.packagePhotoPath}>
                  <Text style={styles.packagePhotoText}>{photoFileName}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{flex: 1}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'packageId')}
              </Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholderTextColor="#999"
                placeholder="Type here"
                value={orderid}
                onChangeText={text => setOrderid(text)}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.textlable}>
                {localizationText('Common', 'pickupNotes')}
              </Text>
              <TextInput
                style={styles.inputTextStyle}
                multiline={true}
                placeholderTextColor="#999"
                numberOfLines={4} // Set the number of lines you want to display initially
                placeholder="Type here"
                textAlignVertical="top"
                value={pickupNotes}
                onChangeText={text => setPickupNotes(text)}
              />
            </View>

            <View>
              <View style={styles.bookAddress}>
                <Text style={styles.cardTitle}>
                  {localizationText('Common', 'isInstantDateText')}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setIsInstantDate(isInstantDate ? null : new Date())
                  }>
                  <MaterialCommunityIcons
                    name={isInstantDate ? 'toggle-switch' : 'toggle-switch-off'}
                    size={55}
                    color={isInstantDate ? '#FFC72B' : '#D3D3D3'}
                  />
                </TouchableOpacity>
              </View>

              {isInstantDate ? 
                <Text style={styles.pickupDates}>
                   {pickupDateText} :
                  {moment(isInstantDate).format('YYYY-MM-DD') +
                    ' ' +
                    moment(isInstantDate).format('hh:mm')}
                </Text>
                : <View style={styles.datetimeCard}>
                  <View style={{width: '50%', marginRight: 8}}>
                    <Text style={styles.pickupDates}>
                      {pickupDateText}
                    </Text>
                    <View style={styles.nameInputDiv}>
                      <DatePicker
                        modal
                        open={dateOpen}
                        date={date}
                        mode="date"
                        minimumDate={new Date()}
                        onConfirm={date => {
                          setDateOpen(false);
                          setDate(date);
                          setTime(date);
                          setPickupDate(moment(date).format('DD/MM/YYYY'));
                        }}
                        onCancel={() => {
                          setDateOpen(false);
                        }}
                      />
                      <TextInput
                        style={[
                          styles.loginput,
                          {fontFamily: 'Montserrat-Regular'},
                        ]}
                        placeholder="12/06/2024"
                        placeholderTextColor="#999"
                        editable={false}
                        value={pickupDate}
                      />
                      <AntDesign
                        name="calendar"
                        size={20}
                        onPress={() => setDateOpen(true)}
                        color={colors.secondary}
                        style={{marginTop: 13}}
                      />
                    </View>
                  </View>

                  <View style={{width: '50%'}}>
                    <Text style={styles.pickupDates}>
                      {pickupTimeText}
                    </Text>
                    <View style={styles.nameInputDiv}>
                      <DatePicker
                        modal
                        open={timeOpen}
                        date={time}
                        mode="time"
                        onConfirm={date => {
                          setTimeOpen(false);
                          setTime(date);
                          setPickupTime(moment(date).format('hh:mm A'));
                        }}
                        onCancel={() => {
                          setTimeOpen(false);
                        }}
                      />
                      <TextInput
                        style={[
                          styles.loginput,
                          {fontFamily: 'Montserrat-Regular'},
                        ]}
                        placeholder="10:30 AM"
                        placeholderTextColor="#999"
                        editable={false}
                        value={pickupTime}
                      />
                      <Ionicons
                        name="time-outline"
                        size={20}
                        onPress={() => {
                          setTimeOpen(true);
                        }}
                        color={colors.secondary}
                        style={{marginTop: 13}}
                      />
                    </View>
                  </View>
                </View>}
            </View>
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.bookAddress}>
            <Text style={styles.cardTitle}>
              {localizationText('Common', 'repeatThisOrder')}
            </Text>
            <TouchableOpacity onPress={togglePromoEmails}>
              <MaterialCommunityIcons
                name={promoEmails ? 'toggle-switch' : 'toggle-switch-off'}
                size={55}
                color={promoEmails ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
          {promoEmails && (
            <View style={styles.mainDateCard}>
              <TouchableOpacity
                onPress={() => {
                  setRepeatOrder(daily);
                  setSelectedRepeatType('Day');
                }}
                style={styles.datesCards}>
                <FontAwesome
                  name={repeatOrder === daily ? 'dot-circle-o' : 'circle-thin'}
                  size={20}
                  color={repeatOrder === daily ? colors.secondary : colors.text}
                />
                <Text style={styles.deliveryDates}>{daily}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedRepeatType('Day');
                  setRepeatOrder(weekly);
                }}
                style={styles.datesCards}>
                <FontAwesome
                  name={repeatOrder === weekly ? 'dot-circle-o' : 'circle-thin'}
                  size={20}
                  color={
                    repeatOrder === weekly ? colors.secondary : colors.text
                  }
                />
                <Text style={styles.deliveryDates}>{weekly}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRepeatOrder(monthly)}
                style={styles.datesCards}>
                <FontAwesome
                  name={
                    repeatOrder === monthly ? 'dot-circle-o' : 'circle-thin'
                  }
                  size={20}
                  color={
                    repeatOrder === monthly ? colors.secondary : colors.text
                  }
                />
                <Text style={styles.deliveryDates}>{monthly}</Text>
              </TouchableOpacity>
            </View>
          )}
          <View>
            {promoEmails && repeatOrder === daily && (
              <View>
                <View style={styles.dailyCardMain}>
                  <View style={styles.repeatdayCard}>
                    <AntDesign name="retweet" size={20} color={colors.text} />
                    <Text style={styles.repeatEvery}>{repeatEvery}</Text>
                  </View>
                  <View style={styles.containerCity}>
                    <Dropdown
                      style={styles.dateDropdown}
                      data={days}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      itemTextStyle={{color: colors.text}}
                      selectedTextStyle={{color: colors.text}}
                      placeholder={!isFocusRepeatEvery ? '1' : '1'}
                      searchPlaceholder="Search.."
                      value={selectedRepeatEvery}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setSelectedRepeatEvery(item.value);
                        setIsFocusRepeatEvery(false);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.untilDateCard}>
                  <Text style={styles.untilDateText}>{until}</Text>
                  <View style={styles.dateUntilDiv}>
                    <DatePicker
                      modal
                      open={dateUntilOpen}
                      date={untilDate}
                      mode="date"
                      minimumDate={new Date()}
                      onConfirm={date => {
                        setDateUntilOpen(false);
                        setUntilDate(date);
                        setPickupUntilDate(moment(date).format('DD/MM/YYYY'));
                      }}
                      onCancel={() => {
                        setDateUntilOpen(false);
                      }}
                    />
                    <TextInput
                      style={[
                        styles.loginput,
                        {fontFamily: 'Montserrat-Regular'},
                      ]}
                      placeholder="12/06/2024"
                      placeholderTextColor="#999"
                      editable={false}
                      value={pickupUntilDate}
                    />
                    <AntDesign
                      name="calendar"
                      size={20}
                      onPress={() => setDateUntilOpen(true)}
                      color={colors.secondary}
                      style={{marginTop: 13}}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.untilDayOccurs}>
                    {occursEveryDayUntil}{' '}
                    <Text style={styles.untilDateOccurs}>
                      {moment(untilDate).format('MMMM DD, YYYY')}
                    </Text>
                  </Text>
                </View>
              </View>
            )}
          </View>

          {promoEmails && repeatOrder === weekly && (
            <View>
              <View style={styles.dailyCardMain}>
                <View style={styles.repeatdayCard}>
                  <AntDesign name="retweet" size={20} color={colors.text} />
                  <Text style={styles.repeatEvery}>{repeatEvery}</Text>
                </View>
                <View style={styles.containerCity}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={days}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={{color: colors.text}}
                    selectedTextStyle={{color: colors.text}}
                    placeholder={!isFocus ? '1' : '1'}
                    searchPlaceholder="Search.."
                    value={selectedRepeatEvery}
                    onFocus={() => setIsFocusRepeatEvery(true)}
                    onBlur={() => setIsFocusRepeatEvery(false)}
                    onChange={item => {
                      setSelectedRepeatEvery(item.value);
                      setIsFocusRepeatEvery(false);
                    }}
                  />
                </View>

                <View style={styles.containerWeek}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={weeklyDay}
                    disable
                    itemTextStyle={{color: colors.text}}
                    selectedTextStyle={{color: colors.text}}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Week' : 'Week'}
                    searchPlaceholder="Search.."
                    value={selectedRepeatType}
                    onFocus={() => setIsFocusRepeatType(true)}
                    onBlur={() => setIsFocusRepeatType(false)}
                    onChange={item => {
                      setSelectedRepeatType(item.value);
                      setIsFocusRepeatType(false);
                    }}
                  />
                </View>
              </View>

              <View style={styles.untilDateCard}>
                <Text style={styles.untilDateText}>{until}</Text>
                <View style={styles.dateUntilDiv}>
                  <DatePicker
                    modal
                    open={dateUntilOpen}
                    date={untilDate}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={date => {
                      setDateUntilOpen(false);
                      setUntilDate(date);
                      setPickupUntilDate(moment(date).format('DD/MM/YYYY'));
                    }}
                    onCancel={() => {
                      setDateUntilOpen(false);
                    }}
                  />
                  <TextInput
                    style={[
                      styles.loginput,
                      {fontFamily: 'Montserrat-Regular'},
                    ]}
                    placeholder="12/06/2024"
                    placeholderTextColor="#999"
                    editable={false}
                    value={pickupUntilDate}
                  />
                  <AntDesign
                    name="calendar"
                    size={20}
                    onPress={() => setDateUntilOpen(true)}
                    color={colors.secondary}
                    style={{marginTop: 13}}
                  />
                </View>
              </View>
              <View style={styles.weekDaysMainCard}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(
                  (day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.weekDaysCard,
                        selectedDays.includes(day) && {
                          backgroundColor: colors.secondary,
                        },
                      ]}
                      onPress={() => handleDayPress(day)}>
                      <Text
                        style={[
                          styles.dayOfWeek,
                          selectedDays.includes(day) && styles.selectedText,
                        ]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
              <View>
                <Text style={styles.untilDayOccurs}>
                  {occursEvery} <Text>Monday</Text> & <Text>Tuesday</Text> from{' '}
                  <Text style={styles.untilDateOccurs}>11 AM</Text> to{' '}
                  <Text style={styles.untilDateOccurs}>4 PM</Text> unti{' '}
                  <Text style={styles.untilDateOccurs}>August 23, 2024</Text>
                </Text>
              </View>
            </View>
          )}

          {promoEmails && repeatOrder === monthly && (
            <View>
              <View style={styles.dailyCardMain}>
                <View style={styles.repeatdayCard}>
                  <AntDesign name="retweet" size={20} color={colors.text} />
                  <Text style={styles.repeatEvery}>{repeatEvery}</Text>
                </View>
                <View style={styles.containerCity}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={days}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    itemTextStyle={{color: colors.text}}
                    selectedTextStyle={{color: colors.text}}
                    placeholder={!isFocus ? '1' : '1'}
                    searchPlaceholder="Search.."
                    value={selectedRepeatEvery}
                    onFocus={() => setIsFocusRepeatEvery(true)}
                    onBlur={() => setIsFocusRepeatEvery(false)}
                    onChange={item => {
                      setSelectedRepeatEvery(item.value);
                      setIsFocusRepeatEvery(false);
                    }}
                  />
                </View>

                <View style={styles.containerWeek}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={repeatType}
                    itemTextStyle={{color: colors.text}}
                    selectedTextStyle={{color: colors.text}}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Week' : 'Week'}
                    searchPlaceholder="Search.."
                    value={selectedRepeatType}
                    onFocus={() => setIsFocusRepeatType(true)}
                    onBlur={() => setIsFocusRepeatType(false)}
                    onChange={item => {
                      setSelectedRepeatType(item.value);
                      setIsFocusRepeatType(false);
                    }}
                  />
                </View>
              </View>
              <View style={styles.untilDateCard}>
                <Text style={styles.untilDateText}>until</Text>
                <View style={styles.dateUntilDiv}>
                  <DatePicker
                    modal
                    open={dateUntilOpen}
                    date={untilDate}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={date => {
                      setDateUntilOpen(false);
                      setUntilDate(date);
                      setPickupUntilDate(moment(date).format('DD/MM/YYYY'));
                    }}
                    onCancel={() => {
                      setDateUntilOpen(false);
                    }}
                  />
                  <TextInput
                    style={[
                      styles.loginput,
                      {fontFamily: 'Montserrat-Regular'},
                    ]}
                    placeholder="12/06/2024"
                    placeholderTextColor="#999"
                    editable={false}
                    value={pickupUntilDate}
                  />
                  <AntDesign
                    name="calendar"
                    size={20}
                    onPress={() => setDateUntilOpen(true)}
                    color={colors.secondary}
                    style={{marginTop: 13}}
                  />
                </View>
              </View>
              <View>
                <View style={styles.onDayCard}>
                  <TouchableOpacity
                    style={[
                      styles.datesCards,
                      selectedCard === 1 && styles.selectedCard,
                    ]}
                    onPress={() => setSelectedCard(1)}>
                    <FontAwesome
                      name={selectedCard === 1 ? 'dot-circle-o' : 'circle-thin'}
                      size={20}
                      color={selectedCard === 1 ? '#ff6347' : '#000'}
                    />
                    <Text style={styles.deliveryDates}>On day</Text>
                  </TouchableOpacity>
                  <View style={styles.containerCity}>
                    <Dropdown
                      style={styles.dateDropdown}
                      data={monthDays}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      itemTextStyle={{color: colors.text}}
                      selectedTextStyle={{color: colors.text}}
                      placeholder={!isFocus ? '1' : '1'}
                      searchPlaceholder="Search.."
                      value={selectedRepeatEvery}
                      onFocus={() => setIsFocusRepeatEvery(true)}
                      onBlur={() => setIsFocusRepeatEvery(false)}
                      onChange={item => {
                        setSelectedRepeatEvery(item.value);
                        setIsFocusRepeatEvery(false);
                      }}
                    />
                  </View>
                </View>

                {/* Second onDayCard */}
                <View style={styles.onDayCard}>
                  <TouchableOpacity
                    style={[
                      styles.datesCards,
                      selectedCard === 2 && styles.selectedCard,
                    ]}
                    onPress={() => setSelectedCard(2)}>
                    <FontAwesome
                      name={selectedCard === 2 ? 'dot-circle-o' : 'circle-thin'}
                      size={20}
                      color={selectedCard === 2 ? '#ff6347' : '#000'}
                    />
                    <Text style={styles.deliveryDates}>On the</Text>
                  </TouchableOpacity>
                  <View style={styles.containeruntil}>
                    <Dropdown
                      style={styles.dateDropdown}
                      data={monthValue1}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      itemTextStyle={{color: colors.text}}
                      selectedTextStyle={{color: colors.text}}
                      placeholder={!isFocus ? '1' : '1'}
                      searchPlaceholder="Search.."
                      value={selectedRepeatMonth1}
                      onFocus={() => setIsFocusRepeatEvery(true)}
                      onBlur={() => setIsFocusRepeatEvery(false)}
                      onChange={item => {
                        setSelectedRepeatMonth1(item.value);
                        setIsFocusRepeatEvery(false);
                      }}
                    />
                  </View>
                  <View style={styles.containeruntil}>
                    <Dropdown
                      style={styles.dateDropdown}
                      data={weekList}
                      itemTextStyle={{color: colors.text}}
                      selectedTextStyle={{color: colors.text}}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Tuesday' : 'Tuesday'}
                      searchPlaceholder="Search.."
                      value={selectedWeekDay}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setSelectedWeekDay(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.untilDayOccurs}>
                  Occurs every day until{' '}
                  <Text style={styles.untilDateOccurs}>August 23, 2024</Text>
                </Text>
              </View>
            </View>
          )}

          <View>
            <TouchableOpacity
              onPress={() => {
                if (
                  company == '' ||
                  number == '' ||
                  (!isInstantDate && pickupDate == '' && pickupTime == '')
                ) {
                  Alert.alert(
                    'Error Alert',
                    'Please fill the required fields.',
                    [{text: 'OK', onPress: () => {}}],
                  );
                  return;
                }
                if (deliveryType == 2) {
                  if (sourceLocationId && destinationBranches.length > 0) {
                    let params = {
                      ...route.params,
                      delivery_type_id: deliveryType,
                      distanceTime: distanceTime,
                      pickup_location: sourceLocation,
                      dropoff_location: destinationLocation,
                      pickup_location_id: sourceLocationId,
                      dropoff_location_id: destinationLocationId,
                      mobile: number,
                      company_name: company,
                      pickup_notes: pickupNotes,
                      pickup_date: moment(date).format('YYYY-MM-DD'),
                      pickup_time: moment(time).format('HH:MM'),
                      is_repeat_mode: promoEmails ? 1 : 0,
                      package_id: orderid,
                      amount: multipleDestinationAmount.toFixed(2),
                      branches: destinationBranches,
                      distance: multipleDestinationDistance.toFixed(2),
                      time: multipleDestinationHours.toFixed(2),
                      repeat_mode: repeatOrder,
                      repeat_every: selectedRepeatEvery,
                      repeat_until: moment(untilDate).format('YYYY-MM-DD'),
                      imageId: imageViewId,
                      is_scheduled_order: isInstantDate ? 0 : 1,
                    };
                    // navigation.navigate('AddDropDetails', {props: params,component:'ENTERPRISE'});
                    navigation.navigate('EnterpriseAddMultpleDropDetails', {
                      props: params,
                      component: 'ENTERPRISE',
                    });
                    // navigation.navigate('EnterprisePickupOrderPriview', params);
                  } else {
                    Alert.alert(
                      'Error Alert',
                      'Please choose pickup and drop location',
                      [{text: 'OK', onPress: () => {}}],
                    );
                  }
                } else {
                  if (sourceLocationId && destinationLocationId) {
                    let params = {
                      ...route.params,
                      delivery_type_id: deliveryType,
                      distanceTime: distanceTime,
                      pickup_location: sourceLocation,
                      dropoff_location: destinationLocation,
                      pickup_location_id: sourceLocationId,
                      dropoff_location_id: destinationLocationId,
                      mobile: number,
                      company_name: company,
                      pickup_notes: pickupNotes,
                      pickup_date: date,
                      pickup_time: time,
                      is_repeat_mode: promoEmails ? 1 : 0,
                      package_id: orderid,
                      amount: Math.round(
                        route.params.vehicle_type.base_price +
                          route.params.vehicle_type.km_price *
                            distanceTime.distance,
                      ).toFixed(2),
                      distance: distanceTime.distance.toFixed(2),
                      time: distanceTime.time.toFixed(0),
                      repeat_mode: repeatOrder,
                      repeat_every: selectedRepeatEvery,
                      repeat_until: moment(untilDate).format('YYYY-MM-DD'),
                      imageId: imageViewId,
                      order_date: isInstantDate
                        ? moment(isInstantDate).format('YYYY-MM-DD hh:mm')
                        : '',
                      schedule_date_time:
                        moment(date).format('YYYY-MM-DD') +
                        ' ' +
                        moment(time).format('hh:mm'),
                      is_scheduled_order: isInstantDate ? 0 : 1,
                    };
                    console.log(imageViewId);
                    console.log('Payload  ---------->', params);

                    navigation.navigate('AddDropDetails', {
                      props: params,
                      component: 'ENTERPRISE',
                    });
                    // navigation.navigate('EnterprisePickupOrderPriview', params);
                  } else {
                    Alert.alert(
                      'Error Alert',
                      'Please choose pickup and drop location',
                      [{text: 'OK', onPress: () => {}}],
                    );
                  }
                }
              }}
              style={[styles.logbutton, {backgroundColor: colors.primary}]}>
              <Text style={styles.buttonText}>
                {localizationText('Common', 'next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* -------------- Modal --------------------- */}
        <ChoosePhotoByCameraGallaryModal
          visible={isModalVisibleCamera}
          handlePhotoOpenClose={handlePhotoOpenClose}
          handleCameraLaunch={handleCameraLaunch}
          handleImageLibraryLaunch={handleImageLibraryLaunch}
        />
        {/* -------------- Modal --------------------- */}
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
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    width: '87%',
    marginLeft: 10,
  },
  franchiseStreet: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
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
  nextBt: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 20,
  },
  btnText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  scheduleboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  scheduleTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 8,
  },
  scheduleSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    textAlign: 'center',
  },
  schedulecard: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 80,
  },
  franchiseSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  locationCard: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  pickupaddressCard: {
    flexDirection: 'row',
    width: '100%',
  },
  addressCard: {
    backgroundColor: '#f4f3ee',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  loginput: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.text,
    width: '88%',
    fontFamily: 'Montserrat-Regular',
  },
  TextInputAddress: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  borderDummy: {
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
    borderStyle: 'dashed',
    marginHorizontal: 9,
    width: '94%',
    marginVertical: 10,
  },
  locationAddress: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
  },
  locationCompanyCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInputDiv: {
    backgroundColor: colors.white,
    width: '95%',
    flexDirection: 'row',
    borderRadius: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  dateUntilDiv: {
    backgroundColor: colors.white,
    width: '40%',
    flexDirection: 'row',
    borderRadius: 5,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  pickupDates: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 5,
  },
  datetimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  bookAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  deliveryDates: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 5,
  },
  datesCards: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  mainDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repeatEvery: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 10,
  },
  repeatdayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  containerCity: {
    width: '20%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#FFF',
    marginRight: 20,
  },
  dateDropdown: {
    fontSize: 10,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  dailyCardMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  containeruntil: {
    width: '33%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#FFF',
    marginRight: 20,
  },
  untilDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  untilDateText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginHorizontal: 35,
  },
  untilDayOccurs: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 15,
  },
  untilDateOccurs: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    textDecorationLine: 'underline',
  },
  containerWeek: {
    width: '33%',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#FFF',
    marginRight: 20,
  },
  weekDaysCard: {
    width: 35,
    height: 35,
    borderWidth: 0.5,
    borderColor: colors.text,
    borderRadius: 30,
    paddingLeft: 8,
    paddingTop: 7,
  },
  weekDaysMainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dayOfWeek: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  selectedText: {
    color: colors.white,
  },
  onDayCard: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
    borderRadius: 5,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
  },
  mobileNumberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: colors.white,
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.text,
  },
  dottedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderWidth: 1,
    borderRadius: 5, // Controls dot size
    borderColor: '#ccc', // Color of the dots
    borderStyle: 'dashed',
    width: '100%', // Full width of the border
  },
  packagePhoto: {
    color: '#999',
    marginLeft: 5,
    paddingTop: 10,
    flex: 1,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
  packagePhotoPath: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC72B26',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  packagePhotoText: {
    color: colors.text,
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    borderRightWidth: 1,
    paddingRight: 5,
    borderColor: '#2C30331A',
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
});

export default EnterpiseScheduleNewDetailsFill;
