<template>
  <v-app class="app">
    <default-view>
      <slot></slot>
    </default-view>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultView from './View.vue';
</script>

<style lang="scss" scoped>
@import "./Default.scss";
</style>
