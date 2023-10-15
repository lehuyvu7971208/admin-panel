// Utilities
import uniqid from "uniqid";
import { defineStore } from "pinia";

export type SnackbarState = {
  items: Array<any>;
};

export type SnackbarGetters = {};

export type SnackbarActions = {
  addSnackbar(props: any): Promise<void>;
  removeSnackbar(id: number): Promise<void>;
};

export const useSnackbarStore = defineStore<"snackbar", SnackbarState, SnackbarGetters, SnackbarActions>("snackbar", {
  state: () => ({
    items: [],
  }),

  actions: {
    async addSnackbar(props) {
      this.items.push({
        ...props,
        id: uniqid(),
      });
    },
    
    async removeSnackbar(id) {
      const snackbarIndex = this.items.findIndex((item) => {
        return item.id === id;
      });

      this.items.splice(snackbarIndex, 1);
    },
  },
});
