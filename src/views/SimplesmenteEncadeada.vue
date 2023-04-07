<template>
  <div class="main">
    <SetSeq @update-size-array="createArray" @update-element="updateElement" />
    <div>
      <v-card v-if="array.length > 0" class="pa-4 mt-6" color="#ECEFF1">
        <div v-for="(value, idx) in array" class="float-left">
          <Box type="enc" :value="value" :idx="idx" />
        </div>
      </v-card>
      <div class="test">
        <v-network-graph :nodes="nodes" :edges="edges" :configs="config">
          <!-- Replace the node component -->
          <template #override-node="{ nodeId, scale, config, ...slotProps }">
            <rect
              :width="60 * scale"
              :height="40 * scale"
              :x="-30 * scale"
              :y="-20 * scale"
              :rx="config.borderRadius * scale"
              :ry="config.borderRadius * scale"
              :fill="config.color"
              :stroke="config.strokeColor"
              :stroke-width="config.strokeWidth * scale"
              v-bind="slotProps"
            />
            <!-- Use v-html to interpret escape sequences for icon characters. -->
            <text
              font-family="Material Icons"
              :font-size="22 * scale"
              fill="#000000"
              text-anchor="middle"
              dominant-baseline="central"
              style="pointer-events: none"
              v-html="nodes[nodeId].icon"
            />
          </template>
        </v-network-graph>
      </div>
    </div>
  </div>
</template>

<script>
import Box from "@/components/Box.vue";
import SetSeq from "@/components/SetSeq.vue";
import { VNetworkGraph } from "v-network-graph";
import "v-network-graph/lib/style.css";

export default {
  data() {
    return {
      index_array: 0,
      array: [],
      nodes: {
        node1: { name: "Node 1" },
        node2: { name: "Node 2" },
        node3: { name: "Node 3" },
        node4: { name: "Node 4" },
      },
      edges: {
        edge1: { source: "node1", target: "node2" },
        edge2: { source: "node2", target: "node3" },
        edge3: { source: "node3", target: "node4" },
      },
      config: {
        node: {
          normal: {
            type: "rect",
            width: 60,
            height: 32,
            borderRadius: 8,
            color: "#eaeaea",
            strokeWidth: 1,
            strokeColor: "#000000",
          },
        },
        edge: {
          marker: {
            target: {
              type: "arrow",
              width: 4,
              height: 4,
              margin: -1,
              units: "strokeWidth",
              color: null,
            },
          },
        },
      },
    };
  },
  components: {
    Box,
    SetSeq,
    VNetworkGraph,
  },
  methods: {
    createArray(size) {
      this.nodes = {};

      for (let i = 0; i < size; i++) {
        this.nodes[`node${i}`] = { name: `Node ${i}`, icon: "&#128142;" };
      }
    },
    updateElement(index, value) {
      this.array[index] = value;
    },
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
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://www.transparenttextures.com/patterns/swirl.png");
  background-repeat: repeat;
}

.test {
  background-color: rgba(red, green, blue, 0.1);
  width: 90vw;
  height: 30vh;
}

.slider {
  width: 200px;
}
</style>
