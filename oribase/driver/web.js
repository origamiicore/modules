var request = require('request');
var querystring = require('querystring');
module.exports = class web
{
    constructor()
    { 
        global.web=this
    } 
    getData(url,data,header,func)
    {
        if(url.indexOf('?')==-1 && data)
        {
            url+="?"
        }
        if(data)
            for(var a in data)
            {
                url+="&"+a+'='+data[a];
            }
        var options = { method: 'GET',
            url: url, 
            json: true };
        if(header)
            options.headers=header;
        if(func)
        {
            request(options, function (error, response, body) {
                
                func(error,JSON.parse(body))
            })            
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) { 
                    if(error)
                        return reject(error)
                    return resolve(JSON.parse(body))
                }) 
            })
        }
    }
    get(url,data,header,func)
    {
        if(url.indexOf('?')==-1 && data)
        {
            url+="?"
        }
        if(data)
            for(var a in data)
            {
                url+="&"+a+'='+data[a];
            }
        var options = { method: 'GET',
            url: url, 
            json: true };
        if(header)
            options.headers=header;
        if(func)
        {
            request(options, function (error, response, body) {
                
                func(error,body)
            })            
        }
        else
        {
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) { 
                    if(error)
                        return reject(error)
                    return resolve(body)
                }) 
            })
        }
    }
    postData(url,data,header,func)    
    {
        var options = { method: 'POST',
            url: url,
            body:data,
            json: true };
        if(header)
            options.headers=header;
            //console.log(options)
        if(func)
        {
            request(options, function (error, response, body) {
                //if (error) throw new Error(error);
              
                func(error,JSON.parse(body))
              });
                       
        }
        else
        {
            console.log(options)
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) {
                    if (error) return reject(error);
                  
                    return resolve(JSON.parse(body))
                  });
               
            })
        }        
    }
    postForm(url,data,header,func)  
    {
        
        var formData = querystring.stringify(data);
        var contentLength = formData.length;
        var headers= {
              'Content-Length': contentLength,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        if(header)
            for(var a in header)
                 headers[a]=header[a]
        console.log('post------------>',headers)     
        if(func)
        { 
          request({
            headers:headers,
            uri: url,
            body: formData,
            method: 'POST'
          }, function (err, res, body) {
            //it works!
                func(err,body)
          });
                       
        }
        else
        { 
            return new Promise(function (resolve, reject) {
                
                  request({
                    headers:headers,
                    uri: url,
                    body: formData,
                    method: 'POST'
                  }, function (err, res, body) {
                    //it works!
                    if (err) return reject(err);
                  
                    return resolve(body)
                  }); 
               
            })
        }        
           
    }
    post(url,data,header,func)    
    {
        var options = { method: 'POST',
            url: url,
            body:data,
            json: true };
        if(header)
            options.headers=header;
            //console.log(options)
        if(func)
        {
            request(options, function (error, response, body) {
                //if (error) throw new Error(error);
              
                func(error,body)
              });
                       
        }
        else
        {
            console.log(options)
            return new Promise(function (resolve, reject) {
                request(options, function (error, response, body) {
                    if (error) return reject(error);
                  
                    return resolve(body)
                  });
               
            })
        }        
    }
}