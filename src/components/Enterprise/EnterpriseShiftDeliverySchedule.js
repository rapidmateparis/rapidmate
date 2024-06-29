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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';

const EnterpriseShiftDeliverySchedule = ({navigation}) => {
  const [fromtime, setFromtime] = useState('');
  const [totime, setTotime] = useState('');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [toggleCheckBox20, setToggleCheckBox20] = useState(false);
  const [toggleCheckBox21, setToggleCheckBox21] = useState(false);
  const [timeSlots20, setTimeSlots20] = useState([]);
  const [timeSlots21, setTimeSlots21] = useState([]);
  const [week, setWeek] = useState(1);
  const [startDate, setStartDate] = useState(1);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  // Function to handle right arrow click
  const handleNextWeek = () => {
    if (week < 4) {
      setWeek(week + 1); // Increment the week number if less than 4
    }
  };

  const handlePreviousWeek = () => {
    if (week > 1) {
      setWeek(week - 1); // Decrement the week number if greater than 1
    }
  };

  const handleAddSlot20 = () => {
    setTimeSlots20([...timeSlots20, {from: '', to: ''}]);
  };

  const handleAddSlot21 = () => {
    setTimeSlots21([...timeSlots21, {from: '', to: ''}]);
  };

  return (
    <>
      <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
        <View style={{padding: 15, backgroundColor: '#fff'}}>
          <View style={styles.startDateCard}>
            <View style={{width: '48%',}}>
              <Text style={styles.pickupDates}>Start Date</Text>
              <View style={styles.startScheduleDate}>
                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="12/06/2024"
                  placeholderTextColor="#999"
                  value={startDate}
                  onChangeText={text => setStartDate(text)}
                />
                <AntDesign
                  name="calendar"
                  size={20}
                  color={colors.secondary}
                  style={{marginTop: 13}}
                />
              </View>
            </View>

            <View style={{width: '48%',}}>
              <Text style={styles.pickupDates}>End Date</Text>
              <View style={styles.startScheduleDate}>
                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="12/06/2024"
                  placeholderTextColor="#999"
                  value={startDate}
                  onChangeText={text => setStartDate(text)}
                />
                <AntDesign
                  name="calendar"
                  size={20}
                  color={colors.secondary}
                  style={{marginTop: 13}}
                />
              </View>
            </View>
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
            <View>
              <View style={styles.notFilledCard}>
                <View style={styles.disabledCheckCard}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox20}
                    onValueChange={newValue => setToggleCheckBox20(newValue)}
                    style={styles.checkBox}
                    tintColors={{true: '#FFC72B', false: '#000000'}}
                  />
                  <Text style={styles.dateForShift}>
                    Monday <Text style={styles.dayWiseShift}>20 February</Text>,
                    2024
                  </Text>
                </View>

                {toggleCheckBox20 ? (
                  <View style={styles.bothActionBtn}>
                    <TouchableOpacity style={styles.enabledPasteBt}>
                      <Text style={styles.enabledPasteText}>Paste</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.copyCardBt}>
                      <Text style={styles.enabledPasteText}>Copy</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.bothActionBtn}>
                    <TouchableOpacity style={styles.disablePasteBt}>
                      <Text style={styles.disablePasteText}>Paste</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.disablePasteBt}>
                      <Text style={styles.disablePasteText}>Copy</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.selectTimeCard}>
                <View style={styles.textInputDiv}>
                  <TextInput
                    style={styles.loginput}
                    placeholder="From HH:MM"
                    placeholderTextColor="#999"
                    value={fromtime}
                    onChangeText={text => setFromtime(text)}
                    editable={toggleCheckBox20} // Conditionally set editable based on toggleCheckBox state
                  />
                  <TouchableOpacity disabled={!toggleCheckBox20}>
                    <MaterialCommunityIcons
                      name="clock-time-four"
                      size={20}
                      color={toggleCheckBox20 ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.textInputDiv}>
                  <TextInput
                    style={styles.loginput}
                    placeholder="From HH:MM"
                    placeholderTextColor="#999"
                    value={totime}
                    onChangeText={text => setTotime(text)}
                    editable={toggleCheckBox20} // Conditionally set editable based on toggleCheckBox state
                  />
                  <TouchableOpacity disabled={!toggleCheckBox20}>
                    <MaterialCommunityIcons
                      name="clock-time-four"
                      size={20}
                      color={toggleCheckBox20 ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.plusNewCardDisabled,
                    toggleCheckBox20
                      ? styles.plusNewCardEnabled
                      : styles.plusNewCardDisabled,
                  ]}
                  onPress={toggleCheckBox20 ? handleAddSlot20 : null}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color="#000"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              {timeSlots20.map((slot, index) => (
                <View key={index} style={styles.selectTimeCard}>
                  <View style={styles.textInputDiv}>
                    <TextInput
                      style={styles.loginput}
                      placeholder="From HH:MM"
                      placeholderTextColor="#999"
                      value={slot.from}
                      onChangeText={text =>
                        setTimeSlots20(
                          timeSlots20.map((item, idx) =>
                            idx === index ? {...item, from: text} : item,
                          ),
                        )
                      }
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
                      placeholder="To HH:MM"
                      placeholderTextColor="#999"
                      value={slot.to}
                      onChangeText={text =>
                        setTimeSlots20(
                          timeSlots20.map((item, idx) =>
                            idx === index ? {...item, to: text} : item,
                          ),
                        )
                      }
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

                  <TouchableOpacity
                    style={styles.deleteCard}
                    onPress={() =>
                      setTimeSlots20(
                        timeSlots20.filter((_, idx) => idx !== index),
                      )
                    }>
                    <AntDesign
                      name="delete"
                      size={20}
                      color="#FF0058"
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.borderShowOff} />

            <View>
              <View style={styles.notFilledCard}>
                <View style={styles.disabledCheckCard}>
                  <CheckBox
                    disabled={false}
                    value={toggleCheckBox21}
                    onValueChange={newValue => setToggleCheckBox21(newValue)}
                    style={styles.checkBox}
                    tintColors={{true: '#FFC72B', false: '#000000'}}
                  />
                  <Text style={styles.dateForShift}>
                    Monday <Text style={styles.dayWiseShift}>21 February</Text>,
                    2024
                  </Text>
                </View>

                {toggleCheckBox21 ? (
                  <View style={styles.bothActionBtn}>
                    <TouchableOpacity style={styles.enabledPasteBt}>
                      <Text style={styles.enabledPasteText}>Paste</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.copyCardBt}>
                      <Text style={styles.enabledPasteText}>Copy</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.bothActionBtn}>
                    <TouchableOpacity style={styles.disablePasteBt}>
                      <Text style={styles.disablePasteText}>Paste</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.disablePasteBt}>
                      <Text style={styles.disablePasteText}>Copy</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.selectTimeCard}>
                <View style={styles.textInputDiv}>
                  <TextInput
                    style={styles.loginput}
                    placeholder="From HH:MM"
                    placeholderTextColor="#999"
                    value={fromtime}
                    onChangeText={text => setFromtime(text)}
                    editable={toggleCheckBox21} // Conditionally set editable based on toggleCheckBox state
                  />
                  <TouchableOpacity disabled={!toggleCheckBox21}>
                    <MaterialCommunityIcons
                      name="clock-time-four"
                      size={20}
                      color={toggleCheckBox21 ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.textInputDiv}>
                  <TextInput
                    style={styles.loginput}
                    placeholder="From HH:MM"
                    placeholderTextColor="#999"
                    value={totime}
                    onChangeText={text => setTotime(text)}
                    editable={toggleCheckBox21} // Conditionally set editable based on toggleCheckBox state
                  />
                  <TouchableOpacity disabled={!toggleCheckBox21}>
                    <MaterialCommunityIcons
                      name="clock-time-four"
                      size={20}
                      color={toggleCheckBox21 ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.plusNewCardDisabled,
                    toggleCheckBox21
                      ? styles.plusNewCardEnabled
                      : styles.plusNewCardDisabled,
                  ]}
                  onPress={toggleCheckBox21 ? handleAddSlot21 : null}>
                  <AntDesign
                    name="plus"
                    size={20}
                    color="#000"
                    style={{marginTop: 15}}
                  />
                </TouchableOpacity>
              </View>

              {timeSlots21.map((slot, index) => (
                <View key={index} style={styles.selectTimeCard}>
                  <View style={styles.textInputDiv}>
                    <TextInput
                      style={styles.loginput}
                      placeholder="From HH:MM"
                      placeholderTextColor="#999"
                      value={slot.from}
                      onChangeText={text =>
                        setTimeSlots21(
                          timeSlots21.map((item, idx) =>
                            idx === index ? {...item, from: text} : item,
                          ),
                        )
                      }
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
                      placeholder="To HH:MM"
                      placeholderTextColor="#999"
                      value={slot.to}
                      onChangeText={text =>
                        setTimeSlots21(
                          timeSlots21.map((item, idx) =>
                            idx === index ? {...item, to: text} : item,
                          ),
                        )
                      }
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

                  <TouchableOpacity
                    style={styles.deleteCard}
                    onPress={() =>
                      setTimeSlots21(
                        timeSlots21.filter((_, idx) => idx !== index),
                      )
                    }>
                    <AntDesign
                      name="delete"
                      size={20}
                      color="#FF0058"
                      style={{marginTop: 15}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.borderShowOff} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EnterpriseSchedulePreview')}
          style={styles.saveBTn}>
          <Text style={styles.okButton}>Preview</Text>
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
    marginLeft: 10,
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
  plusNewCardEnabled: {
    backgroundColor: '#FFC72B',
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
  pickupDates: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 5,
  },
  startScheduleDate: {
    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  startDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default EnterpriseShiftDeliverySchedule;
