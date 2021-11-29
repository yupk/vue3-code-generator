<template>
  <div class="flow-col m-top">
    <div class="flow-row">
      <div
        v-if="ele.type == 'ctrl'"
        @click="addElement(ele, 'default')"
        class="el"
        :class="ele.type"
        :id="ele.id"
        v-flow="ele"
      >+</div>

      <div v-else class="el" :class="ele.type" :id="ele.id" v-flow="ele">
        {{ ele.text }}
        <div class="btn-box">
          <el-button @click="addElement(ele, 'default')">添加</el-button>
        </div>
      </div>
    </div>

    <div class="flow-row m-top-min" v-if="ele.childrens">
      <flow-element :ele="item" v-for="item in ele.childrens" :key="item.id"></flow-element>
    </div>

    <div class="flow-row m-top-min" v-if="ele.son">
      <flow-element :ele="ele.son"></flow-element>
    </div>
  </div>
</template>
 
<script>
import { computed, defineComponent, getCurrentInstance } from "vue";
import {
  jsPlumb
} from "jsplumb";
export default defineComponent({
  name: "FlowElement",
  emits: ['addElement'],
  props: {
    ele: []
  },

  setup(props, ctxt) {

    const { ctx } = getCurrentInstance();
    console.log(ctx.$plumbIns)
    const isCondition = computed(function () {

      for (let item of props.ele) {
        if (item.type == 'condition') {
          return true;
        }
      }
    })

    const addElement = function (ele, type) {
      ctxt.emit('addElement', ele, type)
    }

    return {
      isCondition, addElement
    };
  },
});
</script>

<style>
.el {
  border: 1px solid rgb(131, 26, 26);
  width: 150px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  position: relative;
  margin-left: 60px;
}
.ctrl {
  border: 1px solid #3296fa;
  cursor: pointer;
  width: 60px;
  height: 60px;
  line-height: 60px;
  color: #fff;
  outline: none;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  background: #3296fa;
  border-radius: 50%;
  position: relative;
  border: none;
  font-size: 24px;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ctrl:hover {
  transform: scale(1.3);
  box-shadow: 0 13px 27px 0 rgb(0 0 0 / 10%);
}
m-top-min {
  margin-top: 40px;
}
.m-top {
  margin-top: 70px;
}
.flow-row {
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
.el:hover .btn-box {
  display: block;
}
.btn-box {
  position: absolute;
  right: -80%;
  top: -3%;
  display: none;
  border: 1px solid rgba(17, 31, 44, 0.12);
  border-radius: 8px;
  padding: 10px;
  line-height: 40px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \9;
  z-index: 99;
}
</style>
