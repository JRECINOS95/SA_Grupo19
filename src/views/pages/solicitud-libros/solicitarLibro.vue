<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-row>
        <b-col md="12">
          <h5>Ingresa el libro que deseas comprar</h5>
          <br>
          <hr>
          <br>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Nombre del Libro"
            label-for="nombre"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre del Libro"
              rules="required"
            >
              <b-form-input
                id="nombre"
                v-model="solicitud.nombre"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Autor del Libro"
            label-for="autor"
          >
            <validation-provider
              #default="{ errors }"
              name="Autor del Libro"
              rules="required"
            >
              <b-form-input
                id="autor"
                v-model="solicitud.autor"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Fecha de Primera Publicación"
            label-for="fecha"
          >
            <validation-provider
              #default="{ errors }"
              name="Fecha de Publicación"
              rules="required"
            >
              <flat-pickr
                id="fecha"
                v-model="solicitud.fecha"
                class="form-control"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group
            label="Archivo PDF"
            label-for="file"
          >
            <!-- Styled -->
            <b-form-file
              id="file"
              v-model="file"
              accept=".pdf, .PDF"
              placeholder="Selecciona un archivo o colocalo aquí..."
              drop-placeholder="Coloca el archivo aquí..."
            />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <br>
          <hr>
          <br>
        </b-col>
        <!-- submit and reset -->
        <b-col>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="submit"
            variant="primary"
            class="mr-1"
            @click.prevent="validationForm"
          >
            Ingresar Solicitud
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormFile,
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import flatPickr from 'vue-flatpickr-component';
import { required } from '@validations';
import axios from 'axios';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormFile,
    flatPickr,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      solicitud: {
        nombre: '',
        autor: '',
        fecha: null,
        idUser: 0,
        file: null,
        data: null,
      },
      file: null,
      required,
    };
  },
  methods: {
    toBase64(file) {
      const promeesa = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
      return promeesa;
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(async (success) => {
        if (success) {
          this.solicitud.file = this.file.name;
          const result = await this.toBase64(this.file).catch((e) => Error(e));
          if (!(result instanceof Error)) {
            this.solicitud.data = result.toString();
            const formData = new FormData();
            formData.append('file', this.file);

            const resp = await axios
              .post('http://localhost:8000/solicitud', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((data) => {
                console.log(data.data);
              })
              .catch(() => {
                console.log('FAILURE!!');
              });
            console.log(resp);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
