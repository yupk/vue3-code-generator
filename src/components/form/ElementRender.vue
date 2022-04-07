<template>
  <template v-if="formItemSet">
    <el-form-item v-bind="formItemSet" :style="hightLight(__ID)">
      <template v-if="ctrlBtn">
        <span
          class="tool-btn tool-btn-del _btn"
          @click="deleteItem(__ID)"
          title="删除"
        >
         <el-icon><delete /></el-icon>
        </span>
        <span
          class="tool-btn tool-btn-copy _btn"
          @click="copyItem(__ID)"
          title="复制"
        >
          <el-icon><copy-document /></el-icon>
        </span>
      </template>

      <component
        :is="tag"
        v-bind="attrs"
        v-on="events"
        :modelValue="vm"
        @update:modelValue="editModelValue"
      >
        <template v-for="(son, index) in childrens" :key="'son' + index">
          <element-render :currentID="currentID" v-bind="son"> </element-render>
        </template>
        <template v-for="(val, name) in slots" v-slot:[name]>
          {{ val }}
        </template>
      </component>
    </el-form-item>
  </template>

  <template v-else>
    <component :is="tag" v-bind="attrs" v-model="vm" v-on="events" :style="hightLight(__ID)">
      <template v-for="(son, index) in childrens" :key="'son' + index">
        <element-render
          :currentID="currentID"
          v-bind="son"
          @update="changeValue"
          @click.stop="selected(son.__ID)"
        >
        </element-render>
      </template>
      <template v-for="(val, name) in slots" v-slot:[name]>
        {{ val }}
      </template>
    </component>
  </template>
</template>

<script>
import { defineComponent, computed, ref, watch, inject, reactive } from "vue";
import InputIcon from "@/components/form/InputIcon.vue";
import {CopyDocument,Delete}  from  "@element-plus/icons-vue";;
export default defineComponent({
  name: "element-render",
  components: { InputIcon ,CopyDocument,Delete},

  emits: ["update", "updateChild", "rm", "deleteItem", "copyItem"],
  props: {
    eleName: String,
    formItem: Object,
    validator(value) {
      // 这个值必须匹配下列字符串中的一个
      return true;
    },
    __ID: String,
    tag: String,
    attrs: Object,
    events: {
      type: Object,
      default: {},
    },
    slots: Object,
    ctrlBtn: Boolean,
    currentID: String,

    childrens: Array,
    defaultvalue: {
      default: undefined,
    },
  },
  setup(props, context) {
    const copyItem = inject("copyItem");
    const deleteItem = inject("deleteItem");
    const hightLight = inject("hightLight");

    const updateChild = inject("updateChild");
    const selected = inject("selected");
    const events = props.events;
    // const attrs =reactive( Object.assign({}, props.attrs));

    const vm = ref(props.defaultvalue);

    console.log(props.defaultvalue, "props.defaultvalue");

    watch(vm, () => {
      if (props.tag == "draggable") {
        console.log(vm.value, "====", props.__ID);

        updateChild(vm.value, props.__ID);
        ///拖拽组件 触发更新子组件事件
        return;
      }
      context.emit("update", vm.value, props.eleName, props.__ID);
    });
    const formItemSet = computed(() => {
      if ([false, undefined].includes(props.formItem)) {
        return false;
      }
      if (props.formItem && props.formItem.showLabel) {
        return {
          label: props.formItem.label,
          labelWidth: props.formItem.labelWidth,
          prop: props.__ID,
        };
      } else {
        return {};
      }
    });
    const editModelValue = function (e) {
      console.log(e);
      vm.value = e;
    };

    const changeValue = function (val, elename, idname) {
      context.emit("update", val, elename, idname);
    };

    return {
      vm,
      formItemSet,
      deleteItem,
      copyItem,
      selected,
      updateChild,
      editModelValue,
      events,
      changeValue,
      hightLight
    };
  },
});
</script>
