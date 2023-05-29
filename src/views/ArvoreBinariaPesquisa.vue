<template>
  <div class="main">
    <ConfigArvore
      @init="init"
      @search="findValue"
      @add="add"
      @emOrdem="emOrdem"
      @posOrdem="posOrdem"
      @preOrdem="preOrdem"
      :values="values"
    />
    <DisplayArvore v-if="main" :nodes="nodes" :edges="edges" />
  </div>
</template>

<script>
import DisplayArvore from "@/components/DisplayArvore.vue";
import ConfigArvore from "@/components/ConfigArvore.vue";

import { ref } from "vue";

export default {
  name: "ArvoreBinariaPesquisa",
  components: {
    DisplayArvore,
    ConfigArvore,
  },
  setup() {
    const tree = ref([]);
    const nodes = ref({});
    const edges = ref({});
    const main = ref(false);
    const values = ref(Array.from({ length: 100 }, (_, i) => 1 + i));
    const time_delay = 1000;

    function init(withValues) {
      if (withValues) {
        const inicialValues = [30, 25, 35, 20, 27, 34, 38];
        inicialValues.forEach((e) => {
          addNewValue(e, 0);
        });
        updateNodes(tree);
        updateEdges(tree);
      }
      main.value = true;
    }

    function updateNodes(values) {
      nodes.value = {};
      values.value.forEach((el) => {
        nodes.value[el.id] = { value: el.value, color: el.color };
      });
    }

    function updateEdges(values) {
      edges.value = {};
      values.value.forEach((el, idx) => {
        el.edges.forEach((e, i) => {
          edges.value[`${idx}${i}`] = e;
        });
      });
    }

    function getNextNo(id) {
      let idx = tree.value.findIndex((e) => e.id == id);
      return tree.value[idx];
    }

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const exibe = ref([]);
    async function encaminhaPreOrdem(no) {
      exibe.value.push(no.value);
      nodes.value[no.id].color = "#f5470b";
      await sleep(time_delay);
      nodes.value[no.id].color = "#f5f5f5";

      //await sleep(time_delay);

      if (no == undefined) return;

      if (no.left != undefined) await encaminhaPreOrdem(getNextNo(no.left));

      if (no.right != undefined) await encaminhaPreOrdem(getNextNo(no.right));
    }



    async function encaminhaEmOrdem(no) {
      nodes.value[no.id].color = "#BDBDBD";

      await sleep(time_delay);

      if (no == undefined) return;

      if (no.left != undefined) await encaminhaEmOrdem(getNextNo(no.left));

      exibe.value.push(no.value);
      nodes.value[no.id].color = "#f5470b";
      await sleep(time_delay);
      nodes.value[no.id].color = "#f5f5f5";

      if (no.right != undefined) await encaminhaEmOrdem(getNextNo(no.right));
    }

    async function encaminhaPosOrdem(no) {
      nodes.value[no.id].color = "#BDBDBD";

      await sleep(time_delay);

      if (no == undefined) return;

      if (no.left != undefined) await encaminhaPosOrdem(getNextNo(no.left));

      if (no.right != undefined) await encaminhaPosOrdem(getNextNo(no.right));

      exibe.value.push(no.value);
      nodes.value[no.id].color = "#f5470b";
      await sleep(time_delay);
      nodes.value[no.id].color = "#f5f5f5";
    }

    function preOrdem() {
      exibe.value = [];
      encaminhaPreOrdem(tree.value[0]).then((_) => {
        alert(exibe.value);
        updateRootColor()
      });
    }

    function emOrdem() {
      exibe.value = [];
      encaminhaEmOrdem(tree.value[0]).then((_) => {
        alert(exibe.value);
        updateRootColor()
      });
    }

    function posOrdem() {
      exibe.value = [];
      encaminhaPosOrdem(tree.value[0]).then((_) => {
        alert(exibe.value);
        updateRootColor()
      });
    }

    function updateRootColor () {
      nodes.value[tree.value[0].id].color = "#FFCC80";
    }

    function addNewValue(value, time) {
      let i = values.value.indexOf(value);
      if (i >= 0) {
        values.value.splice(i, 1);
        if (tree.value.length > 0) {
          let no = tree.value[0];
          function delay(value, no, nodes, tree, delay_time) {
            nodes.value[no.id].color = "#f5470b";
            setTimeout(() => {
              if (value > no.value) {
                let idx = tree.value.findIndex((e) => e.id == no.right);
                if (idx >= 0)
                  delay(value, tree.value[idx], nodes, tree, delay_time);
                else {
                  let no_idx = tree.value.findIndex((e) => e.id == no.id);
                  tree.value[no_idx].right = `${no.id}2`;
                  tree.value[no_idx].edges.push({
                    source: no.id,
                    target: `${no.id}2`,
                  });
                  tree.value.push({
                    id: `${no.id}2`,
                    value: value,
                    color: "#f5f5f5",
                    left: undefined,
                    right: undefined,
                    edges: [],
                  });
                  updateNodes(tree);
                  updateEdges(tree);
                  updateRootColor()
                }
              } else {
                let idx = tree.value.findIndex((e) => e.id == no.left);
                if (idx >= 0)
                  delay(value, tree.value[idx], nodes, tree, delay_time);
                else {
                  let no_idx = tree.value.findIndex((e) => e.id == no.id);
                  tree.value[no_idx].left = `${no.id}1`;
                  tree.value[no_idx].edges.push({
                    source: no.id,
                    target: `${no.id}1`,
                  });
                  tree.value.push({
                    id: `${no.id}1`,
                    value: value,
                    color: "#f5f5f5",
                    left: undefined,
                    right: undefined,
                    edges: [],
                  });
                  updateNodes(tree);
                  updateEdges(tree);
                  updateRootColor()
                }
              }
              nodes.value[no.id].color = "#f5f5f5";
            }, delay_time);
          }
          delay(value, no, nodes, tree, time);
        } else {
          tree.value.push({
            id: "1",
            value: value,
            color: "#FFCC80",
            left: undefined,
            right: undefined,
            edges: [],
          });
          updateNodes(tree);
          updateEdges(tree);
        }
      } else {
        alert("Número já adicionado!");
      }
    }

    function findValue(value) {
      let no = tree.value[0];

      function delay(value, no, nodes, tree, delay_time) {
        console.log(value);
        nodes.value[no.id].color = no.value == value ? "#f5470b" : "#BDBDBD";
        setTimeout(() => {
          if (value != no.value) {
            if (value > no.value) {
              let idx = tree.value.findIndex((e) => e.id == no.right);
              if (idx >= 0)
                delay(value, tree.value[idx], nodes, tree, delay_time);
              else{
                alert("Nó não encontrado.");
                updateRootColor()
              } 
            } else {
              let idx = tree.value.findIndex((e) => e.id == no.left);
              if (idx >= 0)
                delay(value, tree.value[idx], nodes, tree, delay_time);
              else {
                alert("Nó não encontrado.");
                updateRootColor()
              } 
            }
            nodes.value[no.id].color = "#f5f5f5";
          } else {
            nodes.value[no.id].color = "#f5f5f5";
            alert(
              `Nó encontrado: {valor: ${value}, filhoEsquerda: ${no.left}, filhoDireita: ${no.right}}`
            );
            updateRootColor()
          }
        }, delay_time);
      }

      delay(value, no, nodes, tree, time_delay);
    }

    function add(value) {
      addNewValue(value, time_delay);
    }

    

    return {
      nodes,
      edges,
      main,
      values,
      init,
      findValue,
      add,
      emOrdem,
      posOrdem,
      preOrdem,
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
