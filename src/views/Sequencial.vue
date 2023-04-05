<template>
  <div class="main">
    <div>
      <p class="text-h5">Lista Sequencial {{ count }}</p>
      <v-slider
        v-model="count"
        class="slider"
        :max="30"
        :min="5"
        step="1"
      ></v-slider>
      <v-btn @click="handleTest" color="black">iniciar</v-btn>
    </div>
    <div>
      <div v-for="box in array" class="float-left box">
        <p>{{ box.value }} - {{ box.idx }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      array: [], 
    };
  },
  methods: {
    handleTest() {
      for (let i = 0; i < this.count; i++)
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

.box {
  border: 2px solid black;
}
</style>
