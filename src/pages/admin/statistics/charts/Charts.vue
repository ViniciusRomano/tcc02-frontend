<template>
  <div class="charts" v-if="isMounted">
    <!-- <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.verticalBarChart')"
        >
          <va-card-content>
            <va-chart :data="verticalBarChartData" type="vertical-bar"/>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.horizontalBarChart')"
        >
          <va-card-content>
            <va-chart :data="horizontalBarChartData" type="horizontal-bar"/>
          </va-card-content>
        </va-card>
      </div>
    </div> -->
    <div class="d-flex mb-3">
      <va-button size="medium" @click="setDate('HOUR')" color="dark" class="mr-2">
        {{ 'Última Hora' }}
      </va-button>
      <va-button size="medium" @click="setDate('TODAY')" color="dark" class="mr-2">
        {{ 'Hoje' }}
      </va-button>
      <va-button size="medium" @click="setDate('7_DAYS')" color="dark" class="mr-2">
        {{ 'Últimos 7 dias' }}
      </va-button>
      <va-button size="medium" @click="setDate('15_DAYS')" color="dark" class="mr-2">
        {{ 'Últimos 15 dias' }}
      </va-button>
      <va-button size="medium" @click="setDate('30_DAYS')" color="dark" class="mr-2">
        {{ 'Últimos 30 dias' }}
      </va-button>
      <va-button size="medium" @click="setDate('90_DAYS')" color="dark" class="mr-2">
        {{ 'Últimos 90 dias' }}
      </va-button>
    </div>


    <div class="row">
      <div class="flex xs6">
        <va-select :label="'Equipamentos'" v-model="device" textBy="dev_name" track-by="id" :options="devices" />
      </div>
      <div class="flex xs6">
        <Datepicker locale="pt-BR" cancelText="Cancelar" selectText="Selecionar" class="mb-4" v-model="date" modelAuto
          range enterSubmit :format="'dd/MM/yyyy HH:mm'" @update:modelValue="refreshData" />
      </div>


    </div>


    <!-- <div class="row">
    </div> -->

    <div class="row">
      <div class="flex xs12 sm2" v-for="(info, idx) in infoTiles" :key="idx">
        <va-card class="mb-4" :color="info.color">
          <va-card-content>
            <p class="display-3 mb-0" style="color: white;">{{ info.value }}</p>
            <p style="color: white;">{{ $t(info.text) }}</p>
          </va-card-content>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md12 xs12">
        <va-card class="chart-widget" :title="$t('charts.lineChart')">
          <va-card-title>
            <h1>Quantidade de medições realidas: {{ data.count }}</h1>
          </va-card-title>
          <va-card-content>
            <va-chart class="chart" :data="lineChartData" type="line" />
          </va-card-content>
        </va-card>
      </div>
    </div>

    <!-- <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.pieChart')"
        >
          <va-card-content>
            <va-chart :data="pieChartData" type="pie"/>
          </va-card-content>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.donutChart')"
        >
          <va-card-content>
            <va-chart :data="donutChartData" type="donut"/>
          </va-card-content>
        </va-card>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.bubbleChart')"
        >
          <va-card-content>
            <va-chart :data="bubbleChartData" type="bubble"/>
          </va-card-content>
        </va-card>
      </div>
    </div> -->
  </div>
</template>

<script>
import VaChart from '@/components/va-charts/VaChart'
import { getLineChartData } from '@/data/charts/ReportChart'
import { getBubbleChartData } from '@/data/charts/BubbleChartData'
import { getPieChartData } from '@/data/charts/PieChartData'
import { getDonutChartData } from '@/data/charts/DonutChartData'
import { getVerticalBarChartData } from '@/data/charts/VerticalBarChartData'
import { getHorizontalBarChartData } from '@/data/charts/HorizontalBarChartData'
import { useGlobalConfig } from 'vuestic-ui'
import moment from "moment";
import { getDevices } from '@/data/charts/Devices'

