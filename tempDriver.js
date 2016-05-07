var pythonShell = require('python-shell')
var options = {
mode : 'json',
pythonPath: '/usr/bin/python',
pythonOptions: ['-u'],
scriptPath:'/home/pi/Accumulator/drivers/pushsense/vibration',
//uid : 0,
//args: [11,4]
};
pythonShell.defaultOptions = {command:'python'};
pythonShell.run('vibrationreporter.py',options,function(err,results){
   if(err) throw err;
   console.log(results[0].status);
});
