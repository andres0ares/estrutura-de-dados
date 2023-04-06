<template>
  <div  v-if='type == "seq"'>
    <div v-if="transition" class="box-transition px-2">
      <p>{{ idx }}</p>
    </div>
    <div v-else class="box px-2">
      <v-icon v-if="value == 'diamond'" icon="mdi-diamond"></v-icon>
      <v-icon v-else-if="value == 'bomb'" icon="mdi-bomb"></v-icon>
    </div>
    <div>
      <p class="text-caption">{{ idx }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "hello world",
      transition: false
    };
  },
  watch: {
    value(old, newValue) {
      console.log(newValue, old);
      this.transition = true;
      setTimeout(() => {this.transition = false}, 2000)
    },
  },
  props: {
    value: String,
    idx: Number,
    type: String
  }
};
</script>

<style>
  .box {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    margin: 0 1px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .box-transition {
    width: 50px;
    height: 50px;
    border: 2px solid black;
    margin: 0 1px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: aqua;
  }
</style>
