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

	pythonshell.defaultOptions = {command:'python'};
                        // Call vibration device driver
        pyshell=new pythonshell('vibrationreporter.py',options);
        pyshell.stdout.on('data',function(data){
                          if(data ==='data')
                                  pyshell.send('go').end(function(err){
                                          if(err) console.error(err);
                                  });
                            if(data=='data2')
                                  pyshell.send('OK').end(function(err){
                                                if(err) console.error(err);
                                  });
                              console.log(data);
        });
			                      return device;
		                          console.log("Vibration device manager to be called");
}
