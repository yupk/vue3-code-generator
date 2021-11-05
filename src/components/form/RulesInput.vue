<template>
  <el-form label-position="left" label-width="100px">
    <el-form-item>
      <el-button size="mini" @click.prevent="addItem">添加规则</el-button>
    </el-form-item>

    <el-card
      style="margin: 10px 5px"
      v-for="(item, index) in data[fieldName]"
      :key="'c' + index"
      class="_box"
    >
      <el-form-item label="表达式" size="mini">
        <el-autocomplete
          v-model="item.pattern"
          :fetch-suggestions="querySearch"
          class="inline-input"
          placeholder="输入验证正则表达式"
          @select="handleSelect(item)"
        >
          <template #default="{ item }">
            {{ item.title }}
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="错误提示" size="mini">
        <el-input v-model="item.message"></el-input>
      </el-form-item>

      <el-form-item label="触发事件" size="mini">
        <el-input v-model="item.trigger"></el-input>
      </el-form-item>

      <span class="tool">
        <el-icon :size="20" @click="del(item.id)">
          <circle-close-filled />
        </el-icon>
      </span>
    </el-card>

    <template v-if="fieldName in data && data[fieldName].length > 0">
      <el-form-item>
        <el-button size="mini" @click.prevent="save" ref="btn">保存</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>
 
 

<script>
import { deepClone, randFieldId } from "@/utils/func.js";
import { CircleCloseFilled } from "@element-plus/icons";
import { defineComponent, nextTick, reactive, ref, toRaw } from "vue";

export default defineComponent({
  name: "RulesInput",
  emits: ["update:modelValue"],
  components: { CircleCloseFilled },
  props: ["modelValue", "defaultvalue", "fieldName"],
  setup(props, ctx) {
    console.log(props);

    const btn = ref(null);
    const data = reactive(deepClone(toRaw(props.modelValue)));

    const scrollTo = async () => {
      await nextTick();

    
      btn.value.$el.scrollIntoView();
    };

    const addItem = function () {
      if (props.fieldName in data == false) {
        data[props.fieldName] = [];
      }

      data[props.fieldName].push({
        id: randFieldId(),
        pattern: "",
        message: "请输入正确内容",
        trigger: "blur",
      });
      scrollTo();
    };

    const save = function () {
      ctx.emit("update:modelValue", data);
    };

    const querySearch = function (qs, cb) {
      const results = [
        {
          title: "Email",
          value: "^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",
          msg: "请输入正确的 Email",
        },
        {
          title: "身份证",
          value:
            "^[1-9]d{5}(18|19|([23]d))d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)d{3}[0-9Xx]$",
          msg: "请输入正确的身份证号码",
        },
        {
          title: "URL",
          value:
            "^((https?|ftp|file)://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$",
          msg: "请输入正确的URL",
        },
        {
          title: "电话号码",
          value: "^((d{3,4}-)|d{3.4}-)?d{7,8}$",
          msg: "请输入正确的电话号码",
        },
        {
          title: "必须是中文",
          value: "^[\\u4e00-\\u9fa5]{0,}$",
          msg: "必须是中文",
        },
      ];
      cb(results);
    };

    const handleSelect = function (opt, item) {
      // item.message=opt.msg
      console.log(item, opt);
    };

    const del = function (id) {
      data[props.fieldName].splice(
        data[props.fieldName].findIndex((item) => item.id === id),
        1
      );
      save();
    };

    return {
      data,
      addItem,
      save,
      querySearch,
      handleSelect,
      del,
      btn,
    };
  },
});
</script>
<style scoped>
._box {
  position: relative;
}
.tool {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>