import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import enLang from "./Localization/en/translation.json"
import arLang from "./Localization/ar/translation.json"


const resources = {
    en: {
        translation: enLang
    },
    ar: {
        translation: arLang
    }
};



i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(HttpApi)
    .init({
        resources,
        lng:"ar",
        fallbackLng: "ar",
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
            caches: ['cookie']
        },


 
    })
    ;
export default i18n;