<template>
  <b-card
    class="card-payment"
    style="margin-left:-22%"
  >
    <b-card-title>Cálculo de Impuestos de Importación</b-card-title>
    <b-card-body>
      <!-- form -->
      <b-form>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Pais de Imporación"
              label-for="pais"
              class="mb-2"
            >
               <v-select
                v-model="pais"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="pais"
                :options="paises"
              />
              <div class="mt-1">
                Valor del Impuesto: <strong>{{ pais.impuesto }}% + 12% IVA</strong>
              </div>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              label="Valor Unitario"
              label-for="precio"
              class="mb-2"
            >
              <b-input-group
                prepend="$"
                append=".00"
                class="input-group-merge"
              >
                <b-form-input placeholder="100" v-model="precio" />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
              label="Cantidad"
              label-for="cantidad"
              class="mb-2"
            >
               <b-form-spinbutton
                id="sb-inline"
                v-model="cantidad"
              />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group
              label="Shiping"
              label-for="shiping"
              class="mb-2"
            >
              <b-input-group
                prepend="$"
                append=".00"
                class="input-group-merge"
              >
                <b-form-input placeholder="100" v-model="shiping" />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              block
              variant="primary"
              @click="calcular()"
            >
              Calcular Impuestos
            </b-button>
          </b-col>
        </b-row>
      </b-form>
      <!--/ form -->
    </b-card-body>
    <b-card-header>
      <b-card-title style="margin-left:33%;" >
        <b-table
          :items="items"
          :fields="fields"
          :tbody-tr-class="rowClass"
          class="rounded-bottom"
        />
      </b-card-title>
    </b-card-header>
  </b-card>
</template>

<script>
import {
  BInputGroup, BFormSpinbutton, BCard, BCardHeader, BCardTitle, BCardBody, BRow, BCol, BFormGroup, BFormInput, BButton, BForm,
} from 'bootstrap-vue'
import Cleave from 'vue-cleave-component'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { BFormSelect } from 'bootstrap-vue'
import axios from 'axios';
import { BTable } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BTable,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BRow,
    BFormSelect,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormSpinbutton ,
    Cleave,
    BButton,
    vSelect,
  },
  directives: {
    Ripple,
  },
  async beforeCreate() {
    try {
      const resp = await axios.get(`http://34.72.218.226:6070/impuesto`);
      this.paises = resp.data;
    } catch (err) {
      this.registros = [];
    }
  },
  data() {
    return {
      paises: [],
      pais: 0,
      precio: 0,
      cantidad: 0,
      shiping: 0,
      total: 0,
      fields: ['rubro',  { key: 'monto', variant: 'primary' }],
      items: [
        { monto: 0.0, rubro: 'Costo Total ($)'},
        { monto: 0.0, rubro: 'Impuesto Importación ($)'},
        { monto: 0.0, rubro: 'IVA ($)'},
        {
          monto: 0.0, rubro: 'Total ($)', status: 'awesome',
        },
      ],
    }
  },
  methods: {
    calcular(){
      // console.log(this.pais.impuesto)
      this.items[0].monto = (Number(this.precio) * Number(this.cantidad)) + Number(this.shiping);
      this.items[1].monto = (((Number(this.pais.impuesto))/100) * Number(this.items[0].monto)).toFixed(2);
      this.items[2].monto = (0.12 * Number(this.items[0].monto)).toFixed(2);
      this.items[3].monto  = (Number(this.items[0].monto) + Number(this.items[1].monto) + Number(this.items[2].monto)).toFixed(2);
    },
    rowClass(item, type) {
      const colorClass = 'table-primary'
      if (!item || type !== 'row') { return }

      // eslint-disable-next-line consistent-return
      if (item.status === 'awesome') { return colorClass }
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
