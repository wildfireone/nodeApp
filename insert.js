/**
 * Created by john on 23/11/2015.
 */
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//and our HTTP server
var http = require('http');
//setup our port
var port = process.env.PORT || 1337;


// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://main:basiltdog1@ds054308.mongolab.com:54308/rgutest';

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
        } else {
            //HURRAY!! We are connected. :)
            response.write('Connection established to' + url +"\n");
            // Get the documents collection
            var collection = db.collection('users');

            var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
            var user2 = {name: 'modulus user', age: 22, roles: ['user']};
            var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

            // Insert some users
            collection.insert([user1, user2, user3], function (err, result) {
                if (err) {
                    response.write(err);
                } else {
                    response.write('Inserted ' + result.length +' documents successfully.);
                }
            });



            // do some work here with the database.

            //Close connection
            db.close();
        }
        response.end('Finished, Connection closed \n');
    });

}).listen(port);
