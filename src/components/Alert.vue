<template>
 <transition>
    <div class="alertBar">
      <button type="button" id='alertBtn' data-am-modal="{target: '#my-alert'}" style="display:none;"></button>
      <div class="am-modal am-modal-no-btn" tabindex="-1" id="my-alert">
         <div class="am-modal-dialog">
            <div class="am-modal-hd">{{msg.title}}
               <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
            </div>
            <div class="am-modal-bd">
               {{msg.content}}
            </div>
         </div>
      </div>
   </div>
 </transition>
</template>


