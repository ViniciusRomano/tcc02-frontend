<template>
  <div class="row row-equal">
    <div class="flex xl6 xs12">
      <div class="row">
        <div class="flex xs12 sm4" v-for="(info, idx) in infoTiles" :key="idx">
          <va-card class="mb-4" :color="info.color">
            <va-card-content>
              <p class="display-2 mb-0" style="color: white;">{{ info.value }}</p>
              <p style="color: white;">{{ $t(info.text) }}</p>
            </va-card-content>
          </va-card>
        </div>
      </div>

      <!-- <div class="row">
        <div class="flex xs12 md6">
          <va-card>
            <va-card-content>
              <p class="display-2 mb-1" :style="{color: theme.primary}">291</p>
              <p class="no-wrap">{{$t('dashboard.info.completedPullRequests')}}</p>              
            </va-card-content>
          </va-card>
        </div>
        <div class="flex xs12 md6">
          <va-card>
            <va-card-content>
              <div class="row row-separated">
                <div class="flex xs4">
                  <p class="display-2 mb-1 text--center" :style="{color: theme.primary}">3</p>
                  <p class="text--center mb-1">{{$t('dashboard.info.users')}}</p>
                </div>
                <div class="flex xs4">
                  <p class="display-2 mb-1 text--center" :style="{color: theme.info}">24</p>
                  <p class="text--center no-wrap mb-1">{{$t('dashboard.info.points')}}</p>
                </div>
                <div class="flex xs4">
                  <p class="display-2 mb-1 text--center" :style="{color: theme.warning}">91</p>
                  <p class="text--center mb-1">{{$t('dashboard.info.units')}}</p>
                </div>
              </div>
            </va-card-content>

          </va-card>
        </div>
      </div> -->
    </div>

    <va-modal v-model="modal">
      <div style="position: relative;">
        <va-button @click="showPrevImage" color="#fff" icon="chevron-left" flat style="position: absolute; top: 50%;" />
        <va-button @click="showNextImage" color="#fff" icon="chevron-right" flat
          style="position: absolute; top: 50%; right: 0;" />
        <transition>
          <img :src="images[currentImageIndex]" style="height: 50vh; max-width: 100%;">
        </transition>
      </div>
    </va-modal>
  </div>
</template>

<script>
import { useGlobalConfig } from 'vuestic-ui'
import { getInfoBlockData } from '@/data/charts/InfoBlocks'
import { socket } from '../../../services/vuestic-ui/socket'

export default {
  name: 'DashboardInfoBlock',
  data() {
    return {
      infoTiles: [{
        color: 'primary',
        value: '3.4A',
        text: 'M??dia das ??ltimas 24h',
        icon: '',
      }, {
        color: 'primary',
        value: '3.5A',
        text: 'M??dia dos ??ltimos 30min',
        icon: '',
      }, {
        color: '',
        value: '',
        text: 'Tend??ncia',
        icon: '',
      }],
      modal: false,
      currentImageIndex: 0,
      images: [
        'https://i.imgur.com/qSykGko.jpg',
        'https://i.imgur.com/jYwT08D.png',
        'https://i.imgur.com/9930myH.jpg',
        'https://i.imgur.com/2JxhWD6.jpg',
        'https://i.imgur.com/MpiOWbM.jpg',
      ],
    }
  },
  async mounted() {
    const _this = this;
    socket.on('AVG_SensorValue', function (msg) {
      _this.update(msg)
    });
  },
  methods: {
    showModal() {
      this.modal = true
    },
    async update(msg) {
      const data = msg || await getInfoBlockData()
      this.infoTiles[0].value = data.day + ' A'
      this.infoTiles[1].value = data.mins + ' A'

      if (this.infoTiles[0].value < this.infoTiles[1].value) {
        this.infoTiles[2].value = 'Aumento de corrente'
        this.infoTiles[2].color = 'danger'
      } else {
        this.infoTiles[2].value = 'Diminui????o da corrente'
        this.infoTiles[2].color = 'success'
      }

    },
    showPrevImage() {
      this.currentImageIndex = !this.currentImageIndex ? this.images.length - 1 : this.currentImageIndex - 1
    },
    showNextImage() {
      this.currentImageIndex = this.currentImageIndex === this.images.length - 1 ? 0 : this.currentImageIndex + 1
    },
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors || {}
    }
  }
}
</script>

<style lang="scss" scoped>
.row-separated {
  .flex+.flex {
    border-left: 1px solid var(--va-background);
  }

  // @include media-breakpoint-down(xs) {
  //   p:not(.display-2) {
  //     font-size: 0.875rem;
  //   }
  // }
}

.rich-theme-card-text {
  line-height: 24px;
}

.dashboard {
  .tendencia {
    font-size: 24px;
  }

  .va-card__header--over {
    // @include media-breakpoint-up(md) {
    //   padding-top: 0 !important;
    // }
  }

  .va-card__image {
    // @include media-breakpoint-up(md) {
    //   padding-bottom: 0 !important;
    // }
  }

  // .image-card {
  //   position: relative;
  //   .va-button {
  //     position: absolute;
  //   }
  // }
}
</style>
