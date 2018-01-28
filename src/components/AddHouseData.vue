<template>
   <transition >
      <div class="content" v-show="start" style="padding-top: 50px;">
         <div class="am-progress am-progress-xs">
            <div class="am-progress-bar" style="width: 20%"></div>
         </div>
         <div class="am-container">
            <div class="am-g">
               <form class="am-form  am-g">
                  <div class="back-btn" style="height: 60px;">
                     <div v-show="page >1" style="font-size: 1.5em;cursor:pointer;">
                        <i class="am-icon-angle-left"></i class="am-icon-angle-left"><a @click="page--" class=" am-link-muted">上一步</a>
                     </div>
                  </div>
                  <div v-show="page == 1" class="page-1 ">
                     <div class="content">
                        <div class=' am-u-lg-8 am-u-end'>
                           <div class="header">
                              <h1>确认你的房源</h1>
                           </div>
                           <div>
                               <span style="font-size: 30px;padding-left:10px;padding-right: 7px;">在</span><span style="font-weight: 500;font-size: 80px;">{{data.city}}</span>
                           </div>
                           <div>
                              <span style="font-size: 20px;padding-left:30px;padding-right: 7px;">的</span> <span style="font-weight: 500;font-size: 60px;">{{data.community}}</span> <span style="font-size: 20px;padding-left:10px;padding-right: 7px;">小区</span>
                           </div>
                           <div> {{data.building_number}}号楼 {{data.unit_number}}单元 {{data.house_number}}号房 </div>
                           <div>
                              是你的房子吗？
                           </div>
                        </div>
                     </div>
                     <div class='am-block'>
                        <button type="button" class="am-btn am-btn-primary" @click="page++">是的</button>
                     </div>
                  </div>
                  <div v-show="page == 2" class="page-2">
                     <div class="content ">
                        <div class="am-u-lg-8 am-u-end">
                           <div class="header">
                              <h1>补充一些基本资料</h1>
                           </div>
                           <div class="am-g">
                              <div class="am-form-group">
                                 <label>面积</label>
                                 <input type="text" v-model="formData.area">
                              </div>
                           </div>
                           <div class="am-g">
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>总楼层</label>
                                       <input type="text" v-model="formData.floors">
                                       <div>
                                          <label>
                                             <input type="checkbox" v-model="fu.status">
                                             <span>有地下楼层</span>
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>所在楼层</label>
                                       <select v-model="formData.floor" >
                                          <template v-if="formData.floors >0">
                                             <option value="" selected>请选择楼层</option>
                                             <option v-for="n in range(fu.num,formData.floors)" :value="n">{{n}}</option>
                                          </template>
                                          <option v-else selected value="">请先输入总楼层</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g" v-show="fu.status">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group" >
                                       <label>有几层地下</label>
                                       <select v-model="fu.num">
                                          <template v-if="formData.floors > 0">
                                             <option value="0" selected>请选择楼层</option>
                                             <option v-for="n in range(0,formData.floors)" :value="-n">{{-n}}</option>
                                          </template>
                                          <option v-else selected value="0">请先输入总楼层</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="am-g">
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div>
                                       <h3>户型</h3>
                                    </div>
                                    <div>
                                       <div class=" am-g">
                                          <div class="am-u-sm-6">
                                             <span>大厅</span>
                                          </div>
                                          <div class="am-u-sm-6">
                                             <div class="am-u-sm-4">
                                                <button class="" :disabled="formData.room_count.hall ===0" @click="formData.room_count.hall--"><span>-</span></button>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <div>{{formData.room_count.hall}}</div>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <button class="" @click="formData.room_count.hall++"><span>+</span></button>
                                             </div>
                                          </div>
                                       </div>
                                       <div class=" am-g">
                                          <div class="am-u-sm-6">
                                             <span>卧室</span>
                                          </div>
                                          <div class="am-u-sm-6">
                                             <div class="am-u-sm-4">
                                                <button class="" :disabled="formData.room_count.bedroom ===0" @click="formData.room_count.bedroom--"><span>-</span></button>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <div> {{formData.room_count.bedroom}} </div>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <button class="" @click="formData.room_count.bedroom++"><span>+</span></button>
                                             </div>
                                          </div>
                                       </div>
                                       <div class=" am-g">
                                          <div class="am-u-sm-6">
                                             <span>卫生间</span>
                                          </div>
                                          <div class="am-u-sm-6">
                                             <div class="am-u-sm-4">
                                                <button class="" :disabled="formData.room_count.bathroom ===0" @click="formData.room_count.bathroom -= 0.5"><span>-</span></button>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <div> {{formData.room_count.bathroom}} </div>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <button class="" @click="formData.room_count.bathroom += 0.5"><span>+</span></button>
                                             </div>
                                          </div>
                                       </div>
                                       <div class=" am-g">
                                          <div class="am-u-sm-6">
                                             <span>阳台</span>
                                          </div>
                                          <div class="am-u-sm-6">
                                             <div class="am-u-sm-4">
                                                <button class="" :disabled="formData.room_count.balcony ===0" @click="formData.room_count.balcony--"><span>-</span></button>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <div> {{formData.room_count.balcony}} </div>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <button class="" @click="formData.room_count.balcony++"><span>+</span></button>
                                             </div>
                                          </div>
                                       </div>
                                       <div class=" am-g">
                                          <div class="am-u-sm-6">
                                             <span>厨房</span>
                                          </div>
                                          <div class="am-u-sm-6">
                                             <div class="am-u-sm-4">
                                                <button class="" :disabled="formData.room_count.kitchen ===0" @click="formData.room_count.kitchen--"><span>-</span></button>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <div> {{formData.room_count.kitchen}} </div>
                                             </div>
                                             <div class="am-u-sm-4">
                                                <button class="" @click="formData.room_count.kitchen++"><span>+</span></button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="am-u-md-6"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 3" class="page-3">
                     <div class="content am-cf">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>再补充一些资料</h1>
                                    </div>
                                 </div>
                                 <div class="">
                                    <div class='am-cf'>
                                       <div class="am-g">
                                          <div class="am-u-md-6 scroll">
                                             <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.hall)">
                                                <label class="am-u-md-3 am-g">大厅{{n}}</label>
                                                <div class="am-input-group am-u-md-9">
                                                   <input class="am-form-field" type="text" v-model="formData.huxing_map_info.hall[n]">
                                                   <span class="am-input-group-label">m²</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="am-u-md-6">
                                             随便描述下房间的大小
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="am-cf am-block">
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 4" class="page-4">
                     <div class="content am-cf">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>再补充一些资料</h1>
                                    </div>
                                 </div>
                                 <div class="">
                                    <div class='am-cf'>
                                       <div class="am-g">
                                          <div class="am-u-md-6 scroll">
                                             <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.bedroom)">
                                                <label class="am-u-md-3 am-g">卧室{{n}}</label>
                                                <div class="am-input-group am-u-md-9">
                                                   <input class="am-form-field" type="text" v-model="formData.huxing_map_info.bedroom[n]">
                                                   <span class="am-input-group-label">m²</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="am-u-md-6">
                                             随便描述下房间的大小
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="am-cf am-block">
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 5" class="page-5">
                     <div class="content am-cf">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>再补充一些资料</h1>
                                    </div>
                                 </div>
                                 <div class="">
                                    <div class='am-cf'>
                                       <div class="am-g">
                                          <div class="am-u-md-6 scroll">
                                             <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.bathroom)">
                                                <label class="am-u-md-3 am-g">卫生间{{n}}</label>
                                                <div class="am-input-group am-u-md-9">
                                                   <input class="am-form-field" type="text" v-model="formData.huxing_map_info.bathroom[n]">
                                                   <span class="am-input-group-label">m²</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="am-u-md-6">
                                             随便描述下房间的大小
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="am-cf am-block">
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 6" class="page-6">
                     <div class="content am-cf">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>再补充一些资料</h1>
                                    </div>
                                 </div>
                                 <div class="">
                                    <div class='am-cf'>
                                       <div class="am-g">
                                          <div class="am-u-md-6 scroll">
                                             <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.balcony)">
                                                <label class="am-u-md-3 am-g">阳台{{n}}</label>
                                                <div class="am-input-group am-u-md-9">
                                                   <input class="am-form-field" type="text" v-model="formData.huxing_map_info.balcony[n]">
                                                   <span class="am-input-group-label">m²</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="am-u-md-6">
                                             随便描述下房间的大小
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="am-cf am-block">
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 7" class="page-7">
                     <div class="content am-cf">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>再补充一些资料</h1>
                                    </div>
                                 </div>
                                 <div class="">
                                    <div class='am-cf'>
                                       <div class="am-g">
                                          <div class="am-u-md-6 scroll">
                                             <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.kitchen)">
                                                <label class="am-u-md-3 am-g">厨房{{n}}</label>
                                                <div class="am-input-group am-u-md-9">
                                                   <input class="am-form-field" type="text" v-model="formData.huxing_map_info.kitchen[n]">
                                                   <span class="am-input-group-label">m²</span>
                                                </div>
                                             </div>
                                          </div>
                                          <div class="am-u-md-6">
                                             随便描述下房间的大小
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="am-cf am-block">
                        <button type="button" class="am-btn am-btn-primary" @click="page++">Next</button>
                     </div>
                  </div>
                  <div v-show="page == 8" class="page-8">
                     <div class="content">
                        <div class="am-cf">
                           <div class="am-u-md-8 am-u-end">
                              <div class="am-g">
                                 <div class="header">
                                    <div>
                                       <h1>上传一些图片</h1>
                                    </div>
                                 </div>
                                 <div class="body">
                                    <div class="am-u-md-12">
                                       <div class="am-g">
                                          <div></div>
                                       </div>
                                    </div>
                                    <div class="am-u-md-12">
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>

