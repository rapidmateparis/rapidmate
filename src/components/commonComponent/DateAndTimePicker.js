import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors} from '../../colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {localizationText} from '../../utils/common';

const DateAndTimePickerModal = ({
  setScheduleModalVisible,
  isScheduleModalVisible,
  getDateAndTime,
}) => {
  const [time, setTime] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const toggleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
  };
  return (
    <Modal isVisible={isScheduleModalVisible}>
      <View style={styles.modalContent}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>
              {localizationText('Common', 'dateAndTimePicker')}
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.datetimeCard}>
            <View style={{width: '90%'}}>
              <Text style={styles.pickupDates}>
                {localizationText('Common', 'pickupDate')}
              </Text>
              <View style={styles.nameInputDiv}>
                <DatePicker
                  modal
                  open={dateOpen}
                  date={date}
                  mode="date"
                  onConfirm={date => {
                    setDateOpen(false);
                    setDate(date);
                    setPickupDate(moment(date).format('YYYY-MM-DD'));
                  }}
                  onCancel={() => {
                    setDateOpen(false);
                  }}
                />
                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="Date"
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

            <View style={{width: '90%'}}>
              <Text style={styles.pickupDates}>
                {localizationText('Common', 'pickupTime')}
              </Text>
              <View style={styles.nameInputDiv}>
                <DatePicker
                  modal
                  open={timeOpen}
                  date={time}
                  mode="time"
                  is24hourSource="locale" // or "device", depending on your needs
                  locale="en-GB" // This typically uses 24-hour format
                  onConfirm={date => {
                    setTimeOpen(false);
                    setTime(date);
                    setPickupTime(moment(date).format('HH:mm'));
                  }}
                  onCancel={() => {
                    setTimeOpen(false);
                  }}
                />

                <TextInput
                  style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                  placeholder="Time"
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
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                getDateAndTime({pickupDate, pickupTime, date, time});
                setPickupDate('');
                setPickupTime('');
                toggleModal();
              }}>
              <Text style={styles.okButtonText}>
                {localizationText('Common', 'schedule')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    height: 300,
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fffaea',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '22%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  pickupDates: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 5,
  },
  datetimeCard: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
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
  loginput: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: colors.text,
    width: '88%',
    fontFamily: 'Montserrat-Regular',
  },
  okButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.white,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    width: 200,
    textAlign: 'center',
  },
  okButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default DateAndTimePickerModal;
