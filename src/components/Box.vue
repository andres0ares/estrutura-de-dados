<template>
  <div v-if="type == 'seq'">
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

  <div v-if="type == 'enc'">
    <div v-if="transition" class="box-transition px-2">
      <p>{{ idx }}</p>
    </div>
    <div v-else >
      <v-row no-gutters class="enc-box-main">
        <v-col cols="7">
          <div class="enc-box-s enc-1">
            <p>enc</p>
            <v-icon v-if="value == 'diamond'" icon="mdi-diamond"></v-icon>
            <v-icon v-else-if="value == 'bomb'" icon="mdi-bomb"></v-icon>
        </div></v-col>
        <v-col cols="5">
          <div class="enc-box-s enc-2">
            <p>{{ idx+1 }}</p>
        </div></v-col>
      </v-row>
      <!-- <div class="box px-2">
        <p>enc</p>
        <v-icon v-if="value == 'diamond'" icon="mdi-diamond"></v-icon>
        <v-icon v-else-if="value == 'bomb'" icon="mdi-bomb"></v-icon>
      </div>
      <div class="box px-2">
        <p>enc</p>
        <v-icon v-if="value == 'diamond'" icon="mdi-diamond"></v-icon>
        <v-icon v-else-if="value == 'bomb'" icon="mdi-bomb"></v-icon>
      </div> -->
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
      transition: false,
    };
  },
  watch: {
    value(old, newValue) {
      console.log(newValue, old);
      this.transition = true;
      setTimeout(() => {
        this.transition = false;
      }, 2000);
    },
  },
  props: {
    value: String,
    idx: Number,
    type: String,
  },
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

.enc-box-main {
  width: 90px;
  height: 60px;
  
}

.aa {
  background-color: aquamarine;
}

.enc-box-s {
  background-color: aqua;
  border: 2px solid black;
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.enc-1 {
  border-radius: 10px 0 0 10px;
}

.enc-2 {
  border-radius: 0 10px 10px 0;
}
</style>
