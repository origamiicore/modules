var structure=require('./struct.js')
var uuid=require('uuid')
module.exports = class blogService
{
  constructor(config,dist)
  {
    this.config=config.statics
    this.context=this.config.context
		this.bootstrap=require('./bootstrap.js')
		this.enums=require('./struct.js') 
		this.tempConfig=require('./config.js')
  }
  async getPosts(msg,func,self){
    var dt=msg.data
    try{
    var posts = await global.db.Search(self.context,'blogPost',{where:{$and:[
      {type:dt.type},
      {state:structure.states.published},
      {$or:[{publishTime:{$eq:null}},{publishTime:{$lte:new Date()}}]}, 
      {$or:[{expireTime:{$eq:null}},{expireTime:{$gte:new Date()}}]},  
    ]}},dt)}
    catch(exp){
      var a=0
    }
    return func(null,posts)
  }
  async getPost(msg,func,self){
    var dt=msg.data
    var post = await global.db.SearchOne(self.context,'blogPost',{where:{id:dt.id}})
    return func(null,post)
  }
  async savePost(msg,func,self){
    var dt=msg.data
    try{
      if(!dt.post.id)
        dt.post.id=uuid.v4()
      await global.db.Save(self.context,'blogPost',['id'],dt.post)
      return func(null,{i:true})
    }catch(exp){
      return func({m:'001'})
    }
    
  }
  async setPostState(msg,func,self){
    var dt=msg.data
    var post = await global.db.SearchOne(self.context,'blogPost',{where:{id:dt.id}})
    if(!post)
    {
      return func({m:'002'})
    }
    try{
      post.state=parseInt(dt.state)
      await global.db.Save(self.context,'blogPost',['id'],post)
      return func(null,{i:true})
    }catch(exp){
      return func({m:'001'})
    }
  }
  async viewCategory(msg,func,self){
    var baseData = await global.db.SearchOne(self.context,'baseData',{where:{name:'postCategory'}})
    if(!baseData)
      baseData={} 
    return func(null,baseData) 
  }
  async saveCategory(msg,func,self){
    try{

      await global.db.Save(self.context,'baseData',['name'],{name:'postCategory',data:msg.data.category})
      return func(null,{i:true})
    }catch(exp){
      return func({m:'003'})
    }
    
  }
  test(msg,func,self)
  {
    return func(null,{i:true})
  }
}