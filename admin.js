// call Get function from Admin only once
var accum = require('./Accumulator.js');
var https = require('http');
setTimeout(function(){
        // get data from sensors
        var date = new Date();
        console.log(date.getMinutes());
        // go through list of components and  get current state.

                // getCurrent state info
        jsonObject =JSON.stringify(accum.currentLocation());
        console.log('In Admin' + jsonObject );
        var postheaders = {
            'Content-Type' : 'application/json',
            'Content-Length' : Buffer.byteLength(jsonObject,'utf8')
                };
    //call rest api every 15 mins and send the current state details.
            var optionsPost = {
                host : 'localhost',
                   //   'infinite-tundra-5952.herokuapp.com', // here only the domain name
                // (no http/https !)
                port : 443,
                path : '/api', // the rest of the url with parameters if needed
                method : 'PUT',// do GET
                headers :postheaders
                        }


            console.info('Options prepared:');
            console.info(optionsPost);
            var reqGet = https.request(optionsPost, function(res) {
                console.log("statusCode: ", res.statusCode);

                // uncomment it for header details
            //  console.log("headers: ", res.headers);


               res.on('data', function(d) {
                console.info('PUT result:\n');
                  process.stdout.write(d);
               console.info('\n\nPost completed');
               });

            });
            reqGet.write(jsonObject);
           reqGet.end();
           reqGet.on('error', function(e) {
           console.error(e);
           });
            } ,1000);