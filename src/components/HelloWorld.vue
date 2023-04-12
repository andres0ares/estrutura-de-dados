<template>
  <div class="fill-height main-h">
    <v-btn class="blue" @click="openSequencial" color="blue"
      >Lista Sequencial</v-btn
    >
    <v-btn class="blue my-4" @click="openSimplesmenteEncadeada" color="blue"
      >Lista Simplesmente Encadeada</v-btn
    >
    <v-btn class="blue" @click="openDuplamenteEncadeada" color="blue"
      >Lista Duplamente Encadeada</v-btn
    >
  </div>
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
    openDuplamenteEncadeada() {
      this.$router.push({ path: "/duplamente-encadeada" });
    },
  },
};
</script>

<style scoped>
.main-h {
  /* background-color: #263238; */
  min-height: 100vh;
  width: 100vw;
  background-image: url("https://www.transparenttextures.com/patterns/swirl.png");
  background-repeat: repeat;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
