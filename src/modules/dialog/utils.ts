// Stores
import { DialogProps, useDialogStore } from "./store";

export const useDialog = () => {
  const dialogStore = useDialogStore();

  const addDialogConfirm = (props: DialogProps) => {
    dialogStore.addDialog({
      ...props,
    });
  };

  return {
    addDialogConfirm
  };
};
