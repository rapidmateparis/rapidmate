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
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {colors} from '../../colors';
import PlaningFilterModal from '../commonComponent/PlaningFilterModal';

const Planning = ({navigation}) => {
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
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 15, marginTop: 10,}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Planning</Text>
            <TouchableOpacity onPress={()=>toggleModal()}>
              <AntDesign name="filter" size={30} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.calenderCard}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
            [getCurrentDate()]: {
              selected: true,
              disableTouchEvent: true,
            },
            '2024-05-13': {marked: true, dotColor: colors.secondary,},
            '2024-05-14': {marked: true, dotColor: colors.secondary,},
            '2024-05-15': {marked: true, dotColor: colors.secondary,},
            '2024-05-16': {marked: true, dotColor: colors.secondary,},
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
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 15, paddingTop: 5}}>
          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image source={require('../../image/package-medium-icon.png')} />
              <Text style={styles.deliveryTime}>
                Delivered on Apr 19, 2024 at 11:30 AM
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                From <Text style={styles.Location}>North Street, ABC</Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
              </Text>
            </View>

            <View style={styles.footerCard}>
              <Text style={styles.orderId}>Order ID: 98237469</Text>
              <Text style={styles.valueMoney}>For National Inc.</Text>
            </View>
          </View>

          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image source={require('../../image/package-medium-icon.png')} />
              <Text style={styles.deliveryTime}>
                Delivered on Apr 19, 2024 at 11:30 AM
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                From <Text style={styles.Location}>North Street, ABC</Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
              </Text>
            </View>

            <View style={styles.footerCard}>
              <Text style={styles.orderId}>Order ID: 98237469</Text>
              <Text style={styles.valueMoney}>For National Inc.</Text>
            </View>
          </View>

        </View>
      </View>
      {/* Modal start here  */}
      <PlaningFilterModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
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
    marginVertical: 10,
  },
});

export default Planning;
