import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './language/en.json';
import fr from './language/fr.json';

const languageList = {
  en: {translation: en},
  fr: {translation: fr},
};

const initData = () => ({
  compatibilityJSON: 'v3',
  fallbackLng: 'en', 
  lng: 'fr', 
  debug: false,
  resources: languageList,
  interpolation: {
    escapeValue: false, 
  },
});

i18n.use(initReactI18next).init(initData());

export default i18n;
