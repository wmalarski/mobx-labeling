import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const ns = ["common", "home", "definition", "project"];
const supportedLngs = ["en"];

const load = (lang: string, n: string) => {
  return require(`../../../assets/locales/${lang}/${n}.json`);
};

const languages = supportedLngs.map((lang) => {
  const scopes = ns.map((n) => [n, load(lang, n)]);
  return [lang, Object.fromEntries(scopes)];
});

i18n.use(initReactI18next).init({
  resources: Object.fromEntries(languages),
  lng: "en",
  fallbackLng: "en",
  supportedLngs,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
