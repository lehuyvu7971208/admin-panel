<template>
  <v-text-field
    v-bind="$attrs"
    :type="passwordInputType"
    :append-inner-icon="appendPasswordIcon"

    v-on="$attrs"
    @click:append-inner="toggleShowPassword"
  />
</template>

<script lang="ts" setup>
// Utilities
import { ref, computed } from "vue";

const isPasswordShown = ref<Boolean>(false);

const passwordInputType = computed(() => {
  if (isPasswordShown.value) return "text";

  return "password";
});

const appendPasswordIcon = computed<string>(() => {
  return isPasswordShown.value ? "mdi-eye-off" : "mdi-eye";
});

const toggleShowPassword = () => {
  isPasswordShown.value = !isPasswordShown.value;
};
</script>
