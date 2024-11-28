import { createServer } from 'node:http';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import * as que from './queries.mjs';

const db = new sqlite3.Database('dat.db', err => {
    if (err) return err;
});

/*function ach(xd) {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err){
            xd.end(err);
        } else {
            xd.end(JSON.stringify(rows));
        }
    });
}*/

function specialUrls(req, res){
    if (req.url.startsWith('/checkUsr')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'application/json'});
        que.checkUsr(db, res, a[1], a[2]);
        return true;
    } else if (req.url.startsWith('/sendApply')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.sendApply(db, res, a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        return true;
    } else if (req.url.startsWith('/getRequests')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        que.getRequests(db, res);
        return true;
    } else if (req.url.startsWith('/killApplicant')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.killApplicant(db, res, a[1]);
        return true;
    } else if (req.url.startsWith('/acceptApplicant')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.acceptApplicant(db, res, a[1]);
        return true;
    } else if (req.url.startsWith('/giveAdmin')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.giveAdmin(db, res, a[1]);
        return true;
    } else if (req.url.startsWith('/removeAdmin')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.removeAdmin(db, res, a[1]);
        return true;
    } else if (req.url.startsWith('/addPost')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.addPost(db, res, a[1], a[2], a[3], a[4]);
        return true;
    } else if (req.url.startsWith('/getPosts')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        que.getPosts(db, res);
        return true;
    } else if (req.url.startsWith('/removePost')) {
        let a = req.url.split('?');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        que.removePost(db, res, a[1]);
        return true;
    }
    return false;
}

const server = createServer((req, res) => {
    console.log(req.url);
    if(specialUrls(req, res)){
        return;
    }
    let paths = req.url === '/' ? 'index.html' : req.url.substring(1, req.url.length);
    let ext = path.extname(paths);
    let type = 'text/plain';
    switch (ext) {
        case '.html':
            type = 'text/html';
            break;
        case '.css':
            type = 'text/css';
            break;
        case '.js':
            type = 'text/javascript';
            break;
        case '.ts':
            type = 'text/typescript';
            break;
        case '.json':
            type = 'text/json';
            break;
        case '.png':
            type = 'image/png';
            break;
        case '.jpg':
            type = 'image/jpeg';
            break;
        case '.ttf':
            type = 'font/ttf';
            break;
        default:
            type = 'text/plain';
            break;
    }
    fs.readFile(paths, (err, data) => {
        if (err) {
            res.end(`:ViennaL: ${err.code}`);
        } else {
            res.writeHead(200, {'Content-Type': type});
            res.end(data);
        }
    })
});



const port = 3000;
server.listen(port, '127.0.0.1', () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});