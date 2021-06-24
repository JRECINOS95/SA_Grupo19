<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="registros"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        empty-text="No existen registros!"
      >
        <!-- Column: Id -->
        <template #cell(id)="data">
          {{ data.item.id }}
        </template>

        <template #cell(libro)="data">
          {{ data.item.libro }}
        </template>

        <!-- Column: Status -->
        <template #cell(operacion)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="getOperacionRoleIcon(data.item.operacion)"
              size="18"
              class="mr-50"
              :class="`text-${getStatus(data.item.operacion)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.operacion }}</span>
          </div>
        </template>

        <template #cell(fecha)="data">
          {{ new Date(data.item.fecha).toLocaleDateString() +" "+new Date(data.item.fecha).toLocaleTimeString()}}
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Mostrando {{ registros.length }} registros</span>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BBadge,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import axios from 'axios';

export default {
  components: {
    BAvatar,
    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BMedia,
    BBadge,
    BDropdown,
    BDropdownItem,
  },
  setup() {
    const isAddNewUserSidebarActive = ref(false);

    return {
      // Sidebar
      isAddNewUserSidebarActive,
    };
  },
  data() {
    return {
      registros: [],
      tableColumns: [
        { key: 'id', sortable: false },
        { key: 'libro', sortable: true },
        { key: 'editorial', sortable: true },
        { key: 'operacion', sortable: true },
        { key: 'fecha', sortable: true },
      ],
    };
  },
  async beforeCreate() {
    try {
      const resp = await axios.get(`http://34.72.218.226:6060/bitacora`);
      this.registros = resp.data;
    } catch (err) {
      this.registros = [];
    }
  },
  methods: {
    getOperacionRoleIcon(role) {
      if (role === 'CREACIÓN') return 'BookOpenIcon';
      if (role === 'ACTUALIZACION') return 'EditIcon';
      if (role === 'ELIMINACION') return 'DeleteIcon';
      return 'BookIcon';
    },
    getStatus(status) {
      if (status === 'CREACIÓN') return 'success';
      if (status === 'ACTUALIZACION') return 'warning';
      if (status === 'ELIMINACION') return 'info';
      return 'primary';
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
