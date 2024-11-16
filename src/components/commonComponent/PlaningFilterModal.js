import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../colors';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {getCompanyList} from '../../data_manager';
import {useUserDetails} from './StoreContext';

function PlaningFilterModal({
  setModalVisible,
  isModalVisible,
  onPressPlanningFilter,
}) {
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOpen, setFromDateOpen] = useState(false);
  const [fromPickupDate, setFromPickupDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [toDate, setToDate] = useState(new Date());
  const [toDateOpen, setToDateOpen] = useState(false);
  const [toPickupDate, setToPickupDate] = useState(moment(new Date()).format('DD/MM/YYYY'));
  const [formdate, setFormdate] = useState('');
  const [day, setDay] = useState(0);
  const [companyList, setCompanyList] = useState([]);
  const {userDetails} = useUserDetails();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getCompanyConnectionList();
  }, []);

  const renderCompanyItem = ({item}) => (
    <View style={styles.companyInfo}>
      <Image
        style={styles.companyLogosImage}
        source={require('../../image/Subway-logo.png')}
      />
      <Text style={styles.companyNames}>{item.company_name}</Text>
    </View>
  );

  const getCompanyConnectionList = () => {
    getCompanyList(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        if (successResponse[0]._success) {
          setCompanyList(successResponse[0]._response);
        }
      },
      errorResponse => {
        console.log(
          'getCompanyConnectionList==>errorResponse',
          '' + JSON.stringify(errorResponse[0]),
        );
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Apply filters</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalCard}>
            <Text style={styles.textlable}>From date</Text>
            <View style={styles.textInputDiv}>
              <DatePicker
                modal
                open={fromDateOpen}
                date={fromDate}
                mode="date"
                onConfirm={date => {
                  setFromDateOpen(false);
                  setFromDate(date);
                  setFromPickupDate(moment(date).format('DD/MM/YYYY'));
                }}
                onCancel={() => {
                  setFromDateOpen(false);
                }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                editable={false}
                value={fromPickupDate}
              />
              <TouchableOpacity onPress={() => setFromDateOpen(true)}>
                <Feather
                  name="calendar"
                  size={20}
                  color="#FFC72B"
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textlable}>To date</Text>
            <View style={styles.textInputDiv}>
              <DatePicker
                modal
                open={toDateOpen}
                date={toDate}
                mode="date"
                onConfirm={date => {
                  setToDateOpen(false);
                  setToDate(date);
                  setToPickupDate(moment(date).format('DD/MM/YYYY'));
                }}
                onCancel={() => {
                  setToDateOpen(false);
                }}
              />
              <TextInput
                style={[styles.loginput, {fontFamily: 'Montserrat-Regular'}]}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999"
                editable={false}
                value={toPickupDate}
              />
              <TouchableOpacity onPress={() => setToDateOpen(true)}>
                <Feather
                  name="calendar"
                  size={20}
                  color="#FFC72B"
                  style={{marginTop: 15}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.borderShowOff}></View>

            <View>
              <Text style={styles.dayFilterText}>
                Filter by a day of the week
              </Text>
              <View style={styles.dayCard}>
                <TouchableOpacity
                  onPress={() => {
                    setDay(2);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 2 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Su
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDay(3);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 3 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Mo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDay(4);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 4 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Tu
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDay(5);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 5 ? colors.secondary : colors.white,
                      },
                    ]}>
                    We
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDay(6);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 6 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Th
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dayCard}>
                <TouchableOpacity
                  onPress={() => {
                    setDay(7);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 7 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Fr
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setDay(1);
                  }}>
                  <Text
                    style={[
                      styles.dayByFilter,
                      {
                        backgroundColor:
                          day == 1 ? colors.secondary : colors.white,
                      },
                    ]}>
                    Sa
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.borderShowOff}></View>

            <View style={styles.recentlyInfo}>
              <Text style={styles.deliveryRecently}>My companies</Text>
            </View>

            <View style={styles.companyLogoCard}>
              {companyList.length === 0 ? (
                <Text style={styles.userName}>No Company Details</Text>
              ) : (
                <FlatList
                  data={companyList}
                  horizontal
                  renderItem={renderCompanyItem}
                  keyExtractor={item => item.id.toString()} // Add keyExtractor if needed
                />
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonCard}
            onPress={() => {
              toggleModal(false);
              onPressPlanningFilter({
                planning_from_date: fromDate,
                planning_to_date: toDate,
                day: day,
              });
            }}>
            <Text style={styles.okButton}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fffaea',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerTitle: {
    marginRight: '30%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  CancellationReasonText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginLeft: 10,
    marginVertical: 5,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedReason: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.text,
  },
  okButton: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    width: 180,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
  },
  CancellationReasonCard: {
    padding: 20,
  },
  textInputDiv: {
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C303336',
  },
  loginput: {
    fontSize: 14,
    color: colors.text,
    paddingHorizontal: 10,
    width: '90%',
  },
  modalCard: {
    padding: 15,
  },
  textlable: {
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 7,
    marginTop: 5,
    fontSize: 12,
    color: colors.text,
  },
  dayByFilter: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    paddingLeft: 13,
    paddingTop: 12,
    marginRight: 15,
  },
  dayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dayFilterText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 10,
  },
  borderShowOff: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: '100%',
    marginVertical: 15,
  },
  recentlyInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyLogoCard: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  deliveryRecently: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 5,
  },
  companyInfo: {
    width: 80,
  },
  companyLogosImage: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  companyNames: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingVertical: 5,
  },
});

export default PlaningFilterModal;
