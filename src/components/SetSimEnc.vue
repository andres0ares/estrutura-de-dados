<template>
  <div>
    <v-card v-if="expand" class="pa-4 main-card-sim" max-width="374" color="#ECEFF1">
      <v-icon  @click="toggleExpand" class="float-right" icon="mdi-chevron-up"></v-icon>
      <v-card-title class="mt-4"> Lista Simplesmente Encadeada </v-card-title>
      <div class="mb-2">
        <v-btn
          v-for="btn in options"
          size="small"
          :id="btn.id"
          :variant="btn.id == option ? 'flat' : 'outlined'"
          @click="handleClickOption"
          :color="default_color"
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

          <CodeDisplay :texts="[`lista.pop(${idx_edit});`]" />

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
    <div v-else class="expand" @click="toggleExpand">
      <v-icon  icon="mdi-chevron-down" color="#eaeaea"></v-icon>
    </div>
  </div>
</template>

<script>
import CodeDisplay from "./CodeDisplay.vue";

export default {
  data() {
    return {
      idx: 0,
      idx_edit: 0,
      expand: true,
      default_color: "blue-grey-darken-4",
      option: "add",
      options: [{id: 'add', icon: 'mdi-plus'}, {id: 'edit', icon: 'mdi-pencil'}, {id: 'delete', icon: 'mdi-delete'}, {id: 'search', icon: 'mdi-magnify'}],
      value: "💎",
      values: ["💎", "💣", "null"],
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
    handleClick(e) {
      this.value = e.currentTarget.id;
    },
    handleClickOption(e) {
      this.option = e.currentTarget.id;
    },
    toggleExpand() {
      this.expand = !this.expand;
    },
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

.select-value {
  float: left;
  display: flex;
  position: relative;
  height: 40px;
  min-width: 40px;
  border-radius: 20px;
  border: 2px solid red;
  margin: 0 5px 5px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.select-value:hover {
  background-color: red;
}

.select-group{
  width: 100%;
  float: left;
  clear: both;
}
</style>
