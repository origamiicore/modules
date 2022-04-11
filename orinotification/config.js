module.exports = class defaultConfig
{
    constructor(config)
    { 
         this.config=config;
    }
    getPackages()
    {
      var pkgs={}
      for(var a of this.config.drivers)
      {
        if(a.type=='email')
        {
          pkgs["nodemailer"]="6.7.3";

        }
      }
      var allPackages=[{name:"uuid"}];
      for(var x in pkgs)
      {
         var a= pkgs[x]
         allPackages.push({name:x,version:a})
      }
      return allPackages;
    }
    getMessage()
    {
      return{
        default001:"user not exist", 
      }
    }
    getVersionedPackages()
    { 
      return []
    }
    getDefaultConfig()
    {
      return {
      context:"",  
      attach:{  },
		 
      }
    }
}