<template>
  <div class="main">
    <SetSeq
      @update-size-array="createArray"
      @update-element="updateElement"
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

<script>
import Box from "@/components/Box.vue";
import SetSeq from "@/components/SetSeq.vue";

export default {
  name: "Sequencial",
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
        this.array.push({ value: "null", animate: false });
    },
    updateElement(index, value) {
      this.array[index].value = value;
    },
    get(option, value) {
      switch (option) {
        case "indice": {
          //animate
          this.array[value].animate = true;
          setTimeout(() => {
            //print value
            alert(this.array[value].value);
            //stop animation
            this.array[value].animate = false;
          }, 100);
          break;
        }
        case "valor": {
          let idx = this.array.findIndex((e) => e.value == value);
          let notFound = idx == -1;
          idx = notFound ? this.array.length - 1 : idx;

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

          delay(j, this.array, idx+1);
          setTimeout(() => {
            if(notFound)
              alert('Não Encontrado.')
            else
              alert(`Encontrado na posição: ${idx}`)
          }, (idx+1)*500)
          
          

          break;
        }
        default:
          break;
      }
    },
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
