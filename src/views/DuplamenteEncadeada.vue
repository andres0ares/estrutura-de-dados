<template>
  <div class="main">
    <SetSimEnc
      @push="push"
      @edit="edit"
      @pop="pop"
      @get="get"
      :idxs="nodeArray.length"
    />
    <SimEncDisplay :nodes="nodes" :edges="edges" />
  </div>
</template>

<script>
import SetSimEnc from "@/components/ConfigEncadeada.vue";
import SimEncDisplay from "@/components/ListArrowDisplay.vue";

export default {
  data() {
    return {
      index_array: 0,
      array: [],
      nodeArray: [
        // {key: '2', value: {name: '2'}},
        // {key: '1', value: {name: '1'}}
      ],
      edgeArray: [],
      edgeArray2: [],
      nodes: {},
      edges: {},
      default_delay: 500,
    };
  },
  components: {
    SetSimEnc,
    SimEncDisplay,
  },
  methods: {
    push(value, idx) {
      if (this.edgeArray.length > 0 && idx > 1) {
        this.animatePath(idx - 1);
        let wait =
          idx < (this.nodeArray.length - 1) / 2
            ? idx
            : this.nodeArray.length - 1 - idx;
        setTimeout(() => {
          this.add(value, idx);
        }, wait * this.default_delay);
      } else {
        this.add(value, idx);
      }
    },
    pop(idx) {
      if (this.edgeArray.length > 0 && idx > 0) {
        this.animatePath(idx);
        let wait =
          idx < (this.nodeArray.length - 1) / 2
            ? idx
            : this.nodeArray.length - 1 - idx;
        setTimeout(() => {
          this.deleteItem(idx);
        }, wait * this.default_delay);
      } else {
        console.log(idx);
      }
    },
    edit(value, idx) {
      if (this.edgeArray.length > 0 && idx > 0) {
        this.animatePath(idx);
        let wait =
          idx < (this.nodeArray.length - 1) / 2
            ? idx
            : this.nodeArray.length - 1 - idx;
        setTimeout(() => {
          this.nodeArray[idx].value.icon = value;
          this.updateNode(this.nodeArray);
        }, wait * this.default_delay);
      } else {
        this.nodeArray[idx].value.icon = value;
        this.updateNode(this.nodeArray);
      }
    },
    get(option, value) {
      switch (option) {
        case "indice": {
          this.animatePath(value);
          let wait =
            value < (this.nodeArray.length - 1) / 2
              ? value
              : this.nodeArray.length - 1 - value;
          setTimeout(() => {
            alert(this.nodeArray[value].value.icon);
          }, wait * this.default_delay);
          break;
        }

        case "valor": {
          let idx = this.nodeArray.findIndex((e) => e.value.icon == value);
          let notFound = idx == -1;
          idx = notFound ? this.nodeArray.length - 1 : idx;

          this.animatePath(idx, true);
          setTimeout(() => {
            if (notFound) alert("Não Encontrado.");
            else alert(`Encontrado na posição: ${idx}`);
          }, idx * this.default_delay);
          break;
        }

        default:
          break;
      }
    },
    deleteItem(idx) {
      if (idx > 0) {
        if (idx < this.nodeArray.length - 1) {
          this.setPath(idx, idx - 1, idx + 1);
          setTimeout(() => {
            this.removePath(
              this.nodeArray[idx - 1].key,
              this.nodeArray[idx].key
            );
            this.removePath(
              this.nodeArray[idx].key,
              this.nodeArray[idx + 1].key
            );
            setTimeout(() => {
              this.nodeArray.splice(idx, 1);
              this.updateNode(this.nodeArray);
              this.updateNames();
            }, this.default_delay);
          }, this.default_delay);
        } else {
          this.removePath(this.nodeArray[idx - 1].key, this.nodeArray[idx].key);
          setTimeout(() => {
            this.nodeArray.splice(idx, 1);
            this.updateNode(this.nodeArray);
            this.updateNames();
          }, this.default_delay);
        }
      } else if (this.nodeArray.length > 1) {
        this.removePath(this.nodeArray[idx].key, this.nodeArray[idx + 1].key);
        setTimeout(() => {
          this.nodeArray.splice(idx, 1);
          this.updateNode(this.nodeArray);
          this.updateNames();
        }, this.default_delay);
      } else {
        this.nodeArray.splice(idx, 1);
        this.updateNode(this.nodeArray);
        this.updateNames();
      }
    },
    add(value, idx) {
      //pega maior número de nó
      const max =
        this.nodeArray.length > 0
          ? Math.max(...this.nodeArray.map((e) => Number(e.key))) + 1
          : 1; //
      let node = { key: `${max}`, value: { name: ``, icon: value } };
      this.nodeArray.splice(idx, 0, node);

      this.updateNode(this.nodeArray);

      setTimeout(() => {
        if (idx > 0) {
          //adiciona ponteiro do anterior para o atual
          this.setPath(idx, idx - 1, idx);
          if (idx < this.nodeArray.length - 1) {
            setTimeout(() => {
              //adiciona ponteiro para o proximo item
              this.setPath(idx + 1, idx, idx + 1);
              setTimeout(() => {
                this.removePath(
                  this.nodeArray[idx - 1].key,
                  this.nodeArray[idx + 1].key
                );
                this.updateNames();
              }, this.default_delay);
            }, this.default_delay);
          } else {
            this.updateNames();
          }
        } else if (idx < this.nodeArray.length - 1) {
          //adiciona ponteiro para inicio da lista
          this.setPath(idx, idx, idx + 1);
          this.updateNames();
        } else {
          this.updateNames();
        }
      }, this.default_delay);
    },
    removePath(source, target) {
      let idx = this.edgeArray.findIndex((e) => {
        return e.value.source == source && e.value.target == target;
      });
      let idx2 = this.edgeArray2.findIndex((e) => {
        return e.value.source == target && e.value.target == source;
      });

      this.edgeArray.splice(idx, 1);
      this.edgeArray2.splice(idx2, 1);
      this.updateEdge([...this.edgeArray, ...this.edgeArray2]);
    },

    setPath(idx, source, target) {
      const max =
        this.edgeArray.length > 0
          ? Math.max(...this.edgeArray.map((e) => Number(e.key))) + 1
          : 1; //
      this.edgeArray.splice(idx, 0, {
        key: `${max}`,
        value: {
          source: this.nodeArray[source].key,
          target: this.nodeArray[target].key,
        },
      });

      this.edgeArray2.splice(this.edgeArray2 - 1 - idx, 0, {
        key: `${max}`,
        value: {
          source: this.nodeArray[target].key,
          target: this.nodeArray[source].key,
        },
      });

      console.log("setpath", [...this.edgeArray, ...this.edgeArray2]);
      this.updateEdge([...this.edgeArray, ...this.edgeArray2]);
    },
    updateNames() {
      this.nodeArray.forEach((e, idx) => {
        e.value.name = `${idx}`;
      });
      this.updateNode(this.nodeArray);
    },
    animatePath(idx, search) {
      if (idx + 1 < this.nodeArray.length || search) {

        let test = this.getEdgeArray();
        let j;

        if (search) {
          j = 0;
        } else {
          j = idx < (this.nodeArray.length - 1) / 2 ? 0 : test.length / 2;
          idx =
            idx < (this.nodeArray.length - 1) / 2
              ? idx
              : this.nodeArray.length - 1 - idx + j;
        }

        console.log("test", j, idx, test);

        function delay(i, updateEdge, size, delay_time) {
          test[i].value.animate = true;
          updateEdge(test);
          setTimeout(() => {
            test[i].value.animate = false;
            // if (i > 0) test[i - 1].value.animate = false;

            updateEdge(test);
            // console.log(array[i]);
            i++;
            if (i < size) {
              delay(i, updateEdge, size, delay_time);
            } else {
              updateEdge([...this.edgeArray, ...this.edgeArray2]);
            }
          }, delay_time);
        }

        if (idx > 0) delay(j, this.updateEdge, idx, this.default_delay);
      }
    },
    getEdgeArray() {
      let test = [];
      let idx = 1;
      if (this.nodeArray.length > 0) {
        for (let i = 1; i < this.nodeArray.length; i++) {
          test.push({
            key: `${idx}`,
            value: {
              source: this.nodeArray[i - 1].key,
              target: this.nodeArray[i].key,
            },
          });
          idx++;
        }
        for (let i = this.nodeArray.length - 1; i > 0; i--) {
          test.push({
            key: `${idx}`,
            value: {
              source: this.nodeArray[i].key,
              target: this.nodeArray[i - 1].key,
            },
          });
          idx++;
        }
      }
      return test;
    },
    updateNode(array) {
      this.nodes = {};
      array.forEach((e) => {
        this.nodes[e.key] = e.value;
      });
    },
    updateEdge(array) {
      this.edges = {};
      array.forEach((e, idx) => {
        this.edges[idx] = e.value;
      });
    },
  },
  mounted() {
    this.updateEdge(this.edgeArray);
    this.updateNode(this.nodeArray);
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v97/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
    format("woff2");
}
.main {
  background-color: #263238;
  min-height: 100vh;
  background-image: url("https://www.transparenttextures.com/patterns/swirl.png");
  background-repeat: repeat;
}

.slider {
  width: 200px;
}
</style>
