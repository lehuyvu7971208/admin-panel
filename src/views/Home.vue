<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Simple Title"> test </UiParentCard>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
// Utilities
import { ref} from 'vue';

// Components
import UiParentCard from 'frontend/UiParentCard.vue';
import BaseBreadcrumb from 'frontend/BaseBreadcrumb.vue';

const page = ref({ title: 'Sample Page' });

const breadcrumbs = ref([
  {
    text: 'Dashboard',
    disabled: false,
    href: '#'
  },
  {
    text: 'Sample Page',
    disabled: true,
    href: '#'
  }
]);
</script>
