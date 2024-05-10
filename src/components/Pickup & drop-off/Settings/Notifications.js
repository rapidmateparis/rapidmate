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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../colors';

const Notifications = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <Text style={styles.dayText}>Today</Text>
          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery En Route</Text>
              <Text style={styles.deliveryDiscription}>
                Your package is on its way to the destination, Track its
                progress!
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>

          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery Completed</Text>
              <Text style={styles.deliveryDiscription}>
                Your package has been successfully delivered.
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.dayText}>This week</Text>
          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery En Route</Text>
              <Text style={styles.deliveryDiscription}>
                Your package is on its way to the destination, Track its
                progress!
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>

          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery Completed</Text>
              <Text style={styles.deliveryDiscription}>
                Your package has been successfully delivered.
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>

          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery En Route</Text>
              <Text style={styles.deliveryDiscription}>
                Your package is on its way to the destination, Track its
                progress!
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>

          <View style={styles.historyCard}>
            <Image source={require('../../../image/bell-icon.png')} />
            <View style={styles.deliveryDetails}>
              <Text style={styles.deliveryStatus}>Delivery Completed</Text>
              <Text style={styles.deliveryDiscription}>
                Your package has been successfully delivered.
              </Text>
              <View style={styles.timing}>
                <Ionicons name="time" size={16} color="#909090" />
                <Text style={styles.TimeOfDelivery}>09:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Feather name="x" size={18} color="#909090" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dayText: {
    color: '#1D1617',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  historyCard: {
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
    elevation: 0.5,
    marginBottom: 7,
    marginTop: 7,
  },
  deliveryDetails: {
    width: '88%',
    paddingLeft: 20,
  },
  deliveryStatus: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
  },
  deliveryDiscription: {
    fontSize: 13,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 5,
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TimeOfDelivery: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
  },
});

export default Notifications;
