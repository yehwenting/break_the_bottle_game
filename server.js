var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io'); // 加入 Socket.IO

var jPhidget22 = require('phidget22');
var SERVER_PORT = 5661;


var server = http.createServer(function(request, response) {
    console.log('Connection');
    var path = url.parse(request.url).pathname;
    console.log(path);
    switch (path) {
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Hello, World.');
            response.end();
            break;
        case '/test.html':
            fs.readFile(__dirname + path, function(error, data) {
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                } else {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data, "utf8");
                }
                response.end();
            });
            break;
        default:
            fs.readFile(__dirname + path, function(error, data) {
                if (error){
                    response.writeHead(404);
                    response.write("opps this doesn't exist - 404");
                } else {
                    response.writeHead(200, {"Content-Type": path});
                    response.write(data, "utf8");
                }
                response.end();
            });
            break;
    }
});

server.listen(8001);

var serv_io = io.listen(server); // 開啟 Socket.IO 的 listener
serv_io.set('log level', 1); // 關閉 debug 訊息

serv_io.sockets.on('connection', function(socket) {
    setInterval(function() {
        socket.emit('date', {'date': new Date()});
    }, 1000);

    // 接收來自於瀏覽器的資料
    socket.on('client_data', function(data) {
        process.stdout.write(data.letter);
    });
});

function main() {

    if (process.argv.length != 3) {
        console.log('usage: node VoltageInput.js <server address>');
        // process.exit(1);
    }

    var url = 'phid://' + 'localhost' + ':' + SERVER_PORT;

    console.log('connecting to:' + url);
    var conn = new jPhidget22.Connection(url, { name: 'Server Connection', passwd: '' });
    conn.connect()
        .then(runExample)
        .catch(function (err) {
            console.log('Error running example:' + err);
            process.exit(1);
        });
}

function runExample() {

    var ch = new jPhidget22.VoltageInput();

    ch.onAttach = function (ch) {
        console.log(ch + ' attached');
    };

    ch.onDetach = function (ch) {
        console.log(ch + ' detached');
    };
    serv_io.sockets.on('connection', function (socket) {

        ch.onVoltageChange = function (voltage) {
        // console.log('voltage change: ' + voltage + ' (' + this.getVoltage() + ')');
        let db=(16.801*Math.log(voltage)) + 98.889;
            // setInterval(function() {
            console.log('socket : ' + db);
            socket.emit('db', {'db': db});
            // }, 500);
        console.log('db : '+db);
    };
    });


    /* unit[unit|name|symbol] */
    ch.onSensorChange = function (value, unit) {
        console.log('sensor change:' + value + unit['symbol']);
    };

    ch.open().then(function (ch) {
        console.log('channel open');
    }).catch(function (err) {
        console.log('failed to open the channel:' + err);
    });
}

if (require.main === module) {main();}