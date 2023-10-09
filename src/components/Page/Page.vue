<template>
  <div class="pa-3">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps<{
  title?: string;
}>();

onMounted(() => {
  document.title = props.title ?? 'Reserve Solution';
});
</script>