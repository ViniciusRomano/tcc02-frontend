<template>
    <div class="form-elements">
        <div class="row">
            <div class="flex xs12">
                <va-card>
                    <h2 class="px-4 py-4">Cadastro de equipamentos</h2>
                    <va-card-content>
                        <form>
                            <div class="row justify--center">
                                <div class="flex md8">
                                    <va-input v-model="device.dev_name" placeholder="Nome do equipamento" />
                                </div>
                                <div class="flex md8">
                                    <va-input type="number" v-model="device.dev_min_range"
                                        placeholder="Medição mínima" />
                                </div>
                                <div class="flex md8">

                                    <va-input type="number" v-model="device.dev_max_range"
                                        placeholder="Medição Máxima" />
                                </div>

                            </div>
                            <div class="row justify--end">

                                <va-button flat small color="danger" @click="cancel()" class="ma-0">
                                    Cancelar
                                </va-button>
                                <va-button flat small @click="create()" class="ma-0">
                                    Salvar
                                </va-button>
                            </div>
                        </form>
                    </va-card-content>
                </va-card>
            </div>


        </div>
    </div>
</template>

<script>
import { createDevice } from '@/data/charts/Devices'

export default {
    data() {
        return {
            device: {

            }
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'markup' })
        },
        async create() {
            await createDevice(this.device)
            this.$router.push({ name: 'markup' })
        },
        getStatusColor(status) {
            if (status === "paid") {
                return "success";
            }

            if (status === "processing") {
                return "info";
            }

            return "danger";
        }
    }
};
</script>

<style lang="scss">
</style>
