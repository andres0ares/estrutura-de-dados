<script setup lang="ts">
import { VNetworkGraph } from "v-network-graph";
import {
  ForceLayout,
  ForceNodeDatum,
  ForceEdgeDatum,
} from "v-network-graph/lib/force-layout";

const { nodes, edges } = defineProps(["nodes", "edges"]);

const configs = {
  view: {
    layoutHandler: new ForceLayout({
      positionFixedByDrag: false,
      positionFixedByClickWithAltKey: true,
      createSimulation: (d3, nodes, edges) => {
        // d3-force parameters
        const forceLink = d3
          .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
          .id((d) => d.id);
        return d3
          .forceSimulation(nodes)
          .force("edge", forceLink.distance(40).strength(0.5))
          .force("charge", d3.forceManyBody().strength(-800))
          .force("center", d3.forceCenter().strength(0.05))
          .alphaMin(0.001);

        // * The following are the default parameters for the simulation.
        // const forceLink = d3.forceLink<ForceNodeDatum, ForceEdgeDatum>(edges).id(d => d.id)
        // return d3
        //   .forceSimulation(nodes)
        //   .force("edge", forceLink.distance(100))
        //   .force("charge", d3.forceManyBody())
        //   .force("collide", d3.forceCollide(50).strength(0.2))
        //   .force("center", d3.forceCenter().strength(0.05))
        //   .alphaMin(0.001)
      },
    }),
  },
  node: {
    label: {
      visible: false,
    },
  },
};
</script>

<template>
  <v-network-graph
    class="test"
    :zoom-level="1.5"
    :nodes="nodes"
    :edges="edges"
    :configs="configs"
  >
    <!-- Replace the node component -->
    <template #override-node="{ nodeId, scale, config, ...slotProps }">
      <circle
        class="v-ng-svg-circle"
        :cx="1 * scale"
        :cy="1 * scale"
        :r="20 * scale"
        :fill="nodes[nodeId].color"
        :stroke="config.strokeColor"
        :stroke-width="1.5"
      />
      <!-- Use v-html to interpret escape sequences for icon characters. -->
      <text
        font-family="Material Icons"
        :font-size="20 * scale"
        fill="#000000"
        text-anchor="middle"
        dominant-baseline="central"
        style="pointer-events: none"
        v-html="nodes[nodeId].value"
      />
    </template>
  </v-network-graph>
</template>

<style scoped>
.test {
  background-color: #f5f5f5;
  width: 100vw;
  height: 100vh;
}
</style>
