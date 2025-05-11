import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {deleteAccount} from '../../data_manager';
import {useUserDetails} from './StoreContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {encrypt} from './PasswordEncrypt';

const DeleteYourAccount = () => {
  const {userDetails} = useUserDetails();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = () => {
    if (!password) {
      Alert.alert(
        'Error',
        'Please enter your password to delete your account.',
      );
      return;
    }

    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              // Encrypt password
              const {encryptedData} = encrypt(password);

              const postParams = {
                info: {
                  userName: userDetails?.userDetails[0]?.username,
                  extId: userDetails?.userDetails[0]?.ext_id,
                  password: encryptedData,
                },
              };

              console.log('Calling deleteAccount with params:', postParams);

              deleteAccount(
                postParams,
                async successResponse => {
                  console.log(
                    'Delete account success response:',
                    successResponse,
                  );
                  if (successResponse[0]?._success) {
                    Alert.alert('Success', 'Account has been deleted');

                    // Logout after 3 seconds
                    setTimeout(async () => {
                      try {
                        await AsyncStorage.clear();
                        RNRestart.restart();
                      } catch (error) {
                        console.error('Error during logout: ', error);
                      }
                    }, 2000);
                  }
                },
                errorResponse => {
                  console.log('Delete account error response:', errorResponse);
                  Alert.alert('Error', 'Something went wrong.');
                },
              );
            } catch (error) {
              console.log('Delete account exception:', error);
              Alert.alert('Error', 'Something went wrong.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.mainDeleteAccountCard}>
        <Text style={styles.mainTitleTextHead}>
          Account Deletion and Data Removal
        </Text>
        <Text style={styles.deleteDescriptionts}>
          At Rapidmate, we respect your privacy and give you full control over
          your data. If you no longer wish to use our services, you may delete
          your account directly from the app under the "Delete Account" section.
        </Text>
        <Text style={styles.mainTitleTextHead}>
          Upon requesting account deletion:
        </Text>
        <Text style={styles.deleteDescriptionts}>
          All personally identifiable data associated with your account (such as
          your name, contact details, and delivery history) will be permanently
          deleted from our systems.
        </Text>
        <Text style={styles.mainTitleTextHead}>
          Enter your password to confirm:
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            placeholderTextColor={colors.text}
            maxLength={10}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.deleteDownDescriptionts}>
          Your login credentials and preferences will also be erased.
        </Text>
        <Text style={styles.deleteDownDescriptionts}>
          In compliance with legal, tax, and regulatory obligations, certain
          non-personal data such as transaction history or invoices may be
          retained securely for a limited period (e.g., up to 1 year) and will
          not be used for any other purpose.
        </Text>
        <Text style={styles.deleteDownDescriptionts}>
          Once the deletion is complete, this action is irreversible.We are
          committed to protecting your data and ensuring transparency in
          how it is managed.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainTitleTextHead: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
    color: colors.text,
  },
  mainDeleteAccountCard: {
    paddingHorizontal: 15,
  },
  deleteDescriptionts: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
  },
  deleteDownDescriptionts: {
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: colors.text,
    paddingVertical: 5,
  },
  deleteButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default DeleteYourAccount;
