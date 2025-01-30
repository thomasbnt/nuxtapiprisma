<script setup>
const config = useRuntimeConfig()

import {list} from "~/composables/states";

const data = list()

const loading = ref(true)
const search = ref('')
const headers = [
  {
    title: 'Prénom',
    align: 'start',
    sortable: true,
    value: 'firstname',
  },
  {
    title: 'Nom',
    align: 'start',
    sortable: true,
    value: 'lastname',
  },
  {
    title: 'Date de naissance',
    align: 'start',
    sortable: true,
    value: 'birthday',
  },
  {
    title: 'Âge',
    align: 'start',
    sortable: true,
    value: 'age',
  },
  {
    title: "Nom de l'entreprise",
    align: 'start',
    sortable: true,
    value: 'jobs[0].job',
  },
  {
    title: 'Poste',
    align: 'start',
    sortable: true,
    value: 'jobs[0].position',
  },
  {
    title: 'Début',
    align: 'start',
    sortable: true,
    value: 'jobs[0].start',
  },
  {
    title: 'Fin',
    align: 'start',
    sortable: true,
    value: 'jobs[0].end'
  }
]


const getList = async () => {
  await $fetch(`${config.public.backendUrl}/list`, {}).then((res) => {
    data.value = res.list
  }).catch((err) => {
    console.log(err)
  })
}
watch(data, () => {
  getRows()
})
getList()

const getRows = () => {
  if (data.value) {
    loading.value = false
    return data.value.map((item) => {
      item.birthday = new Date(item.birthday).toLocaleDateString()
      item.jobs[0].start = new Date(item.jobs[0].start).toLocaleDateString()
      if (item.jobs[0].end === null) {
        item.jobs[0].end = 'En cours'
      } else {
        item.jobs[0].end = new Date(item.jobs[0].end).toLocaleDateString()
      }

      item.age = new Date().getFullYear() -  new Date(item.birthday).getFullYear()
    })
  }
}
</script>
<template>
  <div>
    <v-card :flat="true">
      <template v-slot:text>
        <v-text-field
            v-model="search" label="Rechercher" prepend-inner-icon="mdi-magnify"
            single-line variant="outlined" hide-details>
        </v-text-field>
      </template>

      <v-data-table no-data-text="Veuillez attendre quelques instants, si aucune donnée n'apparaît, rechargez la page."
                    :headers="headers" :items="data" :search="search" :loading="loading" items-per-page="10"
                    :sort-by="[{ key: 'firstname', order: 'desc' }]">

        <template v-slot:loading>
          <v-skeleton-loader type="table-row@4"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<style scoped>
.disable-events {
  pointer-events: none
}
</style>