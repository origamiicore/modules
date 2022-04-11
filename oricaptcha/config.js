module.exports = class captchaConfig
{
    constructor(config)
    { 
         this.config=config
    }
    getPackages()
    {
        console.log(this.config);
        if(!this.config.driver)return[];
        var pks=[]
        if(this.config.driver.name=="simple")
        {
            pks.push({name:'captchapng'})
            pks.push({name:'uuid'})
        }
       return pks
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
            		 
      }
    }
}