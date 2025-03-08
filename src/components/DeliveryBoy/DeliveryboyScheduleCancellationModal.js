import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook
import {colors} from '../../colors';
import { localizationText } from '../../utils/common';

function DeliveryboyScheduleCancellationModal({
  setModalVisible,
  isModalVisible,
}) {
  const [message, setMessage] = useState('');
  const [selectedReason, setSelectedReason] = useState(null);
  const navigation = useNavigation(); // Initialize navigation using useNavigation hook

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleReasonSelect = reason => {
    setSelectedReason(reason);
  };
  const deliveryboyLateReason = localizationText('Common', 'deliveryboyLateReason') || '';
  const deliveryboyNotAvailableReason = localizationText('Common', 'deliveryboyNotAvailableReason') || '';

  const renderReason = reason => {
    const isSelected = selectedReason === reason;
    return (
      <TouchableOpacity
        key={reason}
        style={[styles.reasonItem, isSelected && styles.selectedReason]}
        onPress={() => handleReasonSelect(reason)}>
        {!isSelected && <View style={styles.circle} />}
        {isSelected && (
          <AntDesign name="checkcircle" size={20} color={colors.primary} />
        )}
        <Text style={styles.CancellationReasonText}>{reason}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{localizationText('Common', 'cancellationReason')}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <AntDesign name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.CancellationReasonCard}>
            {[
              deliveryboyLateReason,
              deliveryboyNotAvailableReason,
            ].map(reason => renderReason(reason))}

            <View>
              <Text style={styles.textlable}>{localizationText('Common', 'writeYourMessage')}</Text>
              <TextInput
                style={styles.inputTextStyle}
                multiline={true}
                numberOfLines={4}
                placeholder={localizationText('Common', 'typeHere')}
                textAlignVertical="top"
                value={message}
                onChangeText={text => setMessage(text)}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('')}
            style={styles.buttonCard}>
            <Text style={styles.okButton}>{localizationText('Common', 'submit')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.white,
    height: 350,
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
    marginRight: '22%',
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  buttonCard: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    backgroundColor: colors.primary,
    paddingVertical: 12,
    textAlign: 'center',
  },
  CancellationReasonCard: {
    padding: 20,
  },
  textlable: {
    fontFamily: 'Montserrat-Medium',
    marginBottom: 7,
    marginTop: 15,
    fontSize: 12,
    color: colors.text,
  },
  inputTextStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
});

export default DeliveryboyScheduleCancellationModal;
