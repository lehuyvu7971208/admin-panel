import { createI18n } from 'vue-i18n';

import en from '@/utils/locales/en.json';
import fr from '@/utils/locales/fr.json';
import ar from '@/utils/locales/ar.json';
import zh from '@/utils/locales/zh.json';

export default createI18n({
  locale: 'en',
  messages: {
    en,
    fr,
    ar,
    zh,
  },
  silentFallbackWarn: true,
  silentTranslationWarn: true,
});