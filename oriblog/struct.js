module.exports={
  blogPost:{
    struct:{
      title:{type:'string',nullable:false},
      brief:{type:'string',nullable:false},
      fullText:{type:'string',nullable:false},
      state:{type:'number',nullable:false},
      publishTime:{type:'date',nullable:true},
      expireTime:{type:'date',nullable:true},
      tag:{type:'string',isArray:true,nullable:true},
      type:{type:'string',nullable:false}
    }
    
  },
  blogCategory:{
    struct:{
      title:{type:'string',nullable:false},
      id:{type:'number'}, 
    }
   
  },
  states:{ 
      published:0x00000001,
      archive:0x00000002, 
    
  },
}