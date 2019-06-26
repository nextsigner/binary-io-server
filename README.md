# binary-io-server

It is the first module for this task. Only work with a file by server and port why dont update this package.

# Usage Example

## Basic way

With port, urn (uri+'/filereceiver') and folder files storage, all as default with this values.

* Port: 8100
* URN: filereceiver
* Folder Files: bios-files

Note: URN is the string for receiving post file sended in http://<host>:<port>/<URN> for example http://mydomain.com:8100/filereceiver.

```JavaScript
const bios = require('binary-io-server')
bios.listen(8100,function(){
    console.log('Test File Receiver listen in '+bios.port())
    console.log('Seted you Default File Extension '+bios.fileExtension()+', it is not require the param "?fileExtension=" for '+bios.fileExtension()+' for post or get files.')
    console.log('Now send a '+bios.fileExtension()+' file via http://localhost:'+bios.port()+'/'+bios.urn())
    console.log('Then you cant request the file sended from  http://localhost:'+bios.port()+'/'+bios.folderFiles())
})
```

## Advanced way

With custom values for port, urn and folder files.

```JavaScript
const bios = require('binary-io-server')
bios.fileExtension('.wav')
bios.urn('resources')
bios.folderFiles('carpeta')
bios.listen(8100,function(){
    console.log('Test File Receiver listen in '+bios.port())
    console.log('Seted you Default File Extension '+bios.fileExtension()+', it is not require the param "?fileExtension=" for '+bios.fileExtension()+' for post or get files.')
    console.log('Now send a '+bios.fileExtension()+' file via http://localhost:'+bios.port()+'/'+bios.urn())
    console.log('Then you cant request the file sended from  http://localhost:'+bios.port()+'/'+bios.folderFiles())
})
```
# For more info
Whatsapp: +541138024370
E-Mail: nextsigner@gmail.com
 
