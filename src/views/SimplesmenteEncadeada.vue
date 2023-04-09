<template>
  <div class="main">
    <SetSimEnc @push="push" @edit="edit" @pop="pop" :idxs="nodeArray.length" />
    <SimEncDisplay :nodes="nodes" :edges="edges" />
  </div>
</template>

<script>
import Box from "@/components/Box.vue";
import SetSimEnc from "@/components/SetSimEnc.vue";
import SimEncDisplay from "@/components/SimEncDisplay.vue";

export default {
  data() {
    return {
      index_array: 0,
      nodeArray: [
        // {key: '2', value: {name: '2'}},
        // {key: '1', value: {name: '1'}}
      ],
      edgeArray: [],
      nodes: {},
      edges: {},
    };
  },
  components: {
    Box,
    SetSimEnc,
    SimEncDisplay,
  },
  methods: {
    push(value, idx) {
      if (this.edgeArray.length > 0 && idx > 1) {
        this.animatePath(this.edgeArray, idx - 1);
        setTimeout(() => {
          this.add(value, idx);
        }, idx * 1000);
      } else {
        this.add(value, idx);
      }
    },
    pop(idx) {
      if (this.edgeArray.length > 0 && idx > 0) {
        this.animatePath(this.edgeArray, idx);
        setTimeout(() => {
          this.deleteItem(idx);
        }, idx * 1000);
      } else {
        console.log(idx);
      }
    },
    edit(value, idx) {
      if (this.edgeArray.length > 0 && idx > 0) {
        this.animatePath(this.edgeArray, idx);
        setTimeout(() => {
          this.nodeArray[idx].value.icon = value;
          this.updateNode(this.nodeArray);
        }, idx * 1000);
      } else {
        this.nodeArray[idx].value.icon = value;
        this.updateNode(this.nodeArray);
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
            }, 1000);
          }, 1000);
        } else {
          this.removePath(this.nodeArray[idx - 1].key, this.nodeArray[idx].key);
          setTimeout(() => {
            this.nodeArray.splice(idx, 1);
            this.updateNode(this.nodeArray);
            this.updateNames();
          }, 1000);
        }
      } else if (this.nodeArray.length > 1) {
        this.removePath(this.nodeArray[idx].key, this.nodeArray[idx + 1].key);
        setTimeout(() => {
          this.nodeArray.splice(idx, 1);
          this.updateNode(this.nodeArray);
          this.updateNames();
        }, 1000);
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
          this.setPath(idx, idx - 1, idx);
          if (idx < this.nodeArray.length - 1) {
            setTimeout(() => {
              this.setPath(idx, idx, idx + 1);
              setTimeout(() => {
                this.removePath(
                  this.nodeArray[idx - 1].key,
                  this.nodeArray[idx + 1].key
                );
                this.updateNames();
              }, 1000);
            }, 1000);
          } else {
            this.updateNames();
          }
        } else if (idx < this.nodeArray.length - 1) {
          this.setPath(idx, idx, idx + 1);
          this.updateNames();
        } else {
          this.updateNames();
        }
      }, 1000);
    },
    removePath(source, target) {
      let idx = this.edgeArray.findIndex((e) => {
        return e.value.source == source && e.value.target == target;
      });
      this.edgeArray.splice(idx, 1);
      this.updateEdge(this.edgeArray);
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
      this.updateEdge(this.edgeArray);
    },
    updateNames() {
      this.nodeArray.forEach((e, idx) => {
        e.value.name = `${idx}`;
      });
      this.updateNode(this.nodeArray);
    },
    animatePath(array, end) {
      let test = JSON.parse(JSON.stringify(array));

      let j = 0;

      function delay(i, updateEdge, size) {
        console.log("here", i);
        test[i].value.animate = true;
        updateEdge(test);
        setTimeout(() => {
          console.log("here2", i);
          console.log(test);
          test[i].value.animate = false;
          // if (i > 0) test[i - 1].value.animate = false;

          updateEdge(test);
          console.log(array[i]);
          i++;
          if (i < size) {
            delay(i, updateEdge, size);
          }
        }, 1000);
      }

      delay(j, this.updateEdge, end);
    },
    updateNode(array) {
      this.nodes = {};
      array.forEach((e) => {
        this.nodes[e.key] = e.value;
      });
    },
    updateEdge(array) {
      this.edges = {};
      array.forEach((e) => {
        this.edges[e.key] = e.value;
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
