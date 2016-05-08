// Load the collection from .jason file for component setting .- done
// Take the config file in a variable. - done
// loop the variable to validate each  value. - done
// Based on sensor type  get the status of sensor. -done
// Export a method that can be used by booter to get the status. - done
// Send the jason data to Server - done.
var deviceManager = require('./DeviceManager.js');

var configuration = require('./Devices.json').devices;
var Location = require('./Location.json');
//console.log("Configuration loaded: "+ JSON.stringify(configuration));
module.exports = {
  currentDeviceState :function(){
  //  var config = require('./Devices.json').devices;
 var devices = configuration;

 console.log("Configuration loaded: "+ JSON.stringify(configuration) );

for(var devicekey in devices) {
  console.log("device selected : "+ JSON.stringify (devices[devicekey]));
       devices[devicekey] = deviceManager.CallDevice(devices[devicekey],callback);
        //configuration.D1.CurrentStatus='off';
     }
      Location.timestamp = (new Date()).getTime();
     Location.devices=configuration;
     return Location;
    },
   currentLocation : function (){
       Location.devices=configuration;
        return Location;
       }

}

// put or insert
//module.exports = currentLocation = {



//}
exports.deviceconfig = configuration;
