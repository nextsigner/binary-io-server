const bios = require('./index.js')
bios.fileExtension('.wav')
bios.urn('resources')
bios.folderFiles('carpeta')
bios.listen(8100,function(){
    console.log('Test File Receiver listen in '+bios.port())
    console.log('Seted you Default File Extension '+bios.fileExtension()+', it is not require the param "?fileExtension=" for '+bios.fileExtension()+' for post or get files.')
    console.log('Now send a '+bios.fileExtension()+' file via http://localhost:'+bios.port()+'/'+bios.urn())
    console.log('Then you cant request the file sended from  http://localhost:'+bios.port()+'/'+bios.folderFiles())
})
