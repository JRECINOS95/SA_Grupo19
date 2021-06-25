<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            BookSA
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Compra o Registra tus Libros 🚀
        </b-card-title>
        <b-card-text class="mb-2">
          Con nuestra aplicación todo es mas fácil!
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm"
          >
            <!-- ROL -->
            <b-form-group
              label="Tipo de Usuario"
              label-for="rol"
            >
              <validation-provider
                #default="{ errors }"
                name="Tipo de Usuario"
                rules="required"
              >
                <b-form-select
                  v-model="rol"
                  :options="options"
                  :state="rol === '' ? false : true"
                  name="register-rol"
                  @change="cambiarValores"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- primerNombre -->
            <b-form-group
              :label="etiquetaNombre"
              label-for="primerNombre"
            >
              <validation-provider
                #default="{ errors }"
                name="primerNombre"
                rules="required"
              >
                <b-form-input
                  id="primerNombre"
                  v-model="primerNombre"
                  :state="errors.length > 0 ? false : null"
                  name="register-primerNombre"
                  placeholder=""
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- username -->
            <b-form-group
              v-if="mostrarCampos"
              label="Primer Apellido"
              label-for="primerApellido"
            >
              <validation-provider
                #default="{ errors }"
                name="primerApellido"
                rules="required"
              >
                <b-form-input
                  v-if="mostrarCampos"
                  id="primerApellido"
                  v-model="primerApellido"
                  :state="errors.length > 0 ? false : null"
                  name="register-primerApellido"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group
              label="Email"
              label-for="username"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="username"
                  v-model="username"
                  :state="errors.length > 0 ? false : null"
                  name="register-email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- telefono -->
            <b-form-group
              label="Telefono"
              label-for="telefono"
            >
              <validation-provider
                #default="{ errors }"
                name="Telefono"
                rules="required"
              >
                <b-form-input
                  id="telefono"
                  v-model="telefono"
                  :state="errors.length > 0 ? false : null"
                  name="register-telefono"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- direccion -->
            <b-form-group
              v-if="!mostrarCampos"
              label="Dirección"
              label-for="direccion"
            >
              <validation-provider
                #default="{ errors }"
                name="Dirección"
                rules="required"
              >
                <b-form-input
                  v-if="!mostrarCampos"
                  id="direccion"
                  v-model="direccion"
                  :state="errors.length > 0 ? false : null"
                  name="register-direccion"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Password"
              label-for="password"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="submit"
            >
              Registrar
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Ya tienes una cuenta? </span>
          <b-link :to="{ name: 'auth-login' }">
            <span>Inicia sesión con tu cuenta!</span>
          </b-link>
        </b-card-text>
      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BForm,
  BButton,
  BFormInput,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BFormSelect,
} from 'bootstrap-vue';
import VuexyLogo from '@core/layouts/components/Logo.vue';
import { required, email } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import axios from 'axios';

export default {
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormSelect,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      primerNombre: '',
      primerApellido: '',
      etiquetaNombre: 'Primer Nombre',
      mostrarCampos: true,
      rol: 'CLIENTE',
      options: [
        { value: 'CLIENTE', text: 'Usuario Cliente' },
        { value: 'EDITORIAL', text: 'Usuario Editorial' },
      ],
      username: '',
      password: '',
      // validation rules
      required,
      telefono: '',
      direccion: '',
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
  },
  methods: {
    validationForm() {
      this.$refs.registerForm.validate().then(async (success) => {
        if (success) {
          let mail = this.username;
          let phone = this.telefono;
          if (this.rol === 'EDITORIAL') {
            mail = this.telefono;
            phone = this.username;
          }
          const body = {
            primerNombre: this.primerNombre,
            segundoNombre: '',
            primerApellido: this.primerApellido,
            segundoApellido: '',
            rol: this.rol,
            username: mail,
            password: this.password,
            telefono: phone,
            direccion: this.direccion,
          };
          try {
            const resp = await axios.post('http://35.209.82.125:7000/usuario', body);
            this.$router.replace('/login').then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Usuario Registrado',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              });
            });
          } catch (err) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Usuario no se ha Registrado',
                icon: 'EditIcon',
                variant: 'error',
              },
            });
            this.$refs.loginForm.setErrors(err);
          }
        }
      });
    },
    cambiarValores() {
      if (this.rol === 'EDITORIAL') {
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
@import '@core/scss/vue/pages/page-auth.scss';
</style>
