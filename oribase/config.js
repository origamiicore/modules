module.exports = class defaultConfig
{
    constructor(config)
    { 
        this.config=config
    }
    getPackages()
    {
       var l= [{name:"uuid"}]
       if(this.config.drivers)
            for(var a of this.config.drivers)
            {
                if(a.name=="web")
                {
                    l.push({name:'request'})
                    l.push({name:'querystring'})
                }
            }
       return l;
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
      return{
		drivers:[
			{name:"global"}
		]
		 
      }
    }
}