<template>
  <div class="main">
    <ConfigSequencial
      @update-size-array="create"
      @update-element="put"
      @search-element="get"
    />
    <div>
      <v-card v-if="array.length > 0" class="pa-4 mt-6" color="#f5f5f5">
        <div v-for="(element, idx) in array" class="float-left">
          <Box
            type="seq"
            :value="element.value"
            :idx="idx"
            :animate="element.animate"
          />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
//components
import Box from "@/components/Box.vue";
import ConfigSequencial from "@/components/ConfigSequencial.vue";
import { ref } from "vue";

const array = ref([]);

//CRUD list
function create(size) {
  array.value = [];
  for (let i = 0; i < size; i++)
    array.value.push({ value: "null", animate: false });
}

function put(index, value) {
  array.value[index].value = value;
}

function get(option, value) {
  switch (option) {
    //search by idx
    case "indice": {
      //animate
      array.value[value].animate = true;
      setTimeout(() => {
        //print value
        alert(array.value[value].value);
        //stop animation
        array.value[value].animate = false;
      }, 100);
      break;
    }
    //search by value
    case "valor": {
      //find first index 
      let idx = array.value.findIndex((e) => e.value == value);
      let notFound = idx == -1;
      idx = notFound ? array.value.length - 1 : idx;

      //display animation
      let j = 0;
      function delay(i, array, idx) {
        array[i].animate = true;
        setTimeout(() => {
          array[i].animate = false;
          i++;
          if (i < idx) {
            delay(i, array, idx);
          }
        }, 500);
      }

      delay(j, array.value, idx + 1);

      //alert value
      setTimeout(() => {
        if (notFound) alert("Não Encontrado.");
        else alert(`Encontrado na posição: ${idx}`);
      }, (idx + 1) * 500);

      break;
    }
    default:
      break;
  }
}
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
