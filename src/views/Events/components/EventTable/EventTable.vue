<template>
  <v-table class="event-table mb-3" density="comfortable">
    <thead>
      <tr>
        <th class="text-subtitle-1 font-weight-semibold">ID</th>
        <th class="text-subtitle-1 font-weight-semibold">Queue Name</th>
        <th class="text-subtitle-1 font-weight-semibold">Process Name</th>
        <th class="text-subtitle-1 font-weight-semibold">Data</th>
        <th class="text-subtitle-1 font-weight-semibold">Exception</th>
        <th class="text-subtitle-1 font-weight-semibold">State</th>
      </tr>
    </thead>

    <tbody>
      <template v-if="hasEvents">
        <tr
          v-for="event in events"
          :key="`row_${event.id}`"
        >
          <td class="text-subtitle-1 text-center">#{{ event.id }}</td>

          <td class="text-subtitle-1">{{ event.queueName }}</td>

          <td class="text-subtitle-1">{{ event.processName }}</td>

          <td class="text-subtitle-1 text-ellipsis">
            {{ event.data }}
            <v-tooltip
              activator="parent"
              location="top"
            >
              {{ event.data }}
            </v-tooltip>
          </td>

          <td class="text-subtitle-1 text-ellipsis">
            {{ event.exception }}
            <v-tooltip
              activator="parent"
              location="top"
            >
              {{ event.exception }}
            </v-tooltip>
          </td>

          <td>
            <v-chip
              variant="tonal"
              :color="getStateColor(event.state)"
            >
              {{ getStateText(event.state) }}
            </v-chip>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr>
          <td colspan="6" class="text-center text-subtitle-1">
            No data
          </td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed } from 'vue';

  // Models
  import Event, { EventState } from '@/models/event';

  export type EventTableProps = {
    events: Array<Event>;
  }

  const props = defineProps<EventTableProps>();

  const hasEvents = computed(() => props.events.length);

  const getStateColor = (state: EventState) => {
    switch (state) {
      case EventState.Waiting:
        return 'info';

      case EventState.Active:
        return 'warning';

      case EventState.Progress:
        return 'primary';
      
      case EventState.Completed:
        return 'success';

      case EventState.Failed:
        return 'error';

      case EventState.Resumed:
        return 'error';

      case EventState.Cleaned:
        return 'error';

      case EventState.Removed:
        return 'textPrimary';

      default:
        return 'secondary';
    }
  };

  const getStateText = (state: EventState) => {
    switch (state) {
      case EventState.Waiting:
        return 'Waiting';

      case EventState.Active:
        return 'Active';

      case EventState.Progress:
        return 'Progress';

      case EventState.Completed:
        return 'Completed';
      
      case EventState.Failed:
        return 'Failed';
      
      case EventState.Resumed:
        return 'Resumed';

      case EventState.Cleaned:
        return 'Cleaned';

      case EventState.Removed:
        return 'Removed';

      default:
        return 'None';
    }
  };
</script>

<style lang="scss" scoped>
  @import './EventTable.scss';
</style>