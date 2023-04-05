<template>
  <v-container class="fill-height">
    <div>
      <v-btn class="blue" @click="test" color="blue">clicar
      </v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    methods: {
      test() {
        this.$router.push({ path: "/sequencial" });
      }
    }
  }
</script>

<script setup>
  //
</script>
