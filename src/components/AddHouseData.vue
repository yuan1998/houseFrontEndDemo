<template>
   <transition >
      <div class="addHouseData">
         <navtop></navtop>
         <div class="content" >
            <div class="am-progress am-progress-xs" data-am-sticky>
               <div class="am-progress-bar" :style="{width:Math.ceil((100 / 10) * page) +'%'}"></div>
            </div>
            <div class="am-container" style="min-width: 300px;">
               <div class="">
                  <form @submit.prevent class="am-form" >
                     <div class="back-btn" v-show="page<10" style="height: 60px;background: #fff;" data-am-sticky>
                        <div class="am-fl">
                           <div v-show="page >1">
                              <button @click="page--" class="am-btn am-btn-link am-link-muted" style="font-size: 1.5em;cursor:pointer;">
                                 <i class="am-icon-angle-left"></i>
                                    上一步
                              </button>
                           </div>
                        </div>
                        <div class="am-fr">
                           <button type="button" :disabled="!pageValidate" style="font-size: 1.5em;cursor:pointer;" class="am-btn am-btn-link am-link-muted" @click="nextPage">
                              下一步<i class="am-icon-angle-right"></i>
                           </button>
                        </div>
                     </div>
                     <div v-if="page == 1" class="page-1 ">
                        <div class="content">
                           <div class=' am-u-lg-5 am-u-md-7 am-u-end'>
                              <div class="header">
                                 <h1>确认你的房源</h1>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>城市</label>
                                       <input v-model="formData.city" type="text" placeholder="城市">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>小区</label>
                                       <input v-model="formData.community" @keyup="getLnt" type="text" placeholder="小区名称">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>位置</label>
                                       <input v-model="formData.location" type="text" placeholder="输入小区后在地图调整位置">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>房屋地址</label>
                                       <div class="am-g">
                                          <div class="am-u-sm-4">
                                             <input type="text" class="am-form-field " v-model="formData.building_number" placeholder="楼栋号">
                                          </div>
                                          <div class="am-u-sm-4">
                                             <input type="text" class="am-form-field " v-model="formData.unit_number" placeholder="单元号">
                                          </div>
                                          <div class="am-u-sm-4">
                                             <input type="text" class="am-form-field " v-model="formData.house_number" placeholder="门牌号">
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="am-u-lg-7 ">
                              <div class="map-bar am-show-lg-only"></div>
                              <mapa @location="getLoaction" v-bind:city="formData.city" v-bind:lng="lng" v-bind:lat="lat">
                              </mapa>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 2" class="page-2">
                        <div class="content ">
                           <div class="am-u-lg-8 am-u-end">
                              <div class="header">
                                 <h1>补充一些基本资料</h1>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>面积</label>
                                       <input v-model.number="formData.area" type="number" placeholder="房屋的总面积">
                                    </div>
                                 </div>
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>房屋朝向</label>
                                       <select v-model="formData.direction">
                                          <option value="">请选择</option>
                                          <option value="东">东</option>
                                          <option value="南">南</option>
                                          <option value="西">西</option>
                                          <option value="北">北</option>
                                          <option value="西南">西南</option>
                                          <option value="东南">东南</option>
                                          <option value="西北">西北</option>
                                          <option value="东北">东北</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>总楼层</label>
                                       <input type="number" v-model.number="formData.floors" placeholder="一共有多少层">
                                       <div>
                                          <label>
                                             <input type="checkbox" v-model="fu.status">
                                             <small>有地下楼层</small>
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
                                             <option v-for="n in range(fu.status ? -formData.negative_floor : 0,formData.floors)" :value="n">{{n}}</option>
                                          </template>
                                          <option v-else selected value="">请先输入总楼层</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6" v-show="fu.status">
                                    <div class="am-form-group" >
                                       <label>有几层地下</label>
                                       <select v-model="formData.negative_floor">
                                          <template v-if="formData.floors > 0">
                                             <option value="0" selected>有多少层地下</option>
                                             <option v-for="n in range(0,formData.floors)" :value="n">{{n}}</option>
                                          </template>
                                          <option v-else selected value="0">请先输入总楼层</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div class="am-u-md-6 am-u-end">
                                    <div class="am-form-group">
                                       <label>电梯</label>
                                       <select v-model="formData.elevator">
                                          <option value="">请选择</option>
                                          <option value="无">无</option>
                                          <option value="其他">其他</option>
                                          <option v-for="n in range(1,20)" :value="'一梯'+n+'户'">一梯{{n}}户</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>房屋装修</label>
                                       <select v-model="formData.Decoration">
                                          <option value="">请选择</option>
                                          <option value="精装">精装</option>
                                          <option value="简装">简装</option>
                                          <option value="毛胚房">毛胚房</option>
                                          <option value="其他">其他</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>供暖</label>
                                       <select v-model="formData.supply_heating">
                                          <option value="">请选择</option>
                                          <option value="集体供暖">集体供暖</option>
                                          <option value="个人供暖">个人供暖</option>
                                          <option value="无供暖">无供暖</option>
                                          <option value="其他">其他</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>房屋年限</label>
                                       <input type="number" v-model.number="formData.house_age_limit" placeholder="房屋年限">
                                    </div>
                                 </div>
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>楼房年龄</label>
                                       <input type="number" v-model.number="formData.floor_age" placeholder="楼房年龄">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-6">
                                    <div class="am-form-group">
                                       <label>
                                          户型
                                       </label>
                                       <div class="room">
                                          <div class=" am-g">
                                             <div class="am-u-sm-6">
                                                <span class="am-text-default">大厅</span>
                                             </div>
                                             <div class="count-bar am-u-sm-6">
                                                <div class="am-u-sm-4">
                                                   <button class="" :disabled="formData.room_count.hall ===0" @click="formData.room_count.hall--">-</button>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <div class="room_count"> {{formData.room_count.hall}}</div>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <button class="" @click="formData.room_count.hall++">+</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div class=" am-g">
                                             <div class="am-u-sm-6">
                                                <span class="am-text-default">卧室</span>
                                             </div>
                                             <div class="count-bar am-u-sm-6">
                                                <div class="am-u-sm-4">
                                                   <button class="" :disabled="formData.room_count.bedroom <= 1" @click="formData.room_count.bedroom--">-</button>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <div class="room_count"> {{formData.room_count.bedroom}} </div>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <button class="" @click="formData.room_count.bedroom++">+</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div class=" am-g">
                                             <div class="am-u-sm-6">
                                                <span class="am-text-default">卫生间</span>
                                             </div>
                                             <div class="count-bar am-u-sm-6">
                                                <div class="am-u-sm-4">
                                                   <button class="" :disabled="formData.room_count.bathroom ===0" @click="formData.room_count.bathroom -= 0.5">-</button>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <div class="room_count"> {{formData.room_count.bathroom}} </div>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <button class="" @click="formData.room_count.bathroom += 0.5">+</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div class=" am-g">
                                             <div class="am-u-sm-6">
                                                <span class="am-text-default">阳台</span>
                                             </div>
                                             <div class="count-bar am-u-sm-6">
                                                <div class="am-u-sm-4">
                                                   <button class="" :disabled="formData.room_count.balcony ===0" @click="formData.room_count.balcony--">-</button>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <div class="room_count"> {{formData.room_count.balcony}} </div>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <button class="" @click="formData.room_count.balcony++">+</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div class=" am-g">
                                             <div class="am-u-sm-6">
                                                <span class="am-text-default">厨房</span>
                                             </div>
                                             <div class="count-bar am-u-sm-6">
                                                <div class="am-u-sm-4">
                                                   <button class="" :disabled="formData.room_count.kitchen ===0" @click="formData.room_count.kitchen--">-</button>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <div class="room_count"> {{formData.room_count.kitchen}} </div>
                                                </div>
                                                <div class="am-u-sm-4">
                                                   <button class="" @click="formData.room_count.kitchen++">+</button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 3" class="page-3">
                        <div class="content am-cf">
                              <div class="am-u-lg-8 am-u-end">
                                    <div class="header">
                                       <div>
                                          <h1>再补充一些资料</h1>
                                       </div>
                                    </div>
                                    <div class="am-g">
                                       <div class="am-text-center am-text-xl">
                                          随便描述下房间的大小
                                       </div>
                                    </div>
                                    <div class="am-g" v-show="formData.room_count.hall > 0">
                                       <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.hall)">
                                          <label>大厅{{n}}</label>
                                          <div>
                                             <div >
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <span class="am-block">
                                                         <input class="am-form-field" :placeholder="'大厅'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.hall['hall_'+n]['arae']">
                                                         <span class="exprice">m²</span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <select v-model="formData.huxing_map_info.hall['hall_'+n]['direction']">
                                                         <option value="">请选择房间朝向</option>
                                                         <option value="东">东</option>
                                                         <option value="南">南</option>
                                                         <option value="西">西</option>
                                                         <option value="北">北</option>
                                                         <option value="西南">西南</option>
                                                         <option value="东南">东南</option>
                                                         <option value="西北">西北</option>
                                                         <option value="东北">东北</option>
                                                         <option value="无">无</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="am-g" v-show="formData.room_count.bedroom > 0">
                                       <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.bedroom)">
                                          <label>卧室{{n}}</label>
                                          <div>
                                             <div >
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <span class="am-block">
                                                         <input class="am-form-field" :placeholder="'卧室'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.bedroom['bedroom_'+n]['arae']">
                                                         <span class="exprice">m²</span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <select v-model="formData.huxing_map_info.bedroom['bedroom_'+n]['direction']">
                                                         <option value="">请选择房间朝向</option>
                                                         <option value="东">东</option>
                                                         <option value="南">南</option>
                                                         <option value="西">西</option>
                                                         <option value="北">北</option>
                                                         <option value="西南">西南</option>
                                                         <option value="东南">东南</option>
                                                         <option value="西北">西北</option>
                                                         <option value="东北">东北</option>
                                                         <option value="无">无</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="am-g" v-show="formData.room_count.bathroom > 0">
                                       <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.bathroom)">
                                          <label>卫生间{{n}}</label>
                                          <div>
                                             <div >
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <span class="am-block">
                                                         <input class="am-form-field" :placeholder="'卫生间'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.bathroom['bathroom_'+n]['arae']">
                                                         <span class="exprice">m²</span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <select v-model="formData.huxing_map_info.bathroom['bathroom_'+n]['direction']">
                                                         <option value="">请选择房间朝向</option>
                                                         <option value="东">东</option>
                                                         <option value="南">南</option>
                                                         <option value="西">西</option>
                                                         <option value="北">北</option>
                                                         <option value="西南">西南</option>
                                                         <option value="东南">东南</option>
                                                         <option value="西北">西北</option>
                                                         <option value="东北">东北</option>
                                                         <option value="无">无</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="am-g" v-show="formData.room_count.balcony > 0">
                                       <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.balcony)">
                                          <label>阳台{{n}}</label>
                                          <div>
                                             <div >
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <span class="am-block">
                                                         <input class="am-form-field" :placeholder="'阳台'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.balcony['balcony_'+n]['arae']">
                                                         <span class="exprice">m²</span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <select v-model="formData.huxing_map_info.balcony['balcony_'+n]['direction']">
                                                         <option value="">请选择房间朝向</option>
                                                         <option value="东">东</option>
                                                         <option value="南">南</option>
                                                         <option value="西">西</option>
                                                         <option value="北">北</option>
                                                         <option value="西南">西南</option>
                                                         <option value="东南">东南</option>
                                                         <option value="西北">西北</option>
                                                         <option value="东北">东北</option>
                                                         <option value="无">无</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div class="am-g" v-show="formData.room_count.kitchen > 0">
                                       <div class="am-form-group am-cf" v-for="n in range(1,formData.room_count.kitchen)">
                                          <label>厨房{{n}}</label>
                                          <div>
                                             <div >
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <span class="am-block">
                                                         <input class="am-form-field" :placeholder="'厨房'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.kitchen['kitchen_'+n]['arae']">
                                                         <span class="exprice">m²</span>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div class="am-u-md-6">
                                                   <div class="am-form-group">
                                                      <select v-model="formData.huxing_map_info.kitchen['kitchen_'+n]['direction']">
                                                         <option value="">请选择房间朝向</option>
                                                         <option value="东">东</option>
                                                         <option value="南">南</option>
                                                         <option value="西">西</option>
                                                         <option value="北">北</option>
                                                         <option value="西南">西南</option>
                                                         <option value="东南">东南</option>
                                                         <option value="西北">西北</option>
                                                         <option value="东北">东北</option>
                                                         <option value="无">无</option>
                                                      </select>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                              </div>
                        </div>
                     </div>
                     <div v-else-if="page == 4" class="page-4 ">
                        <div class="content">
                           <div class='am-u-md-7 am-u-end'>
                              <div class="header">
                                 <h1>再填一些最基本的信息</h1>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>联系人</label>
                                       <input v-model="formData.contact" type="text" placeholder="我们将会按照您留下的姓名称呼您">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>联系人电话</label>
                                       <input v-model="formData.tel" type="text" placeholder="方便我们审核后联系您">
                                    </div>
                                 </div>
                              </div>
                              <div class="am-g">
                                 <div class="am-u-md-12">
                                    <div class="am-form-group">
                                       <label>期望价格</label>
                                       <span class="am-block">
                                          <input v-model="formData.expect_price"  type="text" placeholder="你期望的价格">
                                          <span class='exprice'>万元</span>
                                       </span>

                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 5" class="page-5">
                        <div class="content">
                           <div class="am-cf">
                              <div class="am-u-md-12 am-u-end">
                                 <div class="">
                                    <div class="header">
                                       <div>
                                          <h1>上传一些图片</h1>
                                       </div>
                                    </div>
                                    <div class="body">
                                       <div class="am-u-md-12">
                                          <div class="am-g">
                                             <div>
                                                <div class="am-text-center">
                                                   <span class="am-text-xl am-block">选择一张你房子的美照作为封面</span>
                                                </div>
                                             </div>
                                             <div>
                                                <div class="am-u-md-11 am-u-lg-10 am-u-sm-centered">
                                                   <div class="am-panel am-g">
                                                      <div class="am-panel-bd am-text-center am-g thumbnail-bar am-cf cover-bar" v-if="formData.house_img.cover != false">
                                                         <div class="am-g center-img am-radius" :style="'background-image:url('+formData.house_img.cover[0].get+')'" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                            <!-- <img class="am-radius am-img-responsive" style="" :src="formData.house_img.cover[0]"> -->
                                                            <span class="close">
                                                               <button @click="removeIndex(formData.house_img.cover,0)" type="button" class="am-btn">删除图片</button>
                                                            </span>
                                                         </div>
                                                      </div>
                                                      <div v-else @dragenter.prevent.stop @dragover.prevent.stop @drop="upload($event,formData.house_img.cover)" class="am-panel-bd upload-bar">
                                                         <div class="am-text-center">
                                                            <div class="">
                                                               <label for="upload-file">
                                                                  <div class="am-text-center upload-ct">
                                                                     <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                     <div class="">点击上传</div>
                                                                     <small>或者将文件拖拽至框内</small>
                                                                  </div>
                                                                  <input id="upload-file" @change="upload($event,formData.house_img.cover)" accept="image/*" type="file" multiple style="display:  none;">
                                                               </label>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 6" class="page-6">
                        <div class="content">
                           <div class="am-cf">
                              <div class="am-u-md-12 am-u-end">
                                 <div class="">
                                    <div class="header">
                                       <div>
                                          <h1>上传一些图片</h1>
                                       </div>
                                    </div>
                                    <div class="body">
                                       <div class="am-u-md-12">
                                          <div class="am-margin-top am-g" v-show="formData.room_count.hall >0">
                                             <div>
                                                <div class="am-text-center">
                                                   <span class="am-text-xxl am-block">上传一些关于房子的照片</span>
                                                   <small>最多30张照片，请选择明亮并能表现房间整体构造和装饰的图片</small>
                                                </div>
                                             </div>
                                             <div>
                                                <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                   <div class="am-g">
                                                      <div v-show="formData.house_img.house != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.house">
                                                         <div class="o-thumbnail am-text-center center-img" @mouseenter="closeBtnOn" :style="'background-image:url('+item.get+')'" @mouseleave="closeBtnOff">
                                                            <!-- <img class="am-radius am-inline-block" :src="item"> -->
                                                            <span class="close">
                                                               <button @click="removeIndex(formData.house_img.house,index)" type="button" class="am-btn">删除图片</button>
                                                            </span>
                                                         </div>
                                                      </div>
                                                      <div class="am-u-lg-3 am-u-md-6" v-show="loading">
                                                         <div class="o-thumbnail am-text-center center-img">
                                                             <am-loading color="primary" :loading="loading"></am-loading>
                                                         </div>
                                                      </div>
                                                      <div v-show="formData.house_img.house.length <30" @dragenter.prevent.stop @dragover.prevent.stop @drop="upload($event,formData.house_img.house)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                         <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                            <div class="am-vertical-align-middle">
                                                               <label class="">
                                                                  <div class="am-text-center upload-ct">
                                                                     <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                     <span class="">点击上传</span>
                                                                  </div>
                                                                  <input @change="upload($event,formData.house_img.house)" accept="image/*" type="file" multiple style="display:  none;">
                                                               </label>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 7" class="page-7 ">
                        <div class="content">
                           <div class="am-cf">
                              <div class=' am-u-lg-8 am-u-end'>
                                 <div>
                                    <div class="header">
                                       <h1>说一下周边的环境吧</h1>
                                    </div>
                                    <div class="body">
                                       <div class="am-g">
                                          <div class="am-form-group">
                                             <div class="am-text-xl am-margin-vertical">描述一下小区周边的环境</div>
                                             <textarea rows="5" v-model="formData.surroundings" placeholder="描述一下小区周边的环境，是否有医院，学校等..."></textarea>
                                          </div>
                                       </div>
                                       <div class="am-g">
                                          <div class="am-form-group">
                                             <div class="am-text-xl am-margin-vertical">描述一下小区附近的交通</div>
                                             <textarea rows="5" v-model="formData.traffic" placeholder="有否地铁公交站，等出行交通..."></textarea>
                                          </div>
                                       </div>
                                       <div class="am-g">
                                          <div class="am-form-group ">
                                             <div class="am-text-xl am-margin-vertical">最后随便说一下小区环境吧</div>
                                             <textarea rows="5" v-model="formData.community_info" placeholder="描述一下小区环境..."></textarea>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 8" class="page-8 ">
                        <div class="content">
                           <div class="am-cf">
                              <div class='am-u-lg-12'>
                                 <div>
                                    <div class="header">
                                       <h1>上传房产证等证件信息</h1>
                                    </div>
                                    <div class="body">
                                       <div class="am-g">

                                          <div>
                                             <div class="am-u-md-11 am-u-lg-10 am-u-sm-centered">
                                                <div class="am-g">
                                                   <div>
                                                      <div class="am-text-center">
                                                         <span class="am-text-xl am-block">请上传房产证明</span>
                                                         <small>该属于私密资料，不会被公开，不到交易的最后将不会有人知道.</small>
                                                      </div>
                                                   </div>
                                                </div>
                                                <div class="am-panel am-g">
                                                   <div class="am-panel-bd am-text-center am-g thumbnail-bar am-cf cover-bar" v-if="formData.deed_info != false">
                                                      <div class="am-g center-img" style="max-height: 500px;position:relative;display:inline-block" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff" :style="'background-image:url('+ formData.deed_info[0].get+ ')'">
                                                         <!-- <img class="am-radius am-img-responsive" style="" :src="formData.deed_info[0]"> -->
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.deed_info,0)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-else @dragenter.prevent.stop @dragover.prevent.stop @drop="upload($event,formData.deed_info)" class="am-panel-bd upload-bar">
                                                      <div class="am-text-center">
                                                         <div class="">
                                                            <label for="upload-file">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <div class="">点击上传</div>
                                                                  <small>或者将文件拖拽至框内</small>
                                                               </div>
                                                            </label>
                                                            <input id="upload-file" @change="upload($event,formData.deed_info)" accept="image/*" type="file" multiple style="display:  none;">
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 9" class="page-9">
                        <div class="content">
                           <div class="am-cf">
                              <div class="am-u-sm-12">
                                 <div>
                                    <div class="header">
                                       <h1>我们已经来到最后一步了</h1>
                                    </div>
                                    <div class="body">
                                       <div class="am-margin-vertical">
                                          <div class="am-text-center">
                                             <div>
                                                <div class="am-u-md-9 am-u-sm-centered">
                                                   <div class="am-text-xl">我们将按照你提交的资料为你估价，但这要在你同意我们的合同的条件下，请仔细阅读下面的合同。
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="am-margin-vertical">
                                          <div class="am-u-md-10 am-u-sm-centered">
                                             <div class="am-panel am-panel-default">
                                                <div class="am-panel-bd">
                                                   <div class="am-scrollable-vertical" style="height:500px;">
                                                      <h1 class="am-text-center">xxxx合约</h1>
                                                      <p>为你封了国境<br/>为你赦了罪<br/>为你撤了历史记载<br/>为你涂了装扮<br/>为你喝了醉<br/>为你建了城池围墙<br/>一颗热的心穿着冰冷外衣<br/>一张白的脸漆上多少褪色的情节<br/>在我的空虚身体里面<br/>爱上哪个肤浅的王位<br/>在你的空虚宝座里面<br/>爱过什麽女爵的滋味<br/>为你封了国境
                                                      </p>
                                                      <p>为你赦了罪<br/>为你撤了历史记载<br/>一颗热的心<br/>穿着冰冷外衣<br/>一张白的脸<br/>漆上多少褪色的情节<br/>在我的空虚身体里面<br/>爱上哪个肤浅的王位<br/>在你的空虚宝座里面<br/>爱过什麽女爵的滋味<br/>在我的空虚身体里面<br/>爱上哪个肤浅的王位<br/>在你的空虚宝座里面<br/>爱过什麽女爵的滋味
                                                      </p>
                                                   </div>
                                                </div>
                                             </div>

                                          </div>
                                       </div>
                                       <div class="am-margin-vertical">
                                          <div class="am-text-center">
                                             <button class="exit am-btn am-btn-lg am-btn-link am-link-muted">我不同意，我要退出</button>
                                             <button @click="formData.agree = true" class="exit am-btn am-btn-lg am-btn-link am-link-muted">我同意上面的合约。</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div v-else-if="page == 10" class="page-10">
                        <div class="content">
                           <div class="am-text-center" style="margin-top:250px;">
                              <div class="am-text-xxxl">
                                 <i class="am-icon-check"></i>
                              </div>
                              <div class="am-text-xl">
                                 资料已提交，请您再次等待我们的审核.
                              </div>
                              <div class="am-text-xxxl">
                                 <i class="am-icon-clock-o"></i>
                              </div>
                              <div class="">
                                 <router-link to="/" class="am-text-xl am-link-muted">
                                    回到首页
                                 </router-link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'
