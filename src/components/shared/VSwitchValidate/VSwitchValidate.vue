<template>
  <v-switch v-bind="$attrs" v-on="$attrs" v-model="value" :error-messages="errorMessage" />
</template>

<script lang="ts" setup>
// Utilities
import { useField } from "vee-validate";

type VSwitchValidateProps = {
  name: string;
};

const props = defineProps<VSwitchValidateProps>();

const { value, errorMessage } = useField(() => props.name);
</script>
