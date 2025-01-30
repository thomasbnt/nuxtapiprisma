<script setup lang="ts">
import displayTableList from "~/component/list.vue";

</script>

<template>
  <div class="ma-3">
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="4">
          <NuxtLink to="/" class="btn">Créer un utilisateur</NuxtLink>
          <h1>Liste de tout les utilisateurs</h1>
          <display-table-list />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">

</style>
