import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';

const DeliveryScheduleDetails = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View>
        <View style={styles.dateCard}>
          <View style={{width: '48%'}}>
            <Text style={styles.dateText}>Start date</Text>
            <Text style={styles.startDate}>20/02/2024</Text>
          </View>

          <View style={{width: '48%'}}>
            <Text style={styles.dateText}>End date</Text>
            <Text style={styles.startDate}>10/03/2024</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 15}}>
          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>

          <View style={styles.dateTimeCard}>
            <Text style={styles.siftDate}>
              Tuesday <Text style={styles.dateTimeSift}>21 February,</Text> 2024
            </Text>

            <View style={styles.startTimeCard}>
              <Text style={styles.startTime}>10:00 AM</Text>
              <View style={styles.borderShowoff} />
              <Text style={styles.startTime}>02:00 PM</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonCard}>
        <TouchableOpacity style={styles.logbutton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EnterpriseScheduleRequestSubmitted')}
          style={styles.saveBTn}>
          <Text style={styles.okButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  maintext: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  timerCount: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  cancelRequest: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  Delivering: {
    flex: 1,
  },
  DeliveringText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  subAddress: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 3,
  },
  addressCard: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  mapAddress: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
  overViewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  borderShowoff: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderStyle: 'dashed',
    width: 10,
    marginHorizontal: 5,
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
  scheduleDateTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeSlotDetails: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.secondary,
  },
  moreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff2f6',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  startDate: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    borderWidth: 1,
    borderColor: '#737C7B26',
    padding: 10,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.white,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
    color: colors.text,
  },
  siftDate: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginBottom: 5,
  },
  dateTimeSift: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  startTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startTime: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    borderWidth: 1,
    borderColor: '#737C7B26',
    padding: 10,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.white,
    width: '48%',
  },
  dateTimeCard: {
    marginVertical: 10,
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

export default DeliveryScheduleDetails;
