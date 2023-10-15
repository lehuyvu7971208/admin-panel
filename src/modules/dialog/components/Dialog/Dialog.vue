<template>
  <v-dialog v-model="isDialogShown" persistent max-width="500">
    <v-card class="pa-6">
      <v-card-title class="text-h5">{{ title }}</v-card-title>

      <v-card-text>{{ text }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" variant="tonal" class="px-4" @click="handleDisagreeClick">Disagree</v-btn>

        <v-btn color="secondary" variant="tonal" class="px-4" @click="handleAgreeClick">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
  text: string;
  title: string;

  onAgree?: () => void;
  onDisagree?: () => void;
}>();

const emit = defineEmits<{
  (event: "hidden"): void;
}>();

const isDialogShown = ref<boolean>(true);

watch(isDialogShown, (isDialogShown) => {
  if (!isDialogShown) {
    emit("hidden");
  }
});

const handleAgreeClick = (): void => {
  if (props.onAgree) {
    props.onAgree();
  }

  isDialogShown.value = false;
};

const handleDisagreeClick = (): void => {
  if (props.onDisagree) {
    props.onDisagree();
  }

  isDialogShown.value = false;
};
</script>
