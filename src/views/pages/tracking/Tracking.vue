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
        <template #cell(cliente)="data">
          {{ data.item.primer_nombre }} {{ data.item.primer_apellido }}
        </template>

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
            <span class="align-text-top text-capitalize">{{ data.item.status }}</span>
          </div>
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

            <b-dropdown-item>
              
              <b-button
                id="toggle-btn"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-modal.modal-prevent-closing
                variant="outline-primary"
                @click="cambiarValores(data.item.id, data.item.status)"
              >
                <feather-icon icon="EditIcon" />
                Editar
              </b-button>
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
            <span class="text-muted">Mostrando {{ registros.length }} registros</span>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <!-- modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="my-modal"
      title="Seleccione el nuevo estado del Pedido"
      ok-title="Actualizar"
      cancel-variant="outline-secondary"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          :state="nameState"
          label="Estado"
          label-for="name-input"
          invalid-feedback="Estado es Requerido!"
        >
          <b-form-select
              v-model="status"
              :options="options"
              :state="nameState"
              name="status"
              required
          />
        </b-form-group>
      </form>
    </b-modal>
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
        { key: 'cliente', sortable: true },
        { key: 'libro', sortable: true },
        { key: 'cantidad', sortable: true },
        { key: 'total', sortable: true },
        { key: 'estado', sortable:true },
        { key: 'acciones'}
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
      const resp = await axios.get(`http://34.72.218.226:7060/compra/tracking`);
      this.registros = resp.data;
    } catch (err) {
      this.registros = [];
    }
  },
  methods: {
    async actualizarPedido(){
      try {
        const resp = await axios.put('http://34.72.218.226:7060/compra/tracking', {
          id: this.id,
          status: this.status,
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
            text: 'Tracking no Actualizado!',
          },
        });
      }
    },
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
