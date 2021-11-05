<template>
  <div style="width: 100%">
    <el-container direction="vertical">
      <el-row>
        <el-col :span="12">
          {{files}}
          <upload-warp uploadType="image" :auto-upload="true"   v-model="files"  action="https://www.vkandian.cn/index.php/index/upload">

          </upload-warp>
          <el-form>
            <el-form-item label="属性字符串">
              <el-input type="textarea" v-model="codeStr" rows="10"></el-input>
            </el-form-item>

            <el-form-item label="tag">
              <el-input v-model="data.tag"></el-input>
            </el-form-item>
            <el-form-item label="name">
              <el-input v-model="data.name"></el-input>
            </el-form-item>

            <el-form-item label="图标">
              <el-input v-model="data.tagIcon"></el-input>
            </el-form-item>

            <el-form-item label="容器">
              <el-switch
                v-model="isContainer"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>

            <el-form-item label="开启自定义验证">
              <el-switch
                v-model="data.__openRules"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>
            <el-form-item label="显示控制按钮">
              <el-switch
                v-model="data.ctrlBtn"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>

            <el-form-item label="开启formItem标签">
              <el-switch
                v-model="data.formItem"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="make" type="primary">生成</el-button>
              <el-button @click="execDownload" type="default">下载</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <textarea
            v-model="code"
            style="width: 100%; height: 100%; border: none; padding: 20px;"
          >
          </textarea>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import { ref, defineComponent, watch, reactive } from "vue";

import UploadWarp from "@/components/form/elementWarp/UploadWarp.vue"
import { toHump } from "@/utils/func.js";

import { saveAs } from "file-saver";

export default {
  components:{UploadWarp},
  setup(props,ctx) {
    const files=ref([])
    const code = ref("");
    const codeStr = ref("");
    const fileName = ref("");
    const isContainer = ref(false);
    const data = reactive({
      tag: "",
      name: "",
      __openRules: false,
      tagIcon: "input",
      ctrlBtn: true,
    });

    const make = function () {
      const setts = [];
      let lines = codeStr.value.split("\n");
      lines.map((line) => {
        let tds = line.trim().split("\t");

        let ini = {
          name: tds[0].trim(),
          title: tds[1].trim(),
          type: tds[2].trim(),
          opt: tds[3]
            .trim()
            .split("/")
            .map((s) => {
              return s.trim();
            }),

          default: tds[4] ? tds[4].trim() : "",
        };
        setts.push(ini);
      });

      const attrs = [];

      if (isContainer.value == false) {
        attrs.push('fieldName: helper.input_text("字段名", "字段名")');
      }
      for (let item of setts) {
        let strs = "";
        if ( [ "string","number"].includes(item.type.toLowerCase())) {
          if (item.opt.length > 1) {
            let opt = JSON.stringify(
              item.opt.map((x) => {
                return {
                  key: x,
                  value: x,
                };
              })
            );

            strs = `'${item.name}':helper.input_radio('${item.title}',${opt},'${item.default}')`;
          }else{
            strs = `'${item.name}':helper.input_text('${item.title}','${item.default}')`;
          }
        } else if (item.type == "boolean") {
          strs = `'${item.name}':helper.input_boolean('${item.title}',${item.default})`;
        }

        if (strs) {
          attrs.push(strs);
        }
        let lines = ["'__ID':''"];

        for (let k in data) {
          if (k == "formItem") {
            if (data[k]) {
              let vs = `{
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '${data.name}', ),
        }`;
              lines.push(`${k}:${vs}`);
            }
          } else if (k == "tag" && isContainer.value == true) {
            lines.push(`${k}:draggable`);
          } else {
            let t = typeof data[k];
            let vs = ["boolean", "number"].includes(t)
              ? data[k]
              : JSON.stringify(data[k]);
            lines.push(`${k}:${vs}`);
          }
        }

        lines.push(`attrs:{${attrs.join(",\n")}}`);

        let s = "export default {" + lines.join(",\n") + "}";
        code.value = `import helper from "@/components/form/ui/helper.js";
        
        ${s}`;

        fileName.value = toHump(data.tag) + ".js";
      }

      // console.log(JSON.stringify(attrs, null, 4))
    };

    const execDownload = function () {
      const blob = new Blob([code.value], {
        type: "application/javascript; charset=utf-8",
      });
      saveAs(blob, fileName.value);
    };
    return { data, code, make, codeStr, execDownload, isContainer,files };
  },
};
</script>

<style></style>
