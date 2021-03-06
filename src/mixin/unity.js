

export default{
   data(){
      return {

         _body:null,
         _html:null,
      }
   },
   mounted(){

      this._body = document.body;
      this._html = document.documentElement;
   },
   methods:{
      _scrollToPage(position){
         this.$store.dispatch('windowScroll',position);
      },
      _bodyAddClass(cls){

         this._body.classList.add(cls);
         this._html.classList.add(cls);
      },
      _bodyRemoveClass(cls){
         this._body.classList.remove(cls);
         this._html.classList.remove(cls);
      },
      _elToTopHeight(el){
         return $(el).offset().top;
      }
   },
   computed:{
      _getCity(){
         let city = this.$store.getters['getIpCity'];

         return  (!city || city == false)
                  ? '未知'
                  : city;
      }
   }
}
