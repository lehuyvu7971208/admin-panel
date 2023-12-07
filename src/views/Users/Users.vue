<template>
  <user-management>
    <template #filters="{ filters, changeFilters }">
      <v-row class="mb-3">
        <v-col>
          <user-filters :filters="filters" @submit="changeFilters" />
        </v-col>
      </v-row>

      <v-row class="mb-3">
        <v-col>
          <user-filtered :filters="filters" @change="changeFilters" />
        </v-col>
      </v-row>
    </template>

    <template #table="{ users }">
      <v-row class="mb-3">
        <v-col>
          <user-table :users="users" />
        </v-col>
      </v-row>
    </template>

    <template #pagination="{ pagination, changePagination }">
      <v-row>
        <v-col>
          <pagination :pagination="pagination" @page-change="changePagination" />
        </v-col>
      </v-row>
    </template>
  </user-management>
</template>

<script lang="ts" setup>
// Components
import UserTable from "./components/UserTable/UserTable.vue";
import UserFilters from "./components/UserFilters/UserFilters.vue";
import UserFiltered from "./components/UserFiltered/UserFiltered.vue";
import Pagination from "@/components/shared/Pagination/Pagination.vue";

// Container
import UserManagement from "./containers/UserManagement/UserManagement.vue";
</script>

<style lang="scss" scoped>
@import "./Users.scss";
</style>
