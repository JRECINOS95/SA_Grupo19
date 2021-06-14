<template>
  <section class="app-ecommerce-details">
    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="product === undefined"
    >
      <h4 class="alert-heading">
        Error obteniendo la información del producto
      </h4>
      <div class="alert-body">
        No se obtuvieron resultados de este libro. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-e-commerce-shop' }"
        >
          Shop
        </b-link>
        for other items.
      </div>
    </b-alert>

    <!-- Content -->
    <b-card
      v-if="product"
      no-body
    >
      <b-card-body>
        <b-row class="my-2">
          <!-- Left: Product Image Container -->
          <b-col
            cols="12"
            md="5"
            class="d-flex align-items-center justify-content-center mb-2 mb-md-0"
          >
            <div class="d-flex align-items-center justify-content-center">
              <b-img
                :src="product.url"
                :alt="`Image of ${product.nombre}`"
                class="product-img"
                fluid
              />
            </div>
          </b-col>

          <!-- Right: Product Details -->
          <b-col
            cols="12"
            md="7"
          >
            <!-- Product Name -->
            <h4>{{ product.nombre }}</h4>

            <!-- Product Brand -->
            <b-card-text class="item-company mb-0">
              <span>by</span>
              <b-link class="company-name">
                {{ product.autor }}
              </b-link>
            </b-card-text>

            <!-- Price And Ratings -->
            <div class="ecommerce-details-price d-flex flex-wrap mt-1">
              <h4 class="item-price mr-1">
                Q{{ product.precio }}
              </h4>
              <ul class="unstyled-list list-inline pl-1 border-left">
                <li
                  v-for="star in 5"
                  :key="star"
                  class="ratings-list-item mr-25"
                >
                  <feather-icon
                    icon="StarIcon"
                    size="18"
                    :class="[
                      { 'fill-current': star <= 4 },
                      star <= 4 ? 'text-warning' : 'text-muted',
                    ]"
                  />
                </li>
              </ul>
            </div>

            <!-- Avability -->
            <b-card-text>
              {{ product.stock }} libros - <span class="text-success">en stock</span>
            </b-card-text>

            <!-- Product Meta [Free shpping, EMI, etc.] -->
            <ul class="product-features list-unstyled">
              <li>
                <feather-icon icon="ShoppingCartIcon" />
                <span>Free Shipping</span>
              </li>
            </ul>
            <hr>
            <div class="d-flex flex-column flex-sm-row pt-1">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0"
                @click="addCarretilla(product)"
              >
                <feather-icon
                  icon="ShoppingCartIcon"
                  class="mr-50"
                />
                <span>{{
                  isCarretilla(product.id) ? 'View In Cart' : 'Agregar a la carretilla'
                }}</span>
              </b-button>
              <b-dropdown
                variant="outline-secondary"
                no-caret
                toggle-class="btn-icon"
                class="btn-share"
                right
              >
                <template #button-content>
                  <feather-icon icon="Share2Icon" />
                </template>
                <b-dropdown-item
                  v-for="icon in ['FacebookIcon', 'TwitterIcon', 'YoutubeIcon', 'InstagramIcon']"
                  :key="icon"
                >
                  <feather-icon :icon="icon" />
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </b-col>
        </b-row>
      </b-card-body>

      <!-- Static Content -->
      <e-commerce-product-details-item-features />
    </b-card>
  </section>
</template>

<script>
import { useRouter } from '@core/utils/utils';
import { ref } from '@vue/composition-api';
import {
  BCard,
  BCardBody,
  BRow,
  BCol,
  BImg,
  BCardText,
  BLink,
  BButton,
  BDropdown,
  BDropdownItem,
  BAlert,
} from 'bootstrap-vue';
import axios from 'axios';
import Ripple from 'vue-ripple-directive';
import ECommerceProductDetailsItemFeatures from './ECommerceProductDetailsItemFeatures.vue';
import { useEcommerceUi } from '../useEcommerce';

export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BCard,
    BCardBody,
    BRow,
    BCol,
    BImg,
    BCardText,
    BLink,
    BButton,
    BDropdown,
    BDropdownItem,
    BAlert,

    // SFC
    ECommerceProductDetailsItemFeatures,
  },
  methods: {
    isCarretilla(id) {
      const userCart = JSON.parse(localStorage.getItem('userCart'));
      // eslint-disable-next-line no-restricted-syntax
      for (const element of userCart) {
        if (element.productId === id) return true;
      }
      return false;
    },
    addCarretilla(producto) {
      if (this.isCarretilla(producto.id)) {
        this.$router.replace('/checkout').then(() => {});
      } else {
        const userCart = JSON.parse(localStorage.getItem('userCart'));
        userCart.push({
          id: producto.id,
          productId: producto.id,
          product: producto,
          qty: 1,
        });
        localStorage.setItem('userCart', JSON.stringify(userCart));
        window.location.reload();
      }
    },
  },
  setup() {
    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi();

    const product = ref(null);

    // Remote Data
    const fetchProduct = async () => {
      // Get product  id from URL
      const { route } = useRouter();
      const productId = route.value.params.slug;
      try {
        const resp = await axios.get(`http://34.72.218.226:7070/libro/${productId}`);
        product.value = resp.data;
      } catch (err) {
        product.value = undefined;
      }
    };

    // UI
    const selectedColor = ref(null);

    fetchProduct();

    return {
      // Fetched Product
      product,

      // UI
      selectedColor,
      handleCartActionClick,
      toggleProductInWishlist,
    };
  },
};
</script>

<style lang="scss">
@import '~@core/scss/base/pages/app-ecommerce-details.scss';
</style>
