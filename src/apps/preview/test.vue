<template>
<el-form v-model="formData" size="medium" label-position="right" label-width="666545" inline="true" :rules="rules">
    <el-input v-model="formData.field_AmxPZ" placeholder="请输入" type="password">
    </el-input>
    <el-select v-model="formData.field_cfQ9w" size="large" collapse-tags="true" filterable="true" popper-append-to-body="true">
        <el-option value="1" label="选项一">
        </el-option>
        <el-option value="2" label="选项二">
        </el-option>
    </el-select>
    <el-input-number v-model="formData.field_jENU5" placeholder="请输入" type="text">
    </el-input-number>
    <el-select v-model="formData.field_7wq45" size="large" popper-append-to-body="true">
        <el-option value="1" label="选项一">
        </el-option>
        <el-option value="2" label="选项二">
        </el-option>
    </el-select>
    <el-time-picker v-model="formData.field_P8BWd" editable="true" clearable="true">
    </el-time-picker>
    <el-input v-model="formData.field_f1UrA" placeholder="请输入" type="text">
    </el-input>
    <el-rate v-model="formData.field_dmdB0">
    </el-rate>
</el-form>
</template>
<script>
import {
    defineComponent,
    ref,
    reactive
} from "vue";
export default defineComponent({
    name: "formpage",
    setup(props, context) {
        const formData = reactive({
            "field_AmxPZ": "3ssa",
            "field_cfQ9w": 2,
            "field_jENU5": 0,
            "field_7wq45": "",
            "field_P8BWd": "2021-10-29T14:29:35.000Z",
            "field_f1UrA": "而我却二无群",
            "field_dmdB0": 0
        });
        const UIData = reactive({});

        const rules = {
            "field_AmxPZ": [{
                "id": "field_2PyEZ",
                "pattern": /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                "message": "请输入正确内容",
                "trigger": "blur"
            }, {
                "id": "field_ghEzk",
                "pattern": /^((d{3,4}-)|d{3.4}-)?d{7,8}$/,
                "message": "请输入正确内容",
                "trigger": "blur"
            }]
        }
        return {
            formData,
            UIData,
            rules
        }
    },
});
</script>