<template>
  <slot />
</template>

<script lang="ts" setup>
// Utilities
import { provide } from "vue";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";

// Stores
import { useHttpStore } from "../../store/http";
import { useAuthStore } from "@/modules/auth/store/auth";

// Constants
import { HTTP_STATUS_CODES } from "../../constant";

const router = useRouter();
const authStore = useAuthStore();
const httpStore = useHttpStore();

httpStore.instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      authStore.signOut();
      router.push({ name: "login" });
    }

    throw error;
  }
);

httpStore.instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    throw new Error(error?.response?.data?.message);
  }
);

provide("http", httpStore.instance);
</script>
