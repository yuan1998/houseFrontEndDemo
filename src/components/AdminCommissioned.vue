<template>
   <transition>
      <div class="content">
         <div class="am-u-sm-12">
            <div>

            </div>
            <div class="user-table">
               <div class="am-scrollable-horizontal">
                 <table class="am-table am-table-bordered am-table-striped am-text-nowrap">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>城市</th>
                      <th>小区</th>
                      <th>位置</th>
                      <th>申请时间</th>
                      <th>申请人</th>
                      <th>申请人电话</th>
                      <th>期望价格</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody v-if="data != false">
                     <tr v-for="item in data">
                        <td>{{item.id}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.community}}</td>
                        <td>{{item.build_number}}号楼  {{item.unit_number}}单元 {{item.house_number}}号 </td>
                        <td>{{item.created_at}}</td>
                        <td>{{item.contact}}</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.expect_price}}万元</td>
                        <td>
                           <button type="button" class="am-btn am-btn-default am-radius"></button>
                           <button type="button" class="am-btn am-btn-default">删除</button>
                        </td>
                     </tr>
                  </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

   export default{
      name:'adminCommissioned',
      mounted(){
         this.getAllCommissioned();
      },
      data(){
         return {
            data:[],
            page:1,
            last:0,
         }
      },
      methods:{
         getAllCommissioned(){
            sender('/api/commissioned/getAll').then(res=>{
               this.data = res.data.data;
               this.last = res.data.lase;
               console.log(res);
            })
         }
      },
   }
</script>
