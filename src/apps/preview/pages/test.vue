<template>
<el-form :model="formData" size="medium" label-position="top" label-width="100" :rules="rules">
    <el-scrollbar height="100" tag="div" min-size="20" component="el-scrollbar" group="componentsGroup" class="drag-wrapper box" style="margin-left:0px;margin-right:0px" animation="340">
    </el-scrollbar>
    <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_U0tU1">
        <el-input v-model="formData.field_U0tU1" placeholder="请输入" type="text">
        </el-input>
    </el-form-item>
    <el-form-item label-width="100" label="单选框" prop="field_BBn8G">
        <el-checkbox-group v-model="formData.field_BBn8G" :border="true" size="medium">
            <el-checkbox-button label="1">
                <template slot="default">选项一</template>
            </el-checkbox-button>
            <el-checkbox-button label="2">
                <template slot="default">选项二</template>
            </el-checkbox-button>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_3nZsc">
        <el-input-number v-model="formData.field_3nZsc" placeholder="请输入" type="text">
        </el-input-number>
    </el-form-item>
    <el-row gutter="24" justify="start" align="[object Object]" component="el-row" group="componentsGroup" class="drag-wrapper box" style="margin-left:0px;margin-right:0px" animation="340">
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
            <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_IKBXB">
                <el-input-number v-model="formData.field_IKBXB" placeholder="请输入" type="text">
                </el-input-number>
            </el-form-item>
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
            <el-form-item :show-label="true" label-width="100" label="单选框" prop="field_tDuuI">
                <el-radio-group v-model="formData.field_tDuuI" :border="true" size="medium">
                    <el-radio-button label="1">
                        <template slot="default">选项一</template>
                    </el-radio-button>
                    <el-radio-button label="2">
                        <template slot="default">选项二</template>
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
            <el-form-item :show-label="true" label-width="100" label="单选框" prop="field_Zt6al">
                <el-radio-group v-model="formData.field_Zt6al" :border="true" size="medium">
                    <el-radio-button label="1">
                        <template slot="default">选项一</template>
                    </el-radio-button>
                    <el-radio-button label="2">
                        <template slot="default">选项二</template>
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
            <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_1ewpB">
                <el-input-number v-model="formData.field_1ewpB" placeholder="请输入" type="text">
                </el-input-number>
            </el-form-item>
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
        </el-col>
        <el-col span="8" style="min-height:60px" component="el-col" group="componentsGroup" class="drag-wrapper box" animation="340">
        </el-col>
    </el-row>
    <el-form-item :show-label="true" label-width="100" label="Switch 开关" prop="field_ZhVX3">
        <el-switch v-model="formData.field_ZhVX3" :validate-event="true">
        </el-switch>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="Slider 滑块" prop="field_B3edL">
        <el-slider v-model="formData.field_B3edL" :show-input-controls="true" :show-tooltip="true">
        </el-slider>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="Rate 评分" prop="field_6gmk5">
        <el-rate v-model="formData.field_6gmk5">
        </el-rate>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="select选择" prop="field_54bAq">
        <el-select v-model="formData.field_54bAq" size="large" :popper-append-to-body="true">
            <el-option value="1" label="选项一">
            </el-option>
            <el-option value="2" label="选项二">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="颜色拾取" prop="field_POhG5">
        <el-color-picker v-model="formData.field_POhG5" color-format="rgb">
        </el-color-picker>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_aojnX">
        <el-input-number v-model="formData.field_aojnX" placeholder="请输入" type="text">
        </el-input-number>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单选框" prop="field_UBqgb">
        <el-radio-group v-model="formData.field_UBqgb" :border="true" size="medium">
            <el-radio-button label="1">
                <template slot="default">选项一</template>
            </el-radio-button>
            <el-radio-button label="2">
                <template slot="default">选项二</template>
            </el-radio-button>
        </el-radio-group>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="Switch 开关" prop="field_o9uZf">
        <el-switch v-model="formData.field_o9uZf" :validate-event="true">
        </el-switch>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="时间选择器" prop="field_7boRc">
        <el-time-picker v-model="formData.field_7boRc" :editable="true" :clearable="true">
        </el-time-picker>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="Switch 开关" prop="field_4d3J7">
        <el-switch v-model="formData.field_4d3J7" :validate-event="true">
        </el-switch>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="TimeSelect 时间选择" prop="field_D7O9p">
        <el-time-select v-model="formData.field_D7O9p" :editable="true" :clearable="true">
        </el-time-select>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="Switch 开关" prop="field_tpKAa">
        <el-switch v-model="formData.field_tpKAa" :validate-event="true">
        </el-switch>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="select选择" prop="field_SGf2G">
        <el-select v-model="formData.field_SGf2G" size="large" :popper-append-to-body="true">
            <el-option value="1" label="选项一">
            </el-option>
            <el-option value="2" label="选项二">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单选框" prop="field_D6fZr">
        <el-checkbox-group v-model="formData.field_D6fZr" :border="true" size="medium">
            <el-checkbox-button label="1">
                <template slot="default">选项一</template>
            </el-checkbox-button>
            <el-checkbox-button label="2">
                <template slot="default">选项二</template>
            </el-checkbox-button>
        </el-checkbox-group>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_1F65a">
        <el-input-number v-model="formData.field_1F65a" placeholder="请输入" type="text">
        </el-input-number>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_fNT8o">
        <el-input-number v-model="formData.field_fNT8o" placeholder="请输入" type="text">
        </el-input-number>
    </el-form-item>
    <el-form-item :show-label="true" label-width="100" label="上传文件" prop="field_zrWSu">
        <upload-warp v-model="formData.field_zrWSu" upload-type="image" action="https://www.vkandian.cn/index.php/index/upload" name="file" :show-file-list="true" list-type="text" :auto-upload="true" limit="1">
        </upload-warp>
    </el-form-item>
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
            "field_U0tU1": "",
            "field_BBn8G": {
                "0": 1
            },
            "field_3nZsc": 0,
            "field_IKBXB": 0,
            "field_tDuuI": 2,
            "field_Zt6al": 1,
            "field_1ewpB": 4,
            "field_ZhVX3": true,
            "field_B3edL": 48,
            "field_6gmk5": 5,
            "field_54bAq": 1,
            "field_POhG5": "#000000",
            "field_aojnX": -1,
            "field_UBqgb": "",
            "field_D7O9p": "",
            "field_SGf2G": "",
            "field_D6fZr": {
                "0": 2
            },
            "field_1F65a": 8,
            "field_fNT8o": 0,
            "field_zrWSu": ""
        });
        const UIData = reactive({});

        const rules = {
            "field_U0tU1": [{
                "id": "field_YIZx1",
                "pattern": /^[\\u4e00-\\u9fa5]{0,}$/,
                "message": "必须是中文",
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