module.exports = class paymentBootstrap{
  constructor(config)
  {
    this.funcs=[
      {
          name:'register',
          title:'register' ,
          inputs:[
          {
              name:'phone',
              type:'string',
              nullable:false},
          {
              name:'captcha',
              type:'string',
              nullable:false},
          ]
      },
      {
          name:'verify',
          title:'verify' ,
          inputs:[
          {
              name:'code',
              type:'string',
              nullable:false},
          {
              name:'id',
              type:'string',
              nullable:false},
          ]
      },
      {
          name:'login',
          title:'login' ,
          inputs:[
          {
              name:'username',
              type:'string',
              nullable:false},
          {
              name:'password',
              type:'string',
              nullable:false}
          ]
      },
      {
          name:'logout',
          title:'logout'  
      },
      {
          name:'isLogin',
          title:'if login return {i:true}'  
      },
      {
          name:'existPassword',
          title:'existPassword'  
      },
      {
          name:'setPassword',
          title:'setPassword' ,
          inputs:[
          {
              name:'newPassword',
              type:'string',
              nullable:false}
          ]
      },
    ]
    this.auth=['register','verify','login',{name:'logout',role:'login'},{name:'isLogin',role:'login'},{name:'existPassword',role:'login'}]
     
  }
}