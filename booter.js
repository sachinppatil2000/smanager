// call Get function from Accumulator after every 16 secs
var accum = require('./Accumulator.js');
var https = require('https');

setInterval(function(){
        // get data from sensors

        convertData(data){
          var frmData = data;
          // get message from the file.

          // Take data
          return frmData;
        }

        function sendData(data){
        var date = new Date();
        console.log(date.getMinutes());
        // go through list of components and  get current state.

      // getCurrent state info

      jsonObject =JSON.stringify(convertData(data));

        console.log('In Booter' + jsonObject );
        var postheaders = {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(jsonObject,'utf8')
                };
    //call rest api every 15 mins and send the current state details.
            var optionsPost = {
                host :'infinite-tundra-5952.herokuapp.com',
               // 'infinite-tundra-5952.herokuapp.com', // here only the domain name
                // (no http/https !)
                port : 443,
                path : '/api', // the rest of the url with parameters if needed
                method : 'POST',// do GET
                headers :postheaders
                        }
            console.info('Options prepared:');
            console.info(optionsPost);
            var reqGet = https.request(optionsPost, function(res) {
                console.log("statusCode: ", res.statusCode);
            // uncomment it for header details
            //  console.log("headers: ", res.headers);
                res.on('data', function(d) {
                console.info('Post result:\n');
                process.stdout.write(d);
               console.info('\n\nPost completed');
               });
            });
           reqGet.write(jsonObject);
           reqGet.end();
           reqGet.on('error', function(e) {
           console.error(e);
           });
         }
           accum.currentDeviceState(sendData);
         } ,60000);
