var uuid=require("uuid");
module.exports = class defaultIndex
{
	constructor(config,dist)
	{
		this.config=config.statics
		this.context=this.config.context  
		this.bootstrap=require('./bootstrap.js')
		this.enums=require('./struct.js') 
		this.tempConfig=require('./config.js')
		for(var a of this.config.drivers)
		{
			 new (require('./driver/'+a.name+'.js'))(a)
		}
	} 
}