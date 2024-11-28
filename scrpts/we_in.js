function on_load2(){
    if(sessionStorage['in'] === false || sessionStorage['in'] === 'false'){
        document.getElementById('body').innerHTML = `<h1>12!</h1>
    <button type="button" class="btn btn-dark" onclick="resetForm()">Fuck off</button>`;
        return;
    }
    printNav();
    if(sessionStorage['admin'] === true || sessionStorage['admin'] === 'true'){
        document.getElementById('title').innerHTML = `BLESS YOU MY LORD!`
        fetch(`/getRequests`).then((r) => r.json().then(r => approve(r)));
    }
}

function approve(info){
    let str = `
<table class="table table-striped table-dark mt-2 shiny">
    <thead>
        <tr>
            <th scope="col">#</th>`;
    for(let key in info[0]){
        str += `<th scope="col">${key}</th>`;
    }
    str +=
            `<th scope="col">Ch0ice</th>
            <th scope="col">ADM1N</th>
        </tr>
    </thead>
    <tbody>`;
    for(let i= 0; i < info.length; i++){
        str += `
        <tr>
            <th scope="row">${i}</th>`;
        for(let key in info[i]){
            str += `<td>${info[i][key]}</td>`;
        }
        str += `<td>`;
        if (info[i]['id'] !== 0 && info[i]['id'] !== '0') {
            if (info[i]['status'] !== 'a') {
                str += `<input class="btn btn-dark" name="acc" type="submit" id="acc" value="Let Live" onclick="acc(${info[i]['uid']})">`;
            }
            str += `<input class="btn btn-dark" name="dec" type="submit" id="dec" value="Kill" onclick="dec(${info[i]['uid']})">`;
        }
        str += `</td><td>`;
        if (info[i]['id'] !== 0 && info[i]['id'] !== '0') {
            if (info[i]['admin'] === '1' || info[i]['admin'] === 1) {
                str += `<input name="adm" class="btn btn-dark" type="submit" id="admin" value="RemoveAdmin" onclick="admin(${info[i]['uid']}, '0')">`;
            } else {
                str += `<input name="adm" class="btn btn-dark" type="submit" id="admin" value="GiveAdmin" onclick="admin(${info[i]['uid']}, '1')">`;
            }
        }
        str += `</td></tr>`;
    }
    str += `</tbody>
</table>`;
    const body = document.getElementById('body');
    body.innerHTML += str;
}

function dec(uid){
    fetch(`/killApplicant?${uid}`).then((r) => window.location.href = 'we_in.html');
}

function acc(uid){
    fetch(`/acceptApplicant?${uid}`).then((r) => window.location.href = 'we_in.html');
}

function admin(uid, ien){
    if(ien === '1'){
        fetch(`/giveAdmin?${uid}`).then((r) => window.location.href = 'we_in.html');
    } else {
        fetch(`/removeAdmin?${uid}`).then((r) => window.location.href = 'we_in.html');
    }
}

function printNav(){
    const body = document.getElementById('body');
    body.innerHTML += `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2 shiny">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
        <a class="navbar-brand" href="#">P4RTS</a>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active" href="#">YouRHere</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/about.html">Ab0ut</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/noodle.html">N00dle</a>
            </li>
        </ul>
    </div>
</nav>
<button type="button" class="btn btn-dark mb-2 shiny" onclick="resetForm()">Go outside</button><br>
<div class="glitch"></div>`;
}