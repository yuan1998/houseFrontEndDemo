<template>
   <transition>

         <div class="user-avatar am-text-center am-margin-top-lg">
            <div>
               <div class="avatar-bar" :style="'background-image:url('+getAvatar+');'">
                  <!-- <img  :src="getAvatar" > -->
                  <button v-if="!upSuccess" @click="clickInput" class="am-btn avatar-btn">更换头像</button>
                  <i v-else class="uploadSuccess am-icon-check"></i>
               </div>
               <input @change="upload" type="file" class="upload-input" style="display:none;">
            </div>
            <div v-show="newAvatar[0] && !upSuccess
            " class="avatar-btn-bar">
               <button @click="changeAvatar" class="save-btn am-btn am-btn-primary am-radius">保存</button>
               <button @click="newAvatar = []" class="cancel-btn am-btn am-btn-default">取消</button>
            </div>
            <div v-show="upSuccess">
               <span class="am-text-xl">上传成功</span>
            </div>
         </div>

   </transition>
</template>

<script>
/**
 *  ajax
 */
import sender from '@/Sender.js'


/**
 *  mixins
 */
import m_user from '@/mixin/user.js';


   export default{
      name:'avatarbar',
      mixins:[m_user],
      data(){
         return {
            newAvatar:[],
            upSuccess:false,
         }
      },
      computed:{
         getAvatar(){

            let n_Avatar = this.newAvatar[0];

            return (!n_Avatar || n_Avatar == false)
                     ? this._getAvatar
                     : n_Avatar.get;

         },
      },
      methods:{
         upload(e){
            let files = e.target.files,
            arr =  this.newAvatar =[];

            if(!files.length)
               return;

            let callback = event=>{
               let result = event.target.result;
               sender('/api/img/save',{file:result})
                  .then(res=>{
                     arr.push(res.data);
                  })
            }

            this.$store.dispatch('readerFile',{file:files[0],callback});
         },
         clickInput(){
            document.querySelector('.upload-input').click();
         },
         changeAvatar(){
            sender('/api/user/changeAvatar',{file:this.newAvatar[0]}).then(res=>{
               this.$store.dispatch('user/changeAvatar',res.data);
               this.upSuccess = true;
               this.newAvatar = [];
               setTimeout(res=>{
                  this.upSuccess = false;
               },1500);
            })
         }
      }
   }
</script>


<style scoped>
.user-info{
   margin-bottom: 50px;
}
.avatar-bar img{

    height:200px;
     line-height: 0;
    /* remove line-height */
    display: inline-block;   /* circle wraps image */
    transition: linear 0.25s;

}
/*.avatar-bar{
   overflow: hidden;
   display: inline-block;
   width: 200px;
   height: 200px;
    border-radius:200px;
    background: #ececec;
   box-shadow: 0px 0px 1px rgba(0,0,0,0.4);
}*/

.avatar-bar{
   width: 200px;
   height: 200px;
    border-radius:200px;
    display: inline-block;
   background-size: cover;
   background-position: center;

}
.user-avatar{
   min-height: 270px;
}
.cimmissioned-read-btn,
.info-read-btn{
   color:#5085FF;
   transition: 0.5s;
   padding:6px 10px 0px 10px;
   border-radius: 5px;
}
.info-read-btn:hover{
   /*background: #f0f0f0;*/
   color:#004dff;
}
.uploadSuccess,
.avatar-btn{
   position:absolute;
   top: 50%;
   left: 50%;
   transform:translate(-50%,-50%);
   color:rgba(255,255,255,0.9) !important;
   font-weight: 600;
   display: block;
}

.avatar-btn{

   opacity:0.2;
   transition:opacity 0.5s ease-out;
   border-radius:6px;

   font-size: 20px;
   background: rgba(0,0,0,0.3);
   border: 3px solid rgba(255,255,255,0.7);

}

.uploadSuccess{
   font-size: 75px;
}

.avatar-btn:hover,
.user-avatar img:hover~.avatar-btn{
   opacity:1;
}

.save-btn,
.cancel-btn{
   font-size: 16px !important;
   border:1px solid transparent;
   border-radius:5px;
}
.save-btn:hover,
.cancel-btn:hover{
   filter:drop-shadow(0 0 0 black);
}
.save-btn{
   background-color: #54acff !important;
   border-color: #44caee;
   color:#fff;
   margin-right: 5px;
}
.cancel-btn{
   border-color: #54acff !important;
   color:#54acff !important;
   background: #fff !important;
   margin-left: 5px;
}

.avatar-btn-bar{
   margin-top: 20px;
   margin-bottom: 10px;
}
</style>
