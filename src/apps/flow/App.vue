<template>
  <div style="width: 100%">
    <el-container direction="vertical">
      <div class="flow-row" v-for="item,index in elements" :key="'index' + index">
        <flow-element :ele="item" @addElement="addElement"></flow-element>
      </div>

      <div class="flow-row">
        <flow-element :ele="endEle"></flow-element>
      </div>
    </el-container>
  </div>
</template>
<script>
import { computed, defineComponent, nextTick, reactive, inject } from "vue";
import { I } from "../../../dist/assets/vendor.2a8194a9";

import FlowElement from "./FlowElement.vue";

function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}

export default {
  components: { FlowElement },
  setup(props, contentx) {
    const elements = reactive([
      { text: "id1", id: "id1", type: "start", father: [], level: 0, son: false, childrens: [] },

      {
        text: "ctl2", id: "ctl2", type: "ctrl", father: ["id1"], level: 1, son: false, childrens: [
          {
            text: "id2", id: "id2", type: "condition", father: ["ctl2"], level: 2, childrens: [], son:

              { text: "id-3-1", id: "id-3-1", type: "condition",
               father: ["id2"], level: 3, childrens: [], son: false },

          },
          { text: "id3", id: "id3", type: "condition", father: ["ctl2"], level: 2, son: false, childrens: [] },
          { text: "id4", id: "id4", type: "condition", father: ["ctl2"], level: 2, son: false, childrens: [] },
        ]
      },

    ]);

    const plumbIns = inject("plumbIns");


    const repaint = async () => {

      await nextTick();
      plumbIns.repaintEverything(false, true)
    }

    const addElement = function (ele, type) {
      if (ele.type == "ctrl") {
        let ids = `id-${randomString(4)}`;
        ele.childrens.push({ text: ids, id: ids, type: "condition", father: [ele.id], level: ele.level + 1, son: false, childrens: [] },)

      } else {


      }

      repaint();

    }

    const findSon = function (el, eles) {

      for (let item of eles) {
        if (item.father.indexOf(el.id) > -1) {
          return true;
        }
        if (item.son && item.son.father.indexOf(el.id) > -1) {
          return true;
        }

        if (item.childrens) {

          if (findSon(el, item.childrens)) {
            return true;
          }
        }
      }

      return false;
    }


    const computedFather = function (el, elements) {

      let fatherIds = [];

      if (findSon(el, elements) === false) {
        fatherIds.push(el.id);
      }
      if (el.son && findSon(el.son, elements) === false) {
        fatherIds.push(el.son.id);
      }

      for (let c of el.childrens) {

        fatherIds = fatherIds.concat(computedFather(c, elements));
      }

      return fatherIds;

    }
    const endEle = computed(() => {
      let ele = { text: "endpoint", id: "endpoint", type: "default", father: [], level: 4, son: false, childrens: [] }


      for (let item of elements) {
        ele.father = ele.father.concat(computedFather(item, elements));
      }
      return ele;
    })


    return { elements, addElement, endEle };
  },
};
</script>

<style>
</style>
