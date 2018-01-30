<template>
   <div>
      <h1>Test</h1>
      <div class="am-form-group am-form-file">
        <button type="button" class="am-btn am-btn-default am-btn-sm">
          <i class="am-icon-cloud-upload"></i> 选择要上传的文件</button>
        <input @change="uploads" type="file" multiple>
      </div>
   </div>
</template>
<script>

export default {
   data(){
      return {
         formData:{img:[]},
      }
   },
   methods:{
      uploads(e){
         var files = e.target.files || e.dataTransfer.files;

         if(!files.length)
            return ;

         this.img_to_base(files[0]);
      },
      img_to_base(file){
         let reader = new FileReader();

         reader.onload = (e) =>{
            this.formData.img.push(e.target.result)
         }

         reader.readAsDataURL(file);
         console.log(this.formData);
      }
   }
}

</script>
