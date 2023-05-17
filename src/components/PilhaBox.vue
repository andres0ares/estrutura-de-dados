<template>
  <section class="mainPilhaBox">
    <div class="div-idx">
      <p class="text-caption">{{ idx }}</p>
    </div>
    <div :class="`div-value ${idx == 0 ? 'b-full-border' : 'b-border'}`">
      <p class="pt-1">{{ value }}</p>
    </div>
    <div class="div-isTop">
      <div v-if="isTop">
        <v-icon class="float-left" icon="mdi-arrow-left" size="small"></v-icon>
        <p class="float-left text-button">Topo</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PilhaBox",
  props: {
    idx: Number,
    value: String,
    isTop: Boolean,
  },
  setup() {
    const test = ref("box");

    return {
      test,
    };
  },
};
</script>

<style scoped>
.mainPilhaBox {
  clear: both;
}

.div-idx,
.div-value,
.div-isTop {
  float: left;
  text-align: center;
  height: 34px;
}
.div-idx {
  padding-top: 6px;
  width: 20px;
}
.div-value {
  width: 90px;
}
.div-isTop {
  padding-top: 7px;
  width: 70px;
  vertical-align: middle;
}

.b-border {
  border: 2px solid black;
  border-bottom-style: none;
}

.b-full-border {
  border: 2px solid black;
}
.div-isTop p {
  margin-top: -7px;
}
</style>
