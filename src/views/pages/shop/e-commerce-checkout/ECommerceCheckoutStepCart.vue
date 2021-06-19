<template>
  <div class="list-view product-checkout mt-0">
    <!-- Products List -->
    <div class="checkout-items">
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card"
        no-body
      >
        <!-- Product Image -->
        <div class="item-img">
          <b-link>
            <b-img
              :src="product.product.url"
              :alt="`${product.product.nombre}-${product.product.id}`"
            />
          </b-link>
        </div>

        <!-- Product Details: Card Body -->
        <b-card-body>
          <div class="item-name">
            <h6 class="mb-0">
              <b-link class="text-body">
                {{ product.product.nombre }}
              </b-link>
            </h6>
            <span
              class="item-company"
            >By <b-link class="company-name">{{ product.product.autor }}</b-link></span>
            <div class="item-rating">
              <ul class="unstyled-list list-inline">
                <li
                  v-for="star in 5"
                  :key="star"
                  class="ratings-list-item"
                  :class="{ 'ml-25': star - 1 }"
                >
                  <feather-icon
                    icon="StarIcon"
                    size="16"
                    :class="[
                      { 'fill-current': star <= 4 },
                      star <= 4 ? 'text-warning' : 'text-muted',
                    ]"
                  />
                </li>
              </ul>
            </div>
          </div>
          <span class="text-success mb-1">En Stock</span>
          <div class="item-quantity">
            <span class="quantity-title">Cantidad:</span>
            <b-form-spinbutton
              v-model="product.qty"
              size="sm"
              class="ml-75"
              inline
              @change="agregarValor(product)"
            />
          </div>
          <span
            class="delivery-date text-muted"
          >Se programará el envío el día
            {{
              formatDate(new Date() + 1, { month: 'short', day: 'numeric', weekday: 'short' })
            }}</span>
        </b-card-body>

        <!-- Product Options/Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">
                ${{ product.product.precio }}
              </h4>
              <p class="card-text shipping">
                <b-badge
                  pill
                  variant="light-success"
                >
                  Envío Gratis
                </b-badge>
              </p>
            </div>
          </div>
          <b-button
            variant="light"
            class="mt-1 remove-wishlist"
            @click="deleteProductoCart(product.id)"
          >
            <feather-icon
              icon="XIcon"
              class="mr-50"
            />
            <span>Eliminar</span>
          </b-button>
        </div>
      </b-card>
    </div>

    <!-- Checkout Options -->
    <div class="checkout-options">
      <b-card>
        <label class="section-label mb-1">Descripción del Pago</label>
        <hr>
        <div class="price-details">
          <h6 class="price-title">
            Precio Detalles
          </h6>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title">
                Total de Articulos
              </div>
              <div class="detail-amt">
                Q{{ precio }}
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Impuesto Total
              </div>
              <div class="detail-amt">
                Q{{ impuestos }}
              </div>
            </li>
            <li class="price-detail">
              <div class="detail-title">
                Cargos por Envío
              </div>
              <div class="detail-amt discount-amt text-success">
                Envío Gratis
              </div>
            </li>
          </ul>
          <hr>
          <ul class="list-unstyled">
            <li class="price-detail">
              <div class="detail-title detail-total">
                Total
              </div>
              <div class="detail-amt font-weight-bolder">
                Q{{ total }}
              </div>
            </li>
          </ul>
          <b-button
            variant="primary"
            block
            @click="$emit('next-step')"
          >
            Proceder con Orden
          </b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@core/utils/filter';
import {
  BCard, BCardBody, BLink, BImg, BButton, BBadge, BFormSpinbutton,
} from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BCardBody,
    BLink,
    BImg,
    BButton,
    BBadge,
    BFormSpinbutton,
  },
  data() {
    return {
      precio: 0,
      impuestos: 0,
      total: 0,
      products: [],
    };
  },
  beforeMount() {
    const userCart = JSON.parse(localStorage.getItem('userCart'));
    this.products = userCart;
    this.calcularMontos();
  },
  methods: {
    agregarValor(product) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          if (this.products[i].product.stock < product.qty) {
            // eslint-disable-next-line operator-assignment
            this.products[i].qty = this.products[i].qty - 1;
          }
          break;
        }
      }
      this.calcularMontos();
    },
    calcularMontos() {
      this.precio = 0;
      this.impuestos = 0;
      this.total = 0;
      // eslint-disable-next-line no-restricted-syntax
      this.products.forEach((element) => {
        this.precio += Math.round(element.qty * element.product.precio);
        this.impuestos += Math.round(element.product.precio * 0.12);
      });
      this.total = Math.round(this.precio + this.impuestos);
      if (this.products.length !== 0) localStorage.setItem('userCart', JSON.stringify(this.products));
      else localStorage.setItem('userCart', JSON.stringify([]));
    },
    deleteProductoCart(id) {
      let contador = -1;
      // eslint-disable-next-line no-restricted-syntax
      for (const element of this.products) {
        contador += 1;
        if (element.id === id) break;
      }
      this.products.splice(contador, 1);
      this.calcularMontos();
    },
  },
  setup() {
    return {
      formatDate,
    };
  },
};
</script>
