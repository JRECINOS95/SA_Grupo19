<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          BookSA
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login BookSA"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
            Bienvenido de Nuevo! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Ingresa con tu Usuario y Contraseña Registrados
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{ invalid }"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >

              <!-- GRUPO -->
              <b-form-group
                label="Seleccione el Servicio A Consumir"
                label-for="grupo"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Servicio A Consumir"
                  vid="grupo"
                  rules="required"
                >
                  <b-form-select
                  v-model="grupo"
                  :options="grupos"
                  :state="grupo === '' ? false : true"
                  name="register-rol"
                />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group
                label="Correo Electrónico"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="mail@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="password">Contraseña</label>
                </div>
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
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password·"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Recuérdame
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid"
              >
                Iniciar Sesión
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>Nuevo en nuestra plataforma? </span>
            <b-link :to="{ name: 'auth-register' }">
              <span>Crea una cuenta</span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VuexyLogo from '@core/layouts/components/Logo.vue';
import {
  BRow,
  BCol,
  BLink,
  BCardText,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  VBTooltip,
  BFormSelect,
} from 'bootstrap-vue';
import { required, email } from '@validations';
import { togglePasswordVisibility } from '@core/mixins/ui/forms';
import store from '@/store/index';
import { getHomeRouteForLoggedInUser } from '@/auth/utils';
import axios from 'axios';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BCardText,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BFormSelect,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      grupos: [
        { value: 'GRUPO17', text: 'Servicios Grupo 17' },
        { value: 'GRUPO18', text: 'Servicios Grupo 18' },
        { value: 'GRUPO19', text: 'Servicios Grupo 19' },
      ],
      grupo: 'GRUPO19',
      status: '',
      password: '',
      userEmail: '',
      sideImg:
        'https://ep01.epimg.net/cultura/imagenes/2016/08/04/actualidad/1470334760_632356_1470336952_noticia_normal_recorte1.jpg',
      // validation rulesimport store from '@/store/index'
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = 'https://ep01.epimg.net/cultura/imagenes/2016/08/04/actualidad/1470334760_632356_1470336952_noticia_normal_recorte1.jpg';
        // this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(async (success) => {
        if (success) {
          try {
            const resp = await axios.post('http://35.209.160.141:5050/grupo19/usuario/login', {
              // DEBE SER GET EN LUGAR DE POST
              user: this.userEmail,
              password: this.password,
              grupo: this.grupo,
            });
            const userData = resp.data;
            userData.password = this.password;
            userData.grupo = this.grupo;
            if (userData.rol === 'ADMINISTRADOR') {
              userData.ability = [
                {
                  action: 'manage',
                  subject: 'ADMIN',
                },
                {
                  action: 'manage',
                  subject: 'ANY',
                },
              ];
            } else if (userData.rol === 'EDITORIAL') {
              userData.ability = [
                {
                  action: 'manage',
                  subject: 'EDITORIAL',
                },
                {
                  action: 'manage',
                  subject: 'ANY',
                },
              ];
            } else {
              userData.ability = [
                {
                  action: 'read',
                  subject: 'ACL',
                },
                {
                  action: 'read',
                  subject: 'Auth',
                },
                {
                  action: 'manage',
                  subject: 'CLIENTE',
                },
                {
                  action: 'manage',
                  subject: 'ANY',
                },
              ];
            }
            if (userData.validado === true) {
              localStorage.setItem('userData', JSON.stringify(userData));
              localStorage.setItem('userCart', JSON.stringify([]));
              this.$ability.update(userData.ability);

              this.$router.replace(getHomeRouteForLoggedInUser(userData.rol)).then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Bienvenido ${userData.primer_nombre || userData.username}`,
                    icon: 'CoffeeIcon',
                    variant: 'success',
                    text: `Has iniciado sesión con el rol de ${userData.rol}. Ahora ya puedes usar el sistema!`,
                  },
                });
              });
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-center',
                props: {
                  title: 'Usuario no Confirmado',
                  icon: 'CoffeeIcon',
                  variant: 'error',
                  text: 'Usuario no Confirmado!',
                },
              });
            }
          } catch (err) {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Login Incorecto',
                icon: 'CoffeeIcon',
                variant: 'error',
                text: 'Usuario y/o contraseña incorrectos!',
              },
            });
            this.password = null;
            this.$refs.loginForm.setErrors(err);
          }
        }
      });
    },
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
