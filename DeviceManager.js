
var vibrationDeviceDriver = require('./vibrationDDriver.js');
var biometricDeviceDriver = require('./biometricDDriver.js');
var temperatureDeviceDriver = require('./temperatureDDriver.js');
module.exports =
{
    CallDevice: function(device,callback){
        console.log('Device passed to device manager' + JSON.stringify(device));
    // pass the  device Json
    switch(device.DeviceType){
    case 'vibration' :
                        // Call vibration device driver
                      device=vibrationDeviceDriver.ProcessDevice(device,callback);
                       // device.CurrentStatus='on';
                        console.log("Vibration device manager to be called");
                       break;
    case 'temperature':
                        // call temperature device driver
                        device=temperatureDeviceDriver.ProcessDevice(device,callback);
                             console.log("Temperature device manager to be called");
                        break;

    case 'biometric':
                        //Call biometric
                        device=biometricDeviceDriver.ProcessDevice(device,callback);
                        console.log("biometric device manager to be called");
                        break;
    default :
           {
                console.log("No such device manager");
            }

    }
    // return the device details
    return device;
    }
};
