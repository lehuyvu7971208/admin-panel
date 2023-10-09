<script setup>
const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <template v-if="level > 0">
    <component
      :is="item"
      size="14"
      class="iconClass"
      stroke-width="1.5"
    ></component>
  </template>
  <template v-else>
    <component
      :is="item"

      size="20"
      class="iconClass"
      stroke-width="1.5"
    ></component>
  </template>
</template>
