<template>
  <b-card>
    <!-- media -->
    <b-media no-body>
      <b-media-aside>
        <b-link>
          <b-img
            ref="previewEl"
            rounded
            src="https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"
            height="80"
          />
        </b-link>
        <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="mt-75 ml-75">
        <!-- upload button -->
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          size="sm"
          class="mb-75 mr-75"
          @click="$refs.refInputEl.$el.click()"
        >
          Cargar
        </b-button>
        <b-form-file
          ref="refInputEl"
          v-model="profileFile"
          accept=".jpg, .png, .gif"
          :hidden="true"
          plain
          @input="inputImageRenderer"
        />
        <!--/ upload button -->

        <!-- reset -->
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          variant="outline-secondary"
          size="sm"
          class="mb-75 mr-75"
        >
          Reset
        </b-button>
        <!--/ reset -->
        <b-card-text>Únicamente JPG, GIF or PNG. Máximo tamaño de 800kB</b-card-text>
      </b-media-body>
    </b-media>
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col
          v-if="optionsLocal.rol === 'EDITORIAL'"
          cols="12"
        >
          <b-form-group
            label="Nombre Editorial"
            label-for="account-primer_nombre"
          >
            <b-form-input
              v-model="optionsLocal.primer_nombre"
              name="primer_nombre"
            />
          </b-form-group>
        </b-col>
        <b-col
          v-if="optionsLocal.rol !== 'EDITORIAL'"
          sm="3"
        >
          <b-form-group
            label="Primer Nombre"
            label-for="account-primer_nombre"
          >
            <b-form-input
              v-model="optionsLocal.primer_nombre"
              name="primer_nombre"
            />
          </b-form-group>
        </b-col>
        <b-col
          v-if="optionsLocal.rol !== 'EDITORIAL'"
          sm="3"
        >
          <b-form-group
            label="Segundo Nombre"
            label-for="account-segundo_nombre"
          >
            <b-form-input
              v-model="optionsLocal.segundo_nombre"
              name="segundo_nombre"
            />
          </b-form-group>
        </b-col>
        <b-col
          v-if="optionsLocal.rol !== 'EDITORIAL'"
          sm="3"
        >
          <b-form-group
            label="Primer Apellido"
            label-for="account-primer_apellido"
          >
            <b-form-input
              v-model="optionsLocal.primer_apellido"
              name="primer_apellido"
            />
          </b-form-group>
        </b-col>
        <b-col
          v-if="optionsLocal.rol !== 'EDITORIAL'"
          sm="3"
        >
          <b-form-group
            label="Segundo Apellido"
            label-for="account-segundo_apellido"
          >
            <b-form-input
              v-model="optionsLocal.segundo_apellido"
              name="segundo_apellido"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Username"
            label-for="account-username"
          >
            <b-form-input
              v-model="optionsLocal.username"
              name="username"
              placeholder="Username"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Telefono"
            label-for="account-telefono"
          >
            <b-form-input
              v-model="optionsLocal.telefono"
              name="telefono"
            />
          </b-form-group>
        </b-col>

        <b-col
          v-if="optionsLocal.rol === 'EDITORIAL'"
          cols="12"
        >
          <b-form-group
            label="Dirección"
            label-for="account-direccion"
          >
            <b-form-input
              v-model="optionsLocal.direccion"
              name="direccion"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click="updateUser"
          >
            Actualizar
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            Regresar Cambios
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BFormFile,
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BCardText,
  BMedia,
  BMediaAside,
  BMediaBody,
  BLink,
  BImg,
} from 'bootstrap-vue';
import axios from 'axios';
import Ripple from 'vue-ripple-directive';
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils';
import { ref } from '@vue/composition-api';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(localStorage.getItem('userData')),
      profileFile: null,
    };
  },
  beforeCreate() {
    this.optionsLocal = JSON.parse(localStorage.getItem('userData'));
  },
  methods: {
    resetForm() {
      this.optionsLocal = JSON.parse(localStorage.getItem('userData'));
    },
    async updateUser() {
      try {
        const resp = await axios.put('http://35.209.82.125:7000/usuario', {
          idUser: this.optionsLocal.id,
          primerNombre: this.optionsLocal.primer_nombre,
          segundoNombre: this.optionsLocal.segundo_nombre,
          primerApellido: this.optionsLocal.primer_apellido,
          segundoApellido: this.optionsLocal.segundo_apellido,
          rol: this.optionsLocal.rol,
          username: this.optionsLocal.username,
          password: this.optionsLocal.password,
          telefono: this.optionsLocal.telefono,
          direccion: this.optionsLocal.direccion,
        });
        localStorage.setItem('userData', JSON.stringify(this.optionsLocal));
        this.$router.replace('/').then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Registro Actualizado!',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Se ha actualizado correctamente su perfil!',
            },
          });
        });
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
  },
  setup() {
    const refInputEl = ref(null);
    const previewEl = ref(null);

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl);

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    };
  },
};
</script>
