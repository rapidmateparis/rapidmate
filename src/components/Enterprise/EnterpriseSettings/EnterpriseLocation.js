import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../colors';
import MapDeliveryDetails from '../../commonComponent/MapDeliveryDetails';
import {getEnterpriseBranch} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import {useUserDetails} from '../../commonComponent/StoreContext';
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EnterpriseLocation = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {setLoading} = useLoader();
  const {userDetails} = useUserDetails();
  const [enterpriseBranches, setEnterpriseBranches] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    setLoading(true)
    getEnterpriseBranch(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        setLoading(false);
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == 'NotAuthorizedException') {
              // Alert.alert('Error Alert', successResponse[0]._response.name, [
              //   {text: 'OK', onPress: () => {}},
              // ]);
            } else {
              var branches = [];
              for (
                let index = 0;
                index < successResponse[0]._response.length;
                index++
              ) {
                const element = successResponse[0]._response[index];
                element.isSelected = false;
                branches.push(element);
              }
              setEnterpriseBranches(branches);
            }
          }
        }
      },
      errorResponse => {
        console.log('errorResponse', errorResponse[0]._errors.message);
        setLoading(false);
        // Alert.alert('Error Alert', errorResponse[0]._errors.message, [
        //   {text: 'OK', onPress: () => {}},
        // ]);
      },
    );
  }, [isVisible]);

  const renderItem = ({item,index}) => (
    <View>
      <View style={styles.addressCard}>
        <Image
          style={styles.companyImga}
          source={require('../../../image/home.png')}
        />

        <View style={{flex: 1, marginLeft: 8}}>
          <Text style={styles.franchiseLocations}>{item.branch_name}</Text>
          <View style={styles.locationCard}>
            <Ionicons name="location-outline" size={13} color="#000" />
            <Text style={styles.franchiseAddress}>{item.city}, {item.state}, {item.country}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <FontAwesome6 onPress={()=>{
            navigation.navigate('EnterpriseAddNewLocation',{location:item})
          }} name="pencil" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, paddingHorizontal: 15}}>
{/* <TouchableOpacity
                onPress={() =>{navigation.navigate('EnterpriseBottomNav')}}>
              <Text style={[styles.colorWiseText,{fontWeight:"bold"}]}>No Branches</Text>
                </TouchableOpacity> */}
            
        {
          enterpriseBranches.length === 0 ?
            <View style={styles.noBranchedView}>
              {/* <TouchableOpacity
                onPress={() =>{navigation.navigate('EnterpriseBottomNav')}}> */}
              <Text style={[styles.colorWiseText,{fontWeight:"bold"}]}>No Branches</Text>
                {/* </TouchableOpacity> */}
            </View>
            :
          <FlatList data={enterpriseBranches} renderItem={renderItem} />
        }

      
    </View>
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
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginVertical: 10,
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
    marginTop: 5,
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
  companyImga: {
    width: 35,
    height: 30,
  },
  noBranchedView:{
    justifyContent:"space-between",paddingHorizontal:16,paddingVertical:8,flexDirection:"row",
    backgroundColor:'#E5E4E4',
    alignItems:"center",borderRadius:5,marginVertical:8,marginHorizontal:4
  },
  colorWiseText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginHorizontal: 8,
  },

});

export default EnterpriseLocation;
