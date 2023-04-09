<template>
  <div>
    <v-card class="pa-4 main-card-sim" max-width="374" color="#ECEFF1">
      <v-card-title> Lista Simplesmente Encadeada </v-card-title>
      <div class="mb-2">
        <v-btn
          size="small"
          @click="() => (option = 'add')"
          :color="default_color"
          class="mt-2"
          ><v-icon icon="mdi-plus"></v-icon
        ></v-btn>

        <v-btn
          size="small"
          @click="() => (option = 'edit')"
          :color="default_color"
          class="mt-2 mx-2"
          ><v-icon icon="mdi-pencil"></v-icon
        ></v-btn>

        <v-btn
          size="small"
          @click="() => (option = 'delete')"
          :color="default_color"
          class="mt-2 mr-2"
          ><v-icon icon="mdi-delete"></v-icon
        ></v-btn>

        <v-btn
          size="small"
          @click="() => (option = 'delete')"
          :color="default_color"
          class="mt-2"
          ><v-icon icon="mdi-magnify"></v-icon
        ></v-btn>
      </div>

      <div v-if="option == 'add'">
        <p>Selecione valor:</p>
        <div class="px-4">
          <v-chip-group v-model="value">
            <v-chip value="&#128142;" variant="elevated" :color="default_color"
              >&#128142;</v-chip
            >
            <v-chip value="&#128163;" variant="elevated" :color="default_color"
              >&#128163;</v-chip
            >
            <v-chip value="null" variant="elevated" :color="default_color"
              >null</v-chip
            >
          </v-chip-group>
        </div>

        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx"
            class="slider"
            :max="idxs"
            :min="0"
            step="1"
            :color="default_color"
          ></v-slider>
        </div>

        <CodeDisplay
          :texts="[
            `lista.push( ${value != undefined ? value : ''} ${
              idx > 0 ? ',' + idx : ''
            });`,
          ]"
        />

        <v-btn size="small" @click="push" :color="default_color" class="mt-2"
          >Adicionar</v-btn
        >
      </div>

      <div v-else-if="option == 'edit'">
        <p>Selecione valor:</p>
        <div class="px-4">
          <v-chip-group v-model="value">
            <v-chip value="&#128142;" variant="elevated" :color="default_color"
              >&#128142;</v-chip
            >
            <v-chip value="&#128163;" variant="elevated" :color="default_color"
              >&#128163;</v-chip
            >
            <v-chip value="null" variant="elevated" :color="default_color"
              >null</v-chip
            >
          </v-chip-group>
        </div>

        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx_edit"
            class="slider"
            :max="idxs - 1"
            :min="0"
            step="1"
            :color="default_color"
          ></v-slider>
        </div>

        <CodeDisplay
          :texts="[
            `lista[${idx_edit}] = ${value != undefined ? value : 'null'};`,
          ]"
        />

        <v-btn size="small" @click="edit" :color="default_color" class="mt-2"
          >editar</v-btn
        >
      </div>

      <div v-else-if="option == 'delete'">
        <p>delete</p>
        <div v-if="idxs > 0">
          <p class="mt-3">Selecione a posição:</p>
          <v-slider
            v-model="idx_edit"
            class="slider"
            :max="idxs - 1"
            :min="0"
            step="1"
            :color="default_color"
          ></v-slider>

          <CodeDisplay
            :texts="[
              `lista.pop(${idx_edit});`,
            ]"
          />

          <v-btn
            size="small"
            @click="deletar"
            :color="default_color"
            class="mt-2"
            >deletar</v-btn
          >
          
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import CodeDisplay from "./CodeDisplay.vue";

export default {
  data() {
    return {
      idx: 0,
      idx_edit: 0,
      default_color: "blue-grey-darken-4",
      option: "add",
      value: "",
    };
  },
  props: {
    idxs: Number,
  },
  components: {
    CodeDisplay,
  },
  watch: {
    idxs(newValue) {
      if (this.idx > newValue) this.idx = newValue;
      if (this.idx_edit >= newValue) this.idx_edit = newValue - 1;
    },
  },
  methods: {
    edit() {
      this.$emit("edit", this.value, this.idx_edit);
    },
    push() {
      this.$emit("push", this.value, this.idx);
      this.idx = this.idx == this.idxs ? this.idx + 1 : this.idx;
    },
    deletar() {
      this.$emit("pop", this.idx_edit);
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
</style>
