<template>

  <div class="row row-equal justify--end">
    <div class="flex my-2 mr-4">
      <va-button @click="createNew()" size="medium">
      {{ 'Novo registro' }}
    </va-button>
    </div>
  </div>

  <div class="markup-tables flex">
    <!-- <va-card :title="$t('tables.basic')" class="flex mb-4">
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table">
            <thead>
              <tr>
                <th>{{ $t('tables.headings.name') }}</th>
                <th>{{ $t('tables.headings.email') }}</th>
                <th>{{ $t('tables.headings.country') }}</th>
                <th>{{ $t('tables.headings.status') }}</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in devices" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.country }}</td>
                <td>
                  <va-badge :color="getStatusColor(user.status)">
                    {{ user.status }}
                  </va-badge>
                </td>
              </tr>
            </tbody>
          </table>                
        </div>
      </va-card-content>
    </va-card>
   -->
    <va-card :title="$t('tables.stripedHoverable')">
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--striped va-table--hoverable">
            <thead>
              <tr>
                <th>Dispositivo</th>
                <th>Medição min (A)</th>
                <th>Medição max (A)</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="device in devices" :key="device.id">
                <td>{{ device.dev_name }}</td>
                <td>{{ device.dev_min_range }}</td>
                <td>{{ device.dev_max_range }}</td>
                <td>
                  <va-button flat small color="danger" @click="remove(device.id)" class="ma-0">
                    Deletar
                  </va-button>
                </td>
                <!-- <td>
                  <va-badge :color="getStatusColor(user.status)">
                    {{ user.status }}
                  </va-badge>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import data from '@/data/tables/markup-table/data.json'
import { getDevices, deleteDevice } from '@/data/charts/Devices'

export default {
  data() {
    return {
      devices: data.slice(0, 8),
    }
  },
  async mounted() {
    this.devices = await getDevices()
  },
  methods: {
    createNew() {
      this.$router.push({ name: 'device' })
    },
    async remove(id) {
      await deleteDevice(id)
      this.devices = await getDevices()
    },
    getStatusColor(status) {
      if (status === 'paid') {
        return 'success'
      }

      if (status === 'processing') {
        return 'info'
      }

      return 'danger'
    },
  },
}
</script>

<style lang="scss">
.markup-tables {
  .table-wrapper {
    overflow: auto;
  }

  .va-table {
    width: 100%;
  }
}
</style>
