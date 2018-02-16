import sender from '@/Sender.js'


export default{
   methods:{
      _logout(){
        sender('/api/user/logout').then(res=>{
           this.$store.dispatch('logout');
           this.$router.push({path:'/'});
        })
      },
   },
   computed:{
      _getUser(){
         if(!this._isLogin)
            return;

         return this.$store.getters['user/user'];
      },
      _getUsername(){
         if(!this._isLogin)
            return;

         return this._getUser.username;
      },
      _getPermission(){
         if(!this._isLogin)
            return;
         return this._getUser.permission;
      },
      _isAdmin(){
         return (this._getPermission > 3);
      },
      _isLogin(){
         let user =this.$store.getters['user/user']
         return (user && user != false);
      },
      _getAvatar(){
         if(!this._isLogin)
            return;

         return   (!this._getUser.avatar_url || this._getUser.avatar_url ==false)
                  ? require('@/../storage/notAvatar.png')
                  : this._getUser.avatar_url.get;
      },
      _unreadUserCount(){
         if(!this._isLogin)
            return;

         return this.$store.getters['message/userMessageCount'];
      },
      _unreadSystemCount(){

         if(!this._isLogin)
            return;

         return this.$store.getters['message/webMessageCount'];
      },

   }
}

