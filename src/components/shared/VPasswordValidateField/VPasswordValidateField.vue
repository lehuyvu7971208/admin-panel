<template>
  <v-password-field v-bind="$attrs" v-model="value" v-on="$attrs" :error-messages="errorMessage" />
</template>

<script lang="ts" setup>
// Utitlies
import { useField } from "vee-validate";

// Components
import VPasswordField from "@/components/shared/VPasswordField/VPasswordField.vue";

export type VPasswordValidateFieldProps = {
  name: string;
};

const props = defineProps<VPasswordValidateFieldProps>();

const { value, errorMessage } = useField(() => props.name);
</script>
