<script setup lang="ts">
const router = useRouter()
const config = useRuntimeConfig()
const error = ref()
const loading = ref(false)
const form = reactive({
  firstname: '',
  lastname: '',
  birthday: '',
  job: '',
  position: '',
  start: '',
  end: ''
})


const onSubmit = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${config.public.backendUrl}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: form.firstname,
        lastname: form.lastname,
        birthday: form.birthday,
        jobs: [
          {
            job: form.job,
            position: form.position,
            start: form.start,
            end: form.end
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error('Une erreur est survenue')
    }
    const data = await response.json()

    if (data.error) {
      error.value = data.error
    } else {
      await router.push('/list')
    }

  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="ma-3">
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <h1>Nuxt API Prisma</h1>
          <p class="mb-2">Créer une nouvelle personne.</p>
          <form @submit.prevent="onSubmit">
            <v-text-field placeholder="Prénom" type="text"
                          name="firstname" label="Prénom"
                          v-model="form.firstname" required/>
            <v-text-field placeholder="Nom" type="text"
                          name="lastname" label="Nom"
                          v-model="form.lastname"
                          required/>
            <v-text-field placeholder="Birthday" type="date"
                          name="birthday" label="Date d'anniversaire" v-model="form.birthday" required/>
            <v-text-field placeholder="Nom de l'entreprise" type="text"
                          name="job" label="Nom de l'entreprise" v-model="form.job" required/>
            <v-text-field placeholder="Poste occupé" type="text"
                          name="position" label="Poste occupé" v-model="form.position" required/>
            <v-text-field placeholder="Début" type="date"
                          name="start" label="start" v-model="form.start" required/>
            <v-text-field placeholder="End" type="date"
                          name="end" label="Fin" v-model="form.end" />
            <v-btn type="submit" color="#1E1E1E" class="btn-fw">
              {{ loading ? 'Chargement...' : 'Créer' }}
            </v-btn>
            <v-alert type="error" v-if="error" class="mt-3">
              {{ error }}
            </v-alert>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">

</style>
