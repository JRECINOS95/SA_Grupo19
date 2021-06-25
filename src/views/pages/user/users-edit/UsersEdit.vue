<template>
  <component :is="userData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error Mostrando Información del Usuario
      </h4>
      <div class="alert-body">
        No se encontro el Usuario, regresa a la
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list' }"
        >
          Lista de Usuarios
        </b-link>
        para intentarlo nuevamente
      </div>
    </b-alert>

    <b-tabs
      v-if="userData"
      pills
    >
      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Información del Usuario</span>
        </template>
        <user-edit-tab-account
          :user-data="userData"
          class="mt-2 pt-75"
        />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue';
import axios from 'axios';
import { ref, onUnmounted } from '@vue/composition-api';
import router from '@/router';
import store from '@/store';
import UserEditTabAccount from './UserEditTabAccount.vue';

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    UserEditTabAccount,
  },
  setup() {
    const userData = ref(null);

    const USER_APP_STORE_MODULE_NAME = 'app-user';

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) {
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
      }
    });

    axios
      .get(`http://35.209.82.125:7000/usuario/${router.currentRoute.params.id}`)
      .then((response) => {
        userData.value = response.data;
      })
      .catch((error) => {
        // if (error.response.status === 404) {
        userData.value = undefined;
        // }
      });

    return {
      userData,
    };
  },
};
</script>

<style></style>
