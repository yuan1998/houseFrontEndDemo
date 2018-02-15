
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
         'STOKEN':$.AMUI.utils.cookie.get('STOKEN')
      }
   }).then((res,textStatus,response)=>{
      let token =response.getResponseHeader('STOKEN');

      if(token)
         $.AMUI.utils.cookie.set('STOKEN',token);
      return res;

   })
   // return $.post(cfg.api_base_url+url,data);

}
