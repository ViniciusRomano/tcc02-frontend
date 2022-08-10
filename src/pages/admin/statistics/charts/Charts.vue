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

    <Datepicker locale="pt-BR" cancelText="Cancelar" selectText="Selecionar" class="mb-4" v-model="date" modelAuto range
      enterSubmit :format="'dd/MM/yyyy HH:mm'" @update:modelValue="refreshData" />
    <!-- <div class="row">
    </div> -->

    <div class="row">
      <div class="flex xs12 sm3" v-for="(info, idx) in infoTiles" :key="idx">
        <va-card class="mb-4" :color="info.color">
          <va-card-content>
            <p class="display-2 mb-0" style="color: white;">{{ info.value }}</p>
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

export default {
  name: 'charts',
  components: { VaChart },
  data() {
    return {
      date: null,
      data: { count: 0 },
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
        text: 'Média no período selecionado',
        icon: '',
      }, {
        color: 'primary',
        value: '',
        text: 'Mediana no período selecionado',
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
      }
      ],
    }
  },
  async mounted() {
    this.isMounted = true
    this.bubbleChartData = getBubbleChartData(this.theme)
    this.pieChartData = getPieChartData(this.theme)
    this.donutChartData = getDonutChartData(this.theme)
    this.verticalBarChartData = getVerticalBarChartData(this.theme)
    this.horizontalBarChartData = getHorizontalBarChartData(this.theme)

    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));

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
      const data = await getLineChartData(this.theme, myDate)
      this.lineChartData = data.generatedData;
      this.data = data.data;
      this.infoTiles[0].value = this.data.avg
      this.infoTiles[1].value = this.data.median
      this.infoTiles[2].value = this.data.min
      this.infoTiles[3].value = this.data.max

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
