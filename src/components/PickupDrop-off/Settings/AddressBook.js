import React, {useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../colors';
import EditAddressModal from '../../commonComponent/EditAddressModal';
import AddNewAddressModal from '../../commonComponent/AddNewAddressModal';

const AddressBook = ({navigation}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const toggleModal = vehicleDetails => {
    setEditModalVisible(!editModalVisible);
  };


  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.addressCard}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>John Doe</Text>
            <Text style={styles.mailId}>
              18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Feather
              style={{marginTop: 5}}
              name="edit-2"
              size={15}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>John Doe</Text>
            <Text style={styles.mailId}>
              18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Feather
              style={{marginTop: 5}}
              name="edit-2"
              size={15}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>John Doe</Text>
            <Text style={styles.mailId}>
              18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Feather
              style={{marginTop: 5}}
              name="edit-2"
              size={15}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.addressCard}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.paymentPlateform}>John Doe</Text>
            <Text style={styles.mailId}>
              18 Avenue Henri et Louise de Vilmorin, 91370, Verrières-le-Buisson
            </Text>
          </View>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Feather
              style={{marginTop: 5}}
              name="edit-2"
              size={15}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal here  */}

      <EditAddressModal
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addressCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 13,
    borderRadius: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.0625,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0.5, // for Android
    marginTop: 15,
  },
  cardTitle: {
    fontSize: 14,
    flex: 1,
    color: colors.text,
    fontFamily: 'Montserrat-Medium',
  },
  paymentPlateform: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
  mailId: {
    color: '#131314',
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
});

export default AddressBook;
