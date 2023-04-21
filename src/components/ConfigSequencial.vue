<template>
  <div>
    <v-card
      v-if="setArray"
      class="pa-4 border-1"
      max-width="374"
      color="#ECEFF1"
    >
      <v-card-title> Lista Sequencial </v-card-title>

      <p class="mt-3">Selecione o tamanho da lista:</p>
      <v-slider
        v-model="size_array"
        class="slider"
        :max="30"
        :min="5"
        step="1"
        :color="default_color"
      ></v-slider>

      <CodeDisplay :texts="[`var array[${size_array}];`]" />

      <v-btn size="small" @click="create" :color="default_color" class="mt-2"
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
        <v-card-title> Lista Sequencial </v-card-title>

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

        <div v-if="option == 'edit'">
          <p>{{ index_array }}</p>

          <v-slider
            v-model="index_array"
            class=""
            :max="size_array - 1"
            :min="0"
            step="1"
            :color="default_color"
          ></v-slider>

          <p class="text-caption mt-n2">selecione o valor:</p>
          <div class="select-group mb-2">
            <div
              v-for="item in values"
              :id="item"
              @click="handleClickValue"
              class="select-value"
            >
              {{ item }}
            </div>
          </div>

          <CodeDisplay :texts="[`array[${index_array}] = ${value};`]" />

          <v-btn
            @click="sendUpdate"
            size="small"
            :color="default_color"
            class="mt-2"
            >Alterar</v-btn
          >
        </div>

        <div v-if="option == 'search'">
          <p>Pesquisar:</p>
          <v-btn
            :variant="searchOption == 'indice' ? 'flat' : 'outlined'"
            size="small"
            :color="primary_color"
            @click="() => (searchOption = 'indice')"
            >Índice</v-btn
          >
          <v-btn
            class="ml-2"
            :variant="searchOption == 'valor' ? 'flat' : 'outlined'"
            size="small"
            :color="primary_color"
            @click="() => (searchOption = 'valor')"
            >Valor</v-btn
          >

          <div v-if="searchOption == 'indice'">
            <v-slider
              v-model="index_array"
              class="slider mt-4"
              :max="size_array - 1"
              :min="0"
              step="1"
              :color="default_color"
            ></v-slider>

            <CodeDisplay :texts="[`print(array[${index_array}]);`]" />

            <v-btn @click="get" class="mt-4" size="small" :color="primary_color"
              >Pesquisar</v-btn
            >
          </div>
          <div v-if="searchOption == 'valor'">
            <p class="text-caption mt-4">selecione o valor:</p>
            <div class="select-group mb-2">
              <div
                v-for="item in values"
                :id="item"
                @click="handleClickValue"
                class="select-value"
              >
                {{ item }}
              </div>
            </div>

            <CodeDisplay
              :texts="[
                `for(int i = 0; i < tamanho_array; i++) {`,
                `&emsp;if(array[i] == ${value}) {`,
                `&emsp;&emsp;print('Encontrado na posição: ' + i);`,
                '&emsp;&emsp;break;',
                '&emsp;}',
                `&emsp;if(i == tamanho_array-1) {`,
                `&emsp;&emsp;print('Não encontrado.');`,
                '&emsp;}',
                '}',
              ]"
            />

            <v-btn @click="get" class="mt-4" size="small" :color="primary_color"
              >Pesquisar</v-btn
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

const emit = defineEmits([
  "update-size-array",
  "update-element",
  "search-element",
]);

// CONST
const values = ["🎲", "💎", "🌍", "🌱", "💩", "📝", "null"];
const default_color = "blue-grey-darken-4";
const primary_color = "blue-grey-darken-4";
const options = [
  { id: "edit", icon: "mdi-pencil" },
  { id: "search", icon: "mdi-magnify" },
];

// VARS
const index_array = ref(5); //idx value
const expand = ref(true); //toggle expand button
const option = ref("edit"); //toggle option

/***************** CRUD *******************/

//CREATE

const size_array = ref(5);
const setArray = ref(true);

function create() {
  emit("update-size-array", size_array.value);
  setArray.value = false;
}

//UPDATE

const value = ref("💎");

function handleClickValue(e) {
  value.value = e.currentTarget.id;
}

function sendUpdate(e) {
  if (value.value != undefined)
    emit("update-element", index_array.value, value.value);
}

// READ

const searchOption = ref("indice");

function handleClickOption(e) {
  //search by idx or value
  option.value = e.currentTarget.id;
}

function get() {
  switch (searchOption.value) {
    case "indice":
      emit("search-element", "indice", index_array.value);
      break;
    case "valor":
      emit("search-element", "valor", value.value);
      break;
    default:
      break;
  }
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
