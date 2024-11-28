function on_load2(){
    if(sessionStorage['in'] === false || sessionStorage['in'] === 'false'){
        document.getElementById('body').innerHTML = `<h1>12!</h1>
    <button type="button" class="btn btn-dark" onclick="resetForm()">Fuck off</button>`;
        return;
    }
    printNav();
    fetch(`/getPosts`).then((r) => r.json().then(r => printPosts(r)));
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
                <a class="nav-link" href="/we_in.html">We1n</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/about.html">Ab0ut</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#">YouRHere</a>
            </li>
        </ul>
    </div>
</nav>
<button type="button" class="btn btn-dark shiny" onclick="resetForm()">Go outside</button>
<button type="button" class="btn btn-dark shiny" onclick="addPostRed()">Add post</button>
    `;
}

function addPostRed(){
    window.location.href = '../scrpts/noodleapr.html';
}

function deletePost(i){
    fetch(`/removePost?${i}`).then((r) => window.location.href = '../noodle.html');
}

function printPosts(posts){
    const body = document.getElementById('posts');
    let i = 0;
    for(let post of posts) {
        let str = '<div class="noodled">\n' +
            '            <h3 class="noodleh3">';
        str += post['id'] + ': ' + cleanUp(post['title']) + '</h3>\n<h4 class="noodleh4">By: ';
        str += cleanUp(post['user'].replace('?', ' a.k.a. ')) + '</h4>\n<p class="noodlep">';
        str += cleanUp(post['tt']) + '</p>\n';
        if(sessionStorage['admin'] === true || sessionStorage['admin'] === 'true'){
            str += `<button type="button" class="btn btn-dark" onclick="deletePost(${post['id']})">Delete</button>`;
        }
        i++;
        str += '</div>'
        body.innerHTML += str;
    }
}

function cleanUp(str){
    return str.replaceAll('%25', '<br>').replaceAll('%20', ' ').replaceAll('%1','#').replaceAll('%2','?');
}