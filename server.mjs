import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/,'$1'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(decodeURIComponent(root),'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(path.resolve(decodeURIComponent(root))+path.sep)){res.writeHead(403);return res.end();}const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end('Niet gevonden');}}).listen(5188,'0.0.0.0',()=>console.log('XS lus nails: http://localhost:5188'));
