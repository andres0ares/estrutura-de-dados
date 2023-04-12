<template>
  <div>
    <v-card v-if="setArray" class="pa-4" max-width="374" color="#ECEFF1">
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

      <v-btn
        size="small"
        @click="handleTest"
        :color="default_color"
        class="mt-2"
        >iniciar</v-btn
      >
    </v-card>

    <div v-else>
      <v-card v-if="expand" class="pa-4 main-card-sim" max-width="374" color="#ECEFF1">
        <v-icon
          @click="toggleExpand"
          class="float-right"
          icon="mdi-chevron-up"
        ></v-icon>
        <v-card-title> Lista Sequencial </v-card-title>

        <p>{{ index_array }}</p>

        <v-slider
          v-model="index_array"
          class="slider"
          :max="size_array - 1"
          :min="0"
          step="1"
          :color="default_color"
        ></v-slider>

        <p>Selecione valor:</p>

        <div class="px-4">
          <v-chip-group v-model="value">
            <v-chip
              value="diamond"
              append-icon="mdi-diamond"
              variant="elevated"
              :color="default_color"
            ></v-chip>
            <v-chip
              value="bomb"
              append-icon="mdi-bomb"
              variant="elevated"
              :color="default_color"
            ></v-chip>
            <v-chip
              value="null"
              append-icon="mdi-delete"
              variant="elevated"
              :color="default_color"
              >remover valor</v-chip
            >
          </v-chip-group>
        </div>

        <CodeDisplay :texts="[`array[${index_array}] = ${value};`]" />

        <v-btn
          @click="sendUpdate"
          size="small"
          :color="default_color"
          class="mt-2"
          >Alterar</v-btn
        >
      </v-card>
      <div v-else class="expand" @click="toggleExpand">
        <v-icon icon="mdi-chevron-down" color="#eaeaea"></v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import CodeDisplay from "./CodeDisplay.vue";

export default {
  data() {
    return {
      size_array: 5,
      index_array: 5,
      value: "X",
      setArray: true,
      selection: "",
      default_color: "blue-grey-darken-4",
      expand: true,
    };
  },
  components: {
    CodeDisplay,
  },
  methods: {
    handleTest() {
      this.$emit("update-size-array", this.size_array);
      this.setArray = false;
    },
    sendUpdate(e) {
      if (this.value != undefined)
        this.$emit("update-element", this.index_array, this.value);
    },
    toggleExpand() {
      this.expand = !this.expand;
    },
  },
};
</script>

<style scoped>

.main-card-sim {
  top: 50px;
  right: 50px;
  z-index: 3;
  position: fixed;
}

.expand {
  top: 50px;
  right: 50px;
  z-index: 3;
  position: fixed;
  background-color: aqua;
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
</style>
