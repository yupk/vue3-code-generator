
<template>
  <el-tabs type="border-card" v-model="current">
    <el-tab-pane label="静态数据" name="static">
      <el-form size="small">
        <el-form-item>
            <el-row>
          <template v-for="(item, index) in staticData" :key="'index' + index">
            <el-col :span="11">
              <el-form-item
                label="选项名"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="item.key"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item
                label="选项值"
                :rules="{
                  required: true,
                  message: '不能为空',
                  trigger: 'blur',
                }"
              >
                <el-input v-model="item.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" :offset="1" @click="delItem(index)">
              <i class="el-icon-delete"></i>
            </el-col>
                 
          </template>
           </el-row>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click.prevent="addItem">添加</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="动态数据" name="dynamic">
      <el-form size="small">
        <el-form-item label="接口地址">
          <el-input
            placeholder="请输入接口地址"
            v-model="dynamicData.url"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="dynamicData.medth"
                placeholder="请选择"
                style="width: 80px"
              >
                <el-option label="get" value="get"></el-option>
                <el-option label="post" value="post"></el-option>
                <el-option label="put" value="put"></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="label键值">
          <el-input type="text" v-model="dynamicData.keyName"></el-input>
        </el-form-item>
        <el-form-item label="value键值">
          <el-input type="text" v-model="dynamicData.valueName"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref, defineComponent, watch, reactive } from "vue";
import { deepClone } from "@/utils/func.js";
export default defineComponent({
  name: "OptionInput",
  emits: ["update:modelValue"],
  props: ["modelValue", "defaultvalue"],

  setup(props, ctx) {
    let modelValue = props.modelValue || {};

    const current = ref(props.modelValue.type);
    const staticData = reactive(deepClone(props.modelValue.staticData));
    const dynamicData = reactive(deepClone(props.modelValue.dynamicData));

    const addItem = function () {
      staticData.push({ key: "", value: "" });
    };

    const delItem = function (index) {
      staticData.splice(index, 1);
    };

    watch([dynamicData, staticData, current], () => {
      console.log(current.value);
      ctx.emit("update:modelValue", {
        type: current.value,
        tag: props.modelValue.tag,
        staticData,
        dynamicData,
      });
    });

    return { staticData, addItem, delItem, dynamicData, current };
  },
});
</script>

<style>
</style>