import navtop from '@/components/NavTop3'
import mapa from '@/components/user/map'




export default {
   props:['id'],
   components:{
      navtop,
      mapa
   },
   data(){
      let that = this;
      return {
         start:false,
         data:{},
         formData:{
            city:'',
            location:'',
            house_number:'',
            building_number:'',
            unit_number:'',
            floor:'',
            huxing_map_info:{
               hall:{},
               bedroom:{},
               bathroom:{},
               balcony:{},
               kitchen:{}
            },
            room_count:{hall:1,bedroom:1,bathroom:2,balcony:1,kitchen:1},
            house_img:{house:[],cover:[]},
            direction:"",
            Decoration:'',
            supply_heating:'',
            negative_floor:0,
            elevator:'',
            deed_info:[],
            agree:false,
            contact:'',
            tel:'',
            expect_price:'',
         },
         page:0,
         fu:{status:false,num:0},
         pageValidate:true,
         submit:false,
         location:[],
         lng:0,
         lat:0,
         to:null,
         loading:false,
         saveInterval:null,
         storage:$.AMUI.store,
      }
   },
   mounted:function(){



      $('.back-btn').sticky({
         top:7,
      });
      $('.am-progress-xs').sticky({
         top:0,
      })




      setTimeout(res=>{
         this.init();
      },500);
   },
   methods:{
      init(){

         // if(this.getSotrage())
         //    this.getLnt();
         // else
            this.getC();

         this.start = true;
         this.page = 1;

      },
      setIntervalSave(){
         // this.saveInterval = setInterval(res=>{
         //    this.$message({
         //       title:'保存一下',
         //       message:'我们每个一段时间都会为您保存一下',
         //       customClass:'am-hide-sm',
         //       placement: 'left-bottom'
         //    })
         //    this.setSotrage();
         // },15000)
      },
      setSotrage(){
         this.storage.set('temporaryHouse',this.formData);
      },
      getSotrage(){
         if(!this.storage.enabled)
            return false;

         this.setIntervalSave();

         let temp = this.storage.get('temporaryHouse');

         if(!temp || temp == false || temp === false || temp == undefined)
            return false;

         this.formData = temp;
         this.$message({
            title:'已读取上次保存文本',
            message:'我们每个一段时间都会为您保存一下',
            customClass:'am-hide-sm',
            placement: 'left-bottom'
         })
         return true;
      },
      getC(){
         this.formData.city = this.getCity;
      },
      getLoaction(location){
         if(!location || !location.regeocode.formatted_address){
            this.$notify({
               message:'并没有找到你输入的小区',
               type:'warning',
            })
            this.formData.location = '';
         }else {

            this.formData.location = location.regeocode.formatted_address ;
            this.getlnglat();
         }
      },
      parseLocation(data){
         this.location = data;
         let arr =data.geocodes[0].location.split(',');
         this.lng = parseFloat(arr[0]);
         this.lat = parseFloat(arr[1]);
         this.saveLocation(data.geocodes[0],this.lat,this.lng);
      },
      getLnt(){

         clearTimeout(this.to);

         if(!this.formData.city || !this.formData.community)
            return;

         this.to = setTimeout(res=>{
            $.get(`http://restapi.amap.com/v3/geocode/geo?city=${this.formData.city}&address=${this.formData.community}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{

               if(!res.geocodes || res.geocodes !=false)
                  this.parseLocation(res);
               else this.getLoaction();
            })
         },1000)

      },
      getlnglat(){
         $.get(`http://restapi.amap.com/v3/geocode/geo?city=${this.formData.city}&address=${this.formData.location}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{

               let arr =res.geocodes[0].location.split(',');
               this.saveLocation(res.geocodes[0],arr[0],arr[1]);

         })
      },
      saveLocation(location,lng,lat){
         this.formData.location_info = location;
         this.formData.location_info.lng = lng;
         this.formData.location_info.lat = lat;
         console.log(this.formData.location_info);
      },
      getHouse(){
         sender('/api/commissioned/readId',{id:this.id}).then(res=>{
            this.data = res.data;
         })
      },
      range(min,max){
         let arr = [];
         max = Math.ceil(max);

         min = parseInt(min);
         max =  parseInt(max) + (min < 0 ? min :0 );


         for(let i = min;i <= max;i++){
            if(i === 0)
               continue;

            arr.push(i<0 ? ('F'+ Math.abs(i)) : i);

         }

         return arr;
      },
      upload(e,arr){
         let files = e.target.files || e.dataTransfer.files;

         if(!files.length)
            return;

         let that =this;


         let fx = (e)=>{
            let str = e.target.result;
            this.loading = true;
            sender('/api/img/save',{file:str}).then(res=>{
               arr.push(res.data);
               that.loading = false;
               that.$notify({
                  message: '上传成功。',
                  type: 'success'
               });
               setTimeout(res=>{
                  that.$store.dispatch('windowScroll',$(document).height() - $(window).height());
               },200)
            },res=>{
               that.loading = false;
               that.$notify({
                    message: '上传失败.',
                    type: 'error'
                });
            })

         }

         this.$store.dispatch('readerFile',{file:files[0],callback:fx});
      },
      removeIndex(arr,index){

         let filename = arr[index].name;

         sender('/api/img/remove',{file:filename}).then(res=>{
            arr.splice(index,1);
            this.$notify({
              message: '已经删除鸟',
              type: 'success'
            });
            this.setSotrage();
         },res=>{
            this.$notify({
              message: '已经删除鸟',
              type: 'error'
            });
         })
      },
      labelClick(e){
         e.target.parentNode.click();
      },
      roomModel(){
         let data = this.formData,
             room_count = data.room_count;

         for(let key in room_count){
            let count =Math.ceil(room_count[key]);
            if(count >0){
               for(let i = 1;i <=count;i++){

                  if(!this.formData.huxing_map_info[key][key+'_'+i])
                     this.$set(this.formData.huxing_map_info[key],key+'_'+i,{arae:'',direction:''});

                  if(i === count){
                     do{
                        i++;
                     }while(this.deleteObjectKey(this.formData.huxing_map_info[key],key+'_'+i))
                  }

               }
            }else this.formData.huxing_map_info[key] ={};
         }
      },
      deleteObjectKey(obj,key){

         return (!!obj[key]) ? delete obj[key] : false;
      },
      closeBtnOn(e){
         let btn = e.target.parentNode.querySelector('.close');
         btn.style.opacity = "1";
      },
      closeBtnOff(e){
         let btn = e.target.parentNode.querySelector('.close');
         btn.style.opacity = '0';
      },
      nextPage(){

         if(this.page == 9){
            this.submitFormData();
         }else this.page++;
      },
      nextValidator(){
         if(this.page >=10 || typeof this['page'+this.page+'Validator'] !== 'function')
            return;
         return this['page'+this.page+'Validator']();
      },
      page1Validator(){
         let data = this.formData,
            arr = [data.community,data.city,data.location,data.building_number,data.unit_number,data.house_number];

         for(let i of arr){
            if(!i || i == false )
               return false;
         }
         return true;
      },
      page2Validator(){

         let data = this.formData,
            arr =[
               data.area,data.floors,data.floor,data.elevator,data.supply_heating,data.Decoration,data.direction,
               data.house_age_limit,data.floor_age
            ];


         if(this.fu.status && data.negative_floor == false)
            return false;

         if(data.floors == '')
            return false;

         for(let item of arr){

            if(item == false || !item)
               return false;
         }
         return true;
      },
      page3Validator(){

         let data = this.formData.huxing_map_info;

         for(let items in data){

            for(let key in data[items]){

               let item = data[items][key];
               if(item.arae == false || !item.arae)
                  return false;
               if(item.direction == false || !item.direction)
                  return false;
            }
         }

         return true;
      },
      page4Validator(){
         let data = this.formData;

         if(!data.contact || !data.tel || !data.expect_price)
            return false;

         return true;
      },
      page5Validator(){

         let data = this.formData.house_img.cover[0];

         return data ? true :false;
      },
      page6Validator(){

         let data = this.formData.house_img.house;

         return data[3] ? true : false ;

      },
      page7Validator(){

         let data = this.formData,
             surroundings = data.surroundings,
             community_info = data.community_info,
             traffic = data.traffic;

         if(!traffic||!community_info||!surroundings)
            return false;

         return true;
      },
      page8Validator(){
         let data = this.formData;

         return data.deed_info[0] ?true :false;
      },
      page9Validator(){
         return this.formData.agree;
      },
      submitFormData(){
         if(this.submit)
            return;

         this.submit = true;
         sender('/api/house/addData',this.formData).then(res=>{
            this.page++;


         },res=>{
            this.submit = false;

         });
      },
      getC(){
          this.formData.city = this.getCity;
      },
   },
   computed:{
      getCity(){
          return this.$store.getters['getIpCity'];
      },
   },
   watch:{
      ['fu.status'](val){
         if(val === false)
            this.formData.negative_floor = 0;
      },
      page(val){
         this.roomModel();
         this.pageValidate = this.nextValidator();
      },
      formData: {
         handler() {
            this.pageValidate = this.nextValidator();
         },
         deep: true,
      }

   }
}
</script>

<style scoped>
.addHouseData >>> .am-topbar{
   min-height: 67px;
}
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
.content div[class^=page-] .am-form-group label{
   word-wrap: break-word !important;
      font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
      font-size: 19px !important;
      line-height: 24px !important;
      font-weight: normal !important;
}

.o-upload-bar,
.upload-bar{
   border: 3px dashed rgba(0,0,0,0.1);

}
.o-upload-bar,
.upload-bar,
.o-thumbnail,
.thumbnail-bar{
   border-radius:5px;
   margin-top: 30px;
}

.o-thumbnail,
.thumbnail-bar,
.upload-bar{
   margin-top: 30px;
}
.thumbnail-bar div{
   max-height: 465px !important;
   height: 500px;
   width: 100%;
}
.upload-bar{
   padding-top: 80px;
   padding-bottom: 70px;
   border-radius:3px;
}
.o-thumbnail,
.o-upload-bar{
   height: 300px;
   overflow: hidden;
   width: 100%;
}
.upload-bar button{
   outline: none;
   border-radius:5px;
}
.room .count-bar,
.room .am-u-sm-4{
   padding-left: 0;
   padding-right: 0;
}
.room .am-u-sm-4 button{
   width: 32px;
   height: 32px;
   border-radius: 50%;
   border:1px solid #008489;
}

.room .am-g{
   padding-top: 10px;
   padding-bottom: 10px;
}
.room .room_count{
   margin-top: 5px;
   margin-left: 5px;
}
.o-thumbnail img,
.thumbnail-bar img{
   display:block;
   vertical-align: middle;
   margin: 0 auto;
}
.thumbnail-bar img{
   max-height:500px;
}
.o-thumbnail img{
   max-height: 292px;
}
.cover-bar{
   max-height: 500px;
}

.close{
   transition:opacity 0.3s ease-out;
   position:absolute;
   top:50%;left:50%;
   transform: translate(-50%, -50%);
   opacity:0;
}
.close button{
   color:rgba(255,255,255,0.7);
   font-weight: 600;
   font-size: 20px;
   background: rgba(0,0,0,0.3);
   border: 3px solid rgba(255,255,255,0.7);
   border-radius:5px;
}
.close button:hover{
   color:#fff;
   border: 3px solid rgba(255,255,255,0.8);
   background: rgba(0,0,0,0.5);
}
.upload-ct{
   cursor:pointer;
   color:rgba(0,0,0,0.3);
   padding: 95px 18px;
}
.map-bar{
   margin-top: 78px;
}

.am-form-group select,
.am-form-group textarea,
.am-form-group input:not([type=checkbox]){
   outline: none;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    font-size: 19px !important;
    line-height: 24px !important;
    letter-spacing: undefined !important;
    padding-top: undefined !important;
    padding-bottom: undefined !important;
    color: #484848 !important;
    font-weight: 300 !important;
    background-color: transparent !important;
    border-color:#dbdbdb;
    padding: 11px !important;
    width: 100% !important;
    border: 1px solid #aaa;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: #fff;
    color: #484848;
}

.am-form-field{
   height: 48px;
}
.am-form-group textarea:focus,
.am-form-group input:focus{
   outline: none;
   border-color:#666;
}
.exprice{
   position:absolute;
   right: 10px;
   font-size: 15px;
   font-weight: 400;
   color:#484848;
   top: 25%;
   user-select: none
}
</style>
