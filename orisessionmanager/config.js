module.exports = class defaultConfig
{
    constructor(config)
    { 
        this.config=config; 
    }
    getPackages()
    {
		var pgs={};
		for(var a of this.config.connections)
		{
			if(a.type=="jwt")
			{
				pgs["jsonwebtoken"]={name:"jsonwebtoken",version:"8.5.1"};
			}
		}
		var allPackages=[];
		for(var a in pgs)
		{
			allPackages.push(pgs[a]);
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
      return  {
		context:"",  
		attach:{  },
		 
      }
    }
}