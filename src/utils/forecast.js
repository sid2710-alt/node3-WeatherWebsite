const request = require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&units=metric&appid=ccb42608b9a3f56254657c620620472f'
    request ({url,json:true},(error,{body})=>
 {
     if(error)
     {
         callback('Unable to connect',undefined)
     }
     else if(body.error)
     {
         callback('Unable to find location',undefined)
     }
     else
     {
        callback(undefined,'Current temperature is ' +body.main.temp +' and humidity is '+ body.main.humidity + ' and weather is ' + body.weather[0].description)
     }
     //const data=JSON.parse(response.body)

 })
}
//callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
module.exports=forecast
// const url='http://api.openweathermap.org/data/2.5/weather?lat=28.644800&lon=77.216721&appid=ccb42608b9a3f56254657c620620472f'
//  request ({url:url,json:true},(error,response)=>
//  {
//      if(error)
//      {
//          console.log('Unable to connect')
//      }
//      else if(response.body.error)
//      {
//          console.log('Unable to find location')
//      }
//      else
//      {
//         console.log(response.body.weather[0].description )
//      }
//      //const data=JSON.parse(response.body)

//  })