const http = require('http') 
const fs =require('fs')
const [port, file]= process.argv.slice(2)

let server = http.createServer(function (req, res) {  
  
    fs.createReadStream(file).pipe(res)

})  
server.listen(port)  



// # Aprendiendo NODE.JS!  
   
// ## SERVIDOR DE ARCHIVOS HTTP (Ejercicio 11 de 13)  
  
//  Escribe un servidor HTTP que sirva un mismo archivo de texto para todas  
//  las peticiones que reciba.  
  
//  El servidor deberá escuchar en un puerto cuyo número será el primer  
//  argumento del programa. Como segundo argumento recibirá la ruta a la  
//  ubicación del archivo. Debes usar fs.createReadStream() para servir como  
//  stream los contenidos del archivo en la respuesta del servicio.  
  
// ─────────────────────────────────────────────────────────────────────────────  
  
// ## PISTAS  
  
//  En este ejercicio debes crear un servidor HTTP en lugar de un servidor  
//  TCP. Usa el módulo http de Node para ello que tiene un método  
//  http.createServer() para servir peticiones HTTP.  
  
//  http.createServer() espera de parámetro un callback a invocar cuando se  
//  reciba una petición HTTP. La firma de dicho callback es la siguiente:  
  
//     function callback (request, response) { /* ... */ }  
  
//  Los parámetros requesty response son los objetos que representan la  
//  petición y su respuesta respectivamente. La petición provee propiedades,  
//  como ser el encabezado y los parámetros de la misma. La respuesta permite  
//  devolverle al cliente encabezados y un cuerpo (body).  
  
//  ¡Ten en cuenta que ambos request y response son streams de Node! Por lo  
//  tanto puedes usar APIs de streaming para simplificar el envío de datos.  
  
//  La llamada a http.createServer() devuelve una instancia del server. Debes  
//  llamar a server.listen(portNumber) para comenzar la escucha en un puerto  
//  particular. Por ejemplo:  
  
//     var http = require('http')  
//     var server = http.createServer(function (req, res) {  
//       // manejar cada petición aquí.  
//     })  
//     server.listen(8000)  
  
//  La documentación del módulo http puede verse en:  
//  file:///usr/local/lib/node_modules/learnyounode/node_apidoc/http.html  
  
//  Recuerda que el módulo fs tiene APIs para streaming de archivos. Debes  
//  usar fs.createReadStream() para crear un stream que represente el archivo  
//  de entrada. Luego puedes concatenar el stream con pipe src.pipe(dst) para  
//  pasar los datos del stream src al stream writer de salida dst. Es decir  
//  puedes conectar un filesystem stream a un HTTP response stream.  
  

//  var http = require('http')
//  var fs = require('fs')
 
//  var server = http.createServer(function (req, res) {
//    res.writeHead(200, { 'content-type': 'text/plain' })
 
//    fs.createReadStream(process.argv[3]).pipe(res)
//  })
 
//  server.listen(Number(process.argv[2]))