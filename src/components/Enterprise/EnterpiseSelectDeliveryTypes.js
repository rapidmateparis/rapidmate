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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../colors';
import LinearGradient from 'react-native-linear-gradient';
import BicycleImage from '../../image/Cycle-Right1x.png';
import MotorbikeImage from '../../image/Scooter-Right1x.png';
import CarImage from '../../image/Car-Right1x.png';
import miniTruckImage from '../../image/Van-Right1x.png';
import MiniVanImage from '../../image/Pickup-Right1x.png';
import SemiTruckImage from '../../image/Truck-Right1x.png';
import PackageImage from '../../image/Big-Package.png';
import EnterpriseVehcleDimensions from '../commonComponent/EnterpriseVehcleDimensions';
import { useLoader } from '../../utils/loaderContext';
import { getAllVehicleTypes } from '../../data_manager';

const EnterpiseSelectDeliveryTypes = ({route, navigation}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleOptionSelect = (option, vehicle) => {
    setSelectedOption(option);
    setSelectedVehicle(vehicle);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState();
  const {setLoading} = useLoader();
  const [vehicleTypeList, setVehicleTypeList] = useState([]);

  const toggleModal = vehicleDetails => {
    setVehicleDetails(vehicleDetails);
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setLoading(true);
    getAllVehicleTypes(
      null,
      successResponse => {
        if (successResponse[0]._success) {
          setLoading(false);
          setVehicleTypeList(successResponse[0]._response);
        }
      },
      errorResponse => {
        setLoading(false);
        Alert.alert('Error Alert', errorResponse[0]._errors.message, [
          {text: 'OK', onPress: () => {}},
        ]);
      },
    );
  }, []);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.selectServiceTitle}>Select service type</Text>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy with scooter' && {
              },
            ]}
            onPress={() =>
              handleOptionSelect('Delivery boy with scooter', vehicleTypeList.filter(val => val.vehicle_type == 'Scooter')[0])
            }>
            {selectedOption === 'Delivery boy with scooter' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Delivery boy with scooter' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Delivery boy with scooter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Delivery boy without scooter',
            ]}
            onPress={() =>
              handleOptionSelect('Delivery boy without scooter', '')
            }>
            {selectedOption === 'Delivery boy without scooter' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Delivery boy without scooter' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Delivery boy without scooter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Multi-task employee',
            ]}
            onPress={() => handleOptionSelect('Multi-task employee', '')}>
            {selectedOption === 'Multi-task employee' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Multi-task employee' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Multi-task employee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectDeliveryboyTypeCard,
              selectedOption === 'Cleaning staff',
            ]}
            onPress={() => handleOptionSelect('Cleaning staff', '')}>
            {selectedOption === 'Cleaning staff' ? (
              <FontAwesome
                name="dot-circle-o"
                size={25}
                color={colors.secondary}
              />
            ) : (
              <FontAwesome name="circle-thin" size={25} color={colors.text} />
            )}
            <Text
              style={[
                styles.deliveryboyType,
                selectedOption === 'Cleaning staff' && {
                  fontFamily: 'Montserrat-Bold',
                },
              ]}>
              Cleaning staff
            </Text>
          </TouchableOpacity>

          <View style={styles.vehicleTypePrice}>
            <Text style={styles.selectServiceTitle}>Select vehicle type</Text>
            {selectedVehiclePrice && (
              <Text style={styles.selectedVehiclePrice}>
                {selectedVehiclePrice}
              </Text>
            )}
          </View>
        </View>

        {vehicleTypeList.map((vehicle, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedVehicle(vehicle);
              setSelectedVehiclePrice(vehicle.km_price);
            }}
            style={[
              styles.addressCard,
              vehicle.vehicle_type === selectedVehicle.vehicle_type ? styles.selectedCard : null,
            ]}>
            <TouchableOpacity
              onPress={() => toggleModal(vehicle)}
              style={styles.infoIcons}>
              <Image source={require('../../image/info.png')} />
            </TouchableOpacity>
            <View style={styles.vihicleCards}>
              <FontAwesome
                name={
                  vehicle.vehicle_type === selectedVehicle.vehicle_type
                    ? 'dot-circle-o'
                    : 'circle-thin'
                }
                size={25}
                color={
                  vehicle.vehicle_type === selectedVehicle.vehicle_type
                    ? colors.secondary
                    : colors.text
                }
              />
              <Text style={styles.paymentPlateform}>{vehicle.vehicle_type}</Text>
            </View>
            <Image style={vehicle.style} source={vehicle.image} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate('EnterpiseScheduleNewDetailsFill',{...route.params,vehicle_type_id:selectedVehicle.vehicle_type_id})}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <EnterpriseVehcleDimensions
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        vehicleDetails={vehicleDetails}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 15,
    paddingRight: 25,
    height: 60,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
    marginVertical: 5,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginHorizontal: 10,
  },
  logbutton: {
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
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
  selectServiceTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginVertical: 10,
  },
  deliveryboyType: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginHorizontal: 8,
  },
  selectDeliveryboyTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkIcon: {
    borderWidth: 1,
    width: 23,
    height: 23,
    borderRadius: 15,
    marginRight: 8,
  },
  vihicleCards: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  disabledCard: {
    opacity: 1,
  },
  cycle: {
    width: 32,
    height: 34,
  },
  scooter: {
    width: 32,
    height: 34,
  },
  car: {
    width: 41,
    height: 17,
  },
  van: {
    width: 48,
    height: 22,
  },
  pickup: {
    width: 42,
    height: 30,
  },
  truck: {
    width: 56,
    height: 26,
  },
  package: {
    width: 32,
    height: 32,
  },
  vehicleTypePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedVehiclePrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  infoIcons: {
    position: 'absolute',
    top: -10,
    right: -11,
    padding: 10,
  },
});

export default EnterpiseSelectDeliveryTypes;
