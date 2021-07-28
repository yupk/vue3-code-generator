<template>
  <div class="flex m-10">
    <el-button type="primary" disabled>dsasd</el-button>
    <el-scrollbar class="left-scrollbar">
      <div class="components-list">
        <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
          <div class="components-title">
            <svg-icon icon-class="component" />
            {{ item.title }}
          </div>
          <draggable
            class="components-draggable"
            :list="item.list"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :clone="cloneComponent"
            draggable=".components-item"
            :sort="false"
            @end="onEnd"
          >
            <div
              v-for="(element, index) in item.list"
              :key="index"
              class="components-item"
              @click="addComponent(element)"
            >
              <div class="components-body">
                <svg-icon :icon-class="element.__config__.tagIcon" />
                {{ element.__config__.label }}
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import { VueDraggableNext } from "vue-draggable-next";
  import nestedcomponent from "@/components/nested-component.vue";
  import {
    inputComponents,
    selectComponents,
    layoutComponents,
    formConf,
  } from "@/components/generator/config";

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
      nestedComponent: nestedcomponent,
    },
    data() {
      return {
        inputComponents,
        selectComponents,
        layoutComponents,
        leftComponents: [
          {
            title: "输入型组件",
            list: inputComponents,
          },
          {
            title: "选择型组件",
            list: selectComponents,
          },
          {
            title: "布局型组件",
            list: layoutComponents,
          },
        ],
        enabled: true,
        list: [
          { name: "John", id: 1 },
          { name: "Joao", id: 2 },
          { name: "Jean", id: 3 },
          { name: "Gerard", id: 4 },
        ],
        dragging: false,
      };
    },
    methods: {
      setObjectValueReduce(obj, strKeys, data) {
        const arr = strKeys.split(".");
        arr.reduce((pre, item, i) => {
          if (arr.length === i + 1) {
            pre[item] = data;
          } else if (!isObjectObject(pre[item])) {
            pre[item] = {};
          }
          return pre[item];
        }, obj);
      },
      setRespData(component, resp) {
        const { dataPath, renderKey, dataConsumer } = component.__config__;
        if (!dataPath || !dataConsumer) return;
        const respData = dataPath.split(".").reduce((pre, item) => pre[item], resp);

        // 将请求回来的数据，赋值到指定属性。
        // 以el-tabel为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
        // 此时赋值代码可写成 component[dataConsumer] = respData；
        // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
        this.setObjectValueReduce(component, dataConsumer, respData);
        const i = this.drawingList.findIndex(
          (item) => item.__config__.renderKey === renderKey,
        );
        if (i > -1) this.$set(this.drawingList, i, component);
      },
      fetchData(component) {
        const { dataType, method, url } = component.__config__;
        if (dataType === "dynamic" && method && url) {
          this.setLoading(component, true);
          this.$axios({
            method,
            url,
          }).then((resp) => {
            this.setLoading(component, false);
            this.setRespData(component, resp.data);
          });
        }
      },
      setLoading(component, val) {
        const { directives } = component;
        if (Array.isArray(directives)) {
          const t = directives.find((d) => d.name === "loading");
          if (t) t.value = val;
        }
      },
      activeFormItem(currentItem) {
        this.activeData = currentItem;
        this.activeId = currentItem.__config__.formId;
      },
      onEnd(obj) {
        if (obj.from !== obj.to) {
          this.fetchData(tempActiveData);
          this.activeData = tempActiveData;
          this.activeId = this.idGlobal;
        }
      },
      addComponent(item) {
        const clone = this.cloneComponent(item);
        this.fetchData(clone);
        this.drawingList.push(clone);
        this.activeFormItem(clone);
      },
      cloneComponent(origin) {
        const clone = deepClone(origin);
        const config = clone.__config__;
        config.span = this.formConf.span; // 生成代码时，会根据span做精简判断
        this.createIdAndKey(clone);
        clone.placeholder !== undefined && (clone.placeholder += config.label);
        tempActiveData = clone;
        return tempActiveData;
      },
      createIdAndKey(item) {
        const config = item.__config__;
        config.formId = ++this.idGlobal;
        config.renderKey = `${config.formId}${+new Date()}`; // 改变renderKey后可以实现强制更新组件
        if (config.layout === "colFormItem") {
          item.__vModel__ = `field${this.idGlobal}`;
        } else if (config.layout === "rowFormItem") {
          config.componentName = `row${this.idGlobal}`;
          !Array.isArray(config.children) && (config.children = []);
          delete config.label; // rowFormItem无需配置label属性
        }
        if (Array.isArray(config.children)) {
          config.children = config.children.map((childItem) =>
            this.createIdAndKey(childItem),
          );
        }
        return item;
      },
      AssembleFormData() {
        this.formData = {
          fields: deepClone(this.drawingList),
          ...this.formConf,
        };
      },
      generate(data) {
        const func = this[`exec${titleCase(this.operationType)}`];
        this.generateConf = data;
        func && func(data);
      },
      execRun(data) {
        this.AssembleFormData();
        this.drawerVisible = true;
      },
      execDownload(data) {
        const codeStr = this.generateCode();
        const blob = new Blob([codeStr], { type: "text/plain;charset=utf-8" });
        saveAs(blob, data.fileName);
      },
      execCopy(data) {
        document.getElementById("copyNode").click();
      },
      empty() {
        this.$confirm("确定要清空所有组件吗？", "提示", { type: "warning" }).then(() => {
          this.drawingList = [];
          this.idGlobal = 100;
        });
      },
      drawingItemCopy(item, list) {
        let clone = deepClone(item);
        clone = this.createIdAndKey(clone);
        list.push(clone);
        this.activeFormItem(clone);
      },
      drawingItemDelete(index, list) {
        list.splice(index, 1);
        this.$nextTick(() => {
          const len = this.drawingList.length;
          if (len) {
            this.activeFormItem(this.drawingList[len - 1]);
          }
        });
      },
      generateCode() {
        const { type } = this.generateConf;
        this.AssembleFormData();
        const script = vueScript(makeUpJs(this.formData, type));
        const html = vueTemplate(makeUpHtml(this.formData, type));
        const css = cssStyle(makeUpCss(this.formData));
        return beautifier.html(html + script + css, beautifierConf.html);
      },
      showJson() {
        this.AssembleFormData();
        this.jsonDrawerVisible = true;
      },
      download() {
        this.dialogVisible = true;
        this.showFileName = true;
        this.operationType = "download";
      },
      run() {
        this.dialogVisible = true;
        this.showFileName = false;
        this.operationType = "run";
      },
      copy() {
        this.dialogVisible = true;
        this.showFileName = false;
        this.operationType = "copy";
      },
      tagChange(newTag) {
        newTag = this.cloneComponent(newTag);
        const config = newTag.__config__;
        newTag.__vModel__ = this.activeData.__vModel__;
        config.formId = this.activeId;
        config.span = this.activeData.__config__.span;
        this.activeData.__config__.tag = config.tag;
        this.activeData.__config__.tagIcon = config.tagIcon;
        this.activeData.__config__.document = config.document;
        if (
          typeof this.activeData.__config__.defaultValue === typeof config.defaultValue
        ) {
          config.defaultValue = this.activeData.__config__.defaultValue;
        }
        Object.keys(newTag).forEach((key) => {
          if (this.activeData[key] !== undefined) {
            newTag[key] = this.activeData[key];
          }
        });
        this.activeData = newTag;
        this.updateDrawingList(newTag, this.drawingList);
      },
      updateDrawingList(newTag, list) {
        const index = list.findIndex((item) => item.__config__.formId === this.activeId);
        if (index > -1) {
          list.splice(index, 1, newTag);
        } else {
          list.forEach((item) => {
            if (Array.isArray(item.__config__.children))
              this.updateDrawingList(newTag, item.__config__.children);
          });
        }
      },
      refreshJson(data) {
        this.drawingList = deepClone(data.fields);
        delete data.fields;
        this.formConf = data;
      },

      log(event) {
        console.log(event);
      },
    },
  });
</script>
<style lang="scss">
  @import "@/styles/home";
</style>
