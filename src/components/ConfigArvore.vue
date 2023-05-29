<template>
  <div>
    <v-card
      v-if="setArray"
      class="pa-4 border-1"
      max-width="374"
      color="#ECEFF1"
    >
      <v-card-title> Árvore Binaria de Pesquisa </v-card-title>

      <p class="mt-3 text-h7">Iniciar com valores iniciais?</p>

      <CodeDisplay
        class="mb-4"
        :texts="[`30 -> 25 -> 35 -> 20 -> 27 -> 34 -> 38`]"
      />

      <v-btn
        size="small"
        @click="create"
        :color="default_color"
        class="mt-2 mr-2"
        >iniciar com valores</v-btn
      >
      <v-btn
        size="small"
        @click="createNull"
        :color="default_color"
        class="mt-2"
        >iniciar</v-btn
      >
    </v-card>

    <div v-else>
      <v-card
        v-if="expand"
        class="pa-4 main-card-sim border-1"
        width="350"
        color="#ECEFF1"
      >
        <v-icon
          @click="toggleExpand"
          class="float-right"
          icon="mdi-chevron-up"
        ></v-icon>

        <v-card-title> Árvore Binária de Pesquisa </v-card-title>

        <div class="mb-2">
          <v-btn
            v-for="btn in options"
            size="small"
            :id="btn.id"
            :variant="btn.id == option ? 'flat' : 'outlined'"
            @click="handleClickOption"
            :color="primary_color"
            class="mr-2"
            ><v-icon :icon="btn.icon"></v-icon
          ></v-btn>
        </div>

        <div v-if="option == 'add'">
          <p class="text-caption mt-n2 mb-8">selecione o valor:</p>

          <v-slider v-model="value" thumb-label="always" :step="1"></v-slider>

          <CodeDisplay :texts="[`arvore.insere(raiz, ${value});`]" />

          <v-btn
            @click="sendUpdate"
            variant="outlined"
            size="small"
            :color="orange"
            class="mt-2"
            >Adicionar</v-btn
          >
        </div>

        <div v-if="option == 'edit'">
          <p class="text-button">Escolha a opção:</p>
          <v-divider class="mt-4 mb-2"></v-divider>

          <v-btn
            v-for="btn in editOptions"
            size="small"
            :id="btn"
            :variant="btn == editOption ? 'flat' : 'outlined'"
            @click="handleClickEditOption"
            :color="primary_color"
            class="mr-2"
            >{{ btn }}
          </v-btn>

          <div v-if="editOption == 'pesquisar'">
            <p class="text-caption mt-2 mb-8">Pesquisar por item na lista</p>
            <v-slider
              v-model="searchValue"
              thumb-label="always"
              :min="1"
              :max="100"
              :step="1"
            ></v-slider>
            <v-btn
              size="small"
              @click="search"
              :color="orange"
              variant="outlined"
              >pesquisar</v-btn
            >
          </div>

          <!-- ========== encaminhamentos ========== -->
          <div v-if="editOption == 'encaminhamentos'">
            <p class="text-caption">Percorre pré-ordem</p>
            <CodeDisplay :texts="[`arvore.preOrdem(raiz);`]" />
            <v-btn
              @click="preOrdem"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >preordem</v-btn
            >

            <v-divider class="mt-4 mb-2"></v-divider>

            <p class="text-caption">Percorre em ordem</p>

            <CodeDisplay :texts="[`arvore.emOrdem(raiz);`]" />

            <v-btn
              @click="emOrdem"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >inordem</v-btn
            >

            <v-divider class="mt-4 mb-2"></v-divider>

            <p class="text-caption">Percorre pós-ordem</p>
            <CodeDisplay :texts="[`arvore.posOrdem(raiz);`]" />
            <v-btn
              @click="posOrdem"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >posordem</v-btn
            >            
          </div>
        </div>
      </v-card>
      <div v-else class="expand" @click="toggleExpand">
        <v-icon icon="mdi-chevron-down" color="#eaeaea"></v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import CodeDisplay from "./CodeDisplay.vue";

const emit = defineEmits(["size", "push", "pop", "search", "init", "add","preOrdem", "emOrdem", "posOrdem"]);
// CONST
//const values = ["🎲", "💎", "🌍", "🌱", "💩", "📝"];
const default_color = "blue-grey-darken-4";
const primary_color = "blue-grey-darken-4";
const orange = "orange-darken-4";
const options = [
  { id: "add", icon: "mdi-plus" },
  { id: "edit", icon: "mdi-pencil" },
];

const editOptions = ["pesquisar", "encaminhamentos"];

// VARS
const expand = ref(true); //toggle expand button
const option = ref("add"); //toggle option
const editOption = ref("pesquisar");
const searchValue = ref(1);

/***************** CRUD *******************/

//CREATE

const size_array = ref(5);
const setArray = ref(true);

function create() {
  emit("init", true);
  option.value = "edit";
  setArray.value = false;
}
function createNull() {
  emit("init", false);
  setArray.value = false;
}

//UPDATE

function search() {
  emit("search", searchValue.value);
}

const value = ref(1);

function sendUpdate() {
  if (value.value != undefined) emit("add", value.value);
}

function preOrdem() {
  emit("preOrdem");
}

function emOrdem() {
  emit("emOrdem");
}

function posOrdem() {
  emit("posOrdem");
}

function handleClickOption(e) {
  //search by idx or value
  option.value = e.currentTarget.id;
}

function handleClickEditOption(e) {
  editOption.value = e.currentTarget.id;
}


function toggleExpand() {
  expand.value = !expand.value;
}

</script>

<style scoped>
.main-card-sim {
  top: 50px;
  right: 50px;
  z-index: 3;
  position: fixed;
}

.border-1 {
  border: 2px solid black;
}

.expand {
  top: 50px;
  right: 50px;
  z-index: 3;
  position: fixed;
  background-color: #f5470b;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .main-card-sim {
    top: 5px;
    right: 5px;
  }
  .expand {
    top: 5px;
    right: 5px;
  }
}

.select-value {
  float: left;
  display: flex;
  position: relative;
  height: 40px;
  min-width: 40px;
  border-radius: 10px;
  border: 2px solid #263238;
  margin: 0 5px 5px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.select-value:hover {
  border: 2px solid #f5470b;
  background-color: #f5470b;
}

.select-group {
  width: 100%;
  float: left;
  clear: both;
}
</style>
