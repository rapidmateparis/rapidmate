import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../colors';
import MapAddress from '../common component/MapAddress';
import BicycleImage from '../../image/Bicycle.png';
import MotorbikeImage from '../../image/Motorbike.png';
import MiniTruckImage from '../../image/Mini-Truck.png';
import MiniVanImage from '../../image/Mini-Van.png';
import SemiTruckImage from '../../image/Semi-Truck.png';

const PickupAddress = ({navigation}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState(null);

  const vehicleData = [
    {
      name: 'Bicycle',
      capacity: '5 liters',
      price: '€5/km',
      image: BicycleImage,
    },
    {
      name: 'Motorbike',
      capacity: '10 liters',
      price: '€10/km',
      image: MotorbikeImage,
    },
    {
      name: 'Mini Truck',
      capacity: '1000 liters',
      price: '€50/km',
      image: MiniTruckImage,
    },
    {
      name: 'Mini Van',
      capacity: '4000 liters',
      price: '€80/km',
      image: MiniVanImage,
    },
    {
      name: 'Semi Truck',
      capacity: '20000 liters',
      price: '€150/km',
      image: SemiTruckImage,
    },
  ];

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{width: '100%', height: 500, position: 'relative'}}>
        {/* Google Map Start Here  */}
        <MapAddress />
        {/* Google Map End Here  */}
        <View style={styles.dateCard}>
          <EvilIcons name="calendar" size={25} color="#000" />
          <Text style={styles.dateCardText}>When do you need it?</Text>
          <TouchableOpacity>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <View style={styles.chooseVehicleCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
              }}>
              <Text style={styles.chooseVehicle}>Choose a Vehicle</Text>
              {selectedVehiclePrice && (
                <Text style={styles.selectedVehiclePrice}>
                  {selectedVehiclePrice}
                </Text>
              )}
            </View>
            <ScrollView horizontal={true}>
              <View style={{flexDirection: 'row'}}>
                {vehicleData.map((vehicle, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedVehicle(vehicle.name);
                      setSelectedVehiclePrice(vehicle.price);
                    }}
                    style={styles.cardVehicle}>
                    <View
                      style={
                        selectedVehicle === vehicle.name
                          ? styles.selectedCard
                          : styles.cardImages
                      }>
                      <Image style={{height: 62}} source={vehicle.image} />
                    </View>
                    <Text style={styles.vehicleTypeName}>{vehicle.name}</Text>
                    <Text style={styles.vehicleCap}>{vehicle.capacity}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue to order details</Text>
        <TouchableOpacity>
          <AntDesign name="arrowright" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateCard: {
    position: 'absolute',
    bottom: 1,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5,
    marginBottom: 5,
    marginTop: 5,
  },
  dateCardText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 10,
    color: colors.text,
  },
  chooseVehicle: {
    fontSize: 18,
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  chooseVehicleCard: {
    backgroundColor: colors.white,
    paddingVertical: 15,
  },
  cardVehicle: {
    paddingHorizontal: 5,
  },
  cardImages: {
    backgroundColor: colors.white,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2C303336',
    borderRadius: 7,
  },
  vehicleTypeName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
    marginTop: 5,
  },
  vehicleCap: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginBottom: 10,
  },
  selectedVehiclePrice: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: colors.secondary,
  },
  selectedCard: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'yellow', // or any other color you prefer
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  continueText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
  },
});

export default PickupAddress;
