<template>
  <section class="mainPilhaBox">
    <div class="div-start">
      <div v-if="start">
        <p class="text-button">Início</p>
        <v-icon icon="mdi-arrow-down" size="small"></v-icon>
      </div>
    </div>
    <div :class="`div-value ${idx == 0 ? 'b-full-border' : 'b-border'}`">
      <p class="pt-1">{{ value }}</p>
    </div>

    <p class="idx text-caption">{{ idx }}</p>

    <div class="div-end">
      <div v-if="end">
        <v-icon icon="mdi-arrow-up" size="small"></v-icon>
        <p class="text-button">Fim</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PilhaBox",
  props: {
    idx: Number,
    value: String,
    start: Boolean,
    end: Boolean,
  },
};
</script>

<style scoped>
.mainPilhaBox {
  float: left;
  clear: both;
}

.div-value {
  text-align: center;
  height: 34px;
}
.idx {
  margin: 0;
}
.div-value {
  width: 70px;
}
.div-start,
.div-end {
  text-align: center;
  margin: 0 auto;
  min-height: 50px;
}

.div-start p {
    margin-bottom: -10px;
}

.div-end {
    margin-top: -18px;
}
.div-end p {
    margin-top: -10px;
}

.b-border {
  border: 2px solid black;
  border-left-style: none;
}

.b-full-border {
  border: 2px solid black;
}

</style>
