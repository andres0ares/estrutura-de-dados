<template>
  <div class="main">
    <ConfigPilha @size="create" @push="push" @pop="pop" @top="showTop" />

    <PilhaBox
      v-for="item in pilha"
      :idx="item.idx"
      :value="item.value"
      :isTop="item.isTop"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import PilhaBox from "@/components/PilhaBox.vue";
import ConfigPilha from "@/components/ConfigPilha.vue";

export default {
  name: "PilhaSequencial",
  components: {
    PilhaBox,
    ConfigPilha,
  },
  setup() {
    const top = ref(-1);
    const pilha = ref([]);
    const size_pilha = ref(0);

    function create(size) {
      size_pilha.value = size - 1;

      //cria uma pilha vazian do tamanho 'size'
      for (let i = size - 1; i >= 0; i--) {
        pilha.value.push({
          idx: i,
          value: "",
          isTop: false,
        });
      }
    }

    function push(value) {
      //verifica se a pilha está cheia
      if (top.value < size_pilha.value) {
        //atualiza topo
        top.value++;
        if (top.value > 0)
          pilha.value[size_pilha.value - top.value + 1].isTop = false;

        //atualiza valor
        pilha.value[size_pilha.value - top.value].isTop = true;
        pilha.value[size_pilha.value - top.value].value = value;
      } else alert("A pilha está cheia!");
    }

    function pop(show) {
      //verifica se a pilha está vazia
      if (top.value >= 0) {

        let value = pilha.value[size_pilha.value - top.value].value;
   
        pilha.value[size_pilha.value - top.value].isTop = false;
        pilha.value[size_pilha.value - top.value].value = "";

         //atualiza topo
         top.value--;

        if (top.value >= 0)
          pilha.value[size_pilha.value - top.value].isTop = true;

        if(show)
            alert(value);
      } else alert("A pilha está vazia!");
    }

    function showTop() {
        if (top.value >= 0) 
            alert(pilha.value[size_pilha.value - top.value].value)
        else
            alert("A pilha está vazia!");
        
    }


    return {
      pilha,
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
