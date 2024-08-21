import React, {useState} from 'react';
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
} from '../../utils/common';
import MapAddress from '../commonComponent/MapAddress';
import {useLoader} from '../../utils/loaderContext';
import {getLocationId} from '../../data_manager';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const EnterpiseScheduleNewDetailsFill = ({route, navigation}) => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [company, setCompany] = useState('');
  const [dropdownValue, setDropdownValue] = useState('+33');
  const [pickupNotes, setPickupNotes] = useState('');
  const [orderid, setOrderid] = useState('');
  const [number, setNumber] = useState('');
  const [promoEmails, setPromoEmails] = useState(false);
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [repeatOrder, setRepeatOrder] = useState('Daily');
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
  const [time, setTime] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')

  console.log('props', route);
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

  const data = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
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

  const onFetchDistanceAndTime = value => {
    setDistanceTime(value);
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
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15, paddingTop: 8}}>
        <View>
          <View style={{height: 150, position: 'relative'}}>
            <MapAddress
              onFetchDistanceAndTime={onFetchDistanceAndTime}
              onSourceLocation={onSourceLocation}
              onDestinationLocation={onDestinationLocation}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Company</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              value={company}
              onChangeText={text => setCompany(text)}
            />
          </View>

          <View>
            <Text style={styles.textlable}>Phone number</Text>
            <View style={styles.mobileNumberInput}>
              <View style={{width: 95}}>
                <View style={styles.containerDropdown}>
                  <Dropdown
                    data={numberData}
                    search
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
            <Text style={styles.textlable}>Package photo</Text>
            <View style={styles.dottedLine}>
              <Entypo
                name="attachment"
                size={13}
                color="#131314"
                style={{marginTop: 13}}
              />
              <Text style={styles.packagePhoto}>Package photo</Text>
              <View style={styles.packagePhotoPath}>
                <Text style={styles.packagePhotoText}>{photoFileName}</Text>
                <MaterialCommunityIcons name="close" color="#000" size={13} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Order ID</Text>
            <TextInput
              style={styles.inputTextStyle}
              placeholder="Type here"
              value={orderid}
              onChangeText={text => setOrderid(text)}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textlable}>Pickup notes</Text>
            <TextInput
              style={styles.inputTextStyle}
              multiline={true}
              numberOfLines={4} // Set the number of lines you want to display initially
              placeholder="Type here"
              textAlignVertical="top"
              value={pickupNotes}
              onChangeText={text => setPickupNotes(text)}
            />
          </View>

          <View style={styles.datetimeCard}>
            <View style={{width: '50%', marginRight: 8}}>
              <Text style={styles.pickupDates}>Pickup date</Text>
              <View style={styles.nameInputDiv}>
                <DatePicker
                  modal
                  open={dateOpen}
                  date={date}
                  mode = 'date'
                  onConfirm={date => {
                    setDateOpen(false);
                    setDate(date);
                    setPickupDate(moment(date).format(
                      'DD/MM/YYYY',
                    ))
                  }}
                  onCancel={() => {
                    setDateOpen(false);
                  }}
                />
                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="12/06/2024"
                  placeholderTextColor="#999"
                  editable = {false}
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
              <Text style={styles.pickupDates}>Pickup time</Text>
              <View style={styles.nameInputDiv}>
              <DatePicker
                  modal
                  open={timeOpen}
                  date={time}
                  mode = 'time'
                  onConfirm={date => {
                    setTimeOpen(false);
                    setTime(date);
                    setPickupTime(moment(date).format(
                      'hh:mm A',
                    ))
                  }}
                  onCancel={() => {
                    setTimeOpen(false);
                  }}
                />
                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="10:30 AM"
                  placeholderTextColor="#999"
                  editable = {false}
                  value={pickupTime}
                />
                <Ionicons
                  name="time-outline"
                  size={20}
                  onPress={()=>{setTimeOpen(true)}}
                  color={colors.secondary}
                  style={{marginTop: 13}}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.addressCard}>
        <View style={styles.bookAddress}>
          <Text style={styles.cardTitle}>Repeat this order</Text>
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
              onPress={() => setRepeatOrder('Daily')}
              style={styles.datesCards}>
              <FontAwesome
                name={repeatOrder === 'Daily' ? 'dot-circle-o' : 'circle-thin'}
                size={20}
                color={repeatOrder === 'Daily' ? colors.secondary : colors.text}
              />
              <Text style={styles.deliveryDates}>Daily</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRepeatOrder('Weekly')}
              style={styles.datesCards}>
              <FontAwesome
                name={repeatOrder === 'Weekly' ? 'dot-circle-o' : 'circle-thin'}
                size={20}
                color={
                  repeatOrder === 'Weekly' ? colors.secondary : colors.text
                }
              />
              <Text style={styles.deliveryDates}>Weekly</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRepeatOrder('Monthly')}
              style={styles.datesCards}>
              <FontAwesome
                name={
                  repeatOrder === 'Monthly' ? 'dot-circle-o' : 'circle-thin'
                }
                size={20}
                color={
                  repeatOrder === 'Monthly' ? colors.secondary : colors.text
                }
              />
              <Text style={styles.deliveryDates}>Monthly</Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          {promoEmails && repeatOrder === 'Daily' && (
            <View>
              <View style={styles.dailyCardMain}>
                <View style={styles.repeatdayCard}>
                  <AntDesign name="retweet" size={20} color={colors.text} />
                  <Text style={styles.repeatEvery}>Repeat every</Text>
                </View>
                <View style={styles.containerCity}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? '1' : '1'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>

                <View style={styles.containerCity}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Day' : 'Day'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
              </View>

              <View style={styles.untilDateCard}>
                <Text style={styles.untilDateText}>until</Text>
                <View style={styles.containeruntil}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? '8/23/2024' : '8/23/2024'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.untilDayOccurs}>
                  Occurs every day from{' '}
                  <Text style={styles.untilDateOccurs}>11 AM</Text> to{' '}
                  <Text style={styles.untilDateOccurs}>4 PM</Text> until{' '}
                  <Text style={styles.untilDateOccurs}>August 23, 2024</Text>
                </Text>
              </View>
            </View>
          )}
        </View>

        {promoEmails && repeatOrder === 'Weekly' && (
          <View>
            <View style={styles.dailyCardMain}>
              <View style={styles.repeatdayCard}>
                <AntDesign name="retweet" size={20} color={colors.text} />
                <Text style={styles.repeatEvery}>Repeat every</Text>
              </View>
              <View style={styles.containerCity}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '1' : '1'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>

              <View style={styles.containerWeek}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Week' : 'Week'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>

            <View style={styles.untilDateCard}>
              <Text style={styles.untilDateText}>until</Text>
              <View style={styles.containeruntil}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '8/23/2024' : '8/23/2024'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.weekDaysMainCard}>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
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
              ))}
            </View>
            <View>
              <Text style={styles.untilDayOccurs}>
                Occurs every <Text>Monday</Text> & <Text>Tuesday</Text> from{' '}
                <Text style={styles.untilDateOccurs}>11 AM</Text> to{' '}
                <Text style={styles.untilDateOccurs}>4 PM</Text> unti{' '}
                <Text style={styles.untilDateOccurs}>August 23, 2024</Text>
              </Text>
            </View>
          </View>
        )}

        {promoEmails && repeatOrder === 'Monthly' && (
          <View>
            <View style={styles.dailyCardMain}>
              <View style={styles.repeatdayCard}>
                <AntDesign name="retweet" size={20} color={colors.text} />
                <Text style={styles.repeatEvery}>Repeat every</Text>
              </View>
              <View style={styles.containerCity}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '1' : '1'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>

              <View style={styles.containerWeek}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Week' : 'Week'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.untilDateCard}>
              <Text style={styles.untilDateText}>until</Text>
              <View style={styles.containeruntil}>
                <Dropdown
                  style={styles.dateDropdown}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? '8/23/2024' : '8/23/2024'}
                  searchPlaceholder="Search.."
                  value={dropdownCountryValue}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setDropdownCountryValue(item.value);
                    setIsFocus(false);
                  }}
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? '1' : '1'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
                      setIsFocus(false);
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
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Second' : 'Second'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
                <View style={styles.containeruntil}>
                  <Dropdown
                    style={styles.dateDropdown}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Tuesday' : 'Tuesday'}
                    searchPlaceholder="Search.."
                    value={dropdownCountryValue}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDropdownCountryValue(item.value);
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
            onPress={() => navigation.navigate('EnterprisePickupOrderPriview')}
            style={[styles.logbutton, {backgroundColor: colors.primary}]}>
            <Text style={styles.buttonText}>Next</Text>
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
    fontSize: 12,
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
    fontFamily: 'Montserrat-Regular',
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
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    backgroundColor: colors.white,
  },
  containerDropdown: {
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 2,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  inputSearchStyle: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
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
});

export default EnterpiseScheduleNewDetailsFill;
