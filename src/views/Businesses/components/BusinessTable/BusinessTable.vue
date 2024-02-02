<template>
  <v-table class="mb-3" density="comfortable">
    <thead>
      <tr>
        <th class="text-subtitle-1 font-weight-semibold">Id</th>
        <th class="text-subtitle-1 font-weight-semibold">Name</th>
        <th class="text-subtitle-1 font-weight-semibold">User</th>
        <th class="text-subtitle-1 font-weight-semibold">State</th>
        <th class="text-subtitle-1 font-weight-semibold">Created Date</th>
        <th class="text-subtitle-1 font-weight-semibold text-right">Actions</th>
      </tr>
    </thead>

    <tbody>
      <template v-if="hasBusinesses">
        <tr v-for="business in businesses" :key="`row_${business.id}`">
          <td class="text-subtitle-1">#{{ business.id }}</td>

          <td>
            <div class="py-4">
              <h4 class="text-h6">{{ business.type.toUpperCase() }} - {{ business.name }}</h4>

              <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ business.owner }}</span>
            </div>
          </td>

          <td>
            <div class="py-4">
              <h4 class="text-h6">
                {{ business?.user?.firstName }} {{ business?.user?.lastName }}
                <small>({{ business?.user?.username }})</small>
              </h4>

              <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                <phone-icon size="16" class="mr-2" />
                (+{{ business?.user?.phoneRegion }}) {{ business?.user?.phoneNumber }}
              </span>

              <span class="text-subtitle-1 d-block mt-1 textSecondary d-flex">
                <mail-icon size="16" class="mr-2" />
                {{ business?.user?.email }}
              </span>
            </div>
          </td>

          <td>
            <v-chip variant="tonal" :color="getStateColor(business.state)">{{ getStateText(business.state) }}</v-chip>
          </td>

          <td class="text-subtitle-1">
            {{ formatCreatedDate(business.createdDate) }}
          </td>

          <td class="text-right">
            <div class="d-flex align-center justify-end">
              <v-tooltip text="Edit">
                <template v-slot:activator="{ props }">
                  <v-btn icon flat v-bind="props" @click="$emit('edit', business.id)">
                    <PencilIcon size="20" stroke-width="1.5" class="text-primary" />
                  </v-btn>
                </template>
              </v-tooltip>

              <v-tooltip text="Delete">
                <template v-slot:activator="{ props }">
                  <v-btn icon flat v-bind="props" @click="$emit('delete', business.id)">
                    <TrashIcon size="20" stroke-width="1.5" class="text-error" />
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="6" class="text-center text-subtitle-1">No data</td>
        </tr>
      </template>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
// Utilities
import moment from "moment";
import { computed } from "vue";

// Components
import { MailIcon, PhoneIcon } from "vue-tabler-icons";

// Models
import Business, { BusinessState } from "@/models/business";

// Constant
import { BUSINESS_STATE } from "@/modules/businesses/constant";

export type BusinessTableProps = {
  businesses: Array<Business>;
};

const props = defineProps<BusinessTableProps>();

export type BusinessTableEvents = {
  (event: "edit", id: number): void;
  (event: "delete", id: number): void;
};

defineEmits<BusinessTableEvents>();

const hasBusinesses = computed(() => {
  return props.businesses.length > 0;
});

const formatCreatedDate = (createdDate: Date | null) => {
  return moment(createdDate).format("DD/MM/YYYY HH:mm");
};

const getStateText = (state: BusinessState) => {
  if (state === BUSINESS_STATE.ACTIVE) {
    return "Active";
  }
  return "Un-active";
};

const getStateColor = (state: BusinessState) => {
  if (state === BUSINESS_STATE.ACTIVE) {
    return "success";
  }

  return "error";
};
</script>
