// Utilities
import { useSnackbarStore } from "./store";

export const useSnackbar = () => {
  const snackbarStore = useSnackbarStore();

  const addErrorSnackbar = (text: string) => {
    snackbarStore.addSnackbar({
      text,
      color: "error",
    });
  };

  const addSuccessSnackbar = (text: string) => {
    snackbarStore.addSnackbar({
      text,
      color: "success",
    });
  };

  return {
    addErrorSnackbar,
    addSuccessSnackbar,
  };
};
