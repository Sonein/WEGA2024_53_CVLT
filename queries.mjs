export function checkUsr(db, res, usrnm, psswrd){
    const q = db.prepare(`SELECT * FROM users JOIN request ON users.uid = request.uid WHERE username = '${usrnm}' AND password = '${psswrd}';`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            if (rows.length === 0) {
                res.end('{}');
            } else {
                if (rows[0]['status'] === 'a') {
                    res.end(JSON.stringify(rows[0]));
                } else {
                    res.end('{}');
                }
            }
        }
    })
}

/*export function checkUsr(db, res, usrnm, psswrd){
    const q = db.prepare(`SELECT * FROM users WHERE username = '${usrnm}' AND password = '${psswrd}';`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            if (rows.length === 0) {
                res.end('{}');
            } else {
                const q1 = db.prepare(`SELECT * FROM request WHERE uid = '${rows[0]['uid']}';`);
                q1.all((err1, rows1) => {
                    if (err1) {
                        res.end(err1);
                    } else {
                        if (rows1.length === 0) {
                            res.end('{}');
                        } else {
                            if (rows1[0]['status'] === 'a') {
                                res.end(JSON.stringify(rows1[0]));
                            } else {
                                res.end('{}');
                            }
                        }
                    }
                })
            }
        }
    });
}*/

//daky blby error
export function sendApply(db, res, nm, srnm, usrnm, psswd, gndr, dtfbrth, rsn){
    const q = db.prepare(`SELECT MAX(id) FROM users;`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            let max = rows[0]['MAX(id)'] + 1;
            const qp = db.prepare(`SELECT username, password FROM users WHERE username = '${usrnm}' AND password = '${psswd}';`)
            qp.all((errp, rowsp) => {
                if (err) {
                    res.end(err);
                } else {
                    if (rowsp.length !== 0) {
                        res.end('false');
                    } else {
                        console.log(max);
                        const q1 = db.prepare(`INSERT INTO users VALUES (${max}, ${max}, '${nm}', '${srnm}', '${usrnm}', '${psswd}', 0);`);
                        q1.all((err1, rows1) => {
                            if (err1) {
                                res.end(err1);
                            } else {
                                const q2 = db.prepare(`INSERT INTO request VALUES (${max}, 'n');`);
                                q2.all((err2, rows2) => {
                                    if (err2) {
                                        res.end(err2);
                                    } else {
                                        const q3 = db.prepare(`INSERT INTO info VALUES (${max}, '${gndr}', '${dtfbrth}', '${rsn}');`);
                                        q3.all((err3, rows3) => {
                                            if (err3) {
                                                res.end(err3);
                                            } else {
                                                res.end('true');
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    })
}

export function getRequests(db, res){
    const q = db.prepare(`SELECT id, users.uid as uid, name, surname, username, password, admin, gender, born, reason, status 
FROM users, info, request 
WHERE info.uid = users.uid AND users.uid = request.uid;`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end(JSON.stringify(rows));
        }
    })
}

export function killApplicant(db, res, uid){
    const q = db.prepare(`DELETE FROM request WHERE uid = ${uid}`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            const q1 = db.prepare(`DELETE FROM info WHERE uid = ${uid}`);
            q1.all((err1, rows1) => {
                if (err1) {
                    res.end(err1);
                } else {
                    const q2 = db.prepare(`DELETE FROM users WHERE uid = ${uid}`);
                    q2.all((err2, rows2) => {
                        if (err2) {
                            res.end(err2);
                        } else {
                            res.end('true');
                        }
                    })
                }
            })
        }
    })
}

export function acceptApplicant(db, res, uid){
    const q = db.prepare(`UPDATE request SET status = 'a' WHERE uid = ${uid}`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end('true');
        }
    })
}

export function giveAdmin(db, res, uid){
    const q = db.prepare(`UPDATE users SET admin = 1 WHERE uid = ${uid}`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end('true');
        }
    })
}

export function removeAdmin(db, res, uid){
    const q = db.prepare(`UPDATE users SET admin = 0 WHERE uid = ${uid}`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end('true');
        }
    })
}

export function addPost(db, res, u, usrnm, title, description){
    const q = db.prepare(`SELECT MAX(id) FROM posts;`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            let max = rows[0]['MAX(id)'] + 1;
            const q1 = db.prepare(`INSERT INTO posts VALUES (${max}, '${u}?${usrnm}', '${title}', '${description}')`);
            q1.all((err1, rows1) => {
                if (err1) {
                    res.end(err1);
                } else {
                    res.end('true');
                }
            });
        }
    });
}

export function removePost(db, res, id){
    const q = db.prepare(`DELETE FROM posts WHERE id = ${id}`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end('true');
        }
    })
}

export function getPosts(db, res){
    const q = db.prepare(`SELECT * FROM posts`);
    q.all((err, rows) => {
        if (err) {
            res.end(err);
        } else {
            res.end(JSON.stringify(rows));
        }
    })
}