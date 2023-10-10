/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import {
  RED_THEME,
  BLUE_THEME,
  GREEN_THEME,
  ORANGE_THEME,
  PURPLE_THEME,
  INDIGO_THEME,
} from '@/theme/LightTheme';
import {
  DARK_RED_THEME,
  DARK_BLUE_THEME,
  DARK_GREEN_THEME,
  DARK_INDIGO_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
} from '@/theme/DarkTheme';

// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,

  theme: {
    defaultTheme: 'BLUE_THEME',
    themes: {
      BLUE_THEME,
      RED_THEME,
      PURPLE_THEME,
      GREEN_THEME,
      INDIGO_THEME,
      ORANGE_THEME,
      DARK_BLUE_THEME,
      DARK_RED_THEME,
      DARK_ORANGE_THEME,
      DARK_PURPLE_THEME,
      DARK_GREEN_THEME,
      DARK_INDIGO_THEME
    }
  },
  
  defaults: {
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
    },
    VTextarea: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      color: 'primary',
      variant: 'outlined',
      density: 'comfortable',
    },
    VListItem: {
      minHeight: '45px'
    },
    VTooltip: {
      location: 'top'
    }
  }
});
