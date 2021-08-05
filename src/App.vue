<template>
  <div>
   <vue-editor @updateCode="print_code" device="mobile"></vue-editor>
  </div>
</template>

<script>
	
 

  export default {
 
    mounted() {
      // fix: firefox 下 拖拽 会新打卡一个选项卡
      // https://github.com/JakHuang/form-generator/issues/15
      document.body.ondrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
    },
	methods:{
		print_code(a){
			console.log(a);
		}
	}
  };
</script>
