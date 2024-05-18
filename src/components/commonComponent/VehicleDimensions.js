import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import MiniTruckImage from '../../image/modal-minitruck.png';
import BicycleImage from '../../image/VehicleModal1.png';
import MotorbikeImage from '../../image/VehicleModal2.png';
import MiniVanImage from '../../image/VehicleModal4.png';
import SemiTruckImage from '../../image/VehicleModal5.png';

function VehicleDimensionsModal({
  setModalVisible,
  isModalVisible,
  vehicleDetails,
}) {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Vehicle Dimensions</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 20,}}>
            <View style={styles.ImageCard}>
              <Image
                source={
                  vehicleDetails && vehicleDetails.name == 'Mini Truck'
                    ? MiniTruckImage
                    :vehicleDetails && vehicleDetails.name == 'Bicycle'
                    ? BicycleImage
                    :vehicleDetails && vehicleDetails.name == 'Motorbike'
                    ? MotorbikeImage
                    :vehicleDetails && vehicleDetails.name == 'Mini Van'
                    ? MiniVanImage
                    :vehicleDetails && vehicleDetails.name == 'Semi Truck'
                    ? SemiTruckImage
                    : ''
                }
              />
              {/* <Image
                style={styles.countIcon1}
                source={require('../../image/1-icon.png')}
              />
              <Image
                style={styles.countIcon2}
                source={require('../../image/2-icon.png')}
              />
              <Image
                style={styles.countIcon3}
                source={require('../../image/3-icon.png')}
              /> */}
            </View>
            <View style={styles.infoVehicle}>
              <Text style={styles.count}>1</Text>
              <Text style={styles.infoText}>
                Length{' '}
                <Text style={styles.boldText}>
                  {vehicleDetails && vehicleDetails.length}
                </Text>
              </Text>
            </View>

            <View style={styles.infoVehicle}>
              <Text style={styles.count}>2</Text>
              <Text style={styles.infoText}>
                Height{' '}
                <Text style={styles.boldText}>
                  {vehicleDetails && vehicleDetails.height}
                </Text>
              </Text>
            </View>

            <View style={styles.infoVehicle}>
              <Text style={styles.count}>3</Text>
              <Text style={styles.infoText}>
                Width{' '}
                <Text style={styles.boldText}>
                  {vehicleDetails && vehicleDetails.width}
                </Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonCard}>
            <Text style={styles.okButton}>Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    height: 480,
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
  ImageCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
  },
  infoVehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  count: {
    width: 20,
    height: 20,
    borderRadius: 30,
    paddingHorizontal: 6,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  boldText: {
    fontFamily: 'Montserrat-SemiBold',
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: 180,
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  countIcon1: {
    position: 'absolute',
    top: '-25%',
    left: '20%',
  },
  countIcon2: {
    position: 'absolute',
    left: '8%',
  },
  countIcon3: {
    position: 'absolute',
    bottom: '-15%',
    left: '13%',
  },
});

export default VehicleDimensionsModal;
