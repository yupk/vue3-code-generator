<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          Vue3 Form Generator
          <a
            class="github"
            href="https://github.com/yupk/form-generator-vue3"
            target="_blank"
          >
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt />
          </a>
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <!-- {{generate(settings)}} -->

        <page-panel
          @addComponent="
            (el) => {
              settings.drawingList.push(el);
            }
          "
        ></page-panel>

        <div class="components-list"></div>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
         

  
        <div class="btn" @click="preViewCode">
          <el-icon>
            <video-play />
          </el-icon>生成
        </div>
        <div class="btn" @click="clearn()">
          <el-icon>
            <delete />
          </el-icon>清空
        </div>

                     <div class="btn"    >
         <el-switch v-model="device" active-text="电脑模式" inactive-text="手机模式" active-value="pc" inactive-value="mobile"		 />
         
        </div>


        <div class="btn"    >
         <el-switch v-model="preview" active-text="开发模式" inactive-text="预览模式" active-value="" inactive-value="preview"		 />
         
        </div>
      </div>
      <el-scrollbar class="center-scrollbar" :class="[device, preview]">
        <page-drawer :model-value="settings" @update:model-value="update"></page-drawer>
      </el-scrollbar>
    </div>

    <page-setting :model-value="settings" @update:model-value="update" style="padding-left: 10px"></page-setting>
  </div>

  <el-drawer v-model="showCode" direction="rtl" size="50%" style="height:100%">
    <template v-slot:title>
      <div class="preview-action-bar">
        <div class="btn" @click="execDownload('test.vue')">
          <el-icon>
            <download />
          </el-icon>下载代码
        </div>

        <div class="btn" @click="ClipboardWrite()">
          <el-icon>
            <document-copy />
          </el-icon>复制代码
        </div>
      </div>
    </template>
    <el-scrollbar height="600px" v-highlight>
      <pre>
        <code> {{ generate(settings) }}</code>
    </pre>
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import PageDrawer from "@/components/form/PageDrawer.vue";
import PagePanel from "@/components/form/PagePanel.vue";
import PageSetting from "@/components/form/PageSetting.vue";
import useClipboard from 'vue-clipboard3';

import {ElMessage} from 'element-plus';

import { saveAs } from "file-saver";

import {
  deepClone,
  findEle,
  isObjectArray,
  randFieldId,
} from "@/utils/func.js";
import { formConf } from "@/components/form/ui/index";
import { generate } from "@/utils/generate.js";
import {
  Iphone,
  Monitor,
  VideoPlay,
  Delete,
  Download,
  DocumentCopy
} from "@element-plus/icons";
import { defineComponent, provide, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "PageGenerator",
  props: {},
  components: {
    PagePanel,
    PageDrawer,
    PageSetting,
    DocumentCopy,
    Iphone,
    Monitor,
    VideoPlay,
    Delete,
    Download,
  },

  setup(props) {
    const device = ref("pc");
    const showCode = ref(false);
    const preview = ref("");
    const loadSetting = function () {
      let strs = localStorage.getItem("settings");
      if (strs) {
        return JSON.parse(strs);
      }

      return {
        current: "",
        formConf: formConf,
        drawingList: [],
      };
    };
    const settings = reactive(loadSetting());

    const update = function (e) {
      settings.formConf = e.formConf;
      settings.drawingList = e.drawingList;
    };

    const selected = function (s) {
      settings.current = s;
    };

    const clearn = function () {
      localStorage.removeItem("settings");

      settings.current = "";
      settings.formConf = formConf;
      settings.drawingList = [];
    };

    /**
     * 选中高亮亮
     */
    const hightLight = function (s) {
      if (settings.current == s) {
        return { border: "1px solid #ffc92fde", backgroundColor: "#e4ff0024" };
      }
      return {};
    };

    const _del = function (items, _id) {
      for (let item of items) {
        if (item.__ID == _id) {
          items.splice(items.indexOf(item), 1);
          return true;
        } else if (isObjectArray(item.childrens)) {
          if (_del(item.childrens, _id)) {
            return true;
          }
        }
      }
    };

    const deleteItem = function (_id) {
      _del(settings.drawingList, _id);
    };

 

    const _copy = function (items, _id) {
      for (let item of items) {
        if (item.__ID == _id) {
          const newItem = deepClone(item);
          newItem.__ID = randFieldId();
          items.push(reactive(newItem));
          return true;
        } else if (isObjectArray(item.childrens)) {
          if (_copy(item.childrens, _id)) {
            return true;
          }
        }
      }
    };

    const copyItem = function (_id) {
      _copy(settings.drawingList, _id);
    };

    const updateChild = function (eles, ids) {
      let item = findEle(settings.drawingList, ids);

      item.childrens = eles;
    };

    const updateDefaultValue = function (val, ids) {
      let item = findEle(settings.drawingList, ids);

      item.defaultvalue = val;
    };

    const execDownload = function (filename) {
      const codeStr = generate(settings);
      const blob = new Blob([codeStr], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, filename);
    };

    const preViewCode = function () {

      showCode.value = true;

    }


    const { toClipboard } = useClipboard()

 

    const ClipboardWrite = async () => {

      const codeStr = generate(settings);
      try {
        await toClipboard(codeStr);
        ElMessage.success("复制成功！")
        console.log('Copied to clipboard')
      } catch (e) {
        console.error(e)
      }
    }

    
 

    watch(settings, () => {
      console.log(settings);
      localStorage.setItem("settings", JSON.stringify(settings));
    });

    provide("copyItem", copyItem);
    provide("deleteItem", deleteItem);
    provide("selected", selected);
    provide("updateChild", updateChild);
    provide("hightLight", hightLight);
    provide("updateDefaultValue", updateDefaultValue);
    return {
      settings,
      update,
      device,
      clearn,
    
      preview,
      generate,
      execDownload,
      showCode,
      preViewCode,ClipboardWrite
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/home";
@import "@/styles/index";
</style>
