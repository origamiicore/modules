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
      var now=new Date().getTime();
    var posts = await global.db.Search(self.context,'blog_post',{
      select:['_id','image','title','brief','badge','category','time','writer'],
      where:{$and:[
      //{type:dt.type},
      {state:structure.states.published},
      {$or:[{publishTime:{$eq:null}},{publishTime:{$lte:now}}]}, 
      {$or:[{expireTime:{$eq:null}},{expireTime:{$gte:now}}]},  
    ]}},dt)}
    catch(exp){
      var a=0
    }
    return func(null,posts)
  }
  async getPost(msg,func,self){
    var dt=msg.data
    var post = await global.db.SearchOne(self.context,'blog_post',{where:{id:dt._id}})
    return func(null,post)
  }
  async savePost(msg,func,self){
    var dt=msg.data
    try{
      if(!dt.post._id)
        dt.post._id=uuid.v4()
      await global.db.Save(self.context,'blog_post',['_id'],dt.post)
      return func(null,{i:true})
    }catch(exp){
      return func({m:'001'})
    }
    
  }
  async setPostState(msg,func,self){
    var dt=msg.data
    var post = await global.db.SearchOne(self.context,'blog_post',{where:{_id:dt._id}})
    if(!post)
    {
      return func({m:'002'})
    }
    try{
      post.state=parseInt(dt.state)
      await global.db.Save(self.context,'blog_post',['_id'],post)
      return func(null,{i:true})
    }catch(exp){
      return func({m:'001'})
    }
  }
  async getBadge(msg,func,self){
    var baseData = await global.db.Search(self.context,'blog_badge',{}); 
    return func(null,baseData) 
  }
  async viewCategory(msg,func,self){
    var baseData = await global.db.Search(self.context,'blog_category',{where:{active:true}}); 
    return func(null,baseData) 
  }
  async viewCategoryPost(msg,func,self){
    var baseData = await global.db.Search(self.context,'blog_category',{where:{active:true}}); 
    
    var now=new Date().getTime();
    try{
      var posts = await global.db.Search(self.context,'blog_post',{
        select:[
          'category',
          {type:'function',name:'count',field:'_id',title:'total'}
        ],
        order:[['total','desc']],
        where:{$and:[
          // {type:dt.type},
          {state:structure.states.published},
          {$or:[{publishTime:{$eq:null}},{publishTime:{$lte:now}}]}, 
          {$or:[{expireTime:{$eq:null}},{expireTime:{$gte:now}}]},  
        ]}
      });
      for(var a of baseData.value )
      {
        var post=posts.value.filter(p=>p.category==a._id)[0];
        if(post)
        {
          a.count=post.total;
        }
        else
        {
          a.count=0;
        }
      }
    }catch(exp){
      var xx=0;

    }
    return func(null,baseData) 
  }
  async saveCategory(msg,func,self){
    try{
      await global.db.Save(self.context,'blog_category',['_id'],msg.data.category)
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