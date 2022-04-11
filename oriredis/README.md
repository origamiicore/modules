#Install
- origamicore [Doc](https://github.com/vahidHossaini/origami#readme)
#Config

	{
		connections:[
			{
				name:"",
				port:{port number},//if not exist 6379
				host:{host ip or address},//if not exist localhost
				db:{database number},//if not exist 0
			}
		]
	}

#Internal Services
	in all services if func is null return Promise
	
	global.redis		
		GetValue(context,key,isObject,func) 
		SetValue(context,key,value,func) 
		Exist(context,key,func)
		GetArray(context,key,from,to,func)	//get array by range
		RemoveUnique(context,key,value,func)	//remove element from unique array
		AddUnique(context,key,value,func)	//add unique value to array
		FindUniqueArray(context,key,value,func)		//value is array
		UniqueArrayLength(context,key,func)		//get length of unique array
		ArrayLength(context,key,func)		//get length of array
		AddToArray(context,key,index,value,force,func) //add value to array / index='start','end',{index int} / if force equal true then if key is not exist create key and add value
		Expire(context,key,value,func) //value is integer . secound
		Increment(context,key,value,func)
		