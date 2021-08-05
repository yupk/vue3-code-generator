import Home from '@/views/index/Home.vue'
import Tinymce from '@/components/tinymce/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import ElementPlus from 'element-plus'

export default {
	install: (app, options) => {

		app.component("vue-editor", Home);
		app.component('tinymce', Tinymce);
		app.component('svg-icon', SvgIcon);
		app.use(ElementPlus);

	}
}
