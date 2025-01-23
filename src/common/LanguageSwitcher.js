import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import i18n from '../localization/localizationUtils';
import { colors } from '../colors';

const languageOptions = [
  {value: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png'},
  {value: 'fr', label: 'French', flag: 'https://flagcdn.com/w40/fr.png'},
];

const LanguageSwitcher = ({lang = 'en', switcher}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(lang); // Default to 'fr'
  const [items, setItems] = useState(languageOptions);

  const handleChange = value => {
    setValue(value);
    i18n.changeLanguage(value); // Update language in i18next
  };

  useEffect(() => {
    setValue(lang); // Sync with the incoming 'lang' prop
  }, [lang]);

  return (
    <View style={styles.languageDropdown}>
      {/* Display the selected flag */}
      <View style={styles.languageDropdownImage}>
        <Image
          source={{
            uri: languageOptions.find(option => option.value === value)?.flag,
          }}
          style={styles.flagIcon}
        />
        {/* Ensure this View has a high zIndex */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={handleChange}
          style={styles.customSelect}
          dropDownContainerStyle={{zIndex: 1000}} // Ensure dropdown is visible
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 999,
  },
  languageDropdownImage: {
    backgroundColor: colors.white,
    borderWidth: 2,
    width: '100%',
    borderRadius: 7,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
  },
  customSelect: {
    height: 50,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  flagIcon: {
    width: 35,
    height: 25,
    marginRight: 10,
    position: 'absolute',
    left: 70,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemFlag: {
    width: 20,
    height: 15,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default LanguageSwitcher;
