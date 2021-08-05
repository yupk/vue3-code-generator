import {
	resolveComponent
} from 'vue'
export default function(h, conf, key) {

	const slot = {
		"default": [],
		"tip":[]
	}
	const config = conf.__config__

	if (conf['list-type'] === 'picture-card') {
		slot["default"].push(h('i', {
			class: "el-icon-plus"
		}))
	} else {

		slot["default"].push(h(resolveComponent("el-button"), {
			size: "small",
			type: "primary",
			icon: "el-icon-upload"
		}, config.buttonText))

	}
	if (config.showTip) {

		slot["tip"].push(h('div', {
			class: "el-upload__tip"
		}, `只能上传不超过 ${config.fileSize}${config.sizeUnit} 的${conf.accept}文件`));


	
}




return slot;

}
