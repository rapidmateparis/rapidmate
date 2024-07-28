import React, {useState} from 'react';
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

const AddVehicle = ({route, navigation}) => {
  const [selectedOption, setSelectedOption] = useState({});

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const renderCard = (option, id, iconSource, title, imageStyle) => {
    const isSelected = selectedOption.vehicle_name === option;

    return (
      <LinearGradient
        colors={['rgba(255, 0, 88, 0.07)', 'rgba(153, 0, 53, 0)']}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          onPress={() => handleOptionSelect({vehicle_name:option, vehicle_id:id})}
          style={[
            styles.addressCard,
            isSelected ? styles.selectedCard : null, // Apply selected card style conditionally
          ]}>
          <Image source={iconSource} style={[styles.cardImage, imageStyle]} />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>{title}</Text>
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
        {renderCard(
          'Cycle',
          1,
          require('../../image/Cycle-Icon.png'),
          'Cycle',
          styles.cycleImage,
        )}
        {renderCard(
          'Scooter',
          2,
          require('../../image/Scooter-Icon.png'),
          'Scooter',
          styles.scooterImage,
        )}
        {renderCard(
          'Car',
          3,
          require('../../image/Car-Icon.png'),
          'Car',
          styles.carImage,
        )}
        {renderCard(
          'Partner',
          4,
          require('../../image/Partner-icon.png'),
          'Partner',
          styles.partnerImage,
        )}
        {renderCard(
          'Van',
          5,
          require('../../image/Van-Icon.png'),
          'Van',
          styles.vanImage,
        )}
        {renderCard(
          'Pickup',
          7,
          require('../../image/Pickup-Icon.png'),
          'Pickup',
          styles.pickupImage,
        )}
        {renderCard(
          'Truck',
          8,
          require('../../image/Truck-Icon.png'),
          'Truck',
          styles.truckImage,
        )}
        {renderCard(
          'Other',
          1,
          require('../../image/Big-Package.png'),
          'Other',
          styles.otherImage,
        )}

        <TouchableOpacity
          onPress={() =>  {
            console.log('selectedOption.selectedVehicle',selectedOption)
            if(!selectedOption.vehicle_id) {
              Alert.alert('Error Alert', 'Please select a vehicle', [
                {text: 'OK', onPress: () => {}},
              ]);
            } else {
              navigation.navigate('AddPickupVehicle',{delivery_boy_details:route.params.delivery_boy_details, selectedVehicle:selectedOption})
            }
          }}
          style={[styles.logbutton, {backgroundColor: colors.primary}]}>
          <Text style={styles.buttonText}>Next</Text>
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
