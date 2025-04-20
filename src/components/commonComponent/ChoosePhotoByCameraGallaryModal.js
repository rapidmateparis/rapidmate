import {
  StyleSheet,
  Text,
  FlatList,
  Modal,
  Pressable,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../colors';
import {localizationText} from '../../utils/common';

const ChoosePhotoByCameraGallaryModal = ({
  visible,
  handlePhotoOpenClose,
  handleCameraLaunch,
  handleImageLibraryLaunch,
}) => {
  const toggleModal = () => {
    handlePhotoOpenClose(visible);
  };

  return (
    <View style={{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={isModalVisibleCamera}
        visible={visible}
        onRequestClose={toggleModal}>
        <View
          style={{
            height: '30%',
            marginTop: 'auto',
            backgroundColor: '#ffff',
            borderWidth: 1,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderColor: '#ccc',
          }}>
          <View style={styles.headerView}>
            <View>
              <Text style={styles.headerText}>
                {localizationText('Common', 'choosePhotoSource')}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleModal}>
              <View style={styles.closeIcon}>
                <MaterialCommunityIcons name="close" color="#000" size={22} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bodyView}>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleImageLibraryLaunch}>
                <View style={styles.bodyIcon}>
                  <Image
                    style={styles.bodyIconCss}
                    source={require('../../image/gallery.png')}
                  />
                </View>
                <Text style={[styles.iconText, {paddingLeft: 10}]}>
                  {localizationText('Common', 'photoGallery')}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleCameraLaunch}>
                <View style={styles.aligntexticonher}>
                  <View style={styles.bodyIcon}>
                    <Image
                      style={styles.bodyIconCss}
                      source={require('../../image/camera.png')}
                    />
                  </View>
                  <Text style={styles.iconText}>
                    {localizationText('Common', 'phoneCamera')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ------------ camera modal css ----------------
  headerText: {
    color: colors.text,
    fontSize: 15,
    padding: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginRight: 50,
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    // backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 3,
    marginTop: 15,
    marginRight: 10,
  },
  bodyView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  bodyIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 7,
    marginRight: 25,
    marginBottom: 60,
  },
  iconText: {
    padding: 3,
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Montserrat-Regular',
  },
  aligntexticonher: {
    textAlign: 'center',
  },
});

export default ChoosePhotoByCameraGallaryModal;
