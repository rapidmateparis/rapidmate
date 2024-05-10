import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import CommonCard from '../common/CommonCard';
const data = [
  {
    title: 'Starred',
    icon: require('../image/star.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Snoozed',
    icon: require('../image/snooze.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Important',
    icon: require('../image/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Sent',
    icon: require('../image/send.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Scheduled',
    icon: require('../image/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Outbox',
    icon: require('../image/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Drafts',
    icon: require('../image/checkbox.png'),
    isNew: false,
    count: 2,
  },
  {
    title: 'Archieved',
    icon: require('../image/checkbox.png'),
    isNew: false,
    count: 2,
  },
];
const CustomDrawer = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        {/* <Text
          style={{
            color: 'purple',
            fontSize: 25,
            fontWeight: '600',
            marginLeft: 15,
            marginTop: 10,
          }}>
          App Name
        </Text> */}
        {/* <View
          style={{
            width: '100%',
            marginTop: 20,
            height: 70,
            borderTopWidth: 0.2,
            borderBottomWidth: 0.2,
            borderBottomColor: '#C7C7C7',
            borderTopColor: '#C7C7C7',
          }}>
          <CommonCard
            icon={require('../checkbox.png')}
            count={''}
            title={'All Inboxes'}
            onClick={() => {
              navigation.closeDrawer();
            }}
          />
        </View> */}
        <CommonCard
          icon={require('../image/user.png')}
          bgColor={'#FFE4E4'}
          title={'User'}
          onClick={() => {
            navigation.navigate('LogInScreen');
          }}
        />
        <CommonCard
          icon={require('../image/calendar.png')}
          newColor={'green'}
          isNew={true}
          title={'Calender'}
          onClick={() => {
            navigation.closeDrawer();
          }}
        />
        <CommonCard
          icon={require('../image/bubble-chat.png')}
          newColor={'blue'}
          isNew={true}
          title={'Chat Support'}
          onClick={() => {
            navigation.closeDrawer();
          }}
        />
        <CommonCard
          icon={require('../image/settings.png')}
          newColor={'blue'}
          isNew={true}
          title={'Settings'}
          onClick={() => {
            navigation.closeDrawer();
          }}
        />
        {/* <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            fontSize: 17,
            fontWeight: '700',
            color: '#8e8e8e',
          }}>
          ALL LABELS
        </Text> */}
        {/* <FlatList
          data={data}
          renderItem={({item, index}) => {
            return (
              <CommonCard
                title={item.title}
                icon={item.icon}
                count={item.count + '+'}
                onClick={() => {
                  navigation.closeDrawer();
                  alert('title :' + item.title);
                }}
              />
            );
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
