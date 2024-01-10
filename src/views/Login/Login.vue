<template>
  <login-form :is-submitting="isSubmitting" :error-message="errorMessage" @submit="handleFormSubmit" />
</template>

<script setup lang="ts">
// Utilities
import { ref } from "vue";
import { useRouter } from "vue-router";

// Components
import LoginForm from "./components/LoginForm/LoginForm.vue";

// Store
import { useAuthStore } from "@/modules/auth/store/auth";

// Assets
// import google from '@/assets/images/svgs/google-icon.svg';
// import facebook from '@/assets/images/svgs/facebook-icon.svg';\
const router = useRouter();
const authStore = useAuthStore();

const isSubmitting = ref<boolean>(false);
const errorMessage = ref<string | null>("");

const handleFormSubmit = async (username: string, password: string) => {
  try {
    errorMessage.value = null;
    isSubmitting.value = true;

    await authStore.signIn({
      username,
      password,
      userAgent: navigator.userAgent,
    });

    router.push({ name: "home" });
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "./Login.scss";
</style>
