<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="bookData.url"
          :text="`${avatarText(bookData.nombre + ' - ' + bookData.autor)}`"
          :variant="`light-success`"
          size="140px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ bookData.nombre }}
      </h4>
      <h5>{{ bookData.autor }}</h5>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            label="Nombre"
            label-for="nombre"
          >
            <b-form-input
              id="nombre"
              v-model="bookData.nombre"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            label="Autor"
            label-for="autor"
          >
            <b-form-input
              id="autor"
              v-model="bookData.autor"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            label="Stock"
            label-for="stock"
          >
            <b-form-input
              id="stock"
              v-model="bookData.stock"
              type="number"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            label="Precio"
            label-for="precio"
          >
            <b-form-input
              id="precio"
              v-model="bookData.precio"
              type="number"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="6"
        >
          <b-form-group
            label="Url Imagén"
            label-for="url"
          >
            <b-form-input
              id="url"
              v-model="bookData.url"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="6"
        >
          <b-form-group
            label="Generos Literarios"
            label-for="url"
          >
            <v-select
              v-model="bookData.generos"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="nombre"
              :options="option"
              multiple
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      @click="updateLibro"
    >
      Guardar Cambios
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
    >
      Reset
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  // BTable,
  // BCard,
  // BCardHeader,
  // BCardTitle,
  // BFormCheckbox,
} from 'bootstrap-vue';
import axios from 'axios';
import vSelect from 'vue-select';
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils';
import { ref } from '@vue/composition-api';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    // BTable,
    // BCard,
    // BCardHeader,
    // BCardTitle,
    // BFormCheckbox,
    vSelect,
  },
  props: {
    bookData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      option: [],
    };
  },
  async beforeCreate() {
    try {
      const resp = await axios.get('http://34.72.218.226:7070/libro/genero');
      this.option = resp.data;
    } catch (err) {
      this.option = [];
    }
  },
  setup(props) {
    const roleOptions = [
      { label: 'Administrador', value: 'ADMINISTRADOR' },
      { label: 'Cliente', value: 'CLIENTE' },
      { label: 'Editorial', value: 'EDITORIAL' },
    ];

    const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },
      {
        module: 'Author',
        read: true,
        write: false,
        create: true,
        delete: false,
      },
      {
        module: 'Contributor',
        read: false,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ];

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null);
    const previewEl = ref(null);

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, (base64) => {
      // eslint-disable-next-line no-param-reassign
      props.bookData.avatar = base64;
    });

    return {
      roleOptions,
      permissionsData,
      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    };
  },
  methods: {
    getStatus(status) {
      if (status === 'ACTIVO') return 'success';
      if (status === 'PENDIENTE') return 'warning';
      return 'primary';
    },
    avatarText(value) {
      if (!value) return '';
      const nameArray = value.split(' ');
      return nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
    },
    async updateLibro() {
      try {
        const resp = await axios.put('http://34.72.218.226:7070/libro', {
          idLibro: this.bookData.id,
          nombre: this.bookData.nombre,
          autor: this.bookData.autor,
          stock: this.bookData.stock,
          url: this.bookData.url,
          rol: this.bookData.rol,
          precio: this.bookData.precio,
          generos: this.bookData.generos,
        });
        this.$router.replace('/libro').then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Registro Actualizado!',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Se ha actualizado correctamente el Libro!',
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
            text: 'Libro no Actualizado!',
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
