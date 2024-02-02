<template>
  <div v-if="hasItems" class="filtered">
    <ul class="filtered__list">
      <li v-for="item in items" class="filtered__item" :key="`filtered_item_${item.key}`">
        <v-chip closable @click:close="$emit('remove', item)">{{ item.title }}: {{ item.value }}</v-chip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

export type FilteredItem = {
  key: string;
  title: string;
  value: string;
};

type FilteredProps = {
  items: Array<FilteredItem>;
};

const props = defineProps<FilteredProps>();

type FilteredEvents = {
  (event: "remove", item: FilteredItem): void;
};

defineEmits<FilteredEvents>();

const hasItems = computed<boolean>(() => {
  return props.items.length > 0;
});
</script>

<style lang="scss" scoped>
@import "./Filtered.scss";
</style>
