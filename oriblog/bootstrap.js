module.exports = class blogBootstrap{
    constructor(config)
    {
      this.funcs=[
        {
            name:'getPosts',
            title:'get post by odata' ,
          //   inputs:[
          //   {
          //       name:'type',
          //       type:'string',
          //       nullable:false}
          //   ]
        },
        {
            name:'getPost',
            title:'get single post'  ,
            inputs:[
            {
                name:'id',
                type:'string',
                nullable:false}
            ]
        },
        {
            name:'savePost',
            title:'create or edit post'  ,
            inputs:[
            {
                name:'post',
                type:'blogPost',
                nullable:false}
            ]
        },
        {
            name:'setPostState',
            title:'set state like publish archive and ...'  ,
            inputs:[
            {
                name:'id',
                type:'string',
                nullable:false},
            {
                name:'state',
                type:'number',
                nullable:false}
            ]
        },
        {
            name:'viewCategory',
            title:'view category' 
        },
        {
            name:'getBadge',
            title:'get badge' 
        },
        {
            name:'viewCategoryPost',
            title:'get badge' 
        },
        {
            name:'saveCategory',
            title:'save category'  ,
            inputs:[
            {
                name:'category',
                type:'blogCategory',
                nullable:false}
            ]
        },
      ]
      this.auth=['test','viewCategory','getPosts','getPost','getBadge','viewCategoryPost']
      let authz=config.authz
      if(authz && authz.length)
      {
          for(var a of authz)
          {
              this.auth.push(a)
          }
      } 
    }
  }