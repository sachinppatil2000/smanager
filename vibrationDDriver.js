// connect and process request as per configuration for vibration type devices
//var pythonshell = require('python-shell')
//var options = {
//mode : 'json',
//pythonPath: '/usr/bin/python',
//pythonOptions:['-u'],
//scriptPath:'/home/pi/Accumulator/drivers/pushsense/vibration',
//};
//pythonshell.defaultOptions = {command:'python'};
//var asyncblock = require('asyncblock');
//var exec = require('child_process').exec;

module.exports =
{
    ProcessDevice: function(device){
        console.log('Device passed to vibration Device Driver' + JSON.stringify(device));
	var pythonshell = require('python-shell')
	var options = {
	mode : 'json',
	pythonPath: '/usr/bin/python',
	pythonOptions:['-u'],
	scriptPath:'/home/pi/Accumulator/drivers/pushsense/vibration',
};
//asyncblock(function(flow){

	pythonshell.defaultOptions = {command:'python'};
                        // Call vibration device driver
			pythonshell.run('vibrationreporter.py',options,function(err,results){
			if(err) throw err;
			console.log(results);
                      device.CurrentStatus=results[0].status;
                      return device;
			});
                  //    callback(device);
    //    });
                        console.log("Vibration device manager to be called");
  //                      return device;
    }
};
