<template>
  <validation-observer
    #default="{ handleSubmit }"
    ref="refFormObserver"
  >
    <b-form
      class="list-view product-checkout"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <!-- Left Form -->
      <b-card no-body>
        <b-card-header class="flex-column align-items-start">
          <b-card-title>Agregar Nueva Dirección</b-card-title>
        </b-card-header>
        <b-card-body>
          <b-row>
            <!-- Dirección -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Dirección"
                rules="required"
              >
                <b-form-group
                  label="Dirección"
                  label-for="direccion"
                  class="mb-2"
                >
                  <b-form-input
                    id="direccion"
                    v-model="direccion"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Colonia -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Colonia"
                rules="required"
              >
                <b-form-group
                  label="Colonia"
                  label-for="colonia"
                  class="mb-2"
                >
                  <b-form-input
                    id="colonia"
                    v-model="colonia"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Zona -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Zona"
                rules="required|integer"
              >
                <b-form-group
                  label="Zona"
                  label-for="zona"
                  class="mb-2"
                >
                  <b-form-input
                    id="zona"
                    v-model="zona"
                    type="number"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Municipio -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Municipio"
                rules="required"
              >
                <b-form-group
                  label="Municipio"
                  label-for="municipio"
                  class="mb-2"
                >
                  <b-form-input
                    id="municipio"
                    v-model="municipio"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Departamento -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Departamento"
                rules="required"
              >
                <b-form-group
                  label="Departamento"
                  label-for="departamento"
                  class="mb-2"
                >
                  <b-form-input
                    id="departamento"
                    v-model="departamento"
                    :state="getValidationState(validationContext)"
                    trim
                  />
                  <b-form-invalid-feedback>
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Address Type -->
            <b-col
              cols="12"
              md="6"
            >
              <validation-provider
                #default="validationContext"
                name="Address Type"
                rules="required"
              >
                <b-form-group
                  label="Address Type"
                  label-for="address-type"
                  :state="getValidationState(validationContext)"
                >
                  <v-select
                    v-model="tipo"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="['Casa', 'Trabajo', 'Otra']"
                    input-id="address-type"
                    :clearable="false"
                  />

                  <b-form-invalid-feedback :state="getValidationState(validationContext)">
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Submit Button -->
            <b-col cols="12">
              <b-button
                variant="primary"
                type="submit"
                @click="saveNewDir"
              >
                Guardar y Enviar a está Dirección
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

      <!-- Right Col -->
      <div class="customer-card">
        <b-card :title="`${cliente.primer_nombre + ' ' + cliente.primer_apellido}`">
          <b-card-text class="mb-0">
            <b>Dirección</b><br>{{ cliente.direccion }}
          </b-card-text>
          <b-card-text class="mb-0">
            <b>Teléfono</b><br>{{ cliente.telefono }}
          </b-card-text>
          <br>
          <br>
          <b-button
            variant="primary"
            block
            @click="$emit('next-step')"
          >
            Enviar a está Dirección
          </b-button>
        </b-card>
      </div>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BButton,
  BFormInvalidFeedback,
} from 'bootstrap-vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import vSelect from 'vue-select';
import { required, integer } from '@validations';
import formValidation from '@core/comp-functions/forms/form-validation';

export default {
  components: {
    // BSV
    BForm,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BFormInvalidFeedback,

    // Form Validation
    ValidationProvider,
    ValidationObserver,

    // 3rd party
    vSelect,
  },
  props: {
    addressDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cliente: null,
      direccion: '',
      colonia: '',
      zona: 0,
      municipio: '',
      departamento: '',
      tipo: '',
    };
  },
  beforeMount() {
    this.cliente = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem('userDirShop', this.cliente.direccion);
  },
  methods: {
    saveNewDir() {
      localStorage.setItem(
        'userDirShop',
        `${this.direccion
        }, ${
          this.colonia
        }, ${
          this.zona
        }, ${
          this.municipio
        }, ${
          this.departamento}`,
      );
    },
  },
  setup(_, { emit }) {
    const { refFormObserver, getValidationState, resetForm } = formValidation(() => {});

    const onSubmit = () => {
      emit('next-step');
    };

    return {
      // Form
      onSubmit,

      // Form Validation
      refFormObserver,
      getValidationState,
      resetForm,

      // FOrm Validators
      required,
      integer,
    };
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
