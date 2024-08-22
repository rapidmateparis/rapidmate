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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {useUserDetails} from '../commonComponent/StoreContext';
import {planningSetupUpdate, getCurrentPlanningSetup} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';

const DeliveryboySetAvailability = ({navigation}) => {
  const [toggleAvailable24, setToggleAvailable24] = useState(false);
  const [toggleApplySameForAll, setToggleApplySameForAll] = useState(false);
  const [toggleCheckBoxes, setToggleCheckBoxes] = useState({});
  const [timeSlots, setTimeSlots] = useState({});
  const [currentWeek, setCurrentWeek] = useState([]);
  const [weekCount, setWeekCount] = useState(1);
  const [maxWeekCount, setMaxWeekCount] = useState(0);
  const [totalMonthWeek, setTotalMonthWeek] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentMonthWords, setCurrentMonthWords] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [allWeeksSlots, setAllWeeksSlots] = useState([]);
  const {userDetails} = useUserDetails();
  const {setLoading} = useLoader();

  useEffect(() => {
    getCurrentTimeSlot();
  }, [currentWeek]);

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let totalMonthWeek = getWeeksInMonth(currentYear, currentMonth);
    setCurrentMonth(currentMonth);
    setCurrentMonthWords(currentMonth + 1);
    setCurrentYear(currentYear);
    setTotalMonthWeek(totalMonthWeek);
    setMaxWeekCount(totalMonthWeek.length);
    setCurrentWeek(totalMonthWeek[0].dates);
  }, []);

  const getCurrentTimeSlot = () => {
    let params = {
      year: currentYear,
      month: currentMonthWords,
      week: weekCount,
      ext_id: userDetails.userDetails[0].ext_id,
    };
    getCurrentPlanningSetup(
      params,
      successResponse => {
        if (successResponse[0]._success) {
          console.log(
            'getCurrentPlanningSetup==>',
            JSON.stringify(successResponse[0]),
          );
          if (successResponse[0]._response.setup[0].slots) {
            const currentSlots = successResponse[0]._response.setup[0].slots;
            const resultData = {};
            const selectedItem = {};
            currentSlots.forEach(item => {
              const day = item.day;
              resultData[day] = item.times.map(time => ({
                from_time: time.from_time || '',
                to_time: time.to_time || '',
              }));
              selectedItem[day] = item.selected || false;
            });
            setToggleApplySameForAll(
              successResponse[0]._response.is_apply_for_all_days == 1
                ? true
                : false,
            );
            setToggleAvailable24(
              successResponse[0]._response.is_24x7 == 1 ? true : false,
            );
            setTimeSlots(resultData);
            setToggleCheckBoxes(selectedItem);
          } else {
            const defaultTimeSlots = {};
            currentWeek.forEach(day => {
              defaultTimeSlots[day] = [{from_time: '', to_time: ''}];
            });
            setTimeSlots(defaultTimeSlots);
          }
        }
      },
      errorResponse => {
        console.log(
          'getCurrentPlanningSetup==>errorResponse',
          ""+errorResponse[0],
        );
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  };

  

  useEffect(() => {
    const defaultTimeSlots = {};
    const selectedItem = {};
    if (toggleApplySameForAll) {
      selectedItem[currentWeek[0]] = true;
      currentWeek.forEach(day => {
        defaultTimeSlots[currentWeek[0]] = [{from_time: '', to_time: ''}];
      });
    } else if (toggleAvailable24) {
      currentWeek.forEach(day => {
        defaultTimeSlots[day] = [{from_time: '', to_time: ''}];
      });
    } else {
      currentWeek.forEach(day => {
        defaultTimeSlots[day] = [{from_time: '', to_time: ''}];
      });
    }
    setToggleCheckBoxes(selectedItem);
    setTimeSlots(defaultTimeSlots);
  }, [toggleApplySameForAll, toggleAvailable24]);

  function getWeeksInMonth(year, month) {
    const weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month + 1, 0),
      numDays = lastDate.getDate();

    let dayOfWeekCounter = firstDate.getDay();

    for (let date = 1; date <= numDays; date++) {
      if (dayOfWeekCounter === 0 || weeks.length === 0) {
        weeks.push([]);
      }
      weeks[weeks.length - 1].push(date);
      dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
    }

    return weeks
      .filter(w => !!w.length)
      .map(w => ({
        start: w[0],
        end: w[w.length - 1],
        dates: w,
      }));
  }

  const handleNextWeek = () => {
    if (weekCount < maxWeekCount) {
      var slots = [];
      var slot = {};
      currentWeek.forEach(element => {
        if (
          toggleCheckBoxes.hasOwnProperty(element) &&
          timeSlots.hasOwnProperty(element) &&
          toggleCheckBoxes[element]
        ) {
          slot = {
            day: element,
            times: timeSlots[element],
          };
          slots = [...slots, slot];
        }
      });

      if (Object.keys(slots).length) {
        setAllWeeksSlots(prev => [
          ...prev.filter(week => week.week !== weekCount),
          {
            year: currentYear,
            month: currentMonthWords,
            week: weekCount,
            slots: slots,
          },
        ]);
      } else {
        setAllWeeksSlots(prev => [
          ...prev.filter(week => week.week !== weekCount),
        ]);
      }

      const newWeekCount = weekCount + 1;
      setWeekCount(newWeekCount);
      setCurrentWeek(totalMonthWeek[newWeekCount - 1].dates);
    }
  };

  const handlePreviousWeek = () => {
    if (weekCount > 1) {
      var slots = [];
      var slot = {};
      currentWeek.forEach(element => {
        if (
          toggleCheckBoxes.hasOwnProperty(element) &&
          timeSlots.hasOwnProperty(element) &&
          toggleCheckBoxes[element]
        ) {
          slot = {
            day: element,
            times: timeSlots[element],
          };
          slots = [...slots, slot];
        }
      });

      if (Object.keys(slots).length) {
        setAllWeeksSlots(prev => [
          ...prev.filter(week => week.week !== weekCount),
          {
            year: currentYear,
            month: currentMonthWords,
            week: weekCount,
            slots: slots,
          },
        ]);
      } else {
        setAllWeeksSlots(prev => [
          ...prev.filter(week => week.week !== weekCount),
        ]);
      }

      const newWeekCount = weekCount - 1;
      setWeekCount(newWeekCount);
      setCurrentWeek(totalMonthWeek[newWeekCount - 1].dates);
    }
  };

  const toggleAvailable = () => {
    setToggleAvailable24(!toggleAvailable24);
  };

  const toggleApplySame = () => {
    setToggleApplySameForAll(!toggleApplySameForAll);
  };

  const handleAddSlot = day => {
    setTimeSlots({
      ...timeSlots,
      [day]: [...(timeSlots[day] || []), {from_time: '', to_time: ''}],
    });
  };

  const handleDeleteSlot = (day, slotIndex) => {
    setTimeSlots({
      ...timeSlots,
      [day]: timeSlots[day].filter((_, idx) => idx !== slotIndex),
    });
  };

  const handleCheckboxChange = (day, newValue) => {
    setToggleCheckBoxes({
      ...toggleCheckBoxes,
      [day]: newValue,
    });
  };

  const formatTime = text => {
    // Remove non-numeric characters
    const cleanedText = text.replace(/\D/g, '');
    // Format as HH:MM
    if (cleanedText.length <= 2) {
      return cleanedText;
    }
    if (cleanedText.length <= 4) {
      return `${cleanedText.slice(0, 2)}:${cleanedText.slice(2)}`;
    }
    return `${cleanedText.slice(0, 2)}:${cleanedText.slice(2, 4)}`;
  };

  const handleSave = () => {
    var slots = [];
    var slot = {};
    var updatedWeeksSlots = [];

    currentWeek.forEach(element => {
      if (timeSlots.hasOwnProperty(element)) {
        slot = {
          day: element,
          times: timeSlots[element],
          selected: toggleCheckBoxes[element]
            ? toggleCheckBoxes[element]
            : false,
        };
        slots = [...slots, slot];
      }
    });

    if (Object.keys(slots).length) {
      updatedWeeksSlots = [
        ...allWeeksSlots.filter(week => week.week !== weekCount),
        {
          year: currentYear,
          month: currentMonthWords,
          week: weekCount,
          slots: slots,
        },
      ];
    }

    setAllWeeksSlots(updatedWeeksSlots);
    let setup = toggleAvailable24
      ? {}
      : toggleApplySameForAll
      ? {
          year: currentYear,
          month: currentMonthWords,
          week: weekCount,
          slots: [
            {
              day: '1',
              times: [
                {
                  from_time:
                    updatedWeeksSlots[updatedWeeksSlots.length - 1].slots[0]
                      .times[0].from_time,
                  to_time:
                    updatedWeeksSlots[updatedWeeksSlots.length - 1].slots[0]
                      .times[0].to_time,
                },
              ],
              selected: true,
            },
          ],
        }
      : updatedWeeksSlots;
    let params = {
      is_24x7: toggleAvailable24 ? 1 : 0,
      is_apply_for_all_days: toggleApplySameForAll ? 1 : 0,
      delivery_boy_ext_id: userDetails.userDetails[0].ext_id,
      setup:
        toggleAvailable24 || toggleApplySameForAll
          ? setup
          : setup[weekCount - 1],
    };

    console.log('All Weeks Time Slots:', JSON.stringify(params));
    setLoading(true);
    planningSetupUpdate(
      params,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          Alert.alert('Error Alert', successResponse[0]._response, [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
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
    <>
      <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handlePreviousWeek}
              disabled={toggleAvailable24 || toggleApplySameForAll}
              style={styles.slideBt}>
              <AntDesign name="arrowleft" size={20} color={colors.text} />
            </TouchableOpacity>

            <View>
              <Text style={styles.monthByYear}>
                {moment().format('MMM YYYY')}
              </Text>
              <Text style={styles.weekFillter}>Week {weekCount}</Text>
            </View>

            <TouchableOpacity
              disabled={toggleAvailable24 || toggleApplySameForAll}
              onPress={handleNextWeek}
              style={styles.slideBt}>
              <AntDesign name="arrowright" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.applySlotCard,
              {backgroundColor: toggleApplySameForAll ? '#F0F0F0' : '#FBFAF5'},
            ]}
            pointerEvents={toggleApplySameForAll ? 'none' : 'auto'}>
            <Text style={styles.applySlotText}>I am available 24/7</Text>
            <TouchableOpacity onPress={toggleAvailable}>
              <MaterialCommunityIcons
                name={toggleAvailable24 ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={toggleAvailable24 ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.applySlotCard,
              {backgroundColor: toggleAvailable24 ? '#F0F0F0' : '#FBFAF5'},
            ]}
            pointerEvents={toggleAvailable24 ? 'none' : 'auto'}>
            <Text style={styles.applySlotText}>
              Apply same slots to all days
            </Text>
            <TouchableOpacity onPress={toggleApplySame}>
              <MaterialCommunityIcons
                name={
                  toggleApplySameForAll ? 'toggle-switch' : 'toggle-switch-off'
                }
                size={50}
                color={toggleApplySameForAll ? '#FFC72B' : '#D3D3D3'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 15,
              backgroundColor: toggleAvailable24 ? '#F0F0F0' : '#FBFAF5',
            }}
            pointerEvents={toggleAvailable24 ? 'none' : 'auto'}>
            {currentWeek.map((day, index) => (
              <View key={index}>
                <View>
                  <View style={styles.notFilledCard}>
                    <View style={styles.disabledCheckCard}>
                      <CheckBox
                        disabled={false}
                        value={toggleCheckBoxes[day] || false}
                        onValueChange={newValue =>
                          handleCheckboxChange(day, newValue)
                        }
                        style={styles.checkBox}
                        tintColors={{true: colors.secondary, false: '#000000'}}
                      />
                      <Text style={styles.dateForShift}>
                        {moment(
                          new Date(currentYear, currentMonth, day),
                        ).format('dddd, DD MMMM YYYY')}
                      </Text>
                    </View>

                    {toggleCheckBoxes[day] ? (
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

                  {timeSlots[day] &&
                    timeSlots[day].map((slot, slotIndex) => (
                      <View key={slotIndex} style={styles.selectTimeCard}>
                        <View style={styles.textInputDiv}>
                          <TextInput
                            style={styles.loginput}
                            placeholder="From HH:MM"
                            placeholderTextColor="#999"
                            value={slot.from_time}
                            onChangeText={text =>
                              setTimeSlots({
                                ...timeSlots,
                                [day]: timeSlots[day].map((s, idx) =>
                                  idx === slotIndex
                                    ? {...s, from_time: formatTime(text)}
                                    : s,
                                ),
                              })
                            }
                          />
                          <TouchableOpacity>
                            <MaterialCommunityIcons
                              name="clock-time-four"
                              size={20}
                              color={colors.secondary}
                              style={{marginTop: 15}}
                            />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.textInputDiv}>
                          <TextInput
                            style={styles.loginput}
                            placeholder="To HH:MM"
                            placeholderTextColor="#999"
                            value={slot.to_time}
                            onChangeText={text =>
                              setTimeSlots({
                                ...timeSlots,
                                [day]: timeSlots[day].map((s, idx) =>
                                  idx === slotIndex
                                    ? {...s, to_time: formatTime(text)}
                                    : s,
                                ),
                              })
                            }
                          />
                          <TouchableOpacity>
                            <MaterialCommunityIcons
                              name="clock-time-four"
                              size={20}
                              color={colors.secondary}
                              style={{marginTop: 15}}
                            />
                          </TouchableOpacity>
                        </View>

                        {slotIndex == 0 ? (
                          <View style={styles.selectTimeCard}>
                            <TouchableOpacity
                              style={[
                                styles.plusNewCardDisabled,
                                toggleCheckBoxes[day]
                                  ? styles.plusNewCardEnabled
                                  : styles.plusNewCardDisabled,
                              ]}
                              onPress={
                                toggleCheckBoxes[day]
                                  ? () => handleAddSlot(day)
                                  : null
                              }>
                              <AntDesign
                                name="plus"
                                size={20}
                                color="#000"
                                style={{marginTop: 15}}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleDeleteSlot(day, slotIndex)}
                            style={styles.deleteCard}>
                            <AntDesign
                              name="delete"
                              size={20}
                              color="#FF0000"
                              style={{marginTop: 15}}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveBTn}>
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
    paddingLeft: 15,
    paddingRight: 15,
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
});

export default DeliveryboySetAvailability;
