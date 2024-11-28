function addp(u, user, title, text){
    if(user.length > 0 && title.length > 0) {
        fetch(`/addPost?${u}?${user}?${title}?${text}`).then((r) => returnSelf());
    } else {
        window.alert("Please enter a title and urname.");
    }
}

function returnSelf(){
    window.location.href = '../noodle.html';
}

function on_load2(){
    if(sessionStorage['in'] === false || sessionStorage['in'] === 'false'){
        document.getElementById('body').innerHTML = `<h1>12!</h1>`;
    }
}

function cleanUp(str){
    return str.replaceAll('\n', '%25').replaceAll('#','%1').replaceAll('?','%2');
}