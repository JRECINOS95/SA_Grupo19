<template>
  <component :is="bookData === undefined ? 'div' : 'b-card'">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="bookData === undefined"
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
      v-if="bookData"
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
          <span class="d-none d-sm-inline">Información del Libro</span>
        </template>
        <book-edit-tab-account
          :book-data="bookData"
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
import BookEditTabAccount from './BookEditTabAccount.vue';

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    BookEditTabAccount,
  },
  setup() {
    const bookData = ref(null);

    const USER_APP_STORE_MODULE_NAME = 'app-user';

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) {
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
      }
    });

    axios
      .get(`http://34.72.218.226:7070/libro/${router.currentRoute.params.id}`)
      .then((response) => {
        bookData.value = response.data;
      })
      .catch((error) => {
        // if (error.response.status === 404) {
        bookData.value = undefined;
        // }
      });

    return {
      bookData,
    };
  },
};
</script>

<style></style>
