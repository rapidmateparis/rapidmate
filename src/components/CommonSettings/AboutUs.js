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
            style={{paddingTop: '25%', paddingRight: '45%', paddingLeft: 15}}>
            <Text style={styles.aboutCompany}>
              {localizationText('Common', 'aboutUs')}
            </Text>
            <Text style={styles.companyIntro}>
              {localizationText('Main', 'aboutUsTitleText')}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <Text style={styles.companySubTexts}>
          Lorem ipsum dolor sit amet consectetur. Urna consectetur lectus
          tristique suspendisse arcu id. Consequat dolor cras gravida odio
          facilisis at. Aenean aliquam volutpat ultrices cursus at eget diam id
          id. Enim placerat morbi facilisis ante tellus. Fames venenatis sed
          fringilla odio. Imperdiet id pellentesque neque risus pellentesque
          turpis nunc proin cum. Vitae at auctor facilisis nam
        </Text>

        <Text style={styles.companySubTexts}>
          Proin ut adipiscing tincidunt ultricies orci mattis. Aenean in morbi
          tellus augue elementum. Aliquam faucibus lacus magna eget nunc sit
          neque. Integer tortor arcu tincidunt ac egestas mi natoque lobortis
          vel. Dui vitae risus pulvinar urna viverra. At ac ultrices sed nulla
          pharetra massa dictum.
        </Text>

        <Text style={styles.companySubTexts}>
          Cursus ut pellentesque dignissim fames molestie ullamcorper lectus.
          Gravida in tellus at adipiscing eget pellentesque dictum ac nisl. Id
          sed aliquam egestas viverra. Venenatis leo nisl nec id phasellus lorem
          ac. Maecenas molestie nunc amet sagittis ullamcorper tortor porta
          hendrerit fringilla. Tellus pellentesque faucibus facilisis tincidunt.
          Et at porttitor arcu orci imperdiet diam cras scelerisque. Scelerisque
          velit in varius eget pharetra. Sit quis sed est porta auctor habitasse
          dictum. Urna vitae tincidunt urna et enim fringilla. Et amet sit
          ornare libero. Ut nisi sagittis aliquam purus ut fames mauris.
          Pellentesque feugiat ultricies porttitor adipiscing. Augue viverra
          lorem nulla accumsan faucibus fusce.
        </Text>

        <Text style={styles.companySubTexts}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
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
    fontFamily: 'Montserrat-SemiBold',
    color: colors.text,
  },
  companyIntro: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  companySubTexts: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: colors.text,
    marginBottom: 15,
  },
  mainCard: {
    marginBottom: 20,
  },
});

export default AboutUs;
