<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px"
      label-position="top">
      <el-row :gutter="15">
        <el-col :span="24">
          <el-form-item label="级联选择" prop="field102">
			  
			    <el-cascader :props="props"></el-cascader>



            <el-cascader v-model="formData.field102" :options="field102Options" :props="field102Props"
              :style="{width: '100%'}" placeholder="请选择级联选择" clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="单行文本" prop="field104">
            <el-input v-model="formData.field104" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="上传" prop="field2" required>
            <el-upload ref="field2" :file-list="field2fileList" :action="field2Action"
              :before-upload="field2BeforeUpload" list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="多行文本" prop="field105">
            <el-input v-model="formData.field105" type="textarea" placeholder="请输入多行文本"
              :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="计数器" prop="field106">
            <el-input-number v-model="formData.field106" placeholder="计数器" :step='1'></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="单行文本" prop="field107">
            <el-input v-model="formData.field107" placeholder="请输入单行文本" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="编辑器" prop="field2">
            <tinymce v-model="formData.field2" placeholder="请输入编辑器" :height="300"></tinymce>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import {
  ElMessage
}
from 'element-plus'
  let id = 0;

export default {
  components: {},
  props: [],
  data() {
    return {
		 props: {
		          lazy: true,
		          lazyLoad (node, resolve) {
		            const { level } = node;
		            setTimeout(() => {
		              const nodes = Array.from({ length: level + 1 })
		                .map(item => ({
		                  value: ++id,
		                  label: `选项${id}`,
		                  leaf: level >= 2
		                }));
		              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
		              resolve(nodes);
		            }, 1000);
		          }
		        },
      formData: {
        field102: [],
        field104: undefined,
        field2: null,
        field105: undefined,
        field106: undefined,
        field107: undefined,
        field2: null,
      },
      rules: {
        field102: [{
          required: true,
          type: 'array',
          message: '请至少选择一个级联选择',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field105: [{
          required: true,
          message: '请输入多行文本',
          trigger: 'blur'
        }],
        field106: [{
          required: true,
          message: '计数器',
          trigger: 'blur'
        }],
        field107: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field2: [{
          required: true,
          message: '请输入编辑器',
          trigger: 'blur'
        }],
      },
      field2Action: 'https://jsonplaceholder.typicode.com/posts/',
      field2fileList: [],
      field102Options: [],
      field102Props: {
        "multiple": false,
        "label": "label",
        "value": "value",
        "children": "children"
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getField102Options()
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    getField102Options() {
      axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList'
      }).then(resp => {
        var {
          data
        } = resp
        this.field102Options = data.list
      })
    },
    field2BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        ElMessage.error('文件大小超过 2MB')
      }
      return isRightSize
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
