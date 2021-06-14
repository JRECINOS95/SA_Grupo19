<template>
  <div class="list-view product-checkout">
    <!-- Left Card -->
    <b-card no-body>
      <b-card-header class="flex-column align-items-start">
        <b-card-title>Opciones de Pago</b-card-title>
        <b-card-text class="text-muted mt-25">
          Aegurate de seleccionar la opción de pago correcta
        </b-card-text>
      </b-card-header>
      <b-card-body>
        <h6 class="card-holder-name my-75">
          {{ usuario.primer_nombre + ' ' + usuario.primer_apellido }}
        </h6>
        <br>
        <!-- Radios -->
        <b-form-group>
          <b-form-radio
            v-model="tipoPago"
            name="payment-method"
            value="TARJETA_GUARDADA"
            checked="TARJETA_GUARDADA"
          >
            Tarjeta de Crédito 12XX XXXX XXXX 0000
          </b-form-radio>
          <div class="d-flex flex-wrap align-items-center justify-content-start my-1">
            <label
              for="cvv"
              class="text-nowrap mr-1 mb-1"
            >
              Ingresa CVV:
            </label>
            <b-form-input
              id="cvv"
              v-model="cvv"
              class="mr-1 mb-1"
              trim
            />
            <b-button
              variant="primary"
              class="mb-1"
              @click="guardarOrden"
            >
              Continuar
            </b-button>
          </div>

          <hr class="mb-2 mt-1">

          <b-form-radio
            v-model="tipoPago"
            name="payment-method"
            class="mt-1"
            value="TRANSFERENCIA_BANCARIA"
          >
            Transferencia Bancaria
          </b-form-radio>
          <b-form-radio
            v-model="tipoPago"
            name="payment-method"
            class="mt-1"
            value="PAGO_TARJETA"
          >
            Pago contra entrega Tarjeta
          </b-form-radio>
          <b-form-radio
            v-model="tipoPago"
            name="payment-method"
            class="mt-1"
            value="PAGO_EFECTIVO"
          >
            Pago contra entrega Efectivo
          </b-form-radio>
        </b-form-group>

        <hr class="my-2">
      </b-card-body>
    </b-card>

    <!-- Right Card -->
    <div class="amount-payable checkout-options">
      <b-card title="Detalle de Pago">
        <ul class="list-unstyled price-details">
          <li class="price-detail">
            <div class="details-title">
              Precio de {{ libros }} libros
            </div>
            <div class="detail-amt">
              <strong>Q{{ precio }}</strong>
            </div>
          </li>
          <li class="price-detail">
            <div class="details-title">
              Cargos por Envío
            </div>
            <div class="detail-amt discount-amt text-success">
              Free
            </div>
          </li>
        </ul>
        <hr>
        <ul class="list-unstyled price-details">
          <li class="price-detail">
            <div class="details-title">
              Total con Impuestos
            </div>
            <div class="detail-amt font-weight-bolder">
              Q{{ total }}
            </div>
          </li>
        </ul>
      </b-card>
      <hr>
      <b-button
        variant="primary"
        block
        @click="guardarOrden"
      >
        Proceder con Orden
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BFormGroup,
  BFormRadio,
  BFormInput,
  BButton,
} from 'bootstrap-vue';
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    // BSV
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BFormGroup,
    BFormRadio,
    BFormInput,
    BButton,
  },
  props: {
    paymentDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      precio: 0,
      impuestos: 0,
      total: 0,
      libros: 0,
      usuario: null,
      cvv: '',
      tipoPago: 'TARJETA_GUARDADA',
    };
  },
  beforeMount() {
    this.usuario = JSON.parse(localStorage.getItem('userData'));
    const products = JSON.parse(localStorage.getItem('userCart'));
    this.precio = 0;
    this.impuestos = 0;
    this.total = 0;
    this.libros = products.length;
    // eslint-disable-next-line no-restricted-syntax
    products.forEach((element) => {
      this.precio += element.qty * element.product.precio;
      this.impuestos += element.product.precio * 0.12;
    });
    this.total = this.precio + this.impuestos;
  },
  methods: {
    guardarOrden() {
      localStorage.setItem('userCart', JSON.stringify([]));
      localStorage.setItem('userDirShop', '');
      this.$router.replace('/shop').then(() => {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Compra Exitosa',
            icon: 'CoffeeIcon',
            variant: 'success',
            text: 'Compra efectuada exitosamente!',
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#cvv {
  width: auto;
}
</style>