export default {
  name: 'charts',
  components: { VaChart },
  data() {
    return {
      date: null,
      data: { count: 0 },
      device: {id:null},
      devices: {},
      bubbleChartData: null,
      lineChartData: null,
      pieChartData: null,
      donutChartData: null,
      verticalBarChartData: null,
      horizontalBarChartData: null,
      isMounted: false,
      infoTiles: [{
        color: 'primary',
        value: '',
        text: 'Média',
        icon: '',
      }, {
        color: 'primary',
        value: '',
        text: 'Mediana',
        icon: '',
      }, {
        color: 'primary',
        value: '',
        text: 'Medição mínima',
        icon: '',
      }, {
        color: 'primary',
        value: '',
        text: 'Medição máxima',
        icon: '',
      },
      {
        color: 'primary',
        value: '',
        text: 'Potência Média',
        icon: '',
      },
      {
        color: 'primary',
        value: '',
        text: 'Valor Gasto (R$)',
        icon: '',
      }
      ],
    }
  },
  async mounted() {
    this.devices = await getDevices()
    this.isMounted = true
    this.bubbleChartData = getBubbleChartData(this.theme)
    this.pieChartData = getPieChartData(this.theme)
    this.donutChartData = getDonutChartData(this.theme)
    this.verticalBarChartData = getVerticalBarChartData(this.theme)
    this.horizontalBarChartData = getHorizontalBarChartData(this.theme)

    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));

    this.date = [startDate, endDate];

    await this.refreshData()
    // const data = await getLineChartData(this.theme, { dateInit: moment(startDate).format('YYYY-MM-DD HH:mm:ss'), dateEnd: moment(endDate).format('YYYY-MM-DD HH:mm:ss') })
    // this.lineChartData = data.generatedData;
    // this.data = data.data;

  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors
    }
  },
  methods: {
    async refreshData() {
      const myDate = this.date[0] ? { dateInit: moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss'), dateEnd: moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss') } : { date: moment(this.date).format('YYYY-MM-DD') };
      console.log(this.device)
      const data = await getLineChartData(this.theme, myDate, this.device.id)
      this.lineChartData = data.generatedData;
      this.data = data.data;
      this.infoTiles[0].value = this.data.avg ? `${this.data.avg} A` : '-'
      this.infoTiles[1].value = this.data.median ? `${this.data.median} A` : '-'
      this.infoTiles[2].value = this.data.min ? `${this.data.min} A` : '-'
      this.infoTiles[3].value = this.data.max ? `${this.data.max} A` : '-'

      const priceKWH = 2.08;
      const potenciaMedia = (this.data.avg * 127) / 1000
      const price = ((potenciaMedia * this.data.hours) * priceKWH).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })

      this.infoTiles[4].value = this.data.avg ? `${parseFloat(potenciaMedia.toFixed(2))} kW` : '-'
      this.infoTiles[5].value = price ? `${price}` : '-'

    },
    async setDate(value) {
      const endDate = new Date();
      let startDate;
      switch (value) {
        case 'HOUR':
          startDate = new Date();
          startDate.setHours(startDate.getHours() - 1);
          break;
        case 'TODAY':
          this.date = endDate
          return;
          break;
        case '7_DAYS':
          startDate = new Date(new Date().setDate(endDate.getDate() - 7));
          break;
        case '15_DAYS':
          startDate = new Date(new Date().setDate(endDate.getDate() - 15));
          break;
        case '30_DAYS':
          startDate = new Date(new Date().setDate(endDate.getDate() - 30));
          break;
        case '90_DAYS':
          startDate = new Date(new Date().setDate(endDate.getDate() - 90));
          break;

        default:
          break;
      }

      this.date = [startDate, endDate];
      this.refreshData()
    },

  },

}
</script>

<style lang="scss">
.chart-widget {
  .va-card__body {
    height: 550px;
  }

  .chart {
    height: 400px;
  }
}
</style>
