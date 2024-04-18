<template>
  <v-expansion-panels>
    <v-expansion-panel elevation="10">
      <v-expansion-panel-title color="white" class="text-h6" static>
        <v-icon icon="mdi-filter-variant" class="mr-3" />Filter
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <form class="py-2" @submit.prevent="handleFormSubmit">
          <v-row>
            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Queue Name</v-label>
              <v-select-validate
                name="queueName"
                :items="queueNameOptions"
                hide-detail="auto"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">Process Name</v-label>
              <v-select-validate
                name="processName"
                :items="processNameOptions"
                hide-detail="auto"
              />
            </v-col>

            <v-col sm="4">
              <v-label class="font-weight-medium mb-2">State</v-label>
              <v-select-validate
                name="state"
                :items="EVENT_STATE_OPTIONS"
                hide-detail="auto"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-right">
              <v-btn flat class="bg-lighterror text-error" @click="handleReset">
                Reset
              </v-btn>

              <v-btn flat class="ml-4" type="submit" color="secondary">
                Apply
              </v-btn>
            </v-col>
          </v-row>
        </form>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <slot name="filtered" />
</template>

<script lang="ts" setup>
  // Utilities
  import * as Yup from 'yup';
  import { ref, computed, watch } from 'vue';
  import { useForm } from 'vee-validate';
  import { onSearch } from "@/libs/utils/search";

  // Stores
  import { useHttpStore } from '@/modules/http/store/http';

  // APIs
  import { eventsApi, FindAllEventsParamsData } from '@/modules/events/api/events';

  // Remote Components
  import VSelectValidate from "frontend/VSelectValidate.vue";

  // Constants
  import { EVENT_STATE_OPTIONS } from '@/modules/events/constant/index';

  // Type
  type SelectOption = {
    title: string,
    value: string,
  }

  export type EventFilterProps = {
    filter: FindAllEventsParamsData;
  }

  const props = defineProps<EventFilterProps>();

  const validationSchema = Yup.object({
    state: Yup.string().default(''),
    queueName: Yup.string().default(''),
    processName: Yup.string().default(''),
  });

  export type EventFilterEvents = {
    (event: 'submit', data: FindAllEventsParamsData): void;
  };

  const emits = defineEmits<EventFilterEvents>();

  const { handleSubmit, setValues, handleReset } = useForm<FindAllEventsParamsData>({
    validationSchema,
    initialValues: {
      state: '',
      queueName: '',
      processName: '',
    }
  });

  const queueNames = ref<string[]>([]);
  const processNames = ref<string[]>([]);

  const queueNameOptions = computed<SelectOption[]>(() => {
    const options = queueNames.value.map((queueName) => ({
      title: queueName,
      value: queueName,
    }));

    options.unshift({
      title: 'All',
      value: '',
    });

    return options;
  });

  const processNameOptions = computed<SelectOption[]>(() => {
    const options = processNames.value.map((processName) => ({
      title: processName,
      value: processName,
    }));

    options.unshift({
      title: 'All',
      value: '',
    });

    return options;
  });

  const handleFormSubmit = handleSubmit((values) => {
    emits('submit', values);
  });

  watch(
    () => props.filter,
    (filter) => {
      setValues(filter, false);
    },
    {
      deep: true,
      immediate: true,
    }
  );

  onSearch<null>(async () => {
    const httpStore = useHttpStore();
    const http = httpStore.instance;

    const [responseQueueNames, responseProcessNames] = await Promise.all([
      eventsApi(http).findAllQueueNames(),
      eventsApi(http).findAllProcessNames(),
    ]);

    queueNames.value = responseQueueNames.data?.queueNames;
    processNames.value = responseProcessNames.data?.processNames;
  });
</script>

<style lang="scss" scoped>
  @import './EventFilters.scss';
</style>