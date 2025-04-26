import React, { useState } from 'react';
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
import { colors } from '../../colors';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Img.png';
import PartnerImage from '../../image/Partner.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import { createPickupOrder } from '../../data_manager';
import { useLoader } from '../../utils/loaderContext';
import { useUserDetails } from '../commonComponent/StoreContext';
import DeliveryboyPackagePreviewModal from '../commonComponent/DeliveryboyPackagePreviewModal';
import { API } from '../../utils/constant';
import { debounce } from 'lodash';

const EnterpriseShiftDeliveryboyAssigned = ({ route, navigation }) => {
  const deliveryBoyDetail = route?.params?.deliveryBoyDetail;
  console.log("USer Params:::::::::::::>", deliveryBoyDetail)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const toggleModal = () => {
    setImageModalVisible(!isImageModalVisible);
  };

  const formatTime = (timeStr) => {
    const date = new Date(`1970-01-01T${timeStr}Z`);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };


  return (
    <ScrollView style={{ width: '100%', backgroundColor: '#FBFAF5' }}>
      <View style={{ paddingHorizontal: 15 }}>
        <View style={styles.container}>
          <Image
            style={styles.deliveryboyProfile}
            source={require('../../image/Big-Calender.png')}
          />
          <Text style={styles.maintext}>
            {formatTime(deliveryBoyDetail?.from_time)} to {formatTime(deliveryBoyDetail?.to_time)}
          </Text>

          <Text style={styles.deliveryboySubtitle}>{`${deliveryBoyDetail.total_hours} hours shift`}</Text>
        </View>

        <View style={styles.ShiftOrderDetailsCard}>
          <View style={styles.ShiftOrderDetailsMainCard}>
            <Text style={styles.ShiftOrderSubtitle}>Location</Text>
            <Text style={styles.ShiftOrderTitle}>North Franchise</Text>
          </View>

          <View style={styles.ShiftOrderDetailsMainCard}>
            <Text style={styles.ShiftOrderSubtitle}>Order Id</Text>
            <Text style={styles.ShiftOrderTitle}>{deliveryBoyDetail.order_number}</Text>
          </View>

          <View style={styles.ShiftOrderDetailsMainCard}>
            <Text style={styles.ShiftOrderSubtitle}>Vehicle requested</Text>
            <Text style={styles.ShiftOrderTitle}>Pickup</Text>
          </View>
        </View>

        <View style={styles.driverMainCard}>
          <View style={styles.driverCard}>
            <View style={styles.profileReadyCard}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={require('../../image/driver.jpeg')}
              />
              <View style={styles.readyCard}>
                <Text style={styles.readyforDelivery}>Ready</Text>
              </View>
            </View>
            <View style={{ width: '40%', marginLeft: 10 }}>
              <Text style={styles.driverName}>{deliveryBoyDetail.first_name}</Text>
              <Text style={styles.truckName}>{deliveryBoyDetail.plat_no}</Text>
            </View>
            <View>
              <Image
                style={{
                  height: 40,
                  resizeMode: 'center',
                }}
                source={require('../../image/Pickup-Icon.png')}
              />
            </View>
          </View>
          <View style={styles.moreDetails}>
            <Text style={styles.distance}>Assign delivery</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EnterpriseDeliveryboyAssigned')}>
              <AntDesign name="arrowright" size={18} color="#FF0058" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },

  vehicleDetails: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  semiTruckDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vehicleName: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  vehicleCapacity: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  pickupCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 5,
  },
  pickupDetails: {
    marginBottom: 10,
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  pickupManDetails: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginVertical: 10,
  },
  contactInfo: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 3,
    color: colors.text,
  },
  pickupinfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickupNotes: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  bookininfo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  logbutton: {
    width: '100%',
    marginVertical: 20,
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
  locationCard: {
    position: 'relative',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 5,
    marginTop: 15,
  },
  locationAddress: {
    flexDirection: 'row',
  },
  TextAddress: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 5,
  },
  borderDummy: {
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderStyle: 'dashed',
    marginHorizontal: 9,
    marginVertical: 15,
  },
  // borderShowOff: {
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   borderStyle: 'dashed',
  //   width: 25,
  //   transform: [{rotate: '90deg'}],
  //   position: 'absolute',
  //   top: 50,
  //   left: 11,
  // },
  vehicleImage: {
    height: 62,
    resizeMode: 'center',
  },
  packageBasicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingOTP: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  packagePhoto: {
    width: 48,
    height: 48,
    borderRadius: 5,
  },
  driverMainCard: {
    borderWidth: 0.5,
    borderColor: '#0000001A',
  },
  driverCard: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 0.0625 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  truckName: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  deliveryboyProfile: {
    width: 100,
    height: 100,
  },
  maintext: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  deliveryboySubtitle: {
    fontFamily: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  ShiftOrderDetailsCard: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderColor: '#0000001A',
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 0.0625 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    marginVertical: 15,
  },
  ShiftOrderSubtitle: {
    fontFamily: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  ShiftOrderTitle: {
    fontFamily: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  ShiftOrderDetailsMainCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  readyCard: {
    backgroundColor: '#27AE60',
    padding: 5,
    borderRadius: 12,
    width: 60,
    position: 'absolute',
    bottom: -15,
    left: 0,
  },
  profileReadyCard: {
    position: 'relative',
  },
  readyforDelivery: {
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
    textAlign: 'center',
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
  distance: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
});

export default EnterpriseShiftDeliveryboyAssigned;