export default {
   props:['id'],
   data(){
      return {
         start:false,
         data:{},
         formData:{
            floor:'',
            huxing_map_info:{
               hall:{},
               bedroom:{},
               bathroom:{},
               balcony:{},
               kitchen:{}
            },
            room_count:{hall:1,bedroom:1,bathroom:2,balcony:1,kitchen:1},
         },
         page:1,
         fu:{status:false,num:0},

      }
   },
   mounted:function(){
      this.getHouse();
   },
   methods:{
      getHouse(){
         $.post('http://localhost:1234/api/commissioned/readId',{id:this.id}).then(res=>{
            this.data = res.data;
            this.start = true;
         })
      },
      range(min,max){
         let arr = [];
         min = parseInt(min);
         max =  parseInt(max) + (min < 0 ? min :0 );
         max = Math.ceil(max);
         for(let i = min;i <= max;i++){
            if(i !== 0)
               arr.push(i);
         }

         return arr;
      }
   },
   computed:{

   }
}
</script>
<style>
   #head .am-topbar{
  background: #fff;
  border-bottom: none;
}
#head a{
  color:rgba(0,0,0,0.7);
}
</style>

<style scoped>
.rounds{
    display: inline-block !important;
    cursor: pointer !important;
    border-radius: 50% !important;
    text-align: center !important;
    line-height: 1 !important;
    position: relative !important;
    border: 2px solid transparent !important;
    border-color: #008489 !important;
    background: transparent !important;
    width: 32px !important;
    height: 32px !important;
    border-width: 1px !important;
}
.content div[class^="page-"] .content{
   height: 600px;
}
.content div[class^="page-"] .header{
   height: 50px;
}
.scroll{
   height: 550px;
   overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
    display: none;
}
</style>
