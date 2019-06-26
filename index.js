'use strict'

var express = require('express');
var app = express();
var p=32132
var folderAudio= process.env.AUDIORECEIVERFOLDER || 'audio'; // No start with "./"
var ext='.wav'
var  hash  = require ( 'object-hash' ) ;
var fs = require('fs')
var dir = './'+folderAudio;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 777);
}

app.use(function(req, res, next) {
    if(req.method.toLowerCase() === "post" && req.originalUrl==='/audioreceiver'){
       console.log('Audio receiving... ')
        let d = new Date(Date.now())
       var id=hash(d.getTime())
        var data = new Buffer('');
        req.on('data', function(chunk) {
            data = Buffer.concat([data, chunk]);
        });
        req.on('end', function() {
            req.rawBody = data;
            done(req, res, id)
            next();
        });
    }else{
        next(); //Requeriment normal continue for app.get() or app.post() ...
    }
});

function done(req, res, id){
    fs.writeFile('./'+folderAudio+'/'+id+ext, req.rawBody, 'binary', function(err){
        if (err) throw err;
        res.send(id);
        console.log('Audio saved successful with id '+id)
    })
}

app.post('/audioreceiver', function (req, res) {});

app.get('/'+folderAudio, function(req, res){
    const file = './'+folderAudio+'/'+req.query.id+ext;
    console.log('Audio casting '+file)
    res.download(file);
});

function port(){
    return p;
}
function fileType(e){
    if(arguments.length===1){
        ext=e
    }
    return ext
}
function listen(customPort, func){
    var module
    if(arguments.length===1&&customPort instanceof Function){
        p= process.env.AUDIORECEIVERPORT || 8000;
        module = {
            retFunc: customPort
        }
    }else  if(arguments.length===2&&func instanceof Function){
        p=customPort
        module = {
            retFunc: func
        }
    }else{
        console.log('Fail! Audio Receiver listen() need 1 callback param o 2 port and callback params.')
        return
    }
    app.listen(p, function () {
        return module.retFunc();
    })
}
module.exports = {
    listen: listen,
    app: app,
    express: express,
    folderAudio: folderAudio,
    fileType: fileType,
    port:port
}
