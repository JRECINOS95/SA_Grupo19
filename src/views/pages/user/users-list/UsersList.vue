<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
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
                <span class="text-nowrap">Agregar Usuario</span>
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
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No existen registros!"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: Primer Nombre -->
        <template #cell(nombre)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                src="https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"
                :text="`${avatarText(data.item.primer_nombre + ' ' + data.item.primer_nombre)}`"
                :variant="`light-${getTypeRol(data.item.rol)}`"
              />
            </template>
            <b-link class="font-weight-bold d-block text-nowrap">
              {{ data.item.primer_nombre + ' ' + data.item.primer_apellido }}
            </b-link>
            <small class="text-muted">+502 {{ data.item.telefono }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(rol)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="getUserRoleIcon(data.item.rol)"
              size="18"
              class="mr-50"
              :class="`text-${getTypeRol(data.item.rol)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.rol }}</span>
          </div>
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

            <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Editar</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="data.item.status === 'PENDIENTE'"
              @click="confirmarUsuario(data.item.id)"
            >
              <feather-icon icon="UserCheckIcon" />
              <span class="align-middle ml-50">Confirmar Usuario</span>
            </b-dropdown-item>

            <b-dropdown-item @click="bajaUsuario(data.item.id)">
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
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="usuarios.length"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
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
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import axios from 'axios';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import useUsersList from './useUsersList';
import UserListAddNew from './UserListAddNew.vue';

export default {
  components: {
    UserListAddNew,
    BAvatar,
    BCard,
    BRow,
    BCol,
    BButton,
    BTable,
    BMedia,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
  },
  setup() {
    const isAddNewUserSidebarActive = ref(false);

    const roleOptions = [
      { label: 'Administrador', value: 'ADMINISTRADOR' },
      { label: 'Editorial', value: 'EDITORIAL' },
      { label: 'Cliente', value: 'CLIENTE' },
    ];

    const {
      perPage,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    } = useUsersList();

    return {
      // Sidebar
      isAddNewUserSidebarActive,
      perPage,
      currentPage,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,

      // UI
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      roleOptions,

      // Extra Filters
      roleFilter,
      planFilter,
      statusFilter,
    };
  },
  data() {
    return {
      usuarios: [],
      tableColumns: [
        { key: 'nombre', sortable: true },
        { key: 'username', sortable: true },
        { key: 'rol', sortable: true },
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
    };
  },
  async beforeCreate() {
    try {
      const resp = await axios.get('http://35.209.82.125:7000/usuario');
      this.usuarios = resp.data;
    } catch (err) {
      this.usuarios = [];
    }
  },
  methods: {
    async confirmarUsuario(id) {
      try {
        const resp = await axios.put('http://35.209.82.125:7000/usuario/confirmar', {
          idUser: id,
        });
        window.location.reload();
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Registro no Actualizado',
            icon: 'CoffeeIcon',
            variant: 'error',
            text: 'Usuario no Actualizado!',
          },
        });
      }
    },
    async bajaUsuario(id) {
      try {
        const resp = await axios.put('http://35.209.82.125:7000/usuario/baja', {
          idUser: id,
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
    getTypeRol(role) {
      if (role === 'ADMINISTRADOR') return 'primary';
      if (role === 'EDITORIAL') return 'warning';
      if (role === 'CLIENTE') return 'success';
      return 'primary';
    },
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
