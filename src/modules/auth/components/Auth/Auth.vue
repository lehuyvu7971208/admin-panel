<template>
  <slot name="default" v-bind="{ accessToken, signIn }" />
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Store
import { useAuthStore } from "../../store/auth";

// Apis
import { SignInRequestData } from "../../api/auth";

export type AuthExpose = {
  signOut(): void;
  signIn(data: SignInRequestData): void;
};

const authStore = useAuthStore();

const accessToken = computed(() => authStore.accessToken);

const signOut = async () => {
  await authStore.signOut();
};

const signIn = async (data: SignInRequestData) => {
  await authStore.signIn(data);
};

defineExpose<AuthExpose>({
  signIn,
  signOut
});
</script>
