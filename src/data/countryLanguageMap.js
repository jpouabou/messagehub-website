import { LANGUAGES } from './languages';

const languageIdByEnglishName = new Map(
  LANGUAGES.map((language) => [language.englishName, language.id])
);

function byEnglishName(name) {
  return languageIdByEnglishName.get(name);
}

export const COUNTRIES = [
  { code: 'US', name: 'United States', region: 'Americas' },
  { code: 'CA', name: 'Canada', region: 'Americas' },
  { code: 'MX', name: 'Mexico', region: 'Americas' },
  { code: 'BR', name: 'Brazil', region: 'Americas' },
  { code: 'GB', name: 'United Kingdom', region: 'Europe' },
  { code: 'DE', name: 'Germany', region: 'Europe' },
  { code: 'FR', name: 'France', region: 'Europe' },
  { code: 'ES', name: 'Spain', region: 'Europe' },
  { code: 'IT', name: 'Italy', region: 'Europe' },
  { code: 'NG', name: 'Nigeria', region: 'Africa' },
  { code: 'ZA', name: 'South Africa', region: 'Africa' },
  { code: 'KE', name: 'Kenya', region: 'Africa' },
  { code: 'IN', name: 'India', region: 'Asia' },
  { code: 'CN', name: 'China', region: 'Asia' },
  { code: 'JP', name: 'Japan', region: 'Asia' },
  { code: 'PH', name: 'Philippines', region: 'Asia' },
  { code: 'ID', name: 'Indonesia', region: 'Asia' },
  { code: 'AU', name: 'Australia', region: 'Oceania' },
  { code: 'FJ', name: 'Fiji', region: 'Oceania' },
];

export const COUNTRY_LANGUAGES = {
  US: [
    byEnglishName('English'),
    byEnglishName('Spanish'),
    byEnglishName('French'),
    byEnglishName('Portuguese'),
  ].filter(Boolean),
  CA: [
    byEnglishName('English'),
    byEnglishName('French'),
  ].filter(Boolean),
  MX: [
    byEnglishName('Spanish'),
    byEnglishName('English'),
  ].filter(Boolean),
  BR: [
    byEnglishName('Portuguese (Brazil)'),
  ].filter(Boolean),
  GB: [
    byEnglishName('English'),
  ].filter(Boolean),
  DE: [
    byEnglishName('German'),
    byEnglishName('English'),
  ].filter(Boolean),
  FR: [
    byEnglishName('French'),
    byEnglishName('French (Africa)'),
  ].filter(Boolean),
  ES: [
    byEnglishName('Spanish'),
    byEnglishName('Catalan'),
  ].filter(Boolean).filter(Boolean),
  IT: [
    byEnglishName('Italian'),
  ].filter(Boolean),
  NG: [
    byEnglishName('English'),
    byEnglishName('Igbo'),
    byEnglishName('Yoruba'),
    byEnglishName('Hausa'),
  ].filter(Boolean),
  ZA: [
    byEnglishName('English'),
    byEnglishName('Afrikaans'),
    byEnglishName('Zulu'),
    byEnglishName('Xhosa'),
    byEnglishName('Northern Sotho'),
    byEnglishName('Southern Sotho'),
    byEnglishName('Tswana'),
  ].filter(Boolean),
  KE: [
    byEnglishName('English'),
    byEnglishName('Swahili'),
  ].filter(Boolean),
  IN: [
    byEnglishName('Hindi'),
    byEnglishName('English'),
    byEnglishName('Tamil'),
    byEnglishName('Telugu'),
    byEnglishName('Kannada'),
    byEnglishName('Malayalam'),
    byEnglishName('Punjabi'),
    byEnglishName('Marathi'),
    byEnglishName('Nepali'),
  ].filter(Boolean),
  CN: [
    byEnglishName('Chinese (Simplified)'),
    byEnglishName('Chinese (Traditional)'),
  ].filter(Boolean),
  JP: [
    byEnglishName('Japanese'),
  ].filter(Boolean),
  PH: [
    byEnglishName('Tagalog'),
    byEnglishName('Cebuano'),
    byEnglishName('English'),
  ].filter(Boolean),
  ID: [
    byEnglishName('Indonesian'),
  ].filter(Boolean),
  AU: [
    byEnglishName('English'),
  ].filter(Boolean),
  FJ: [
    byEnglishName('Fijian'),
    byEnglishName('English'),
  ].filter(Boolean),
};

export function getLanguagesForCountry(countryCode) {
  const codes = COUNTRY_LANGUAGES[countryCode] || [];
  return codes
    .map((id) => LANGUAGES.find((language) => language.id === id))
    .filter(Boolean);
}

export function getCountriesForLanguage(languageId) {
  const codes = Object.entries(COUNTRY_LANGUAGES)
    .filter(([, languageIds]) => languageIds.includes(languageId))
    .map(([code]) => code);

  return COUNTRIES.filter((country) => codes.includes(country.code));
}

