import { createI18n } from 'vue-i18n';

import en from '@/libs/utils/locales/en.json';
import fr from '@/libs/utils/locales/fr.json';
import ar from '@/libs/utils/locales/ar.json';
import zh from '@/libs/utils/locales/zh.json';

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