import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import ExStyles from '../style';

export default function Pickup2({navigation}) {
  return (
    <View style={ExStyles.vehiclesChoose}>
      <Text style={ExStyles.vehicleMainTitle}>
        Choisissez un <Text style={{fontWeight: '700'}}>véhicule</Text>
      </Text>
      <View style={ExStyles.vehicleitemList}>
        <View style={ExStyles.vehicleitem}>
          <Image
            source={require('../image/cycling.png')}
            style={ExStyles.vehicleimage}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={ExStyles.vehicleTypeCost}>Vélo</Text>
            <View style={{width: 185}} />
            <Text style={ExStyles.vehicleTypeCost}>10€</Text>
          </View>
        </View>
        <View style={ExStyles.vehicleitem}>
          <Image
            source={require('../image/motorcycle.png')}
            style={ExStyles.vehicleimage}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={ExStyles.vehicleTypeCost}>Scooter</Text>
            <View style={{width: 150}} />
            <Text style={ExStyles.vehicleTypeCost}>10€</Text>
          </View>
        </View>
        <View style={ExStyles.vehicleitem}>
          <Image source={require('../image/car.png')} style={ExStyles.vehicleimage} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={ExStyles.vehicleTypeCost}>Voiture</Text>
            <View style={{width: 160}} />
            <Text style={ExStyles.vehicleTypeCost}>10€</Text>
          </View>
        </View>
        <View style={ExStyles.vehicleitem}>
          <Image
            source={require('../image/delivery-truck.png')}
            style={ExStyles.vehicleimage}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={ExStyles.vehicleTypeCost}>Camion</Text>
            <View style={{width: 155}} />
            <Text style={ExStyles.vehicleTypeCost}>10€</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={ExStyles.validerButton}
        title="Valider"
        onPress={() => console.warn('Valider pressed!')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={ExStyles.vehicleValider}>Valider</Text>
          <View style={{width: 90}} />
          <Text style={ExStyles.vehicleValiderCost}>312.67€</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
