// Import the i18n library and the Config type from the sveltekit-i18n package
import i18n, { type Config } from 'sveltekit-i18n';
// Import the LOCALE type from the application's types module
import { LOCALE } from '$lib/types';

// Define an interface for the parameters used in translations
interface Params {
  dateValue: number;
  value: number;
  download: number;
  award: number;
  val: Date;
}

// Define the configuration for the i18n library
const config: Config<Partial<Params>> = {
  // Set the initial locale to English
  initLocale: 'en',
  // Define loaders for each supported locale
  loaders: [
    {
      locale: 'en',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/en.json')).default,
    },
    {
      locale: 'hi',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/hi.json')).default,
    },
    {
      locale: 'fr',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/fr.json')).default,
    },
    {
      locale: 'de',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/de.json')).default,
    },
    {
      locale: 'es',
      key: '',
      loader: async () =>
        (await import('$lib/translations/strings/es.json')).default,
    },
  ],
};

// Initialize the i18n instance with the configuration
export const {
  t, // Translation function
  loading, // Observable indicating if translations are loading
  locales, // List of supported locales
  locale, // Current locale
  initialized, // Observable indicating if i18n is initialized
  translations, // Loaded translations
  loadTranslations, // Function to load translations
} = new i18n(config);

// Subscribe to the loading observable to log when translations are loading
loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log('Loading translations...');
    await loading.toPromise();
  }
});

// Function to provide a fallback note if a translation is not available
export function lessonFallbackNote(
  note: string,
  translation: Record<LOCALE, string>,
  locale: LOCALE
) {
  if (!translation) return note;

  const content = translation[locale];

  // If locale is English and no translated content for English but note exists, return the note
  if (locale === LOCALE.EN && !content && note?.length) return note;
  
  return content;
}

// Function to handle changes to the locale
export async function handleLocaleChange(newLocale: string) {
  if (!newLocale) return;

  locale.set(newLocale);

  await fetch('/api/i18n', {
    body: JSON.stringify({ locale: newLocale }),
    method: 'POST',
  });
}
