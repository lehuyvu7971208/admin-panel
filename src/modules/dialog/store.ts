import uniqid from "uniqid";
import { defineStore } from "pinia";

export type DialogFunc = () => void;

export type DialogProps = {
  text: string;
  title: string;

  onAgree?: DialogFunc;
  onDisagree?: DialogFunc;
};

export type DialogState = {
  items: Array<{ id: string } & DialogProps>;
};

export type DialogGetters = {};

export type DialogActions = {
  addDialog(props: DialogProps): Promise<void>;

  removeDialog(id: string): Promise<void>;
};

export const useDialogStore = defineStore<"dialog", DialogState, DialogGetters, DialogActions>("dialog", {
  state: () => ({
    items: [],
  }),

  getters: {},

  actions: {
    async addDialog(props) {
      this.items.push({
        ...props,
        id: uniqid(),
      });
    },

    async removeDialog(id) {
      const dialogIndex = this.items.findIndex((item) => {
        return item.id === id;
      });

      this.items.splice(dialogIndex, 1);
    },
  },
});
