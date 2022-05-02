var uuid=require("uuid");
var contexts={};
class SessionManagerRouting
{
	constructor(disc)
	{
		this.disc=disc
	}
	get(context,key,func)
	{  
		return this.disc.run('sessionmanager','getSession',{context,data:{key}},func);
	} 
	set(context,key,value,func)
	{  
		return this.disc.run('sessionmanager','setSession',{context,data:{key,value}},func);
	} 
}

module.exports = class defaultIndex
{
	constructor(config,dist)
	{
		this.config=config.statics
		this.bootstrap=require('./bootstrap.js')
		this.enums=require('./struct.js') 
		this.tempConfig=require('./config.js')
		for(var a of this.config.connections)
		{
			contexts[a.name]=new (require("./services/"+a.type+".js"))(a);
		}
		global.sessionManager = new SessionManagerRouting(dist);
		
	}
	async setSession(msg,func,self)
	{
		var dt=msg.data;
		var context=msg.context;
		if(!contexts[context])
			return func({m:"sessionManager001"});
		var resp = await contexts[context].set(dt.key,dt.value);
		
		return func(null,resp);
	}
	async getSession(msg,func,self)
	{
		var dt=msg.data;
		var context=msg.context;
		if(!contexts[context])
			return func({m:"sessionManager001"});
		var resp = await contexts[context].get(dt.key);
		
		return func(null,resp);
	}
}