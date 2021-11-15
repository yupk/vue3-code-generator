<template>
  <div style="width: 100%">
    <el-container direction="vertical">

      <div class="flow-row" v-for="items,index in elements" :key="'index'+index">
        <flow-element :ele="items"></flow-element>
      </div>
      
    </el-container>
  </div>
</template>
<script>
import { ref, defineComponent, watch, reactive } from "vue";

import FlowElement from "./FlowElement.vue";

import { jsPlumb } from "jsplumb";

export default {
  components: { FlowElement },
  setup(props, ctx) {
    const elements = reactive([
      [{ text: "id1", id: "id1", type: "start", father: false, level: 0 }],

      [
        { text: "id2", id: "id2", type: "condition", father: "id1", level: 1 },
        { text: "id3", id: "id3", type: "condition", father: "id1", level: 1 },
        { text: "id4", id: "id4", type: "condition", father: "id1", level: 1 },
      ],
    ]);

    return { elements };
  },
};
</script>

<style>
.el {
  border: 1px solid rgb(131, 26, 26);
  width: 70px;
  height: 70px;
}

.flow-row {
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.add-node-btn:hover {
  width: 45px;
  height: 45px;
  font-size: 30px;
}

.add-node-btn {
  width: 40px;
  height: 40px;
  border-radius: 25px;
  font-size: 25px;
  background-color: #3296fa;
  color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  border: none;
}
</style>
