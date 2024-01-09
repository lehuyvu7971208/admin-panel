<script setup lang="ts">
// Utilities
import { RouterView } from "vue-router";

// Components
import Customizer from "./Customizer/Customizer.vue";
import VerticalHeaderVue from "./VerticalHeader/VerticalHeader.vue";
import VerticalSidebarVue from "./VerticalSidebar/VerticalSidebar.vue";
import HorizontalHeader from "./HorizontalHeader/HorizontalHeader.vue";
import HorizontalSidebar from "./HorizontalSidebar/HorizontalSidebar.vue";

// Stores
import { useCustomizerStore } from "@/store/customizer";

const customizer = useCustomizerStore();
</script>

<template>
  <v-locale-provider>
    <Customizer />

    <VerticalSidebarVue v-if="!customizer.horizontalLayout" />

    <VerticalHeaderVue v-if="!customizer.horizontalLayout" />

    <HorizontalHeader v-if="customizer.horizontalLayout" />

    <HorizontalSidebar v-if="customizer.horizontalLayout" />

    <v-main>
      <v-container fluid class="page-wrapper pb-sm-15 pb-10">
        <div :class="customizer.boxed ? 'maxWidth' : ''">
          <RouterView />
          
          <v-btn
            icon
            size="large"
            variant="flat"
            color="primary"
            class="customizer-btn"
            @click.stop="customizer.setCustomizerDrawer(!customizer.customizerDrawer)"
          >
            <SettingsIcon />
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-locale-provider>
</template>
