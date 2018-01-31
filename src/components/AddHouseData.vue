<template>
   <transition >
      <div class="content" v-show="start" style="padding-top: 50px;">
         <div class="am-progress am-progress-xs" data-am-sticky="{top:60}">
            <div class="am-progress-bar" :style="{width:Math.ceil((100 / 9) * page) +'%'}"></div>
         </div>
         <div class="am-container">
            <div class="">
               <form @submit.prevent class="am-form" style="min-width: 400px;">
                  <div class="back-btn" v-show="page<9" style="height: 60px;background: #fff;" data-am-sticky>
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
                                                   <div class="am-input-group">
                                                      <input class="am-form-field" :placeholder="'大厅'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.hall['hall_'+n]['arae']">
                                                      <span style="background: rgba(0,0,0,0);" class="am-input-group-label">m²</span>
                                                   </div>
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
                                                   <div class="am-input-group">
                                                      <input class="am-form-field" :placeholder="'卧室'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.bedroom['bedroom_'+n]['arae']">
                                                      <span style="background: rgba(0,0,0,0);" class="am-input-group-label">m²</span>
                                                   </div>
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
                                                   <div class="am-input-group">
                                                      <input class="am-form-field" :placeholder="'卫生间'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.bathroom['bathroom_'+n]['arae']">
                                                      <span style="background: rgba(0,0,0,0);" class="am-input-group-label">m²</span>
                                                   </div>
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
                                                   <div class="am-input-group">
                                                      <input class="am-form-field" :placeholder="'阳台'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.balcony['balcony_'+n]['arae']">
                                                      <span style="background: rgba(0,0,0,0);" class="am-input-group-label">m²</span>
                                                   </div>
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
                                                   <div class="am-input-group">
                                                      <input class="am-form-field" :placeholder="'厨房'+n+'的面积'" type="number" v-model.number="formData.huxing_map_info.kitchen['kitchen_'+n]['arae']">
                                                      <span style="background: rgba(0,0,0,0);" class="am-input-group-label">m²</span>
                                                   </div>
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
                  <div v-else-if="page == 4" class="page-4">
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
                                                      <div class="am-g " style="max-height: 500px;position:relative;display:inline-block" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive" style="" :src="formData.house_img.cover[0]">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.cover,0)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-else @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.cover)" class="am-panel-bd upload-bar">
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
                                       <div class="am-margin-top am-g" v-show="formData.room_count.hall >0">
                                          <div>
                                             <div class="am-text-center">
                                                <span class="am-text-xxl am-block">上传一些关于大厅的照片</span>
                                                <small>最多4张照片，请选择能表现房间整体构造和装饰的图片</small>
                                             </div>
                                          </div>
                                          <div>
                                             <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                <div class="am-g">
                                                   <div v-show="formData.house_img.hall != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.hall">
                                                      <div class="o-thumbnail am-vertical-align" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive am-vertical-align-middle am-inline-block" :src="item">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.hall,index)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-show="formData.house_img.hall.length <4" @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.hall)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                      <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                         <div class="am-vertical-align-middle">
                                                            <label class="">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <span class="">点击上传</span>
                                                               </div>
                                                               <input @change="upload($event,formData.house_img.hall)" accept="image/*" type="file" multiple style="display:  none;">
                                                            </label>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="am-margin-top-lg am-g" v-show="formData.room_count.bedroom >0">
                                          <div>
                                             <div class="am-text-center">
                                                <span class="am-text-xxl am-block">上传一些关于卧室的照片</span>
                                                <small>最多4张照片，请选择能表现房间整体构造和装饰的图片</small>
                                             </div>
                                          </div>
                                          <div>
                                             <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                <div class="am-g">
                                                   <div v-show="formData.house_img.bedroom != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.bedroom">
                                                      <div class="o-thumbnail am-vertical-align" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive am-vertical-align-middle am-inline-block" :src="item">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.bedroom,index)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-show="formData.house_img.bedroom.length <4" @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.bedroom)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                      <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                         <div class="am-vertical-align-middle">
                                                            <label class="">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <span class="">点击上传</span>
                                                               </div>
                                                               <input @change="upload($event,formData.house_img.bedroom)" accept="image/*" type="file" multiple style="display:  none;">
                                                            </label>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="am-margin-top-lg am-g" v-show="formData.room_count.bathroom >0">
                                          <div>
                                             <div class="am-text-center">
                                                <span class="am-text-xxl am-block">上传一些关于卫生间的照片</span>
                                                <small>最多4张照片，请选择能表现房间整体构造和装饰的图片</small>
                                             </div>
                                          </div>
                                          <div>
                                             <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                <div class="am-g">
                                                   <div v-show="formData.house_img.bathroom != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.bathroom">
                                                      <div class="o-thumbnail am-vertical-align" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive am-vertical-align-middle am-inline-block" :src="item">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.bathroom,index)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-show="formData.house_img.bathroom.length <4" @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.bathroom)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                      <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                         <div class="am-vertical-align-middle">
                                                            <label class="">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <span class="">点击上传</span>
                                                               </div>
                                                               <input @change="upload($event,formData.house_img.bathroom)" accept="image/*" type="file" multiple style="display:  none;">
                                                            </label>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="am-margin-top-lg am-g" v-show="formData.room_count.balcony >0">
                                          <div>
                                             <div class="am-text-center">
                                                <span class="am-text-xxl am-block">上传一些关于阳台的照片</span>
                                                <small>最多4张照片，请选择能表现房间整体构造和装饰的图片</small>

                                             </div>
                                          </div>
                                          <div>
                                             <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                <div class="am-g">
                                                   <div v-show="formData.house_img.balcony != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.balcony">
                                                      <div class="o-thumbnail am-vertical-align" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive am-vertical-align-middle am-inline-block" :src="item">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.balcony,index)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-show="formData.house_img.balcony.length <4" @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.balcony)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                      <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                         <div class="am-vertical-align-middle">
                                                            <label class="">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <span class="">点击上传</span>
                                                               </div>
                                                               <input @change="upload($event,formData.house_img.balcony)" accept="image/*" type="file" multiple style="display:  none;">
                                                            </label>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div class="am-margin-top-lg am-g" v-show="formData.room_count.kitchen >0">
                                          <div>
                                             <div class="am-text-center">
                                                <span class="am-text-xxl am-block">上传一些关于厨房的照片</span>
                                                <small>最多4张照片，请选择能表现房间整体构造和装饰的图片</small>

                                             </div>
                                          </div>
                                          <div>
                                             <div class="am-u-md-11 am-u-lg-12 am-cf am-u-sm-centered">
                                                <div class="am-g">
                                                   <div v-show="formData.house_img.kitchen != false" class="am-u-lg-3 am-u-md-6" v-for="(item,index) in formData.house_img.kitchen">
                                                      <div class="o-thumbnail am-vertical-align" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                         <img class="am-radius am-img-responsive am-vertical-align-middle am-inline-block" :src="item">
                                                         <span class="close">
                                                            <button @click="removeIndex(formData.house_img.kitchen,index)" type="button" class="am-btn">删除图片</button>
                                                         </span>
                                                      </div>
                                                   </div>
                                                   <div v-show="formData.house_img.kitchen.length <4" @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.house_img.kitchen)" class="am-u-lg-3 am-u-md-6 am-u-end  ">
                                                      <div class=" am-u-sm-12 o-upload-bar am-vertical-align am-text-center">
                                                         <div class="am-vertical-align-middle">
                                                            <label class="">
                                                               <div class="am-text-center upload-ct">
                                                                  <div><i class="am-icon-plus am-icon-lg"></i></div>
                                                                  <span class="">点击上传</span>
                                                               </div>
                                                               <input @change="upload($event,formData.house_img.kitchen)" accept="image/*" type="file" multiple style="display:  none;">
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
                  <div v-else-if="page == 6" class="page-6 ">
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
                  <div v-else-if="page == 7" class="page-7 ">
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
                                          <div class="am-text-center">
                                             <span class="am-text-xl am-block">请上传房产证明</span>
                                             <small>该属于私密资料，不会被公开，不到交易的最后将不会有人知道.</small>
                                          </div>
                                       </div>
                                       <div>
                                          <div class="am-u-md-11 am-u-lg-10 am-u-sm-centered">
                                             <div class="am-panel am-g">
                                                <div class="am-panel-bd am-text-center am-g thumbnail-bar am-cf cover-bar" v-if="formData.deed_info != false">
                                                   <div class="am-g " style="max-height: 500px;position:relative;display:inline-block" @mouseenter="closeBtnOn" @mouseleave="closeBtnOff">
                                                      <img class="am-radius am-img-responsive" style="" :src="formData.deed_info[0]">
                                                      <span class="close">
                                                         <button @click="removeIndex(formData.deed_info,0)" type="button" class="am-btn">删除图片</button>
                                                      </span>
                                                   </div>
                                                </div>
                                                <div v-else @dragenter="dragenter" @dragover="dragover" @drop="upload($event,formData.deed_info)" class="am-panel-bd upload-bar">
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
                  <div v-else-if="page == 8" class="page-8">
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
                  <div v-else-if="page == 9" class="page-9">
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
   </transition>
