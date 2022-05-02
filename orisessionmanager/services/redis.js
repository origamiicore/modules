
module.exports =class redisSession
{
	constructor(config)
	{
		this.context=config.data.context 
	}
	async set(key,value)
	{ 
		try{
			await global.redis.SetValue(this.context,key,value) 
		}catch(exp)
		{
			console.log(exp)
		} 
        return key;
	}
	async get(key)
	{ 
        return await global.redis.GetValue(this.context,key,true);        
	}
}