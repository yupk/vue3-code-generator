<template>
  <!-- {{ modelValue.drawingList }} -->

  <el-form
    :model="formModel"
    v-bind="formSetting"
    :gutter="modelValue.formConf.gutter"
  >
    <draggable
      class="drawing-board"
      style="padding: 10px; height: 100%"
      :list="modelValue.drawingList"
      :animation="340"
      group="componentsGroup"
      @change="onEnd"
    >
      <template
        v-for="(item, index) in conf.drawingList"
        :key="item.__ID + index"
      >
        <!-- {{item}} -->
        <element-render
          @click.stop="selected(item.__ID)"
          @update="changeValue"
          :currentID="modelValue.current"
          v-bind="item"
          class="item-tool-box"
        ></element-render>
      </template>

      <el-empty
        v-if="conf.drawingList.length < 1"
        description="从左侧拖入或点选组件进行表单设计"
      ></el-empty>

      <template v-else>
        <el-form-item v-if="conf.formConf.attrs.__formBtns.__val__">
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </template>
    </draggable>
  </el-form>
</template>

<script>
import { deepClone, isObjectArray } from "@/utils/func.js";

import { defineComponent, reactive, computed, inject, watch } from "vue";
import { initRender } from "@/utils/drawer.js";
import ElementRender from "@/components/form/ElementRender.vue";

export default defineComponent({
  name: "PageGenerator",
  props: ["modelValue"],
  emits: ["update:modelValue"],

  components: { ElementRender },

  setup(props, context) {
    const selected = inject("selected");
    const updateDefaultValue = inject("updateDefaultValue");
    const onEnd = function (e) {
      context.emit("update:modelValue", props.modelValue);
    };
    const conf = initRender(props.modelValue);

    const formModel = reactive({});

    let formEleKeys = [];
    const watchElement = function (eles) {
      for (let item of eles) {
        formModel[item.__ID] = formModel[item.__ID]
          ? formModel[item.__ID]
          : item.defaultvalue;
        formEleKeys.push(item.__ID);
        if (isObjectArray(item.childrens)) {
          watchElement(item.childrens);
        }
      }
    };

    watch(props.modelValue, () => {
      formEleKeys = [];
      watchElement(props.modelValue.drawingList);
      for (let k in formModel) {
        if (!formEleKeys.includes(k)) {
          delete formModel[k];
        }
      }
    });

    const formSetting = computed(() => {
      let ini = {};

      for (let attr in props.modelValue.formConf.attrs) {
        if (attr.substr(0, 2) != "__") {
          ini[attr] = props.modelValue.formConf.attrs[attr].__val__;
        }
      }
      ini["rules"] = deepClone(props.modelValue.formConf.attrs["__rules"]);
      for (let p in ini["rules"]) {
        ini["rules"][p] = ini["rules"][p].map((a) => {
          a.pattern = new RegExp(a.pattern);

          return a;
        });
      }
      return ini;
    });

    const changeValue = function (val, elename, idname) {
      console.log(val, elename, idname);

      updateDefaultValue(val, idname);
      formModel[idname] = val;
    };

    return { onEnd, conf, formSetting, selected, changeValue, formModel };
  },
});
</script>
<style>
.tool-btn-del:hover {
  background: #f56c6c;
  color: #fff;
}
.tool-btn-copy:hover {
  background: #409eff;
  color: #fff;
}
.tool-btn-del {
  right: 24px;
  border-color: #f56c6c;
  color: #f56c6c;
  background: #fff;
}
.tool-btn-copy {
  right: 56px;
  border-color: #409eff;
  color: #409eff;
  background: #fff;
}
.tool-btn {
  display: initial;
  position: absolute;
  top: -10px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
  border: 1px solid;
  cursor: pointer;
  z-index: 15;
}
.item-tool-box {
  position: relative;
}
.el-scrollbar__view {
  height: 100%;
}
.item-attribute {
  padding: 10px;
  border: 1px solid black;
}
.clone-grid {
  display: flex;
}
</style>
