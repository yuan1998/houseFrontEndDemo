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
              <li class="am-active">添加</li>
            </ol>
         </div>
         <div class="body" >
            <div >
               <div class="house-img-bar">
                  <div class="cover-bar">

                  </div>
                  <div class="house-bar">

                  </div>
               </div>
               <div class="house-info">
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">城市:</span>
                        <input type="text" class="am-form-field"  v-model="data.city">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">小区:</span>
                        <input type="text" class="am-form-field"  v-model="data.community">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">地址:</span>
                        <input type="text" class="am-form-field"  v-model="data.location">
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">楼栋号:</span>
                           <input type="text" class="am-form-field"  v-model="data.building_number">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">单元号:</span>
                           <input type="text" class="am-form-field"  v-model="data.unit_number">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">门牌号:</span>
                           <input type="text" class="am-form-field"  v-model="data.house_number">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4 ">
                        <div class="am-input-group">
                           <span class="am-input-group-label">总楼层:</span>
                           <input type="text" class="am-form-field"  v-model="data.floors">
                        </div>
                     </div>
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">所在楼层:</span>
                           <input type="text" class="am-form-field"  v-model="data.floor">
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">地下楼层:</span>
                           <select v-model="data.negative_floor" class="am-form-field am-text-center" >
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
                           <select v-model="data.elevator" class="am-form-field am-text-center" >
                              <option v-for="n in range(1,20)" :value="'一梯'+n+ '户' ">一梯{{n}}户</option>
                           </select>
                        </div>
                     </div>
                     <div class="am-u-sm-4">
                        <div class="am-input-group">
                           <span class="am-input-group-label">供暖:</span>
                           <select v-model="data.supply_heating" class="am-form-field am-text-center" >
                              <option v-for="item in supplyList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">朝向:</span>
                           <select class="am-form-field"  v-model="data.direction">
                              <option v-for="item in directionList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-4 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">装修</span>
                           <select v-model="data.Decoration"  class="am-form-field">
                              <option v-for="item in DecorationList" :value="item">{{item}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">周边状况</div>
                        <textarea class="am-form-field"  v-model="data.surroundings" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">交通出行</div>
                        <textarea class="am-form-field"  v-model="data.traffic" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-form-group">
                        <div class="am-input-group-label">小区环境</div>
                        <textarea class="am-form-field"  v-model="data.community_info" rows="5"></textarea>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-input-group">
                        <span class="am-input-group-label">期望价格:</span>
                        <span class="am-block">
                           <input type="text" class="am-form-field "  v-model="data.expect_price">
                           <span class="price_tag">万元</span>
                        </span>

                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">联系人:</span>
                           <input type="text" class="am-form-field"  v-model="data.contact">
                        </div>
                     </div>
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">联系人电话:</span>
                           <input type="text" class="am-form-field"  v-model="data.tel">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="am-u-sm-6 am-u-end">
                        <div class="am-input-group">
                           <span class="am-input-group-label">状态</span>
                           <select v-model="data.status"  class="am-form-field">
                              <option v-for="(item,n) in status" :value="n">{{item}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="control-bar">
                  <div class="am-g am-text-center">
                        <button @click="submit" class="am-btn am-btn-primary">保存</button>
                        <button @click="$router.go(-1)" class="am-btn am-btn-default">返回</button>
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
      name:'admin-house-add',
      data(){
         return {
            data:{},
            status:{},
         }
      },
      mounted(){
         this.getStatus();
      },
      methods:{
         submit(){
            sender('/api/house/addHouse',data)
            .then(res=>{
               this.$notify({
                  message:'添加成功',
                  type:'success',
               })
               setTimeout(res=>{
                  this.$router.push({path:'/admin/house/all'});
               },300)
            })
         },
         range(min,max){
            let arr = [];

            for(let i = min; i<=max;i++){
               arr.push(i);
            }
            return arr;
         },
         getStatus(){
            sender('/api/house/status')
            .then(res=>{
               this.status = res.data;
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
