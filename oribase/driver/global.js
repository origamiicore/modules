

module.exports = class globalClass
{
	constructor()
	{
        global.ori={};
		global.ori.AddMin=function(time,min)
        {
            return time.getTime()+1000*60*min
        }
		global.ori.Random=function(min,max)
        {
            var r = Math.floor(Math.random() * (max - min + 1) + min); 
            return r
            
        }
		global.ori.RandomInt=function(n=5)
        {
            var str=''
            var sr='23456890'
            for(var a=0;a<n;a++)
            {
                var i=global.ori.Random(0,sr.length-1)
                str+=sr[i]
            }
            if(str[0]=='0')
                str='1'+str
            return parseInt(str)
        }
		global.ori.RandomText=function(n=5)
        {
            var str=''
            var sr='qwertyuiopasdfghjklzxcvbnm'
            for(var a=0;a<n;a++)
            {
                var i=global.ori.Random(0,sr.length-1)
                str+=sr[i]
            }
            if(str[0]=='0')
                str='1'+str
            return parseInt(str)
        }
        String.prototype.replaceAll = function(search, replacement) {
          var target = this;
          return target.replace(new RegExp(search, 'g'), replacement);
        };
        String.prototype.replaceAt=function(index, replacement) {
          return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
        }
	}
}