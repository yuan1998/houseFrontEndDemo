
import cfg from '@/../cfg'



export default (url,data)=>{

   url = cfg.api_base_url + url

   data = data || {};

   return $.ajax({
      url: url,
      method:'post',
      data:data,
      headers: {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
         's_token':$.AMUI.utils.cookie.get('s_token')
      }
   }).then((res,textStatus,response)=>{
      let token =response.getResponseHeader('s_token');

      if(token)
         $.AMUI.utils.cookie.set('s_token',token);
      return res;

   })
   // return $.post(cfg.api_base_url+url,data);

}
