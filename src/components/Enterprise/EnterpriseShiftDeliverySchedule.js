import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const EnterpriseShiftDeliverySchedule = ({route, navigation}) => {
  const [promoEmails, setPromoEmails] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [startDateText, setStartDateText] = useState('');

  const [endDate, setEndDate] = useState(new Date());
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [endDateText, setEndDateText] = useState('');

  const [days, setDays] = useState([]);

  const params = route.params

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  const createSchedule = (startDateParam, endDateParam) => {
    if (startDateParam == '' || endDateParam == '') {
      setDays([]);
      return;
    }
    let dates = [];

    let startDate = startDateParam;
    let endDate = endDateParam;
    while (
      moment(startDate, 'DD/MM/YYYY').valueOf() <=
      moment(endDate, 'DD/MM/YYYY').valueOf()
    ) {
      var date = {};
      date.day = moment(startDate, 'DD/MM/YYYY').format('dddd');
      date.date = moment(startDate, 'DD/MM/YYYY').format('DD MMMM');
      date.year = moment(startDate, 'DD/MM/YYYY').format('YYYY');
      date.formattedDate = moment(startDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
      date.isChecked = false;
      date.fromTimeOpen = false;
      date.toTimeOpen = false;
      date.timeslots = [];
      dates.push(date);
      startDate = moment(startDate, 'DD/MM/YYYY')
        .add(1, 'days')
        .format('DD/MM/YYYY');
    }
    setDays(dates);
  };

  const handleAddTimeSlot = index => {
    var curentInstance = [...days];
    var timeSlot = {};
    timeSlot.fromTimeText = curentInstance[index].fromTimeText;
    timeSlot.toTimeText = curentInstance[index].toTimeText;
    curentInstance[index].fromTimeText = '';
    curentInstance[index].toTimeText = '';
    curentInstance[index].timeslots = [
      ...curentInstance[index].timeslots,
      timeSlot,
    ];
    setDays(curentInstance);
  };

  return (
    <>
      <View style={{flex: 1, padding: 15, backgroundColor: '#fff'}}>
        <View style={styles.startDateCard}>
          <View style={{width: '48%'}}>
            <Text style={styles.pickupDates}>Start Date</Text>
            <View style={styles.startScheduleDate}>
              <DatePicker
                modal
                open={startDateOpen}
                date={startDate}
                mode="date"
                onConfirm={date => {
                  setStartDateOpen(false);
                  setStartDate(date);
                  setStartDateText(moment(date).format('DD/MM/YYYY'));
                  createSchedule(
                    moment(date).format('DD/MM/YYYY'),
                    endDateText,
                  );
                }}
                onCancel={() => {
                  setStartDateOpen(false);
                }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="12/06/2024"
                placeholderTextColor="#999"
                value={startDateText}
                editable={false}
              />
              <AntDesign
                name="calendar"
                size={20}
                onPress={() => setStartDateOpen(true)}
                color={colors.secondary}
                style={{marginTop: 13}}
              />
            </View>
          </View>

          <View style={{width: '48%'}}>
            <Text style={styles.pickupDates}>End Date</Text>
            <View style={styles.startScheduleDate}>
              <DatePicker
                modal
                open={endDateOpen}
                date={endDate}
                mode="date"
                onConfirm={date => {
                  setEndDateOpen(false);
                  setEndDate(date);
                  setEndDateText(moment(date).format('DD/MM/YYYY'));
                  createSchedule(
                    startDateText,
                    moment(date).format('DD/MM/YYYY'),
                  );
                }}
                onCancel={() => {
                  setEndDateOpen(false);
                }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="12/06/2024"
                placeholderTextColor="#999"
                value={endDateText}
                editable={false}
              />
              <AntDesign
                name="calendar"
                size={20}
                color={colors.secondary}
                style={{marginTop: 13}}
                onPress={() => setEndDateOpen(true)}
              />
            </View>
          </View>
        </View>

        <View style={styles.applySlotCard}>
          <Text style={styles.applySlotText}>Apply same slots to all days</Text>
          <TouchableOpacity onPress={togglePromoEmails}>
            <MaterialCommunityIcons
              name={promoEmails ? 'toggle-switch' : 'toggle-switch-off'}
              size={60}
              color={promoEmails ? '#FFC72B' : '#D3D3D3'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{height: '47%'}}>
        {days.map((item, index) => {
          return (
            <View key={index}>
              <View style={{paddingHorizontal: 15}}>
                <View>
                  <View style={styles.notFilledCard}>
                    <View style={styles.disabledCheckCard}>
                      <CheckBox
                        disabled={false}
                        value={item.isChecked}
                        onValueChange={newValue => {
                          var curentInstance = [...days];
                          curentInstance[index].isChecked = newValue;
                          setDays(curentInstance);
                        }}
                        style={styles.checkBox}
                        tintColors={{true: '#FFC72B', false: '#000000'}}
                      />
                      <Text style={styles.dateForShift}>
                        {item.day}{' '}
                        <Text style={styles.dayWiseShift}>{item.date}</Text>
                        {', '}
                        {item.year}
                      </Text>
                    </View>

                    {item.isChecked ? (
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
                      <DatePicker
                        modal
                        open={item.fromTimeOpen}
                        date={item.fromTimeText ? moment(item.fromTimeText,'hh:mm A').toDate() : new Date()}
                        mode="time"
                        onConfirm={date => {
                          var curentInstance = [...days];
                          curentInstance[index].fromTimeOpen = false;
                          curentInstance[index].fromTimeText =
                            moment(date).format('hh:mm A');
                          setDays(curentInstance);
                        }}
                        onCancel={() => {
                          var curentInstance = [...days];
                          curentInstance[index].fromTimeOpen = false;
                          setDays(curentInstance);
                        }}
                      />
                      <TextInput
                        style={styles.loginput}
                        placeholder="From HH:MM"
                        placeholderTextColor="#999"
                        value={item.fromTimeText}
                        editable={false}
                      />
                      <TouchableOpacity disabled={!item.isChecked}>
                        <MaterialCommunityIcons
                          name="clock-time-four"
                          size={20}
                          color={item.isChecked ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                          style={{marginTop: 15}}
                          onPress={() => {
                            if (item.isChecked) {
                              var curentInstance = [...days];
                              curentInstance[index].fromTimeOpen = true;
                              setDays(curentInstance);
                            }
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.textInputDiv}>
                      <DatePicker
                        modal
                        open={item.toTimeOpen}
                        date={item.toTimeText ? moment(item.toTimeText,'hh:mm A').toDate() : new Date()}
                        mode="time"
                        onConfirm={date => {
                          var curentInstance = [...days];
                          curentInstance[index].toTimeOpen = false;
                          curentInstance[index].toTimeText =
                            moment(date).format('hh:mm A');
                          setDays(curentInstance);
                        }}
                        onCancel={() => {
                          var curentInstance = [...days];
                          curentInstance[index].toTimeOpen = false;
                          setDays(curentInstance);
                        }}
                      />
                      <TextInput
                        style={styles.loginput}
                        placeholder="From HH:MM"
                        placeholderTextColor="#999"
                        value={item.toTimeText}
                        editable={false}
                      />
                      <TouchableOpacity disabled={!item.isChecked}>
                        <MaterialCommunityIcons
                          name="clock-time-four"
                          size={20}
                          color={item.isChecked ? '#FF0058' : '#D4D4D4'} // Adjust color based on checkbox state
                          style={{marginTop: 15}}
                          onPress={() => {
                            if (item.isChecked) {
                              var curentInstance = [...days];
                              curentInstance[index].toTimeOpen = true;
                              setDays(curentInstance);
                            }
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.plusNewCardDisabled,
                        item.isChecked
                          ? styles.plusNewCardEnabled
                          : styles.plusNewCardDisabled,
                      ]}
                      onPress={() => {
                        if (
                          item.isChecked &&
                          item.toTimeText != '' &&
                          item.fromTimeText != ''
                        ) {
                          handleAddTimeSlot(index);
                        }
                      }}>
                      <AntDesign
                        name="plus"
                        size={20}
                        color="#000"
                        style={{marginTop: 15}}
                      />
                    </TouchableOpacity>
                  </View>

                  {item.timeslots.map((slot, timeSlotIndex) => (
                    <View key={timeSlotIndex} style={styles.selectTimeCard}>
                      <View style={styles.textInputDiv}>
                        <TextInput
                          style={styles.loginput}
                          placeholder="From HH:MM"
                          placeholderTextColor="#999"
                          value={slot.fromTimeText}
                          editable={false}
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
                          value={slot.toTimeText}
                          editable={false}
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
                        onPress={() => {
                          var curentInstance = [...days];
                          curentInstance[index].timeslots = curentInstance[
                            index
                          ].timeslots.filter((_, idx) => idx !== timeSlotIndex);
                          setDays(curentInstance);
                        }}>
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
          );
        })}
      </ScrollView>

      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            var param = {}
            param.startDate = days[0].formattedDate
            param.endDate = days[days.length - 1].formattedDate
            param.days = []
            for (let index = 0; index < days.length; index++) {
              const element = days[index];
              if (element.isChecked && element.timeslots.length > 0) {
                param.days.push(element)
              }
            }
            params.schedule = param
            navigation.navigate('EnterpriseSchedulePreview', {...params});
          }}
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
    color: colors.text,
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
