<template>
  <v-card class="pa-2 box-code">
    <p class="text-caption p-code" v-for="text in texts">{{ text }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    texts: Array,
  },
};
</script>

<style scoped>
.box-code {
  background-color: #263238;
  color: #eaeaea;
}
.p-code {
  font-size: small;
}
</style>
