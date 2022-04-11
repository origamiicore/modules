module.exports = class smsAuthConfig
{
    constructor(config)
    { 
         this.config=config
    }
    getPackages()
    {
      var allPackages=[{name:"md5",version:'2.3.0'}];
       return allPackages
    }
    geInternaltPackages()
    {
       return ['account']
    }
    
    getVersionedPackages()
    { 
      return []
    }

    getVersion()
    {
      return '0.0.1'
    }
    getDefaultConfig()
    {
      return {
        context:'default',
        tryVerify:3,//number of try
        lockTimeout:10,//awat n min when locked 
        notifyContext:'sms',//notificationName
        notifyTemplate:'registerSms',//notification template name
        defaultAuthorization:[]
      }
    }
}