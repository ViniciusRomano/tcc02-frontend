<template>
  <div class="row row-equal">
    <div class="flex md8">
      <va-card v-if="lineChartData">
        <va-card-title>
          <h1>Monitor em tempo real</h1>
          <div class="mr-0 text-right">
            <span class="mr-2">
              <va-button size="small" color="primary" @click="createValue" :disabled="lineChartData.labels.length < 2">
                Simular Novo Registro
              </va-button>
            </span>
            <span>
              <va-button size="small" :color="createOnSimulate ? colorButton.active : colorButton.inactive"
                @click="changeStatusSimulate" :disabled="lineChartData.labels.length < 2">
                {{ createOnSimulate ? 'Desligar Simulador' : 'Ligar Simulador' }}
              </va-button>
            </span>
          </div>
        </va-card-title>
        <va-card-content>
          <va-chart class="chart" ref="lineChart" :data="lineChartData" type="line" />
        </va-card-content>
      </va-card>
    </div>

    <!-- <div class="flex xs12 md6 xl3">
      <va-card class="d-flex">
        <va-card-title>
          <h1>{{ $t('dashboard.charts.loadingSpeed') }}</h1>
          <div class="mr-0 text-right">
            <va-button
              icon="print"
              flat
              class="mr-0"
              @click="printChart"
            />
          </div>

        </va-card-title>
        <va-card-content v-if="donutChartData">
          <va-chart class="chart chart--donut" :data="donutChartData" type="donut"/>
        </va-card-content>
      </va-card>
    </div>

    <div class="flex xs12 md6 xl3">
      <dashboard-contributors-chart/>
    </div> -->
  </div>
</template>

<script>
import { getDonutChartData } from '@/data/charts/DonutChartData'
import { getLineChartData, simulateCreateData } from '@/data/charts/LineChartAxiosData'
import VaChart from '@/components/va-charts/VaChart.vue'
import DashboardContributorsChart from './DashboardContributorsList'
import { useGlobalConfig } from 'vuestic-ui'
import { socket } from '../../../services/vuestic-ui/socket'

// const socket = io('http://localhost:3000', { path: '/socket.io' });

export default {
  name: 'dashboard-charts',
  components: { DashboardContributorsChart, VaChart },
  data() {
    return {
      lineChartData: null,
      donutChartData: null,
      lineChartFirstMonthIndex: 0,
      createOnSimulate: false
    }
  },
  async mounted() {
    const _this = this;
    this.lineChartData = await getLineChartData(this.theme)
    this.donutChartData = getDonutChartData(this.theme)

    socket.on('CREATE_SensorValue', function (msg) {
      _this.insertNewValue(msg.formatedValue)
    });

    setInterval(() => {
      if (this.createOnSimulate) {
        this.createValue();
      }
    }, 5000);
  },
  watch: {
    '$themes.primary'() {
      this.lineChartData = getLineChartData(this.theme)
      this.donutChartData = getDonutChartData(this.theme)
    },

    '$themes.info'() {
      this.lineChartData = getLineChartData(this.theme)
      this.donutChartData = getDonutChartData(this.theme)
    },

    '$themes.danger'() {
      this.donutChartData = getDonutChartData(this.theme)
    },
  },
  methods: {
    async createValue() {
      await simulateCreateData()
      //this.refreshValues()
    },
    async changeStatusSimulate() {
      this.createOnSimulate = !this.createOnSimulate
    },
    async refreshValues() {
      this.lineChartData = await getLineChartData(this.theme)
    },
    insertNewValue(value) {
      let cloneData = { ...this.lineChartData }
      let dataset = { ...cloneData.datasets[0] };

      dataset.data = dataset.data.slice(1).concat([value])
      cloneData.datasets = [dataset]

      this.lineChartData = cloneData;
    },
    printChart() {
      const win = window.open('', 'Print', 'height=600,width=800')
      win.document.write(`<br><img src='${this.donutChartDataURL}'/>`)
      // TODO: find better solution how to remove timeout
      setTimeout(() => {
        win.document.close()
        win.focus()
        win.print()
        win.close()
      }, 200)
    }
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors
    },
    donutChartDataURL() {
      return document.querySelector('.chart--donut canvas').toDataURL('image/png')
    },
    colorButton() {
      return {
        active: 'danger',
        inactive: 'success'
      }
    }
  },
}
</script>

<style scoped>
.chart {
  height: 400px;
}

.text-right {
  text-align: right;
}
</style>
