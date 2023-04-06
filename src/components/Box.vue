<template>
  <div>
    <div v-if='type == "seq"' class="box">
      <p>{{ value }}</p>
      <p>{{ idx }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hello: "hello world",
    };
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
  border: 2px solid black;
}
</style>
