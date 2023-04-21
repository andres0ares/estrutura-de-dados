<template>
  <div>
    <v-card
      v-if="expand"
      class="pa-4 main-card-sim"
      max-width="374"
      color="#f5f5f5"
    >
      <v-icon
        @click="toggleExpand"
        class="float-right"
        icon="mdi-chevron-up"
      ></v-icon>
      <v-card-title class="mt-4"> Lista Simplesmente Encadeada </v-card-title>
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
        <p>Selecione valor:</p>
        <div class="select-group">
          <div
            v-for="item in values"
            :id="item"
            @click="handleClick"
            class="select-value"
          >
            {{ item }}
          </div>
        </div>

        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx"
            class="slider"
            :max="idxs"
            :min="0"
            step="1"
            :color="primary_color"
          ></v-slider>
        </div>

        <CodeDisplay
          :texts="[
            `lista.push( ${value != undefined ? value : ''} ${
              idx > 0 ? ',' + idx : ''
            });`,
          ]"
        />

        <v-btn size="small" @click="push" :color="primary_color" class="mt-2"
          >Adicionar</v-btn
        >
      </div>

      <div v-else-if="option == 'edit'">
        <p>Selecione valor:</p>

        <div class="select-group">
          <div
            v-for="item in values"
            :id="item"
            @click="handleClick"
            class="select-value"
          >
            {{ item }}
          </div>
        </div>

        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx_edit"
            class="slider"
            :max="idxs - 1"
            :min="0"
            step="1"
            :color="primary_color"
          ></v-slider>
        </div>

        <CodeDisplay
          :texts="[
            `lista[${idx_edit}] = ${value != undefined ? value : 'null'};`,
          ]"
        />

        <v-btn size="small" @click="edit" :color="primary_color" class="mt-2"
          >editar</v-btn
        >
      </div>

      <div v-else-if="option == 'delete'">
        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx_edit"
            class="slider"
            :max="idxs - 1"
            :min="0"
            step="1"
            :color="primary_color"
          ></v-slider>

          <CodeDisplay :texts="[`lista.pop(${idx_edit});`]" />

          <v-btn
            size="small"
            @click="deletar"
            :color="primary_color"
            class="mt-2"
            >deletar</v-btn
          >
        </div>
      </div>

      <div v-else-if="option == 'search'">
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
            v-model="idx_edit"
            class="slider mt-4"
            :max="idxs - 1"
            :min="0"
            step="1"
            :color="primary_color"
          ></v-slider>

          <CodeDisplay :texts="[`print(array[${idx_edit}]);`]" />

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
              @click="handleClick"
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
</template>

<script setup>
import { ref, watch } from "vue";
import CodeDisplay from "./CodeDisplay.vue";

const { idxs } = defineProps({
  idxs: Number,
});

const emit = defineEmits(["edit", "push", "pop", "get"]);

const idx = ref(0);
const idx_edit = ref(0);
const expand = ref(true);

const primary_color = "blue-grey-darken-4";
const options = [
  { id: "add", icon: "mdi-plus" },
  { id: "edit", icon: "mdi-pencil" },
  { id: "delete", icon: "mdi-delete" },
  { id: "search", icon: "mdi-magnify" },
];
const values = ["🎲", "💎", "🌍", "🌱", "💩", "📝", "null"];

const option = ref("add");

const value = ref("💎");

const searchOption = ref("indice");

function handleClick(e) {
  value.value = e.currentTarget.id;
}

function handleClickOption(e) {
  option.value = e.currentTarget.id;
}

function toggleExpand() {
  expand.value = !expand.value;
}

function edit() {
  emit("edit", value.value, idx_edit.value);
}

function push() {
  emit("push", value.value, idx.value);
  idx.value = idx.value == idxs ? idx.value + 1 : idx.value;
}
function deletar() {
  emit("pop", idx_edit.value);
}
function get() {
  switch (searchOption.value) {
    case "indice":
      emit("get", "indice", idx_edit.value);
      break;
    case "valor":
      emit("get", "valor", value.value);
      break;
    default:
      break;
  }
}

watch(
  () => idxs,
  (newValue) => {
    console.log(idxs);
    if (idx.value > newValue) idx.value = newValue;
    if (idx_edit.value >= newValue) idx_edit.value = newValue - 1;
  }
);
</script>

<style scoped>
.main-card-sim {
  top: 50px;
  right: 50px;
  z-index: 3;
  position: fixed;
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
