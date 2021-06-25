<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          src="https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"
          :text="`${avatarText(userData.primer_nombre + ' ' + userData.primer_nombre)}`"
          :variant="`light-${getTypeRol(userData.rol)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.primer_nombre +' '+userData.primer_apellido }}
      </h4>
      <!-- <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Remove</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div> -->
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
            v-if="userData.rol !== 'EDITORIAL'"
            label="Primer Nombre"
            label-for="primer_nombre"
          >
            <b-form-input
              id="primer_nombre"
              v-model="userData.primer_nombre"
            />
          </b-form-group>
        </b-col>

        <b-col
          v-if="userData.rol !== 'EDITORIAL'"
          cols="6"
          md="3"
        >
          <b-form-group
            v-if="userData.rol !== 'EDITORIAL'"
            label="Segundo Nombre"
            label-for="segundo_nombre"
          >
            <b-form-input
              id="segundo_nombre"
              v-model="userData.segundo_nombre"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            v-if="userData.rol !== 'EDITORIAL'"
            label="Primer Apellido"
            label-for="primer_apellido"
          >
            <b-form-input
              id="primer_apellido"
              v-model="userData.primer_apellido"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="6"
          md="3"
        >
          <b-form-group
            v-if="userData.rol !== 'EDITORIAL'"
            label="Segundo Apellido"
            label-for="segundo_apellido"
          >
            <b-form-input
              id="segundo_apellido"
              v-model="userData.segundo_apellido"
            />
          </b-form-group>
        </b-col>
        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            v-if="userData.rol === 'EDITORIAL'"
            label="Nombre Editorial"
            label-for="primer_nombre"
          >
            <b-form-input
              id="primer_nombre"
              v-model="userData.primer_nombre"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Username"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="userData.username"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status -->
        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Télefono"
            label-for="telefono"
          >
            <b-form-input
              id="telefono"
              v-model="userData.telefono"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Role -->
        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Rol del Usuario"
            label-for="user-role"
          >
            <v-select
              v-model="userData.rol"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="roleOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

        <b-col
          cols="12"
          md="3"
        >
          <b-form-group
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="userData.password"
              type="password"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Direccion -->
        <b-col
          v-if="userData.rol === 'EDITORIAL'"
          cols="12"
          md="12"
        >
          <b-form-group
            label="Direccion"
            label-for="direccion"
          >
            <b-form-input
              id="direccion"
              v-model="userData.direccion"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <!-- PERMISSION TABLE -->
    <!-- <b-card
      no-body
      class="border mt-1"
    >
      <b-card-header class="p-1">
        <b-card-title class="font-medium-2">
          <feather-icon
            icon="LockIcon"
            size="18"
          />
          <span class="align-middle ml-50">Permission</span>
        </b-card-title>
      </b-card-header>
      <b-table
        striped
        responsive
        class="mb-0"
        :items="permissionsData"
      >
        <template #cell(module)="data">
          {{ data.value }}
        </template>
        <template #cell()="data">
          <b-form-checkbox :checked="data.value" />
        </template>
      </b-table>
    </b-card> -->

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="updateUser"
    >
      Guardar Cambios
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
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
    userData: {
      type: Object,
      required: true,
    },
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
      props.userData.avatar = base64;
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
    getTypeRol(role) {
      if (role === 'ADMINISTRADOR') return 'primary';
      if (role === 'EDITORIAL') return 'warning';
      if (role === 'CLIENTE') return 'success';
      return 'primary';
    },
    getStatus(status) {
      if (status === 'ACTIVO') return 'success';
      if (status === 'PENDIENTE') return 'warning';
      return 'primary';
    },
    getUserRoleIcon(role) {
      if (role === 'ADMINISTRADOR') return 'UserIcon';
      if (role === 'EDITORIAL') return 'ShoppingCartIcon';
      if (role === 'CLIENTE') return 'ShoppingBagIcon';
      return 'UserIcon';
    },
    avatarText(value) {
      if (!value) return '';
      const nameArray = value.split(' ');
      return nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
    },
    async updateUser() {
      try {
        const resp = await axios.put('http://35.209.82.125:7000/usuario', {
          idUser: this.userData.id,
          primerNombre: this.userData.primer_nombre,
          segundoNombre: this.userData.segundo_nombre,
          primerApellido: this.userData.primer_apellido,
          segundoApellido: this.userData.segundo_apellido,
          rol: this.userData.rol,
          username: this.userData.username,
          password: this.userData.password,
          telefono: this.userData.telefono,
          direccion: this.userData.direccion,
        });
        this.$router.replace('/user').then(() => {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Registro Actualizado!',
              icon: 'CoffeeIcon',
              variant: 'success',
              text: 'Se ha actualizado correctamente el Usuario!',
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
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
