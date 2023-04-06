<template>
  <div class="main">
    <div>
      <p class="text-h5">Lista Sequencial {{ size_array }}</p>
      <v-slider
        v-model="size_array"
        class="slider"
        :max="30"
        :min="5"
        step="1"
      ></v-slider>
      <v-btn @click="handleTest" color="black">iniciar</v-btn>
      <p>{{ index_array }}</p>
      <v-slider
        v-model="index_array"
        class="slider"
        :max="size_array"
        :min="0"
        step="1"
      ></v-slider>
    </div>
    <div>
      <div v-for="box, idx in array" class="float-left">
        <Box type="seq" :value="box.value" :idx="idx" />
      </div>
    </div>
  </div>
</template>

<script>

import Box from '@/components/Box.vue';

export default {
  data() {
    return {
      size_array: 0,
      index_array: 0,
      array: [], 
    };
  },
  components: {
    Box,
  },
  methods: {
    handleTest() {
        this.array = [];
      for (let i = 0; i < this.size_array; i++)
        this.array.push({ value: "none", idx: i });
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #e5e5e5;
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slider {
  width: 200px;
}


</style>
