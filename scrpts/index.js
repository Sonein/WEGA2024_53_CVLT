function on_load(){
    if(sessionStorage['in'] === true || sessionStorage['in'] === 'true'){
        change_site('true');
    }
    sessionStorage['admin'] = false;
}

function change_site(info){
    if(Object.keys(info).length !== 0){
        let boo = 'true' + info['admin'];
        sessionStorage['in'] = true;
        sessionStorage['admin'] = boo === 'true1';
        sessionStorage['usrnm'] = info['username'];
        sessionStorage['psswd'] = info['password'];
        window.alert(boo);
        window.location.href = "we_in.html";
    } else {
        window.alert('false');
        resetForm();
    }
} //big change to logged in type of site

async function submit1() {
    let usrnm = document.getElementById("usrnm").value;
    let psswd = document.getElementById("psswd").value;
    if(usrnm.length > 0 && psswd.length > 0) {
        const te = new TextEncoder();
        const data = te.encode(psswd);
        const bit8 = await window.crypto.subtle.digest('SHA-256', data);
        const hex = Array.from(new Uint8Array(bit8), b => b.toString(16).padStart(2, '0')).join('');
        const url = `/checkUsr?${usrnm}?${hex}`;
        if (url.includes("#") || `${usrnm}${hex}`.includes("?")) {
            window.alert("Illegal symbols :viennaL:");
            resetForm();
            return;
        }
        fetch(url).then((r) => r.json().then(r => change_site(r)));
    } else {
        window.alert('None of those two field may be empty.');
    }
}

async function submit2(){
    let nm = document.getElementById("nm").value;
    let srnm = document.getElementById("srnm").value;
    let usrnm = document.getElementById("usrnm").value;
    let psswd = document.getElementById("psswd").value;
    let gndr = document.getElementById("gndr").value;
    let dtfbrth = document.getElementById("dtfbrth").value;
    let rsn = document.getElementById("rsn").value;
    if(nm.length > 0 && srnm.length > 0 && usrnm.length > 0 && psswd.length > 0 && rsn.length > 0) {
        const te = new TextEncoder();
        const data = te.encode(psswd);
        const bit8 = await window.crypto.subtle.digest('SHA-256', data);
        const hex = Array.from(new Uint8Array(bit8), b => b.toString(16).padStart(2, '0')).join('');
        const url = `/sendApply?${nm}?${srnm}?${usrnm}?${hex}?${gndr}?${dtfbrth}?${rsn}`;
        if (url.includes("#") || `${nm}${srnm}${usrnm}${hex}${gndr}${dtfbrth}${rsn}`.includes("?")) {
            window.alert("Illegal symbols :viennaL:");
            resetForm();
            return;
        }
        fetch(url).then((r) => resetForm());
    } else {
        window.alert('Please fill out all required fields. That mean all field tbh.');
    }
}

function addForm(){
    let spn = document.getElementById("form");
    spn.innerHTML = `
<div class="inner-div">
    <button type="button" class="btn btn-dark" onclick="addForm()">I want to join.</button>
    <button type="button" class="btn btn-dark" onclick="addForm2()">I am returning.</button>
</div>
<form>
    <div class="row">
        <div class="col-md-6">
            <label for="nm">NM:</label> 
            <input name="name" class="form-control" type="text" size="30" maxlength="30" id="nm" required>
        </div>
        <div class="col-md-6">
            <label for="srnm">SRNM:</label> 
            <input name="surname" class="form-control" type="text" size="30" maxlength="30" id="srnm" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label for="usrnm">USRNM:</label> 
            <input name="username" class="form-control" type="text" size="30" maxlength="30" id="usrnm" required>
        </div>
        <div class="col-md-6">
            <label for="psswd">PSSWRD:</label> 
            <input name="username" class="form-control" type="password" size="30" maxlength="30" id="psswd" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <label for="gndr">GNDR:</label> 
            <input name="gender" class="form-control" type="text" size="30" maxlength="30" id="gndr" required>
        </div>
        <div class="col-md-6">
            <label for="dtfbrth">DTFBRTH:</label>
            <input type="date" class="form-control" id="dtfbrth" name="dateofbirth" value="2003-12-31" max="2004-1-1" required />
        </div>
    </div>
    <div class="row mt-4 mb-4">
        <label for="rsn">RSN:</label>
        <textarea id="rsn" name="reason" required></textarea>
    </div>
    <button type="button" class="btn btn-dark" onclick="submit2()">Enter.</button>
</form>`
} //adds reg form

function addForm2(){
    let spn = document.getElementById("form");
    spn.innerHTML = `
<div class="inner-div">
    <button type="button" class="btn btn-dark" onclick="addForm()">I want to join.</button>
    <button type="button" class="btn btn-dark" onclick="addForm2()">I am returning.</button>
</div>
<form>
    <div class="row">
        <div class="col-md-6">
            <label for="usrnm">USRNM:</label> 
            <input name="prihlasmeno" class="form-control" type="text" size="50" maxlength="50" id="usrnm" required>
        </div>
        <div class="col-md-6">   
            <label for="psswd">PSSWD:</label> 
            <input name="heslo" class="form-control" type="password" size="30" maxlength="30" id="psswd" required> 
        </div>
    </div>
    <div class="form-row mt-2">
        <div class="col text-center">
            <button type="button" class="btn btn-dark" onclick="submit1()">Enter.</button>
        </div>
    </div>
</form>`
}

function resetForm(){
    sessionStorage['in'] = false;
    sessionStorage['admin'] = false;
    sessionStorage.removeItem('usrnm');
    sessionStorage.removeItem('psswd');
    window.location.href = 'index.html';
}
