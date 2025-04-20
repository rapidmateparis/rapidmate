import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../colors';
import MapDeliveryDetails from '../../commonComponent/MapDeliveryDetails';
import EnterpriseAddNewLocationsMap from '../../commonComponent/EnterpriseAddNewLocationsMap';
import { localizationText } from '../../../utils/common';

const EnterpriseAddNewLocation = ({route, navigation}) => {
  const [title, setTitle] = useState('');
  const params = route.params ? route.params.location : null

  useEffect(()=>{
    if (params) {
      setTitle(params.branch_name)
    }
  },[])

  return (
    <KeyboardAvoidingView>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.mainCardAddress}>
          <View style={styles.homeIconCard}>
            <Image
              style={styles.homeIconImage}
              source={require('../../../image/home.png')}
            />
            <Image
              style={styles.addAddress}
              source={require('../../../image/plus-vector.png')}
            />
          </View>
        </View>
        <View>
          <Text style={styles.locationtitle}>{localizationText('Common', 'addNewLocation')}</Text>
          <Text style={styles.locationsubTitle}>
          {localizationText('Common', 'addNewLocationDes')}
          </Text>
        </View>
        <View style={styles.nameInputDiv}>
          <Text style={styles.searchLocation}>{localizationText('Common', 'locationTitle')}</Text>
          <TextInput
            style={styles.loginput}
            placeholder={localizationText('Common', 'typeHere')}
            placeholderTextColor="#999"
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
      </View>
      <View style={{width: '100%', height: 430}}>
        <EnterpriseAddNewLocationsMap title = {title} location = {params} />
      </View>
    </KeyboardAvoidingView>
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
  addAddress: {
    position: 'absolute',
    bottom: -3,
    left: 35,
    height:20,
    width:20,
  },
  homeIconCard: {
    position: 'relative',
    marginTop: 10,
  },
  mainCardAddress: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  locationtitle: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 5,
  },
  locationsubTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    paddingHorizontal: 50,
  },
  searchLocation: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 5,
  },
  loginput: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: '100%',
    fontFamily: 'Montserrat-Regular',
    borderRadius: 5,
    marginBottom: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  nameInputDiv: {
    marginTop: 5,
  },
  homeIconImage: {
    width: 50,
    height: 50,
  },
});

export default EnterpriseAddNewLocation;
