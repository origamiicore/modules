module.exports = class paymentConfig
{
    constructor(config)
    { 
         
    }
    getPackages()
    {
       return [
	   {name:"eval",version:"0.1.8"},
	   {name:"uuid"},
	   ]
    }
    
    getVersionedPackages()
    { 
      return []
    }
}