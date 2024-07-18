import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import MiniTruckImage from '../../image/modal-minitruck.png';
import BicycleImage from '../../image/VehicleModal1.png';
import MotorbikeImage from '../../image/VehicleModal2.png';
import CarImage from '../../image/VehicleModal6.png';
import MiniVanImage from '../../image/VehicleModal4.png';
import SemiTruckImage from '../../image/VehicleModal5.png';
import PackageImage from '../../image/VehicleModal7.png';

const EnterpriseVehcleDimensions = ({
  setModalVisible,
  isModalVisible,
  vehicleDetails,
}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Determine which image and corresponding style to use based on vehicleDetails.name
  let vehicleImageSource;
  let vehicleImageStyle;

  switch (vehicleDetails?.name) {
    case 'Mini Truck':
      vehicleImageSource = MiniTruckImage;
      vehicleImageStyle = styles.miniTruckImage;
      break;
    case 'Cycle':
      vehicleImageSource = BicycleImage;
      vehicleImageStyle = styles.bicycleImage;
      break;
    case 'Scooter':
      vehicleImageSource = MotorbikeImage;
      vehicleImageStyle = styles.motorbikeImage;
      break;
    case 'Car':
      vehicleImageSource = CarImage;
      vehicleImageStyle = styles.carImage;
      break;
    case 'Mini Van':
      vehicleImageSource = MiniTruckImage;
      vehicleImageStyle = styles.miniTruckImage;
      break;
    case 'Pickup':
      vehicleImageSource = MiniVanImage;
      vehicleImageStyle = styles.miniVanImage;
      break;
    case 'Semi Truck':
      vehicleImageSource = SemiTruckImage;
      vehicleImageStyle = styles.semiTruckImage;
      break;
    case 'Other':
      vehicleImageSource = PackageImage;
      vehicleImageStyle = styles.packageImage;
      break;
    default: // Handle the case where vehicleDetails.name is not matched
      vehicleImageSource = null;
      vehicleImageStyle = null;
      break;
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>Vehicle Dimensions</Text>
          <TouchableOpacity onPress={toggleModal}>
            <AntDesign name="close" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          {vehicleImageSource && (
            <Image
              source={vehicleImageSource}
              style={[styles.vehicleImage, vehicleImageStyle]}
            />
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoVehicle}>
            <View style={styles.count}>
              <Text style={styles.countText}>1</Text>
            </View>
            <Text style={styles.infoText}>
              Length{' '}
              <Text style={styles.boldText}>{vehicleDetails?.length}</Text>
            </Text>
          </View>

          <View style={styles.infoVehicle}>
            <View style={styles.count}>
              <Text style={styles.countText}>2</Text>
            </View>
            <Text style={styles.infoText}>
              Height{' '}
              <Text style={styles.boldText}>{vehicleDetails?.height}</Text>
            </Text>
          </View>

          <View style={styles.infoVehicle}>
            <View style={styles.count}>
              <Text style={styles.countText}>3</Text>
            </View>
            <Text style={styles.infoText}>
              Width <Text style={styles.boldText}>{vehicleDetails?.width}</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.okButton} onPress={toggleModal}>
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  infoVehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  count: {
    width: 20,
    height: 20,
    backgroundColor: '#D3D4D4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  countText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  infoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: colors.text,
  },
  boldText: {
    fontFamily: 'Montserrat-SemiBold',
  },
  okButton: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  miniTruckImage: {
    width: 250,
    height: 250,
  },
  bicycleImage: {
    width: 250,
    height: 250,
  },
  motorbikeImage: {
    width: 250,
    height: 250,
  },
  carImage: {
    width: 250,
    height: 250,
  },
  miniVanImage: {
    width: 250,
    height: 250,
  },
  miniVanImage: {
    width: 250,
    height: 250,
  },
  semiTruckImage: {
    width: 250,
    height: 250,
  },
  packageImage: {
    width: 200,
    height: 200,
  },
});

export default EnterpriseVehcleDimensions;
