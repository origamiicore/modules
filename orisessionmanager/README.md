Config
	{
		connections:[
			{
				type:"", //jwt,redis,ram
				name:"", 
				timeout: {second},
				//if jwt
				data:{
					privateKey:"",
					publicKey:"",
					algorithm:""
				},
				//if redis add redis module
				data:{
					context:"redis name"
				}
			}
		]
	}
	
Intenal Service
	global.sessionManager
	
		set(contextName,key,value,func) //if func null return Promise
		get(contextName,key,func) //if func null return Promise
		
ExternalService
	no external service