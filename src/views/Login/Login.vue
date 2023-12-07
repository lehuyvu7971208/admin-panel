<template>
  <auth ref="authRef">
    <login-form :is-submitting="isSubmitting" :error-message="errorMessage" @submit="handleFormSubmit" />
  </auth>
</template>

<script setup lang="ts">
// Utilities
import { ref } from "vue";

// Components
import LoginForm from "./components/LoginForm/LoginForm.vue";
import Auth, { AuthExpose } from "@/modules/auth/components/Auth/Auth.vue";
import { useRouter } from "vue-router";

// Assets
// import google from '@/assets/images/svgs/google-icon.svg';
// import facebook from '@/assets/images/svgs/facebook-icon.svg';\
const router = useRouter();
const authRef = ref<AuthExpose>();

const isSubmitting = ref<boolean>(false);
const errorMessage = ref<string | null>("");

const handleFormSubmit = async (username: string, password: string) => {
  try {
    errorMessage.value = null;
    isSubmitting.value = true;

    await authRef.value?.signIn({
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
