<script setup lang="ts">
// Utitilies
import { RouterLink } from "vue-router";

// Assets
import logo from "@/assets/images/logos/logo-dark.svg";
</script>

<template>
  <div class="logo">
    <RouterLink to="/">
      <img :src="logo" alt="home" />
    </RouterLink>
  </div>
</template>
