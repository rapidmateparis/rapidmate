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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../colors';
import {localizationText} from '../../utils/common';

const AboutUs = ({navigation}) => {
  return (
    <ScrollView style={{width: '100%', backgroundColor: '#FBFAF5'}}>
      <View style={styles.mainCard}>
        <ImageBackground
          style={styles.walletBgImage}
          source={require('../../image/AboutUs-Bg.png')}>
          <View
            style={{paddingTop: 10, paddingRight: '45%', paddingLeft: 15}}>
            <Text style={styles.aboutCompany}>
              {localizationText('Common', 'whoWeAre')}
            </Text>
            <Text style={styles.companyIntro}>
              {localizationText('Main', 'whoWeAreDescription')}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.aboutCompany}>
          {localizationText('Common', 'ourMission')}
        </Text>
        <Text style={styles.companySubTexts}>
          {localizationText('Main', 'ourMissionDescription')}
        </Text>
        <Text style={styles.aboutCompany}>
          {localizationText('Common', 'ourVision')}
        </Text>
        <Text style={styles.companySubTexts}>
          {localizationText('Main', 'ourVisionDescription')}
        </Text>
        <Text style={styles.aboutCompany}>
          {localizationText('Common', 'whyChooseUs')}
        </Text>
        <Text style={styles.companySubTexts}>
          {localizationText('Main', 'whyChooseUsDescription')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  walletBgImage: {
    width: '100%',
    height: 230,
  },
  aboutCompany: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary,
  },
  companyIntro: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  companySubTexts: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginBottom: 15,
  },
  mainCard: {
    marginBottom: 20,
  },
});

export default AboutUs;
