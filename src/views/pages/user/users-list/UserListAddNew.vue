<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">
          Agregar Nuevo Usuario
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer ref="refFormObserver">
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="validationForm"
          @reset.prevent="resetForm"
        >
          <!-- User Role -->
          <validation-provider
            #default="validationContext"
            name="Rol del Usuario"
            rules="required"
          >
            <b-form-group
              label="Rol del Usuario"
              label-for="user-role"
              :state="getValidationState(validationContext)"
            >
              <b-form-select
                v-model="userData.rol"
                :options="options"
                :state="userData.rol === '' ? false : true"
                name="user-role"
                @change="cambiarValores"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Primer Nombre -->
          <validation-provider
            #default="validationContext"
            :name="etiquetaNombre"
            rules="required"
          >
            <b-form-group
              :label="etiquetaNombre"
              label-for="primer-nombre"
            >
              <b-form-input
                id="primer-nombre"
                v-model="userData.primerNombre"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Primer Apellido -->
          <validation-provider
            v-if="mostrarCampos"
            #default="validationContext"
            name="Primer Apellido"
            rules="required"
          >
            <b-form-group
              v-if="mostrarCampos"
              label="Primer Apellido"
              label-for="primer-apellido"
            >
              <b-form-input
                id="primer-apellido"
                v-model="userData.primerApellido"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Username -->
          <validation-provider
            #default="validationContext"
            name="Username"
            rules="required|email"
          >
            <b-form-group
              label="Username"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="userData.username"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Telefono -->
          <validation-provider
            #default="validationContext"
            name="Telefono"
            rules="required"
          >
            <b-form-group
              label="Telefono"
              label-for="telefono"
            >
              <b-form-input
                id="telefono"
                v-model="userData.telefono"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Direccion -->
          <validation-provider
            #default="validationContext"
            name="Dirección"
            rules="required"
          >
            <b-form-group
              v-if="!mostrarCampos"
              label="Dirección"
              label-for="direccion"
            >
              <b-form-input
                id="direccion"
                v-model="userData.direccion"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Password -->
          <validation-provider
            #default="validationContext"
            name="Password"
            rules="password"
          >
            <b-form-group
              label="Password"
              label-for="password"
            >
              <b-input-group
                class="input-group-merge"
                :class="'is-invalid'"
              >
                <b-form-input
                  id="password"
                  v-model="userData.password"
                  :state="getValidationState(validationContext)"
                  trim
                  :type="passwordFieldType"
                  class="form-control-merge"
                  name="register-password"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    :icon="passwordToggleIcon"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Guardar
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancelar
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BInputGroup,
  BInputGroupAppend,
  BButton,
  BFormSelect,
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { onBeforeMount, ref } from '@vue/composition-api';
import { required, alphaNum, email } from '@validations';
import formValidation from '@core/comp-functions/forms/form-validation';
import Ripple from 'vue-ripple-directive';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import axios from 'axios';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import store from '@/store';

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BFormSelect,
    BInputGroup,
    BInputGroupAppend,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      etiquetaNombre: 'Primer Nombre',
      mostrarCampos: true,
      options: [
        { value: 'ADMINISTRADOR', text: 'Usuario Administrador' },
        { value: 'CLIENTE', text: 'Usuario Cliente' },
        { value: 'EDITORIAL', text: 'Usuario Editorial' },
      ],
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
  },
  async beforeMount() {
    this.etiquetaNombre = 'Primer Nombre';
    this.mostrarCampos = true;
    this.cambiarValores();
  },
  setup(props, { emit }) {
    const blankUserData = {
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      username: '',
      rol: 'CLIENTE',
      telefono: '',
      direccion: '',
      password: '',
    };

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)));
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData));
    };

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetuserData);

    return {
      userData,
      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
  methods: {
    async validationForm() {
      try {
        const resp = await axios.post('http://34.72.218.226:7000/usuario', this.userData);
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Usuario Ingresado',
            icon: 'EditIcon',
            variant: 'success',
          },
        });
        this.$emit('refetch-data');
        this.$emit('update:is-add-new-user-sidebar-active', false);
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Usuario no se ha Registrado',
            icon: 'EditIcon',
            variant: 'error',
          },
        });
      }
    },
    cambiarValores() {
      if (this.userData.rol === 'EDITORIAL') {
        this.mostrarCampos = false;
        this.etiquetaNombre = 'Nombre Editorial';
      } else {
        this.mostrarCampos = true;
        this.etiquetaNombre = 'Primer Nombre';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
