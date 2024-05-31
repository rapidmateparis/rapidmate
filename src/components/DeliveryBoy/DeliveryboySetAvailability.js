import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '../../colors';
import PlaningFilterModal from '../commonComponent/PlaningFilterModal';
import CheckBox from '@react-native-community/checkbox';

const DeliveryboySetAvailability = ({navigation}) => {
  const [fromtime, setFromtime] = useState('');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [checktoggleCheckBox, setChecktoggleCheckBox] = useState(true);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [selected, setSelected] = useState('');

  return (
    <>
      <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
        <View style={{padding: 15, backgroundColor: '#fff'}}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.slideBt}>
              <AntDesign name="arrowleft" size={20} color={colors.text} />
            </TouchableOpacity>

            <View>
              <Text style={styles.monthByYear}>May 2024</Text>
              <Text style={styles.weekFillter}>Week 1</Text>
            </View>

            <TouchableOpacity style={styles.slideBt}>
              <AntDesign name="arrowright" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.applySlotCard}>
            <Text style={styles.applySlotText}>
              Apply same slots to all days
            </Text>
            <TouchableOpacity onPress={togglePromoEmails}>
              <MaterialCommunityIcons
                name={promoEmails ? 'toggle-switch' : 'toggle-switch-off'}
                size={60}
                color={promoEmails ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{paddingHorizontal: 15}}>
            <View style={styles.notFilledCard}>
              <View style={styles.disabledCheckCard}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  style={styles.checkBox}
                  tintColors={{true: '#FFC72B', false: '#000000'}}
                />
                <Text style={styles.dateForShift}>
                  Monday <Text style={styles.dayWiseShift}>20 February</Text>,
                  2024
                </Text>
              </View>

              <View>
                <TouchableOpacity style={styles.disablePasteBt}>
                  <Text style={styles.disablePasteText}>Paste</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectTimeCard}>
              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="From HH:MM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#D4D4D4"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="From HH:MM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#D4D4D4"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.plusNewCardDisabled}>
                <AntDesign
                  name="plus"
                  size={20}
                  color="#000"
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.borderShowOff} />

            <View style={styles.notFilledCard}>
              <View style={styles.disabledCheckCard}>
                <CheckBox
                  disabled={false}
                  value={checktoggleCheckBox}
                  onValueChange={newValue => setChecktoggleCheckBox(newValue)}
                  style={styles.checkBox}
                  tintColors={{true: '#FFC72B', false: '#000000'}}
                />
                <Text style={styles.dateForShift}>
                  Monday <Text style={styles.dayWiseShift}>20 February</Text>,
                  2024
                </Text>
              </View>

              <View style={styles.bothActionBtn}>
                <TouchableOpacity style={styles.enabledPasteBt}>
                  <Text style={styles.enabledPasteText}>Paste</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.copyCardBt}>
                  <Text style={styles.enabledPasteText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectTimeCard}>
              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="10:00 AM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#D4D4D4"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="2:00 PM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#D4D4D4"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.deleteCard}>
                <AntDesign
                  name="delete"
                  size={20}
                  color="#FF0058"
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.selectTimeCard}>
              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="From HH:MM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#FF0058"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textInputDiv}>
                <TextInput
                  style={styles.loginput}
                  placeholder="From HH:MM"
                  placeholderTextColor="#999"
                  value={fromtime}
                  onChangeText={text => setFromtime(text)}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={20}
                    color="#FF0058"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.plusNewCardEnable}>
                <AntDesign
                  name="plus"
                  size={20}
                  color="#000"
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.borderShowOff} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBTn}>
          <Text style={styles.okButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 13,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
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
  calenderCard: {
    marginTop: 10,
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
  slideBt: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    width: 35,
    height: 35,
    borderRadius: 30,
    padding: 6,
  },
  monthByYear: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    textAlign: 'center',
  },
  weekFillter: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    textAlign: 'center',
  },
  applySlotCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applySlotText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  dateForShift: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  dayWiseShift: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  disablePasteBt: {
    borderWidth: 0.8,
    borderColor: '#D4D4D4',
    borderRadius: 20,
    padding: 5,
  },
  disablePasteText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#D4D4D4',
  },
  notFilledCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  disabledCheckCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputDiv: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#2C303336',
    width: '40%',
    backgroundColor: colors.white,
  },
  loginput: {
    fontSize: 14,
    paddingHorizontal: 10,
    width: '90%',
    fontFamily: 'Montserrat-Regular',
  },
  selectTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusNewCardDisabled: {
    backgroundColor: '#D4D4D4',
    paddingHorizontal: 15,
    paddingBottom: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  borderShowOff: {
    borderWidth: 0.8,
    borderColor: '#f1f1f1',
    width: '100%',
    marginVertical: 10,
  },
  enabledPasteBt: {
    borderWidth: 0.8,
    borderColor: colors.text,
    borderRadius: 20,
    padding: 5,
  },
  enabledPasteText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  copyCardBt: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 10,
  },
  bothActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteCard: {
    borderWidth: 0.8,
    borderColor: colors.secondary,
    paddingHorizontal: 15,
    paddingBottom: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  plusNewCardEnable: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingBottom: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 30,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 1,
    
  },
  logbutton: {
    width: '45%',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.text,
  },
  buttonText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: colors.text,
  },
  saveBTn: {
    width: '45%',
    borderRadius: 8,
    padding: 15,
    backgroundColor: colors.primary,
  },
});

export default DeliveryboySetAvailability;
