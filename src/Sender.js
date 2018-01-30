import cfg from '@/../cfg'

export default (url,data)=>{

   data = data || {};

   return $.post(cfg.api_base_url+url,data);

}
