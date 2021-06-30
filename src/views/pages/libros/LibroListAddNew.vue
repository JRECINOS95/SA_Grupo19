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
          Agregar Nuevo Libro
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
          <!-- Primer Nombre -->
          <validation-provider
            #default="validationContext"
            name="Nombre"
            rules="required"
          >
            <b-form-group
              label="Nombre"
              label-for="nombre"
            >
              <b-form-input
                id="nombre"
                v-model="bookData.nombre"
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
            #default="validationContext"
            name="Autor"
            rules="required"
          >
            <b-form-group
              label="Autor"
              label-for="autor"
            >
              <b-form-input
                id="autor"
                v-model="bookData.autor"
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
            name="Url Imagen"
            rules="required"
          >
            <b-form-group
              label="Url Imagen"
              label-for="url"
            >
              <b-form-input
                id="url"
                v-model="bookData.url"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Stock -->
          <validation-provider
            #default="validationContext"
            name="Stock"
            rules="required"
          >
            <b-form-group
              label="Stock"
              label-for="stock"
            >
              <b-form-input
                id="stock"
                v-model="bookData.stock"
                type="number"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Precio -->
          <validation-provider
            #default="validationContext"
            name="Precio"
            rules="required"
          >
            <b-form-group
              label="Precio"
              label-for="precio"
            >
              <b-form-input
                id="precio"
                v-model="bookData.precio"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Generos -->
          <validation-provider
            #default="validationContext"
            name="Generos Literarios"
            rules="required"
          >
            <b-form-group
              label="Generos Literarios"
              label-for="generos"
            >
              <v-select
                v-model="bookData.generos"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="nombre"
                :options="generos"
                multiple
              />
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
  BButton,
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { ref } from '@vue/composition-api';
import { required, alphaNum, email } from '@validations';
import formValidation from '@core/comp-functions/forms/form-validation';
import Ripple from 'vue-ripple-directive';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import axios from 'axios';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import vSelect from 'vue-select';

export default {
  components: {
    BSidebar,
    vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
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
  model: {
    prop: 'nombre',
    event: 'update:nombre',
  },
  model: {
    prop: 'autor',
    event: 'update:autor',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    generos: {
      type: Array,
      required: true,
    },
    nombre: {
      type: String,
      required: false,
      default: ''
    },
    autor: {
      type: String,
      required: false,
      default: ''
    },
    idSolicitud: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data() {
    return {
      required,
      alphaNum,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
  },
  setup(props, { emit }) {
    const blankBookData = {
      nombre: '',
      autor: '',
      url: '',
      idUser: 0,
      precio: 0,
      stock: '',
      generos: [],
    };

    const bookData = ref(JSON.parse(JSON.stringify(blankBookData)));
    const resetuserData = () => {
      bookData.value = JSON.parse(JSON.stringify(blankBookData));
    };

    const { refFormObserver, getValidationState, resetForm } = formValidation(resetuserData);

    return {
      bookData,
      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
  updated(){
    this.bookData.nombre = this.nombre;
    this.bookData.autor = this.autor;
  },
  methods: {
    async validationForm() {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.bookData.idUser = userData.id;
        this.bookData.grupo = userData.grupo;
        
        const resp = await axios.post('http://35.209.160.141:5050/grupo19/libro/add', this.bookData);

        console.log(this.idSolicitud, userData.id)
        if(this.idSolicitud!==-1){
          await axios.put('http://34.72.218.226:7070/solicitud', {
            idSolicitud : this.idSolicitud,
            idEditorial : userData.id
          });
          this.$router.replace('/libro').then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Libro Ingresado',
                icon: "SaveIcon",
                variant: "info",
                text: `Libro Solicitado Almacenado Correctamente!`,
              },
            });
            this.$emit('refetch-data');
            this.$emit('update:is-add-new-user-sidebar-active', false);
          });
      }else{
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Libro Ingresado',
            icon: 'SaveIcon',
            variant: 'info',
            text: `Libro Almacenado Correctamente!`
          },
        });
        this.$emit('refetch-data');
        this.$emit('update:is-add-new-user-sidebar-active', false);
      }
      } catch (err) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Libro no se ha Registrado',
            icon: 'EditIcon',
            variant: 'warning',
            text: 'Error almacenando el libro!',
          },
        });
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
