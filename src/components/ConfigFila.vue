<template>
    <div>
      <v-card
        v-if="setArray"
        class="pa-4 border-1"
        max-width="374"
        color="#ECEFF1"
      >
        <v-card-title> Fila Sequencial </v-card-title>
  
        <p class="mt-3">Selecione o tamanho da Fila:</p>
        <v-slider
          v-model="size_array"
          class="slider"
          :max="30"
          :min="5"
          step="1"
          :color="default_color"
        ></v-slider>
  
        <CodeDisplay :texts="[`var fila[${size_array}];`]" />
  
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
          <v-card-title> Fila Sequencial </v-card-title>
  
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
  
            <CodeDisplay :texts="[`fila.push(${value});`]" />
  
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
  
            <p class="text-caption">Remover item da fila</p>
            <CodeDisplay :texts="[`fila.pop();`]" />
            <v-btn
              @click="pop"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >Remover</v-btn
            >
  
            <v-divider class="mt-4 mb-2"></v-divider>
  
            <p class="text-caption">Remover e exibir item da fila</p>
            <CodeDisplay :texts="[`print(fila.pop());`]" />
            <v-btn
              @click="popE"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >Remover e Exibir</v-btn
            >
  
            <v-divider class="mt-4 mb-2"></v-divider>
  
            <p class="text-caption">Exibir item no início da fila</p>
            <CodeDisplay :texts="[`print(fila.inicio());`]" />
            <v-btn
              @click="top"
              class="mt-4"
              variant="outlined"
              size="small"
              :color="orange"
              >Mostrar início</v-btn
            >
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
  
  const emit = defineEmits(["size", "push", "pop", "top"]);
  
  // CONST
  const values = ["🎲", "💎", "🌍", "🌱", "💩", "📝"];
  const default_color = "blue-grey-darken-4";
  const primary_color = "blue-grey-darken-4";
  const orange = "orange-darken-4";
  const options = [
    { id: "add", icon: "mdi-plus" },
    { id: "edit", icon: "mdi-pencil" },
  ];
  
  // VARS
  const index_array = ref(5); //idx value
  const expand = ref(true); //toggle expand button
  const option = ref("add"); //toggle option
  
  /***************** CRUD *******************/
  
  //CREATE
  
  const size_array = ref(5);
  const setArray = ref(true);
  
  function create() {
    emit("size", size_array.value);
    setArray.value = false;
  }
  
  //UPDATE
  
  const value = ref("💎");
  
  function handleClickValue(e) {
    value.value = e.currentTarget.id;
  }
  
  function handleClickOption(e) {
    //search by idx or value
    option.value = e.currentTarget.id;
  }
  
  function sendUpdate(e) {
    if (value.value != undefined) emit("push", value.value);
  }
  
  function toggleExpand() {
    expand.value = !expand.value;
  }
  
  function pop() {
    emit("pop", false);
  }
  
  function popE() {
    emit("pop", true);
  }
  
  function top() {
    emit("top");
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
  