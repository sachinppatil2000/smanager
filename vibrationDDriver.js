// connect and process request as per configuration for vibration type devices
//var exec = require('child_process').exec;
var await = require('await');
var q = require('q');
module.exports =
{
    ProcessDevice: function(device){
        console.log('Device passed to vibration Device Driver' + JSON.stringify(device));
	var pythonshell = require('python-shell');
	var options = {
	mode : 'json',
	pythonPath: '/usr/bin/python',
	pythonOptions:['-u'],
	scriptPath:'/home/pi/Accumulator/drivers/pushsense/vibration',
}
  //var d = q.deffer();

	pythonshell.defaultOptions = {command:'python'};
                        // Call vibration device driver
        pyshell=new pythonshell('vibrationreporter.py',options);
        function pythonShellCall(functioncall){
          return q.ninvoke(pythonshell,'run',functioncall);
        }
        console.log("Vibration device manager to be called");
   return pythonShellCall('vibrationreporter.py');
   }
}
