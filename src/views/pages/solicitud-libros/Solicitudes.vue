<template>
  <div>
    <libro-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :generos="generos"
      :nombre.sync="book.nombre"
      :autor.sync="book.autor"
      :id-solicitud.sync="book.id"
    />
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
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

            <b-dropdown-item @click="seleccionarItem(data.item);">
              <feather-icon icon="FilePlusIcon" />
              <span class="align-middle ml-50">Ingresar Libro</span>
            </b-dropdown-item>
            <b-dropdown-item @click="downloadWithVueResource(data.item)">
              <feather-icon icon="FileTextIcon" />
              <a class="align-middle ml-50" :href="data.item.urlDownload" download>Ver Documento</a>
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
import LibroListAddNew from '../libros/LibroListAddNew.vue';

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
        { key: 'id', sortable: false },
        { key: 'nombre', sortable: true },
        { key: 'autor', sortable: true },
        { key: 'fechaPublicacion', sortable: true },
        { key: 'acciones' },
      ],
      generos: [],
      book: {
        nombre: '',
        autor: '',
        id: -1,
      },
    };
  },
  async beforeCreate() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const resp = await axios.get(`http://34.72.218.226:7070/solicitud`);
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

    downloadWithVueResource(item){
      window.location.href = item.urlDownload;
    },
    seleccionarItem(item){
      this.book.nombre = item.nombre;
      this.book.autor = item.autor;
      this.book.id = item.id;
      this.isAddNewUserSidebarActive = true;
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
