const bios = require('./index.js')
bios.fileType('.wav')
bios.listen(8100,function(){
	console.log('Test Audio Receiver listen in '+bios.port())
    console.log('Type file '+bios.fileType())
    console.log('Now send a WAV file via http://localhost:'+bios.port()+'/filereceiver')
})
