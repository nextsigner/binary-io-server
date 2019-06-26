'use strict'

var express = require('express');
var app = express();
var p=8081
var folderFile= process.env.FILERECEIVERFOLDER || 'bios-files'; // No start with "./"
var ext='.wav'
var urnString='filereceiver'
var  hash  = require ( 'object-hash' ) ;
var fs = require('fs')


function setAppUse(){
    app.use(function(req, res, next) {
        //console.log('req.originalUrl: '+req.originalUrl)
        if(req.method.toLowerCase() === "post" && req.originalUrl.indexOf('/'+urnString)===0){
            console.log('File receiving... ')
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
}
function setAppGetFile(){
    var dir = './'+folderFile;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 777);
    }
    app.get('/'+folderFile, function(req, res){
        const file = './'+folderFile+'/'+req.query.fileName;
        console.log('File casting '+file)
        res.download(file);
    });
}
function done(req, res, id){
    let fileExtension=ext
    console.log('req.query.fileExtension: '+req.query.fileExtension)
    if(req.query.fileExtension){
        fileExtension='.'+req.query.fileExtension
    }
    fs.writeFile('./'+folderFile+'/'+id+fileExtension, req.rawBody, 'binary', function(err){
        if (err) throw err;
        res.send(id+fileExtension);
        console.log('File saved successful with filename id '+id+fileExtension)
    })
}
app.post('/'+urnString, function (req, res) {});
setAppUse()
setAppGetFile()

function port(){
    return p;
}
function fileExtension(e){
    if(arguments.length===1){
        ext=e
    }
    return ext
}
function urn(u){
    if(arguments.length===1){
        urnString=u
        setAppUse()
    }
    return urnString
}
function folderFiles(f){
    if(arguments.length===1){
        folderFile=f
        setAppGetFile()
    }
    return folderFile
}
function listen(customPort, func){
    var module
    if(arguments.length===1&&customPort instanceof Function){
        p= process.env.BIOSPORT || 8000;
        module = {
            retFunc: customPort
        }
    }else  if(arguments.length===2&&func instanceof Function){
        p=customPort
        module = {
            retFunc: func
        }
    }else{
        console.log('Fail! File Receiver listen() need 1 callback param o 2 port and callback params.')
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
    folderFile: folderFile,
    fileExtension: fileExtension,
    urn: urn,
    folderFiles: folderFiles,
    port:port
}
/*
'use strict'

var express = require('express');
var app = express();
var p=8081
var folderFile= process.env.FILERECEIVERFOLDER || 'bios-files'; // No start with "./"
var ext='.wav'
var urnString='filereceiver'
var  hash  = require ( 'object-hash' ) ;
var fs = require('fs')
var dir = './'+folderFile;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 777);
}

app.use(function(req, res, next) {
    //console.log('req.originalUrl: '+req.originalUrl)
    if(req.method.toLowerCase() === "post" && req.originalUrl.indexOf('/'+urnString)===0){
       console.log('File receiving: '+req.originalUrl)
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
    let fileExtension=ext
    console.log('req.query.fileExtension: '+req.query.fileExtension)
    if(req.query.fileExtension){
        fileExtension='.'+req.query.fileExtension
    }
    fs.writeFile('./'+folderFile+'/'+id+fileExtension, req.rawBody, 'binary', function(err){
        if (err) throw err;
        res.send(id+fileExtension);
        console.log('File saved successful with filename id '+id+fileExtension)
    })
}

app.post('/'+urnString, function (req, res) {});

app.get('/'+folderFile, function(req, res){
    const file = './'+folderFile+'/'+req.query.id;
    console.log('File casting '+file)
    res.download(file);
});

function port(){
    return p;
}
function fileExtension(e){
    if(arguments.length===1){
        ext=e
    }
    return ext
}
function urn(u){
    if(arguments.length===1){
        urnString=u
    }
    return urnString
}
function listen(customPort, func){
    var module
    if(arguments.length===1&&customPort instanceof Function){
        p= process.env.BIOSPORT || 8000;
        module = {
            retFunc: customPort
        }
    }else  if(arguments.length===2&&func instanceof Function){
        p=customPort
        module = {
            retFunc: func
        }
    }else{
        console.log('Fail! File Receiver listen() need 1 callback param o 2 port and callback params.')
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
    folderFile: folderFile,
    fileExtension: fileExtension,
    urn: urn,
    port:port
}

*/
