<template>
  <v-text-field v-bind="$attrs" v-model="value" v-on="$attrs" :error-messages="errorMessage" />
</template>

<script lang="ts" setup>
// Utilities
import { useField } from "vee-validate";

export type VTextValidateFieldProps = {
  name: string;
};

const props = defineProps<VTextValidateFieldProps>();

const { value, errorMessage } = useField(() => props.name);
</script>
