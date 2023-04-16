<template>
  <div class="main">
    <SetSeq @update-size-array="createArray" @update-element="updateElement"/>
    <div>
      <v-card v-if="array.length > 0" class="pa-4 mt-6" color="#f5f5f5">
        <div v-for="value, idx in array" class="float-left">
          <Box type="seq" :value="value" :idx="idx" />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>

import Box from '@/components/Box.vue';
import SetSeq from '@/components/SetSeq.vue';

export default {
  data() {
    return {
      index_array: 0,
      array: [], 
    };
  },
  components: {
    Box,
    SetSeq,
  },
  methods: {
    createArray(size) {
      this.array = [];
      for (let i = 0; i < size; i++)
        this.array.push('');
    },
    updateElement(index, value) {
      this.array[index] = value;
    }
  },
};
</script>

<style scoped>
.main {
  /* background-color: #263238; */
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: repeat;

}

.slider {
  width: 200px;
}


</style>
