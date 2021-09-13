const http = require('http')
const data = require('./urls.json')
const URL = require('url')
const fs = require('fs')
const path = require('path')

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err;

            cb(JSON.stringify({message:"ok"}))
        }
    )
}
/*
function readFile(){
    fs.readFile(
        path.join(__dirname, "urls.json"),
    )
}
*/
http.createServer((req, res) => {
    //pega a as variaveis na url enviada
    const {name, url, del} = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin':'*'
    })

    //All resources
    if(!name || !url)
        return res.end(JSON.stringify(data))
        
    
    if(del){
        data.urls = data.urls.filter(item => String(item.url) != String(url))
        
        return writeFile((message)=>res.end(message))

    }
   
    data.urls.push({name, url})
    //return writeFile((message) => res.end(message))
    //console.log(res.end(JSON.stringify(data)));
}).listen(3000, () => console.log('API is running'))