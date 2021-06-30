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

        <template #cell(total)="data">
          Q. {{ data.item.valor_final }}
        </template>

        

        <!-- Column: Status -->
        <template #cell(estado)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="getOperacionRoleIcon(data.item.status)"
              size="18"
              class="mr-50"
              :class="`text-${getStatus(data.item.status)}`"
            />
             <b-badge
                pill
                :variant="getStatus(data.item.status)"
              >
                {{ data.item.status }}
              </b-badge>
          </div>
        </template>


        <template #cell(proceso)="data">
          <b-progress
            :value="data.item.valor"
            max="100"
            :variant="getStatus(data.item.status)"
            striped
          />
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
  BFormSelect,
  BRow,
  BCol,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BFormGroup,
  BBadge,
  BProgress,
  BDropdown,
  BListGroup,
  BFormInput,
  BDropdownItem,
  BModal, 
  BListGroupItem,
  VBModal,
} from 'bootstrap-vue';
import { ref } from '@vue/composition-api';
import axios from 'axios';
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BAvatar,
    BCard,
    BProgress,
    BRow,
    BFormSelect,
    BListGroup,
    BListGroupItem,
    BCol,
    BFormInput,
    BButton,
    BFormGroup,
    BTable,
    BMedia,
    BBadge,
    BDropdown,
    BDropdownItem,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
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
        { key: 'libro', sortable: true },
        { key: 'cantidad', sortable: true },
        { key: 'total', sortable: true },
        { key: 'estado', sortable: true },
        { key: 'proceso', sortable:true },
      ],
      name: '',
      nameState: null,
      submittedNames: [],
      id:0,
      status: '',
      options: [
        { value: 'INGRESADA', text: 'INGRESADA' },
        { value: 'EN PROCESO', text: 'EN PROCESO' },
        { value: 'DESPACHADO', text: 'DESPACHADO' },
        { value: 'EN RUTA', text: 'EN RUTA' },
        { value: 'ENTREGADO', text: 'ENTREGADO' },
      ],
    };
  },
  async beforeCreate() {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const resp = await axios.get(`http://34.72.218.226:7060/compra/tracking/${userData.id}`);
      this.registros = resp.data;
    } catch (err) {
      this.registros = [];
    }
  },
  methods: {
    getOperacionRoleIcon(role) {
      if (role === 'INGRESADA') return 'LogInIcon';
      if (role === 'EN PROCESO') return 'ToolIcon';
      if (role === 'DESPACHADO') return 'LogOutIcon';
      if (role === 'EN RUTA') return 'MapPinIcon';
      if (role === 'ENTREGADO') return 'ThumbsUpIcon';
      return 'BookIcon';
    },
    getStatus(role) {
      if (role === 'INGRESADA') return 'primary';
      if (role === 'EN PROCESO') return 'secondary';
      if (role === 'DESPACHADO') return 'success';
      if (role === 'EN RUTA') return 'warning';
      if (role === 'ENTREGADO') return 'info';
      return 'danger';
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
      this.actualizarPedido();
    },
    cambiarValores(id,status){
      this.id=id;
      this.status = status;
    }
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
