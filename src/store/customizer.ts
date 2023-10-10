import { defineStore } from "pinia";

export type ConfigProps = {
  boxed: boolean;
  inputBg: string;
  actTheme: string;
  sidebarDrawer: any;
  borderCard: boolean;
  miniSidebar: boolean;
  customizerDrawer: boolean;
  horizontalLayout: boolean;
};

const config: ConfigProps = {
  boxed: false,
  borderCard: false,
  miniSidebar: false,
  sidebarDrawer: null,
  inputBg: 'ORANGE_THEME',
  customizerDrawer: false,
  actTheme: 'ORANGE_THEME',
  horizontalLayout: false,
};

export default config;

export const useCustomizerStore = defineStore({
  id: "customizer",

  state: () => ({
    boxed: config.boxed,
    inputBg: config.inputBg,
    actTheme: config.actTheme,
    miniSidebar: config.miniSidebar,
    borderCard: config.borderCard,
    sidebarDrawer: config.sidebarDrawer,
    customizerDrawer: config.customizerDrawer,
    horizontalLayout: config.horizontalLayout, // Horizontal layout
  }),

  getters: {},

  actions: {
    setSidebarDrawer() {
      this.sidebarDrawer = !this.sidebarDrawer;
    },

    setMiniSidebar(payload: any) {
      this.miniSidebar = payload;
    },

    setCustomizerDrawer(payload: any) {
      this.customizerDrawer = payload;
    },

    setLayout(payload: any) {
      this.horizontalLayout = payload;
    },

    setTheme(payload: any) {
      this.actTheme = payload;
    },

    setCardBorder(payload: any) {
      this.borderCard = payload;
    }
  },
});
