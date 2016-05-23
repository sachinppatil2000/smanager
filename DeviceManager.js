
var vibrationDeviceDriver = require('./vibrationDDriver.js');
var biometricDeviceDriver = require('./biometricDDriver.js');
var temperatureDeviceDriver = require('./temperatureDDriver.js');
module.exports =
{
    CallDevice: function(device){
        console.log('Device passed to device manager' + JSON.stringify(device));
    // pass the  device Json
    switch(device.DeviceType){
    case 'vibration' :
                        // Call vibration device driver
                  promise=vibrationDeviceDriver.ProcessDevice(device);
                  promise.done(function(data){ device.CurrentStatus=data[0].status});
                       // device.CurrentStatus='on';
                        console.log("Vibration device manager to be called");
                       break;
    case 'temperature':
                        // call temperature device driver
                  promise=temperatureDeviceDriver.ProcessDevice(device);
                    promise.done(function(data){ device.CurrentStatus=data[0].status});
                             console.log("Temperature device manager to be called");
                        break;

    case 'biometric':
                        //Call biometric
                  promise=biometricDeviceDriver.ProcessDevice(device);
                    promise.done(function(data){ device.CurrentStatus=data[0].status});
                        console.log("biometric device manager to be called");
                        break;
    default :
           {
                console.log("No such device manager");
            }

    }
    // return the device details
    return promise;
    }
};
