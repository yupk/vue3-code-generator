<template>
  <template v-if="uploadType == 'image'">
    <el-upload class="avatar-uploader" v-bind="attrs" :file-list="files">
      <template v-if="attrs.limit == 1">
        <template v-if="files.length > 0">
          <img v-for="f in files" :src="f.url" class="avatar" :key="f.url" />
        </template>

        <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
      </template>
      <i v-else class="el-icon-upload">
        <div class="el-upload__text" style="font-size: 14px">
          <span v-if="drag"> 拖拽或者 </span><em>点击上传</em>
        </div>
        <div class="el-upload__tip" v-if="tip">
          {{ tip }}
        </div>
      </i>
    </el-upload>
  </template>

  <template v-else-if="uploadType == 'file'" :file-list="files">
    <el-upload v-bind="attrs">
      <el-button size="small" type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          {{ tip }}
        </div>
      </template>
    </el-upload>
  </template>

  <el-dialog v-model="dialogVisible">
    <img style="width: 100%" :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
export default defineComponent({
  name: "UploadWarp",
  emits: ["update:modelValue"],
  components: { Plus },
  props: {
    modelValue: Array,
    uploadType: String,
    disabled: Boolean,
    showFileList: { type: Boolean, default: true },
    action: String,
    multiple: String,
    drag: Boolean,
    accept: String,
    thumbnailMode: Boolean,
    listType: { type: String, default: "picture" },
    autoUpload: { type: Boolean, default: true },
    limit: Number,
    tip: { type: String },
  },

  setup(props, ctx) {
    const el = ref(null);
    const files = ref(props.modelValue || []);
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const handleRemove = function (file) {
      let newFile = [];
      for (let f of files.value) {
        if (f.uid != file.uid) {
          newFile.push(f);
        }
      }
      files.value = newFile;

      ctx.emit("update:modelValue", files.value);
    };
    const handlePreview = function (file) {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
    };

    const attrs = computed(function () {
      let defaultAttrs = {
        "on-success": function (res) {
          if (props.limit == 1) {
            files.value = [];
          }
          files.value.push(res.data);
          ctx.emit("update:modelValue", files.value);
        },
      };

      if (props.uploadType == "avatar") {
        defaultAttrs["showFileList"] = false;
      } else {
        defaultAttrs["showFileList"] = true;
      }

      defaultAttrs["on-preview"] = handlePreview;
      defaultAttrs["on-remove"] = handleRemove;

      return Object.assign(defaultAttrs, {
        disabled: props["disabled"],
        showFileList: props["showFileList"],
        action: props["action"],
        multiple: props["multiple"],
        name: props["name"],
        drag: props["drag"],
        accept: props["accept"],
        thumbnailMode: props["thumbnailMode"],
        listType: props["listType"],
        autoUpload: props["autoUpload"],
        limit: props["limit"],
      });
    });

    return {
      attrs,
      files,

      dialogImageUrl,
      dialogVisible,
    };
  },
});
</script>
<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.el-icon-upload {
  font-size: 67px;
  color: var(--el-text-color-placeholder);
  margin: 40px 0 16px;
  line-height: 50px;
}
.avatar {
  max-width: 100%;
}
</style>