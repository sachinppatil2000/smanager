var pythonShell = require('python-shell')
var options = {
mode : 'text',
pythonPath: '/usr/bin/python',
pythonOptions: ['-u'],
scriptPath:'/home/pi/Accumulator/drivers',
//uid : 0,
args: [11,4]
};
pythonShell.defaultOptions = {command:'python'};
pythonShell.run('DHT.py',options,function(err,results){
    if(err) throw err;
    console.log(results);
});
