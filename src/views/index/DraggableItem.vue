<script lang="jsx">
  import { VueDraggableNext as draggable } from "vue-draggable-next";

  import render from "@/components/render/render";
  
  import { h, resolveComponent } from "vue";
  const components = {
    itemBtns(h, currentItem, index, list) {
      const { onActiveItem, onDeleteItem, onCopyItem } = this.$attrs;
      console.log(this.$attrs);
      return [
        <span
          class="drawing-item-copy"
          title="复制"
          onClick={(event) => {
            onCopyItem(currentItem, list);
            event.stopPropagation();
          }}
        >
          <i class="el-icon-copy-document" />
        </span>,
        <span
          class="drawing-item-delete"
          title="删除"
          onClick={(event) => {
            onDeleteItem(index, list);
            event.stopPropagation();
          }}
        >
          <i class="el-icon-delete" />
        </span>,
      ];
    },
  };
  const layouts = {
    colFormItem(h, currentItem, index, list) {
      const { onActiveItem, onDeleteItem, onCopyItem } = this.$attrs;
      console.log(this.$attrs);
      // console.log();

      const config = currentItem.__config__;
      const child = renderChildren.apply(this, arguments);
      let className =
        this.activeId === config.formId
          ? "drawing-item active-from-item"
          : "drawing-item";
      if (this.formConf.unFocusedComponentBorder) className += " unfocus-bordered";
      let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null;
      if (config.showLabel === false) labelWidth = "0";
      return (
        <el-col
          span={config.span}
          class={className}
          onclick={(event) => {
            onActiveItem(currentItem);
            event.stopPropagation();
          }}
        >
          <el-form-item
            label-width={labelWidth}
            label={config.showLabel ? config.label : ""}
            required={config.required}
          >
            <render key={config.renderKey} conf={currentItem}>
              {child}
            </render>
          </el-form-item>
          {components.itemBtns.apply(this, arguments)}
        </el-col>
      );
    },

    rowFormItem(h, currentItem, index, list) {
      const { onActiveItem, onDeleteItem, onCopyItem } = this.$attrs;
      const config = currentItem.__config__;
      const className =
        this.activeId === config.formId
          ? "drawing-row-item active-from-item"
          : "drawing-row-item";
      let child = renderChildren.apply(this, arguments);
      if (currentItem.type === "flex") {
        child = (
          <el-row
            type={currentItem.type}
            justify={currentItem.justify}
            align={currentItem.align}
          >
            {child}
          </el-row>
        );
      }

      if(config.isCard){

        return (
        <el-col span={config.span}>
        <el-card onclick={(event) => {
              // alert(12);
              onActiveItem(currentItem);
              event.stopPropagation();
            }}  class={className}>
          
            <span class="component-name">{config.componentName}</span>
            <draggable
              list={config.children || []}
              animation={340}
              group="componentsGroup"
              class="drag-wrapper"
            >
              {child}
            </draggable>
            {components.itemBtns.apply(this, arguments)}
          
          </el-card>
        </el-col>
      );
      }
      return (
        <el-col span={config.span}>
          <el-row
            gutter={config.gutter}
            class={className}
            onclick={(event) => {
              // alert(12);
              onActiveItem(currentItem);
              event.stopPropagation();
            }}
          >
            <span class="component-name">{config.componentName}</span>
            <draggable
              list={config.children || []}
              animation={340}
              group="componentsGroup"
              class="drag-wrapper"
            >
              {child}
            </draggable>
            {components.itemBtns.apply(this, arguments)}
          </el-row>
        </el-col>
      );
    },

  
    raw(h, currentItem, index, list) {
      const config = currentItem.__config__;
      const child = renderChildren.apply(this, arguments);
      return (
        <render
          key={config.renderKey}
          conf={currentItem}
          onInput={(event) => {
            config.defaultValue = event;
          }}
        >
          {child}
        </render>
      );
    },
  };

  function renderChildren(h, currentItem, index, list) {
    const config = currentItem.__config__;
    if (!Array.isArray(config.children)) return null;
    return config.children.map((el, i) => {
      const layout = layouts[el.__config__.layout];
      if (layout) {
        return layout.call(this, h, el, i, config.children);
      }
      return layoutIsNotFound.call(this);
    });
  }

  function layoutIsNotFound() {
    throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`);
  }

  export default {
    components: {
      render,
      draggable,

    },

  props: ["currentItem", "index", "drawingList", "activeId", "formConf"],
  emits: ['update:modelValue'],

    render() {
      const layout = layouts[this.currentItem.__config__.layout];

      if (layout) {
        return layout.call(this, h, this.currentItem, this.index, this.drawingList);
      }
      return layoutIsNotFound.call(this);
    },
  };
</script>
