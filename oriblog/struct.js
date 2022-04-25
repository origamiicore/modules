module.exports={
  blogPost:{
    struct:{
      _id:{type:'string',nullable:true},
      title:{type:'string',nullable:false},
      image:{type:'string',nullable:false},
      brief:{type:'string',nullable:false},
      fullText:{type:'string',nullable:false},
      state:{type:'number',nullable:false},
      category:{type:'number',nullable:false},
      publishTime:{type:'number',nullable:true},
      expireTime:{type:'number',nullable:true},
      tag:{type:'string',isArray:true,nullable:true},
      type:{type:'string',nullable:false}
    }
    
  },
  blogCategory:{
    struct:{
      active:{type:'bool',nullable:false},
      title:{type:'string',nullable:false},
      _id:{type:'number'}, 
    }
   
  },
  states:{ 
      published:0x00000001,
      archive:0x00000002, 
    
  },
}