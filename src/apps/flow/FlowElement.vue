<template>
  <div class="flow-row">
    <template v-if="  ele.type=='condition'">
      <div v-flow:condition class="el" :class="ele.type" :id="ele.id" v-flow="ele">{{ ele.text }}</div>
    </template>

    <template v-else>
      <div :class="ele.type" class="el" :id="ele.id" v-flow="ele">{{ ele.text }}</div>
    </template>
  </div>
  <div class="flow-col" v-if="ele.son">
    <flow-element :ele="ele.son"></flow-element>

    <div class="flow-row">
      <flow-element v-for="son in ele.son.child" :key="son.id" :ele="son"></flow-element>
    </div>
  </div>
</template>
 
<script>
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "FlowElement",
  emits: [],
  props: {
    ele: {}
  },

  setup(props, ctx) {



    return {

    };
  },
});
</script>
<style>
.el {
  border: 1px solid rgb(131, 26, 26);
  width: 70px;
  height: 70px;
}
.flow-col {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.add-node-btn:hover {
  width: 45px;
  height: 45px;
  font-size: 30px;
}
.el.condition {
  width: 60px;
  height: 60px;
  border-radius: 30px;
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
