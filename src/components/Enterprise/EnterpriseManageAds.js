import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TodayList = ({ togglePushNotifications, pushNotifications }) => {
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 5,
            backgroundColor: '#FBFAF5',
          }}>
          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.manageLogo}
                source={require('../../image/Levis-logo.png')}
              />
              <View style={{flex: 1,}}>
                <Text style={styles.deliveryTime}>Company Name</Text>
                <View style={styles.packageMiddle}>
                  <Ionicons name="location-outline" size={15} color="#717172" />
                  <Text style={styles.fromLocation}>North Street, ABC</Text>
                </View>
              </View>
              <TouchableOpacity onPress={togglePushNotifications}>
                <MaterialCommunityIcons
                  name={pushNotifications ? 'toggle-switch' : 'toggle-switch-off'}
                  size={50}
                  color={pushNotifications ? '#FFC72B' : '#D3D3D3'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.footerCard}>
              <Text style={styles.orderId}>
                Impressions:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>15k</Text>
              </Text>
              <Text style={styles.orderId}>
                Clicks:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>850</Text>
              </Text>
            </View>
          </View>

          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.manageLogo}
                source={require('../../image/Levis-logo.png')}
              />
              <View style={{flex: 1,}}>
                <Text style={styles.deliveryTime}>Company Name</Text>
                <View style={styles.packageMiddle}>
                  <Ionicons name="location-outline" size={15} color="#717172" />
                  <Text style={styles.fromLocation}>North Street, ABC</Text>
                </View>
              </View>
              <TouchableOpacity onPress={togglePushNotifications}>
                <MaterialCommunityIcons
                  name={pushNotifications ? 'toggle-switch' : 'toggle-switch-off'}
                  size={50}
                  color={pushNotifications ? '#FFC72B' : '#D3D3D3'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.footerCard}>
              <Text style={styles.orderId}>
                Impressions:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>15k</Text>
              </Text>
              <Text style={styles.orderId}>
                Clicks:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>850</Text>
              </Text>
            </View>
          </View>

          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.manageLogo}
                source={require('../../image/Levis-logo.png')}
              />
              <View style={{flex: 1,}}>
                <Text style={styles.deliveryTime}>Company Name</Text>
                <View style={styles.packageMiddle}>
                  <Ionicons name="location-outline" size={15} color="#717172" />
                  <Text style={styles.fromLocation}>North Street, ABC</Text>
                </View>
              </View>
              <TouchableOpacity onPress={togglePushNotifications}>
                <MaterialCommunityIcons
                  name={pushNotifications ? 'toggle-switch' : 'toggle-switch-off'}
                  size={50}
                  color={pushNotifications ? '#FFC72B' : '#D3D3D3'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.footerCard}>
              <Text style={styles.orderId}>
                Impressions:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>15k</Text>
              </Text>
              <Text style={styles.orderId}>
                Clicks:{' '}
                <Text style={{ fontFamily: 'Montserrat-SemiBold' }}>850</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const PastList = ({ navigation }) => {
  return <ScrollView></ScrollView>;
};

const Active = ({ togglePushNotifications, pushNotifications }) => {
  return (
    <View style={{ flex: 1 }}>
      <TodayList
        togglePushNotifications={togglePushNotifications}
        pushNotifications={pushNotifications}
      />
    </View>
  );
};

const Inactive = ({ togglePushNotifications, pushNotifications }) => {
  return (
    <View style={{ flex: 1 }}>
      <PastList />
    </View>
  );
};

function EnterpriseManageAds({ navigation }) {
  const [pushNotifications, setPushNotifications] = useState(true);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.subText,
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIndicatorStyle: { backgroundColor: colors.secondary },
          tabBarStyle: { backgroundColor: '#fff' },
        }}>
        <Tab.Screen name="Active">
          {() => (
            <Active
              togglePushNotifications={togglePushNotifications}
              pushNotifications={pushNotifications}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Inactive">
          {() => (
            <Inactive
              togglePushNotifications={togglePushNotifications}
              pushNotifications={pushNotifications}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  packageDetailCard: {
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
    marginBottom: 7,
    marginTop: 7,
  },
  packageHeader: {
    flexDirection: 'row',
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingLeft: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  fromLocation: {
    color: colors.subText,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  manageLogo: {
    width: 30,
    height: 30,
  },
});

export default EnterpriseManageAds;
