// connect and process request as per configuration for temperature type devices

module.exports =
{
    ProcessDevice: function(device,callback){
        console.log('Device passed to temperature Device Driver' + JSON.stringify(device));
                        // Call vibration device driver
                        device.CurrentStatus='on';
                        console.log("Vibration device manager to be called");
                        callback(device);
                         return device;
    }
};
