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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../colors';
import MapDeliveryDetails from '../../commonComponent/MapDeliveryDetails';

const EnterpriseLocation = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <View style={{width: '100%', height: 250}}>
            <MapDeliveryDetails />
          </View>

          <View style={styles.addressCard}>
            <Image source={require('../../../image/home.png')} />

            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={styles.franchiseLocations}>
                North Street Franchise
              </Text>
              <View style={styles.locationCard}>
                <Ionicons name="location-outline" size={13} color="#000" />
                <Text style={styles.franchiseAddress}>North Street, ABC</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome6 name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginVertical: 15,}}>
          <View style={{width: '100%', height: 250}}>
            <MapDeliveryDetails />
          </View>

          <View style={styles.addressCard}>
            <Image source={require('../../../image/home.png')} />

            <View style={{flex: 1, marginLeft: 8}}>
              <Text style={styles.franchiseLocations}>
                North Street Franchise
              </Text>
              <View style={styles.locationCard}>
                <Ionicons name="location-outline" size={13} color="#000" />
                <Text style={styles.franchiseAddress}>North Street, ABC</Text>
              </View>
            </View>
            <TouchableOpacity>
              <FontAwesome6 name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImg: {
    width: 78,
    height: 78,
    borderRadius: 40,
  },
  username: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  goprofile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageProfile: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  bookAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 13,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginBottom: 7,
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  titleStatus: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: colors.primary,
    paddingHorizontal: 10,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  franchiseLocations: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  franchiseAddress: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
});

export default EnterpriseLocation;
