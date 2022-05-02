var jwt = require('jsonwebtoken');
module.exports =class jwtSession
{
	constructor(config)
	{
		this.privateKey=config.data.privateKey
		this.algorithm=config.data.algorithm
		this.publicKey=config.data.publicKey
		//console.log('^^^^^^^^^^^^^^^^^',config)
	}
	async set(key,value)
	{ 
        var resp="";
		try{
			
			resp=jwt.sign(value, this.privateKey, { algorithm: this.algorithm});
		}catch(exp)
		{
			console.log(exp)
		}
        
        return resp;
	}
	async get(key)
	{ 
        var self=this;
        return new Promise((res,rej)=>{
            jwt.verify(key,self.publicKey,function(err, decoded){
                if(!err)
                {
                    return res(decoded)
                } 
                else 
                    return res({})
            });
        })
        
	}
}