<template>
  <div style="height: inherit">
    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="ecommerce-header-items">
            <div class="result-toggler">
              <feather-icon
                icon="MenuIcon"
                class="d-block d-lg-none"
                size="21"
                @click="mqShallShowLeftSidebar = true"
              />
              <div class="search-results">
                {{ totalProducts }} Resultados Encontrados
              </div>
            </div>
            <div class="view-options d-flex">
              <!-- Sort Button -->
              <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="sortBy.text"
                right
                variant="outline-primary"
              >
                <b-dropdown-item
                  v-for="sortOption in sortByOptions"
                  :key="sortOption.value"
                  @click="sortBy = sortOption"
                >
                  {{ sortOption.text }}
                </b-dropdown-item>
              </b-dropdown>


              <!-- Item View Radio Button Group  -->
              <b-form-radio-group
                v-model="itemView"
                class="ml-1 list item-view-radio-group"
                buttons
                size="sm"
                button-variant="outline-primary"
              >
                <b-form-radio
                  v-for="option in itemViewOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <feather-icon
                    :icon="option.icon"
                    size="18"
                  />
                </b-form-radio>
              </b-form-radio-group>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Buscar Libro"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>


    <!-- Prodcuts -->
    <section :class="itemView">
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card"
        no-body
      >
        <div
          class="item-img text-center"
          style="display:block"
        >
          <center>
            <b-link :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.id } }">
              <b-img
                :alt="`${product.nombre}-${product.id}`"
                fluid
                width="300px"
                height="300px"
                :src="product.url"
              />
            </b-link>
          </center>
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
            <div>
              <h6 class="item-price">
                Q{{ product.precio }}
              </h6>
            </div>
          </div>
          <h6 class="item-name">
            <b-link
              class="text-body"
              :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"
            >
              {{ product.nombre }}
            </b-link>
          </h6>
          <b-card-text class="item-description">
            {{ product.autor }}
          </b-card-text>
        </b-card-body>

        <!-- Product Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">
                Q{{ product.precio }}
              </h4>
            </div>
          </div>
          <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            @click="addCarretilla(product)"
          >
            <feather-icon
              icon="ShoppingCartIcon"
              class="mr-50"
            />
            <span>{{
              isCarretilla(product.id) ? 'Ver en la Carretilla' : 'Agregar a la Carretilla'
            }}</span>
          </b-button>
        </div>
      </b-card>
    </section>


    <!-- Pagination -->
    <section>
      <b-row>
        <b-col cols="12">
          <b-pagination
            v-model="filters.page"
            total-rows="10"
            :per-page="filters.perPage"
            first-number
            align="center"
            last-number
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </section>


    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-detached-left">
      <shop-left-filter-sidebar
        :filters="filters"
        :filter-options="filterOptions"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
      />
    </portal>
  </div>
</template>

<script>
import {
  BDropdown,
  BDropdownItem,
  BFormRadioGroup,
  BFormRadio,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BCard,
  BCardBody,
  BLink,
  BImg,
  BCardText,
  BButton,
  BPagination,
} from 'bootstrap-vue';
import axios from 'axios';
import store from '@/store';
import Ripple from 'vue-ripple-directive';
import { watch } from '@vue/composition-api';
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app';
import { useRouter } from '@core/utils/utils';
import { useShopFiltersSortingAndPagination, useShopUi } from './useECommerceShop';
import ShopLeftFilterSidebar from './ECommerceShopLeftFilterSidebar.vue';
import { useEcommerceUi } from './useEcommerce';


export default {
  directives: {
    Ripple,
  },
  components: {
    // BSV
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,

    // SFC
    ShopLeftFilterSidebar,
  },
  data() {
    return {
      products: [],
    };
  },
  async beforeCreate() {
    try {
      const resp = await axios.get('http://34.72.218.226:7070/libro/stock');
      this.products = resp.data;
    } catch (err) {
      this.products = [];
    }
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
        store.commit(
          'app-ecommerce/UPDATE_CART_ITEMS_COUNT',
          store.state['app-ecommerce'].cartItemsCount + 1,
        );
        window.location.reload();
      }
    },
  },
  setup() {
    const { router } = useRouter();
    const {
      filters, filterOptions, sortBy, sortByOptions,
    } = useShopFiltersSortingAndPagination();

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi();

    const { itemView, itemViewOptions, totalProducts } = useShopUi();

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility();

    // Wrapper Function for `fetchProducts` which
    // can be triggered initially and upon changes of filters
    const fetchShopProducts = () => {
      // fetchProducts({
      //   q: filters.value.q,
      //   sortBy: sortBy.value.value,
      //   page: filters.value.page,
      //   perPage: filters.value.perPage,
      // }).then((response) => {
      //   products.value = response.data.products;
      //   totalProducts.value = response.data.total;
      // });
    };

    fetchShopProducts();


    watch(
      [filters, sortBy],
      () => {
        fetchShopProducts();
      },
      {
        deep: true,
      },
    );

    return {
      // useShopFiltersSortingAndPagination
      filters,
      filterOptions,
      sortBy,
      sortByOptions,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,
      // mqShallShowLeftSidebar
      mqShallShowLeftSidebar,
    };
  },
};
</script>

<style lang="scss">
@import '~@core/scss/base/pages/app-ecommerce.scss';
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
