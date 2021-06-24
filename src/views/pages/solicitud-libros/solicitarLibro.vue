<template>
  <validation-observer ref="simpleRules">
    <b-form @submit.prevent>
      <b-row>
        <b-col md="12">
          <h5>Ingresa el libro que deseas comprar</h5>
          <br />
          <hr />
          <br />
        </b-col>
        <b-col md="6">
          <b-form-group label="Nombre del Libro" label-for="nombre">
            <validation-provider
              #default="{ errors }"
              name="Nombre del Libro"
              rules="required"
            >
              <b-form-input id="nombre" v-model="solicitud.nombre" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Autor del Libro" label-for="autor">
            <validation-provider
              #default="{ errors }"
              name="Autor del Libro"
              rules="required"
            >
              <b-form-input id="autor" v-model="solicitud.autor" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Fecha de Primera Publicación" label-for="fecha">
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
          <b-form-group label="Archivo PDF" label-for="file">
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
          <br />
          <hr />
          <br />
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BButton,
  BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import flatPickr from "vue-flatpickr-component";
import { required } from "@validations";
import axios from "axios";

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

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
        nombre: "",
        autor: "",
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
      const promesa = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
      return promesa;
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(async (success) => {
        if (success) {
          const userData = JSON.parse(localStorage.getItem("userData"));
          this.solicitud.idUser = userData.id;
          if (this.file) {
            this.solicitud.file = this.file.name;
            const result = await this.toBase64(this.file);
            this.solicitud.data = result.split(",")[1];
          } else {
            this.solicitud.file = "";
          }

          try{
            const resp = await axios.post(
              "http://34.72.218.226:7070/solicitud",
              this.solicitud
            );
            
            this.$router
              .replace('shop')
              .then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: "top-right",
                  props: {
                    title: 'Solicitud de Libro',
                    icon: "SaveIcon",
                    variant: "info",
                    text: `Solicitud de Libro Ingresada Correctamente!`,
                  },
                });
              });

          }catch(ex){
            this.$toast({
                component: ToastificationContent,
                position: 'top-center',
                props: {
                  title: 'Solicitud de Libro',
                  icon: 'AlertTriangleIcon',
                  variant: 'warning',
                  text: ex,
                },
              });
          }
          
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
