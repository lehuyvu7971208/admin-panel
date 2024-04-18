<template>
  <filtered :items="filteredItems" @remove="handleFilterRemove"></filtered>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed } from 'vue';

  // Remote Components
  import Filtered from "frontend/Filtered.vue";

  // APIs
  import { FindAllEventsParamsData } from '@/modules/events/api/events';

  // Constants
  const FILTERED_TITLE_BY_KEY: Omit<Record<keyof FindAllEventsParamsData, string>, 'offset' | 'limit'> = {
    state: 'State',
    queueName: 'Queue Name',
    processName: 'Process Name',
  };

  export type EventFilteredProps = {
    filter: FindAllEventsParamsData;
  };

  const props = defineProps<EventFilteredProps>();

  type EventFilteredEvents = {
    (event: 'change', filter: FindAllEventsParamsData): void;
  }

  const emits = defineEmits<EventFilteredEvents>();

  const filteredItems = computed(() => {
    return Object.entries(props.filter).reduce<Array<any>>((data, filterValue: any) => {
      const key = filterValue.at(0) as keyof FindAllEventsParamsData;

      if (key === 'offset' || key === 'limit') {
        return data;
      }

      if (filterValue.at(1)) {
        data.push({
          key,
          value: filterValue.at(1),
          title: FILTERED_TITLE_BY_KEY?.[key] ?? 'Unknown',
        });
      }

      return data;
    }, []);
  });

  const handleFilterRemove = (filter: any): void => {
    const key = filter.key as keyof FindAllEventsParamsData;
    
    const filters = { ...props.filter };

    if (filters?.[key]) {
      delete filters[key];
    }

    emits('change', filters);
  };
</script>

<style lang="scss" scoped>
  @import './EventFiltered.scss';
</style>