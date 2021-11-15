<template>

<div class="flow-row" v-if="isCondition">
  <div class="el condition" ></div>

</div>
  <div class="flow-col" v-for="item in ele" :key="item.id">
    <template v-if="item.type == 'condition'">
      <div
        v-flow:condition
        class="el"
        :class="item.type"
        :id="item.id"
        v-flow="item"
      >{{ item.text }}</div>
    </template>

    <template v-else>
      <div  v-flow:default :class="item.type" class="el" :id="item.id" v-flow="item">{{ item.text }}</div>
    </template>
  </div>
</template>
 
<script>
import { computed, defineComponent, ref } from "vue";
 
export default defineComponent({
  name: "FlowElement",
  emits: [],
  props: {
    ele: []
  },

  setup(props, ctx) {
    const isCondition=computed(function(){

      for(let item of props.ele){
        if(item.type=='condition'){
          return true;
        }
      }
    })

    return {
isCondition
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
