<template>
  <div class="fill-height main-h">
    <p class="text-main">Estrutura <span class="de">de</span>Dados</p>

    <p class="txt-secondary my-3">selecione um tipo de lista:</p>

    <div @click="openSequencial" class="card-list">
      <p>Lista Sequencial</p>
    </div>

    <div @click="openSimplesmenteEncadeada" class="card-list">
      <p>Lista Simplesmente Encadeada</p>
    </div>

    <div @click="openDuplamenteEncadeada" class="card-list">
      <p>Lista Duplamente Encadeada</p>
    </div>

    <div class="mt-4">
      <v-btn icon="mdi-github" color="orange-darken-4"></v-btn>
      <v-btn icon="mdi-linkedin" class="mx-3" color="orange-darken-4"></v-btn>
      <v-btn icon="mdi-twitter" color="orange-darken-4"></v-btn>
    </div>
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
@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");

.text-main {
  max-width: 400px;
  line-height: 60px;
  font-family: "Patua One", cursive;
  font-size: 5rem;
  text-align: center;
}

.de {
  font-size: 3rem;
  vertical-align: top;
}

.txt-secondary {
  font-family: "Patua One", cursive;
  font-size: 1.5rem;
  color: #f5470b;
}

.card-list {
  font-family: "Patua One", cursive;
  border: 3px solid black;
  width: 340px;
  max-height: 80px;
  border-radius: 15px;
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.card-list:hover {
  background-color: #f5470b;
  color: white;
}

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