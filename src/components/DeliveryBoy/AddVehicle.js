import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import BicycleImage from '../../image/Cycle-Icon.png';
import MotorbikeImage from '../../image/Motorbike.png';
import CarImage from '../../image/Car-Icon.png';
import PartnerImage from '../../image/Partner-icon.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';
import OtherImage from '../../image/Big-Package.png';
import {getAllVehicleTypes} from '../../data_manager';
import {useLoader} from '../../utils/loaderContext';
import { localizationText } from '../../utils/common';

const AddVehicle = ({route, navigation}) => {
  const {setLoading} = useLoader();
  const [selectedOption, setSelectedOption] = useState({});
  const [vehicleTypeList, setVehicleTypeList] = useState([]);

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

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === 'Other') {
      navigation.navigate('DeliveryboyOtherOptions');
    } else {
      navigation.navigate('AddPickupVehicle');
    }
  };

  const getVechicleImage = vehicleTypeId => {
    switch (vehicleTypeId) {
      case 1:
        return BicycleImage;
      case 2:
        return MotorbikeImage;
      case 3:
        return CarImage;
      case 4:
        return PartnerImage;
      case 5:
        return MiniVanImage;
      case 6:
        return MiniTruckImage;
      case 7:
        return SemiTruckImage;
      default:
        return OtherImage;
    }
  };

  const renderCard = item => {
    let renderItem = JSON.parse(JSON.stringify(item));
    const isSelected = selectedOption.vehicle_name === renderItem.vehicle_type;
    return (
      <LinearGradient
        colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
        style={[styles.gradient]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() =>
            handleOptionSelect({
              vehicle_name: renderItem.vehicle_type,
              vehicle_id: renderItem.vehicle_type_id,
            })
          }
          style={[
            styles.addressCard,
            isSelected ? styles.selectedCard : null, // Apply selected card style conditionally
          ]}>
          <Image
            source={getVechicleImage(renderItem.vehicle_type_id)}
            style={[styles.cardImage, {resizeMode: 'center'}]}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>
              {renderItem.vehicle_type}
            </Text>
          </View>

          {!isSelected && <View style={styles.cricleRound} />}

          {isSelected && (
            <View style={styles.checkmark}>
              <AntDesign name="check" size={18} color={colors.white} />
            </View>
          )}
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        {vehicleTypeList.map(item => (
          <View>{renderCard(item)}</View>
        ))}
        <TouchableOpacity
          onPress={() => {
            console.log('selectedOption.selectedVehicle', selectedOption);
            if (!selectedOption.vehicle_id) {
              Alert.alert('Error Alert', 'Please select a vehicle', [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              navigation.navigate('AddPickupVehicle', {
                delivery_boy_details: route.params.delivery_boy_details,
                selectedVehicle: selectedOption,
              });
            }
          }}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>
            {localizationText('Common', 'next')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 10,
    marginVertical: 5,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    height: 70,
    borderWidth: 1,
    borderColor: '#35353533',
    borderRadius: 10,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  checkmark: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  logbutton: {
    width: '100%',
    marginTop: 20,
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
  cardImage: {
    width: 40,
    height: 40,
  },
  cycleImage: {
    width: 40,
    height: 43,
  },
  scooterImage: {
    width: 40,
    height: 40,
  },
  carImage: {
    width: 52,
    height: 22,
  },
  partnerImage: {
    width: 52,
    height: 22,
  },
  vanImage: {
    width: 60,
    height: 28,
  },
  pickupImage: {
    width: 52,
    height: 34,
  },
  truckImage: {
    width: 70,
    height: 32,
  },
  otherImage: {
    width: 38,
    height: 38,
  },
  cricleRound: {
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.subText,
  },
});

export default AddVehicle;
