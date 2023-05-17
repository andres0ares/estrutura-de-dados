<template>
  <div class="main">
    <ConfigFila @size="create" @push="push" @pop="pop" @top="showTop" />

    <v-card v-if="size_array > 0" class="pa-4 mt-6" color="#f5f5f5">
      <div v-for="item in fila" class="float-left">
        <FilaBox :idx="item.idx" :value="item.value" :start="item.start" :end="item.end"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref } from "vue";
import FilaBox from "@/components/FilaBox.vue";
import ConfigFila from "@/components/ConfigFila.vue";

export default {
  name: "FilaSequencial",
  components: {
    FilaBox,
    ConfigFila,
  },
  setup() {
    const start = ref(-1);
    const end = ref(-1);
    const fila = ref([]);
    const size_fila = ref(0);
    const size_array = ref(0);

    function create(size) {
      size_array.value = size - 1;

      //cria uma pilha vazian do tamanho 'size'
      for (let i = 0; i < size; i++) {
        fila.value.push({
          idx: i,
          value: "",
          start: false,
          end: false,
        });
      }
    }

    function push(value) {
      //verifica se a pilha está cheia
      if (size_fila.value <= size_array.value) {

        //remove indicador de fim
        if(end.value > -1)
            fila.value[end.value].end = false;
       
        //atualiza final
        end.value = end.value + 1 <= size_array.value ? end.value + 1 : 0;

        //atualiza indicador final e valor
        fila.value[end.value].end = true;
        fila.value[end.value].value = value;

        //se nenhum valor na fila, adiciona inicio
        if(start.value == -1){
            fila.value[0].start = true;
            start.value = 0;
        }
            
        //atualiza numero de elementos na fila
        size_fila.value++;

      } else alert("A fila está cheia!");
    }

    function pop(show) {
      //verifica se a pilha está vazia
      if (size_fila.value > 0) {

        //remove inicador de inicio
        if(start.value > -1)
            fila.value[start.value].start = false;

        //guarda valor e remove
        let value = fila.value[start.value].value;
        fila.value[start.value].value = '';

        //atualiza inicio e numero de elementos na fila
        start.value = start.value + 1 <= size_array.value ? start.value + 1 : 0;
        size_fila.value--;

        //se nenhum elemento, atualiza valores para condicoes iniciais
        if(size_fila.value == 0) {
            fila.value[start.value].start = false;
            fila.value[end.value].end = false;
            start.value = -1;
            end.value = -1;
        }else{
            //se nao, atualiza indicador de inicio
            fila.value[start.value].start = true;
        }

        //exibe elemento removido
        if (show) alert(value);
      } else alert("A fila está vazia!");
    }

    function showTop() {
      if (size_fila.value > 0)
        alert(fila.value[start.value].value);
      else alert("A fila está vazia!");
    }

    return {
      fila,
      size_fila,
      size_array,
      create,
      push,
      pop,
      showTop,
    };
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
</style>
