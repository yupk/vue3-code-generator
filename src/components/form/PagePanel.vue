<template>
  <div class="components-list">
    <div>
      <template v-for="(group, name) in elements" :key="name">
        <el-divider> {{ group.title }} </el-divider>
        <draggable
          class="components-draggable"
          :list="group.eles"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
          :clone="copy"
          draggable=".components-item"
          :sort="false"
          @end="onEnd"
        >
          <div
            v-for="(element, index) in group.eles"
            :key="index"
            class="components-item"
            @click="addComponent(element)"
          >
            <div class="components-body">
              <svg-icon :icon-class="element.tagIcon" />
              {{ element.name }}
            </div>
          </div>
        </draggable>
      </template>
    </div>
  </div>
</template>

<script>
import cloneComponent from "@/utils/cloneComponent.js";
import { elements } from "@/components/form/ui/index.js";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PagePanel",
  emits: ["addComponent"],

  props: {
    formId: {
      type: String,
      default: "form_",
    },
    idGlobal: {
      type: Number,
      default: 1,
    },
  },

  setup(props, ctx) {
    const r = ref(1);
    const { copy, onEnd } = cloneComponent(props);
    const addComponent = function (el) {
      ctx.emit("addComponent", copy(el));
    };

    const _eles = [];
    for (let ele in elements) {
      for (let el of elements[ele]["eles"]) {
        _eles.push(el);
      }
    }

    return { elements, onEnd, copy, addComponent, _eles };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
