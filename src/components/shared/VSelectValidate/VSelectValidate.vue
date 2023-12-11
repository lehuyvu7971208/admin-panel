<template>
  <v-select v-bind="$attrs" v-model="value" v-on="$attrs" :error-messages="errorMessage" />
</template>

<script lang="ts" setup>
// Utilities
import { useField } from "vee-validate";

export type VSelectValidateProps = {
  name: string;
};

const props = defineProps<VSelectValidateProps>();

const { value, errorMessage } = useField(() => props.name);
</script>
