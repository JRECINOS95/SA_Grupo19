<template>
  <div>
    <libro-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :generos="generos"
    />
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            &nbsp;
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-button
                variant="primary"
                @click="isAddNewUserSidebarActive = true;"
              >
                <span class="text-nowrap">Agregar Libro</span>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="usuarios"
        responsive
        :fields="tableColumns"
        primary-key="id"
        show-empty
        empty-text="No existen registros!"
      >
        <!-- Column: Primer Nombre -->
        <template #cell(url)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="200"
                :src="data.item.url"
              />
            </template>
          </b-media>
        </template>

        <template #cell(nombre)="data">
          {{ data.item.nombre }}
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${getStatus(data.item.status)}`"
            :class="`text-${getStatus(data.item.status)}`"
          >
            {{ data.item.status }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(acciones)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>

            <b-dropdown-item :to="{ name: 'apps-books-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>
            <b-dropdown-item @click="bajaLibro(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Eliminar</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Mostrando {{ usuarios.length }} registros</span>
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import LibroListAddNew from './LibroListAddNew.vue';

export default {
  components: {
    LibroListAddNew,
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
      usuarios: [],
      tableColumns: [
        { key: 'url', sortable: false },
        { key: 'nombre', sortable: true },
        { key: 'autor', sortable: true },
        { key: 'stock', sortable: true },
        { key: 'precio', sortable: true },
        { key: 'status', sortable: true },
        { key: 'acciones' },
      ],
      idUser: {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        username: '',
        rol: 'CLIENTE',
        telefono: '',
        direccion: '',
        password: '',
      },
      generos: [],
    };
  },
  async beforeCreate() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const resp = await axios.get(`http://34.72.218.226:7070/libro/lista/${userData.id}`);
      this.usuarios = resp.data;
    } catch (err) {
      this.usuarios = [];
    }

    try {
      const resp = await axios.get('http://34.72.218.226:7070/libro/genero');
      this.generos = resp.data;
    } catch (err) {
      this.generos = [];
    }
  },
  methods: {
    getStatus(status) {
      if (status === 'ACTIVO') return 'success';
      if (status === 'PENDIENTE') return 'warning';
      return 'primary';
    },
    getUserRoleIcon(role) {
      if (role === 'ADMINISTRADOR') return 'UserIcon';
      if (role === 'EDITORIAL') return 'ShoppingCartIcon';
      if (role === 'CLIENTE') return 'ShoppingBagIcon';
      return 'UserIcon';
    },
    avatarText(value) {
      if (!value) return '';
      const nameArray = value.split(' ');
      return nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
    },
    async bajaLibro(id) {
      try {
        const resp = await axios.put('http://34.72.218.226:7070/libro/baja', {
          idLibro: id,
        });
        window.location.reload();
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Registro Eliminado!',
            icon: 'CoffeeIcon',
            variant: 'error',
            text: 'Usuario no Eliminado!',
          },
        });
      }
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
