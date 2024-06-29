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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TodayList = () => {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);
  return (
    <ScrollView>
      <View style={styles.scrollViewContainer}>
        <View
          style={{
            width: 350,
            height: 500,
            position: 'relative',
            marginVertical: 40,
          }}>
          <View style={styles.container}>
            <Image
              style={styles.loaderMap}
              source={require('../../image/No-Data-Table.png')}
            />
            <Text style={styles.text}>No orders to show</Text>
            <Text style={styles.subText}>
              If there is any active order, it will be shown here..
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 15, paddingTop: 5, backgroundColor: '#FBFAF5',}}>
        <View style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image source={require('../../image/package-medium-icon.png')} />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <Ionicons name="location-outline" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              From <Text style={styles.Location}>North Street, ABC</Text>
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <MaterialIcons name="my-location" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
            </Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>Order ID: 98237469</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </View>

        <View style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image source={require('../../image/package-medium-icon.png')} />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <Ionicons name="location-outline" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              From <Text style={styles.Location}>North Street, ABC</Text>
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <MaterialIcons name="my-location" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
            </Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>Order ID: 98237469</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </View>

        <View style={styles.packageDetailCard}>
          <View style={styles.packageHeader}>
            <Image source={require('../../image/package-medium-icon.png')} />
            <Text style={styles.deliveryTime}>
              Delivered on Apr 19, 2024 at 11:30 AM
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <Ionicons name="location-outline" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              From <Text style={styles.Location}>North Street, ABC</Text>
            </Text>
          </View>

          <View style={styles.packageMiddle}>
            <MaterialIcons name="my-location" size={15} color="#717172" />
            <Text style={styles.fromLocation}>
              To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
            </Text>
          </View>

          <View style={styles.borderShow}></View>

          <View style={styles.footerCard}>
            <Text style={styles.orderId}>Order ID: 98237469</Text>
            <Text style={styles.valueMoney}>€34.00</Text>
          </View>
        </View>
      </View>
    </View> */}
    </ScrollView>
  );
};

const PastList = ({navigation}) => {
  return (
    <ScrollView>
      {/* <View style={styles.scrollViewContainer}>
        <View
          style={{
            width: 350,
            height: 500,
            position: 'relative',
            marginVertical: 40,
          }}>
          <View style={styles.container}>
            <Image
              style={styles.loaderMap}
              source={require('../../image/No-Data-Table.png')}
            />
            <Text style={styles.text}>No orders to show</Text>
            <Text style={styles.subText}>
              If there is any active order, it will be shown here..
            </Text>
          </View>
        </View>
      </View> */}
      <View style={{flex: 1}}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 5,
            backgroundColor: '#FBFAF5',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeliveryDetails')}
            style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.packageManage}
                source={require('../../image/Big-Package.png')}
              />
              <Text style={styles.deliveryTime}>
                Delivered on Apr 19, 2024 at 11:30 AM
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                From <Text style={styles.Location}>North Street, ABC</Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
              </Text>
            </View>

            <View style={styles.borderShow}></View>

            <View style={styles.footerCard}>
              <Text style={styles.orderId}>Order ID: 98237469</Text>
              <Text style={styles.valueMoney}>€34.00</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.packageManage}
                source={require('../../image/Big-Package.png')}
              />
              <Text style={styles.deliveryTime}>
                Delivered on Apr 19, 2024 at 11:30 AM
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                From <Text style={styles.Location}>North Street, ABC</Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
              </Text>
            </View>

            <View style={styles.borderShow}></View>

            <View style={styles.footerCard}>
              <Text style={styles.orderId}>Order ID: 98237469</Text>
              <Text style={styles.valueMoney}>€34.00</Text>
            </View>
          </View>

          <View style={styles.packageDetailCard}>
            <View style={styles.packageHeader}>
              <Image
                style={styles.packageManage}
                source={require('../../image/Big-Package.png')}
              />
              <Text style={styles.deliveryTime}>
                Delivered on Apr 19, 2024 at 11:30 AM
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <Ionicons name="location-outline" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                From <Text style={styles.Location}>North Street, ABC</Text>
              </Text>
            </View>

            <View style={styles.packageMiddle}>
              <MaterialIcons name="my-location" size={15} color="#717172" />
              <Text style={styles.fromLocation}>
                To <Text style={styles.Location}>To 5th Avenue, XYZ</Text>
              </Text>
            </View>

            <View style={styles.borderShow}></View>

            <View style={styles.footerCard}>
              <Text style={styles.orderId}>Order ID: 98237469</Text>
              <Text style={styles.valueMoney}>€34.00</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const Ongoing = () => {
  return (
    <View style={{flex: 1}}>
      <TodayList />
    </View>
  );
};

const Past = () => {
  return (
    <View style={{flex: 1}}>
      <PastList />
    </View>
  );
};

function History({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 5,
          backgroundColor: '#FBFAF5',
        }}>
        {/* Your Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>History</Text>
          <TouchableOpacity>
            <AntDesign name="filter" size={30} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchinput}
            placeholder="Search your deliveries"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* End of Search Bar */}
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.subText,
          tabBarLabelStyle: {fontSize: 14},
          tabBarIndicatorStyle: {backgroundColor: colors.secondary},
          tabBarStyle: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen name="Ongoing" component={Ongoing} />
        <Tab.Screen name="Past">
          {() => <PastList navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
      {/* End of Tab Navigator */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchinput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
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
    alignItems: 'center',
  },
  packageMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
    marginLeft: 15,
  },
  Location: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  borderShow: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 15,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  valueMoney: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageManage: {
    width: 25,
    height: 25,
  },
});

export default History;
