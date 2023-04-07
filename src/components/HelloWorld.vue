<template>
  <v-container class="fill-height">
    <div>
      <v-btn class="blue" @click="openSequencial" color="blue">Lista Sequencial</v-btn>
      <v-btn class="blue" @click="openSimplesmenteEncadeada" color="blue">Lista Simplesmente Encadeada</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  methods: {
    openSequencial() {
      this.$router.push({ path: "/sequencial" });
    },
    openSimplesmenteEncadeada() {
      this.$router.push({ path: "/simplesmente-encadeada" });
    },
  },
};
</script>

<script setup>
//
</script>
