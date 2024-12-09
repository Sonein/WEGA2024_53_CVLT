function on_load2(){
    if(sessionStorage['in'] === false || sessionStorage['in'] === 'false'){
        document.getElementById('body').innerHTML = `<div id="navigation" class="mb-2">
  <h1>12!</h1>
    <button type="button" class="btn btn-dark" onclick="resetForm()">Fuck off</button>
    </div>`;
        return;
    }
    printNav();
}

function printNav(){
    const body = document.getElementById('navigation');
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
                <a class="nav-link active" href="#">YouRHere</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/noodle.html">N00dle</a>
            </li>
        </ul>
    </div>
</nav>
<button type="button" class="btn btn-dark shiny" onclick="resetForm()">Go outside</button>
    `;
}