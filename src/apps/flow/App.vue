<template>
  <div style="width: 100%">
    <el-container direction="vertical">
      <flow-element :ele="elements"></flow-element>

      
    </el-container>
  </div>
</template>
<script>
import { ref, defineComponent, watch, reactive } from "vue";

import FlowElement from "./FlowElement.vue";

import { jsPlumb } from 'jsplumb'


export default {
  components: { FlowElement },
  setup(props, ctx) {

    const elements = reactive(

      {
        text: "id1", id: "id1", type: "default", father: false,

        son: {
          type: "condition", id: "son1", father: "id1", text: "son1",
          child: [{ text: "id3", id: "id3", type: "default", father: "son1" },
          { text: "id4", id: "id4", type: "default", father: "son1" },
          { text: "id5", id: "id5", type: "default", father: "son1" }],
          son: { text: "id121", id: "id121", type: "default", father: "son1", child: [] }
        }
      }

    );





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
