<template>
  <v-card class="test">
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
  </v-card>
</template>

<script setup>
import { VNetworkGraph } from "v-network-graph";
import "v-network-graph/lib/style.css";

defineProps({
  nodes: Object,
  edges: Object,
});

const config = {
  node: {
    normal: {
      type: "rect",
      width: 60,
      height: 32,
      borderRadius: 8,
      color: "#f5f5f5",
      strokeWidth: 2,
      strokeColor: "#000000",
    },
    hover: {
      width: 60,
      height: 32,
      borderRadius: 8,
      // <-- for type is "rect"
      strokeWidth: 0,
      strokeColor: "#000000",
      strokeDasharray: "0",
      color: "#f5470b",
    },
  },
  edge: {
    gap: 40,
    type: "curve",
    normal: {
      width: (edge) => (edge.animate ? 3 : 2),
      color: "#f5470b",
      dasharray: (edge) => (edge.animate ? "4" : "0"),
      animate: (edge) => !!edge.animate,
    },
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
  path: {
    margin: 10,
    visible: true,
    curveInNode: true,
    normal: {
      width: 70,
    },
  },
};
</script>

<style scoped>
.test {
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
}
</style>
