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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../colors';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dropdown} from 'react-native-element-dropdown';

function DeliveryboyTransactions() {
  const [searchText, setSearchText] = useState('');
  const [dropdownCountryValue, setDropdownCountryValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [activeOption, setActiveOption] = useState('Today');

  const handleOptionClick = option => {
    setActiveOption(option);
  };

  const data = [
    {label: '+91', value: '+91'},
    {label: '+33', value: '+33'},
  ];

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{backgroundColor: '#fff', paddingHorizontal: 15, marginBottom: 10,}}>
        <View style={styles.searchContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchinput}
            placeholder="Search your transactions"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View>
          <Text style={styles.rupeesMain}>$<Text style={styles.rupeesBold}>73</Text>.85</Text>
          <Text style={styles.earningTodays}>Today’s earning</Text>
        </View>

        <View style={styles.dayWiseCard}>
          <TouchableOpacity onPress={() => handleOptionClick('Today')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'Today' && styles.activeDay,
              ]}>
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionClick('This month')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'This month' && styles.activeDay,
              ]}>
              This month
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionClick('This year')}>
            <Text
              style={[
                styles.dayOption,
                activeOption === 'This year' && styles.activeDay,
              ]}>
              This year
            </Text>
          </TouchableOpacity>
          <View style={styles.containerCity}>
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Sort by' : '...'}
              searchPlaceholder="Search.."
              value={dropdownCountryValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDropdownCountryValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.transactioneDetailCard}>
          <Image source={require('../../../image/Wallet-Icon1x.png')} />
          <View style={styles.transactioneMainCard}>
            <View>
              <Text style={styles.transactioneDate}>12-09-24</Text>
              <Text style={styles.transactioneFrom}>
                From{' '}
                <Text style={styles.transactioneAddress}>
                  North Street, ABC
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.moneyEarn}>€34.00</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  transactioneDetailCard: {
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
  dayOption: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    backgroundColor: '#fbe8ea',
    padding: 10,
    borderRadius: 20,
  },
  activeDay: {
    color: colors.white,
    backgroundColor: colors.secondary,
  },
  dayWiseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  containerCity: {
    width: '20%',
  },
  transactioneMainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 10,
  },
  transactioneDate: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  transactioneFrom: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
  },
  transactioneAddress: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  moneyEarn: {
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.secondary,
  },
  rupeesMain: {
    fontSize: 40,
    fontFamily: 'Montserrat-Regular', 
    color: colors.text,
  },
  rupeesBold: {
    fontSize: 40,
    fontFamily: 'Montserrat-Bold', 
    color: colors.text,
  },
  earningTodays: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium', 
    color: colors.text,
  },
});

export default DeliveryboyTransactions;
