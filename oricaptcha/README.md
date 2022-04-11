
#Install
- origamicore [Doc](https://github.com/vahidHossaini/origami#readme)

#Config

        {
            driver:{
                name:"simple"
            }
        }
    
#Public Services

        get
        set
    
#Internal Services

        global.captcha.validate
        
        
#simple Driver

        oricaptcha/get                          //Response id {id,image{base64}}
        oricaptcha/set?id={id}&code={code}      //id requested from get
        global.captcha.validate(id)
        
#Sample 

- OrigamiSample [source code](https://github.com/vahidHossaini/origami-test/tree/master/captchatest)