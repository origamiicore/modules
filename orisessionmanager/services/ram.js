var session={}
module.exports =class ramSession
{
	constructor(config)
	{
		this.context=config.data.context 
	}
	async set(key,value)
	{ 
		try{
			session[key]={value}
		}catch(exp)
		{
			console.log(exp)
		} 
        return key;
	}
	async get(key)
	{ 
        return session[key];      
	}
}