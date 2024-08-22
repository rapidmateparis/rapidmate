import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SectionList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../../colors';
import {useUserDetails} from '../../commonComponent/StoreContext';
import {getNotificationList} from '../../../data_manager';
import {useLoader} from '../../../utils/loaderContext';
import moment from 'moment';

const Notifications = ({navigation}) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [promoEmails, setPromoEmails] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const {userDetails} = useUserDetails();

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const togglePromoEmails = () => {
    setPromoEmails(!promoEmails);
  };

  function transformData(data) {
    const todayDate = moment().startOf('day');
    const weekStart = moment().startOf('week');
    const weekEnd = moment().endOf('week');

    const transformedData = [
      {title: 'Today', data: []},
      {title: 'This Week', data: []},
    ];

    const pastDates = {};

    data.forEach(item => {
      const createdAt = moment(item.createdAt);
      const formattedDate = createdAt.format('YYYY-MM-DD');

      if (createdAt.isSame(todayDate, 'day')) {
        transformedData[0].data.push({
          item,
        });
      } else if (createdAt.isBetween(weekStart, weekEnd, null, '[]')) {
        transformedData[1].data.push({
          item,
        });
      } else {
        if (!pastDates[formattedDate]) {
          pastDates[formattedDate] = [];
        }
        pastDates[formattedDate].push({
          item,
        });
      }
    });

    for (const [date, items] of Object.entries(pastDates)) {
      transformedData.push({title: date, data: items});
    }

    return transformedData;
  }

  useEffect(() => {
    getNotificationList(
      userDetails.userDetails[0].ext_id,
      successResponse => {
        const transformedData = transformData(successResponse[0]._response);
        setNotificationList(transformedData);
      },
      errorResponse => {
        console.log(errorResponse);
      },
    );
  }, []);

  const renderItem = notificationItem => (
    <View style={styles.historyCard}>
      {console.log('notificationItem', notificationItem.item.item)}
      <Image source={require('../../../image/bell-icon.png')} />
      <View style={styles.deliveryDetails}>
        <Text style={styles.deliveryStatus}>
          {notificationItem.item.item.title}
        </Text>
        <Text style={styles.deliveryDiscription}>
          {notificationItem.item.item.message}
        </Text>
        <View style={styles.timing}>
          <Ionicons name="time" size={16} color="#909090" />
          <Text style={styles.TimeOfDelivery}>
            {moment(notificationItem.item.item.createdAt).format('hh:mm A')}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Feather name="x" size={18} color="#909090" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={{paddingHorizontal: 15}}>
        <View>
          <SectionList
            sections={notificationList}
            renderItem={renderItem}
            renderSectionHeader={({section: {title}}) => (
              <View>
                <Text style={styles.dayText}>{title}</Text>
              </View>
            )}
          />
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
