module.exports = class storageBootstrap{
  constructor(config)
  {
    this.funcs=[ 
      {
          name:'uploadStream',
          title1:'uploadStream',
          upload:{
            max: 1024*1024*20  
          }
      }, 
      {
          name:'download',
          title1:'download' 
      },
      {
          name:'downloadData',
          title1:'downloadData' 
      }, 
      {
          name:'downloadFile',
          title1:'downloadFile' 
      }, 
      {
          name:'downloadStreamFile',
          title1:'downloadStreamFile' 
      },
	  {
          name:'getViews',
          title1:'getViews' 
      },
	  {
          name:'localStream',
          title1:'localStream' 
      }, 
    ]
    this.auth=[ 
	    "uploadStream", 
      "download",
      "downloadData", 
      "downloadFile", 
      "downloadStreamFile"
    ]
  }
}