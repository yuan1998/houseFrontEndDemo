<template>
   <transition>
      <div>
         <div class="page-header">
            <ol class="am-breadcrumb">
               <li>
                  <router-link to="/admin">首页</router-link>
               </li>
               <li>
                  <router-link to="/admin/house">房屋</router-link>
               </li>
              <li class="am-active">{{id}}</li>
            </ol>
         </div>
         <div class="body"  v-show="start">
            <div v-if="data==false">
               没有找到该房子
            </div>
            <div v-else>
               <div class="house-img-bar">
                  <div class="cover-bar">

                  </div>
                  <div class="house-bar">

                  </div>
               </div>
               <div class="house-info">
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">编号:</span>
                        <input type="text" class="am-form-field notBorder"  :disabled="true" v-model="data.id">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">城市:</span>
                        <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.city">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">小区:</span>
                        <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.community">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">地址:</span>
                        <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.location">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">楼栋号:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.building_number">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">单元号:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.unit_number">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">门牌号:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.house_number">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4 ">
                        <div class="am-input-group">
                           <span class="am-input-group-label">总楼层:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.floors">
                        </div>
                     </div>
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">所在楼层:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.floor">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">地下楼层:</span>
                           <select v-model="data.negative_floor" class="am-form-field am-text-center" :class="edit ? '' : 'notBorder'" :disabled="!edit">
                              <option value="0">无地下</option>
                              <option v-for="n in range(1,data.floors)" :value="n">{{n}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">电梯:</span>
                           <select v-model="data.elevator" class="am-form-field am-text-center" :class="edit ? '' : 'notBorder'" :disabled="!edit">
                              <option v-for="n in range(1,20)" :value="'一梯'+n+ '户' ">一梯{{n}}户</option>
                           </select>
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">供暖:</span>
                           <select v-model="data.supply_heating" class="am-form-field am-text-center" :class="edit ? '' : 'notBorder'" :disabled="!edit">
                              <option v-for="item in supplyList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">朝向:</span>
                           <select class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.direction">
                              <option v-for="item in directionList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">装修</span>
                           <select v-model="data.Decoration" :class="edit ? '' : 'notBorder'" :disabled="!edit" class="am-form-field">
                              <option v-for="item in DecorationList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">周边状况</div>
                        <textarea class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.surroundings" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">交通出行</div>
                        <textarea class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.traffic" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">小区环境</div>
                        <textarea class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.community_info" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">期望价格:</span>
                        <span class="am-block">
                           <input type="text" class="am-form-field " :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.expect_price">
                           <span class="price_tag">万元</span>
                        </span>

                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">联系人:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.contact">
                        </div>
                     </div>
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">联系人电话:</span>
                           <input type="text" class="am-form-field" :class="edit ? '' : 'notBorder'" :disabled="!edit" v-model="data.tel">
                        </div>
                     </div>
                  </div>
               </div>
               <div class="control-bar">
                  <div class="am-g am-text-center">
                     <template v-if="!edit">
                        <template v-if="data.status == 'audit'">
                           <button @click="auditPass" class="am-btn am-btn-primary">通过审核</button>

                        </template>
                        <button @click="edit=true"  class="am-btn am-btn-default">修改</button>
                     </template>
                     <template v-else>
                        <button @click="editSubmit" class="am-btn am-btn-primary">保存</button>
                        <button @click="editCancel" class="am-btn am-btn-default">返回</button>
                     </template>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

   export default{
      name:'admin-house-info',
      props:{
         id:{
            Type:Number
         }
      },
      data(){
         return {
            data:[],
            cache:[],
            edit:false,
            start:false,
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getHouse();
         },300);
      },
      methods:{
         getHouse(){
            sender('/api/house/getHouseInfo',{id:this.id})
            .then(res=>{
               this.start = true;
               this.data = res.data;
               this.cache = Object.assign({},res.data);
            })
         },
         range(min,max){
            let arr = [];

            for(let i = min; i<=max;i++){
               arr.push(i);
            }
            return arr;
         },
         editCancel(){
            this.edit = false;
            this.data =  Object.assign({},this.cache);
         },
         editSubmit(){

            sender('/api/house/houseEdit',this.data)
            .then(res=>{
               this.$notify({
                  message:'修改成功',
                  type:'success'
               })
               this.edit = false;
            })
         },
         auditPass(){
            sender('/api/house/houseAuditPass',{hid:this.id})
            .then(res=>{
               this.$notify({
                  message:'操作成功',
                  type:"success",
               })

               setTimeout(res=>{
                  this.$router.go(-1);
               },300);
            })
         },
         closeHouse(){
            sender('/api/house/closeHouse',{id:this.id})
            .then(res=>{

            })
         }
      },
      computed:{
         supplyList(){
            return this.$store.getters['house/getSupplyHeating'];
         },
         directionList(){
            return this.$store.getters['house/getDirection'];
         },
         DecorationList(){
            return this.$store.getters['house/getDecoration'];
         }
      }
   }
</script>

<style scoped>
   .notBorder{
      border:none;
   }
   .am-input-group-label{
      background: transparent;
      border: none;
      min-width: 79px;
   }
   .price_tag{
      position:absolute;
      top: 25%;
      right: 10px;
      z-index: 5;
   }
</style>
