import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './language/en.json';
import hi from './language/hi.json';

const languageList = {
  en: {translation: en},
  hi: {translation: hi},
};

const initData=()=>({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    debug:false,
    resources:languageList,
    interpolation: {
      escapeValue: false,
    },
})

i18n.use(initReactI18next).init(initData())

export default i18n;