</template>

<script>
import sender from '@/Sender.js'

export default {
   props:['id'],
   data(){
      let that = this;
      return {
         start:false,
         data:{},
         formData:{
            commissioned_id:that.id,
            floor:'',
            huxing_map_info:{
               hall:{},
               bedroom:{},
               bathroom:{},
               balcony:{},
               kitchen:{}
            },
            room_count:{hall:1,bedroom:1,bathroom:2,balcony:1,kitchen:1},
            house_img:{hall:[],bedroom:[],bathroom:[],balcony:[],kitchen:[],cover:[]},
            direction:"",
            Decoration:'',
            supply_heating:'',
            negative_floor:0,
            elevator:'',
            deed_info:[],
            agree:false
         },
         page:0,
         fu:{status:false,num:0},
         pageValidate:true,
         submit:false,
      }
   },
   mounted:function(){
      this.getHouse();
   },
   methods:{
      getHouse(){
         sender('/api/commissioned/readId',{id:this.id}).then(res=>{
            this.data = res.data;
            this.start = true;
            this.page = 1;
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
         this.$store.dispatch('readerFile',{file:files[0],arr});
      },
      removeIndex(arr,index){
         arr.splice(index,1);
      },
      labelClick(e){
         e.target.parentNode.click();
      },
      dragover(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
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
         console.log(this.page);
         if(this.page == 8){
            this.submitFormData();
         }else this.page++;

      },
      nextValidator(){
         if(this.page >=9)
            return;
         return this['page'+this.page+'Validator']();
      },
      page1Validator(){
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
               console.log(data[items][key],data[items])
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

         let data = this.formData.house_img.cover[0];

         return data ? true :false;
      },
      page5Validator(){

         let form = this.formData,
             data = form.house_img,
             count = form.room_count,
             arr =['hall' ,
             'bedroom' ,
             'bathroom' ,
             'balcony' ,
             'kitchen'];

         for(let item of arr){
            if(count[item] > 0 && !data[item][0])
               return false;
         }

         return true;
      },
      page6Validator(){

         let data = this.formData,
             surroundings = data.surroundings,
             community_info = data.community_info,
             traffic = data.traffic;

         if(!traffic||!community_info||!surroundings)
            return false;

         return true;

      },
      page7Validator(){

         let data = this.formData.deed_info[0];

         return data ? true :false;

      },
      page8Validator(){
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
      }
   },
   computed:{
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
   font-weight: 500;
   font-size: 24px;
}
.o-thumbnail,
.o-upload-bar,
.thumbnail-bar,
.upload-bar{
   border: 3px dashed rgba(0,0,0,0.1);
   border-radius:5px;
   margin-top: 30px;
}
.o-thumbnail,
.thumbnail-bar,
.upload-bar{
   margin-top: 30px;
}

.upload-bar{
   padding-top: 80px;
   padding-bottom: 70px;
   border-radius:3px;
}
.o-thumbnail,
.o-upload-bar{
   height: 300px;
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
   max-width: 100%;
   vertical-align: middle;
   margin: 0 auto;
}
.thumbnail-bar img{
   max-height:500px;
}
.o-thumbnail img{
   max-height: 292px;
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
</style>
