var uuid=require('uuid')
var errs=require('./errors.js')
var md5 = require('md5');
module.exports = class smsAuthConfig
{
  constructor(config,dist)
  {
		this.bootstrap=require('./bootstrap.js')
		this.enums=require('./struct.js') 
		this.tempConfig=require('./config.js')
		
	this.dist=dist
    this.config=config.statics
    this.context=this.config.context 
    this.rcontext=this.config.rcontext 
    if(!this.context)
        console.log('Warning : context not exist') 
  }
  getDefaultUser()
  {
      return {
              registeredPhone:'', 
              isActive:true, 
              _id:uuid.v4() 
          }
  }
  async verify(msg,func,self)
  {
      var dt=msg.data
	  
      var code = await global.redis.GetValue(self.rcontext,dt.id,true);
      if(!code)
	  {
          return func({m:errs.expireCode})
	  }
      if(code.lockTime && code.lockTime>new Date())
          return func({m:errs.lock})
      if(code.code!=dt.code)
      {
          var count=code.count++
          if(count>self.config.tryVerify)
          {
			await global.redis.Expire(self.rcontext,dt.id,self.config.lockTimeout*60);
			code.lockTime=global.ori.AddMin(new Date(),self.config.lockTimeout); 
          }
		  await global.redis.SetValue(self.rcontext,dt.id,code);
          return func({m:errs.wrongCode})
      }
      var user=await global.db.SearchOne(self.context,'smsUsers',{where:{registeredPhone:code.phone}},{}) 
      if(!user)
      { 
          user=self.getDefaultUser()
          user.registeredPhone = code.phone;
          await global.db.Save(self.context,'smsUsers',['id'],user) 
      }  
      return func(null,{session:
      [
          {name:'userid',value:user._id}, 
          
      ]})
  }
  async register(msg,func,self)
  {
      var dt=msg.data
       
	  var validCaptcha = await global.captcha.validate(dt.captcha)
      if(!validCaptcha)
      {
        return func({m:errs.wrongCaptcha})  

      }
      if( dt.phone.length!=12 || dt.phone.substr(0,2)!='98' )
          return func({m:errs.wrongPhone})
      for(var a=0;a<dt.phone.length;a++)
      {
          var c=dt.phone[a]
          if(c<'0' || c>'9')
              return func({m:errs.wrongPhone})                
      }
      var code=global.ori.RandomInt(4)
      console.log('random',code)
	  var id=uuid.v4();
      await global.redis.SetValue(self.rcontext,id,{code,phone:dt.phone});
      await global.redis.Expire(self.rcontext,id,120);
      global.notification.send(self.config.notifyContext,self.config.notifyTemplate,{code:code,to:dt.phone},()=>{
          return func(null,{ 
			  id,
			  phoneNumber:dt.phone,
			  count:0
			  })
      })
  }
  async existPassword(msg,func,self)
  {
      var session=msg.session;
      var user=await global.db.SearchOne(self.context,'smsUsers',{where:{_id:session.userid}},{}) 
      if(!user) return func({m:''})
      func(null,{exist:!!user.password})

  }
  async setPassword(msg,func,self)
  {
    var session=msg.session;
    var dt=msg.data;
    var user=await global.db.SearchOne(self.context,'smsUsers',{where:{_id:session.userid}},{}) 
    if(!user) return func({m:''})

    if(user.password)
    {
        if(md5(dt.password)!=user.password)
        {
            return func({m:'wrong password'})
        }
    }
    user.password=md5(dt.newPassword)
    await global.db.Save(self.context,'smsUsers',['id'],user) 
    func(null,{})
  }
  async login(msg,func,self)
  {
    var dt=msg.data;
    var user=await global.db.SearchOne(self.context,'smsUsers',{where:{
        registeredPhone:dt.username
    }},{}) 
    if(user && user.lock && user.lock>new Date().getTime())
    {
        return func({m:errs.lock})
        
    }
    if(user && user.password==md5(dt.password))
    {
        return func(null,{session:
        [
            {name:'userid',value:user._id},  
        ]});
    }
    if(user)
    { 
        if(!user.wrongPassword)user.wrongPassword=0;
        if(user.wrongPassword>self.config.tryVerify)
        {
            await global.db.Save(self.context,'smsUsers',['id'],{
                _id:user._id,
                lock:global.ori.AddMin(new Date(),self.config.lockTimeout)}) 
                
        }
        user.wrongPassword++;
        await global.db.Save(self.context,'smsUsers',['id'],{
            _id:user._id,
            wrongPassword:user.wrongPassword}) 

    }
    func({m:errs.wrongToken})
  }
  async isLogin(msg,func,self)
  {
      if(msg.session?.userid)
      return func(null,{isDone:true})
      func({m:''})
  }
  async removeToken(msg,func,self)
  {

  }
  async logout(msg,func,self)
  { 
      return func (null,{session:[{name:'userid',value:null},{name:'token',value:null},{name:'roles',value:null}],i:true}) 
      
  } 
}