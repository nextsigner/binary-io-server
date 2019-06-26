# binary-io-server

It is the first module for this task. Only work with a file by server and port why dont update this package.

## Usage Example

const bios = require('binary-io-server')
bios.fileType('.wav') 
bios.listen(8100,function(){ 
	console.log('Test Audio Receiver listen in '+bios.port()) 
	console.log('Type file '+bios.fileType()) 
	console.log('Now send a WAV file via http://localhost:'+bios.port()+'/filereceiver') 
})

# For more info
Whatsapp: +541138024370
E-Mail: nextsigner@gmail.com
 
