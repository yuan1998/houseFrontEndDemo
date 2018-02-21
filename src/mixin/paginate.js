import sender from '@/Sender.js'

export default{
    data(){
        return {
            _page:1,
            _lastPage:0,
            _total:0,
            _list:[],
            _url:'',
            _params:{},
        }
    },
    mounted(){

    },
    methods:{
        _getPageData(url,params,callback){
            if(!params || params == false)
                params = this.$data._params;

            this.$data._params = Object.assign({},params,{page:this.$data._page});

            this.$data._url = url || this.$data._url;

            if(!this.$data._url)
                return;

            return sender(this.$data._url,this.$data._params).then(res=>{

                this.$data._list = res.data.data;
                this.$data._lastPage = res.data.last_page;
                this.$data._total = res.data.total;
                if(callback instanceof Function)
                    callback();
            })
        },
        _changePage(n){
            this.$data._page = n;
            this._getPageData();
            this._scrollToPage(0);
            if(this.onPageChange instanceof Function)
                this.onPageChange();

        }
    },
    computed:{
        _getPage(){
            return this.$data._page;
        },
        _getListData(){
            return this.$data._list;
        }
    }
}
