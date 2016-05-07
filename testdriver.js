var vibrationDriver = require('./vibrationDDriver.js')
device={
"DeviceName":"BFW",
"username": "OSBB2B.TMME@TMME",
            "password": "tars123",
            "DeviceType" : "vibration",
            "CurrentStatus" : "on"
        }
device=vibrationDriver.ProcessDevice(device);
console.log("printing the recieved devices :" + JSON.stringify(device));
