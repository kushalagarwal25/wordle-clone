let getWord = function ( ) {
    fetch('https://akushal25.pythonanywhere.com/getWord')
        .then(response => response.json())
        .then(response => console.log("Today's Word: " + response.word))
        .catch(error => {console.log(error)})
}
window.onload = function () {
    let inp = document.getElementById('inp')
    let check = document.getElementById('check')

    let row = 0
    let col = 0
    let word = ''
    let gameOver = 0

    window.addEventListener("keydown", event => {
        if(gameOver==1)
            return;
        if (event.keyCode === 13) {
            // console.log('enter pressed')
            if(col==5) {
                // console.log(word)
                apiCall(word)
            }
        }
        if (event.keyCode === 8) {
            // console.log('Backspace pressed')
            // console.log(row)
            if(col>0) {
                var children = document.getElementById('r' + parseInt(row+1)).children;
                col -= 1
                var child = children[col];
                child.innerHTML = ''
                word = word.substring(0, word.length - 1);
                // console.log(word)
            }
        }
        else if (event.keyCode >= 65 && event.keyCode <= 90){
            // console.log("input was a-z");
            if(col<5) {
                // console.log(event.key)
                word += event.key
                var children = document.getElementById('r' + parseInt(row+1)).children;
                var child = children[col];
                child.innerHTML = String.fromCharCode((event.key).charCodeAt(0)-32)
                col += 1
            }
        }
    });

    let append = function (letter) {
        if(gameOver==1)
            return;
        if(col<5) {
            // console.log(event.key)
            word += letter
            var children = document.getElementById('r' + parseInt(row+1)).children;
            var child = children[col];
            child.innerHTML = letter
            col += 1
        }
    }
    document.getElementById('q').onclick = function() {append('Q')}
    document.getElementById('w').onclick = function() {append('W')}
    document.getElementById('e').onclick = function() {append('E')}
    document.getElementById('r').onclick = function() {append('R')}
    document.getElementById('t').onclick = function() {append('T')}
    document.getElementById('y').onclick = function() {append('Y')}
    document.getElementById('u').onclick = function() {append('U')}
    document.getElementById('i').onclick = function() {append('I')}
    document.getElementById('o').onclick = function() {append('O')}
    document.getElementById('p').onclick = function() {append('P')}
    document.getElementById('a').onclick = function() {append('A')}
    document.getElementById('s').onclick = function() {append('S')}
    document.getElementById('d').onclick = function() {append('D')}
    document.getElementById('f').onclick = function() {append('F')}
    document.getElementById('g').onclick = function() {append('G')}
    document.getElementById('h').onclick = function() {append('H')}
    document.getElementById('j').onclick = function() {append('J')}
    document.getElementById('k').onclick = function() {append('K')}
    document.getElementById('l').onclick = function() {append('L')}
    document.getElementById('z').onclick = function() {append('Z')}
    document.getElementById('x').onclick = function() {append('X')}
    document.getElementById('c').onclick = function() {append('C')}
    document.getElementById('v').onclick = function() {append('V')}
    document.getElementById('b').onclick = function() {append('B')}
    document.getElementById('n').onclick = function() {append('N')}
    document.getElementById('m').onclick = function() {append('M')}
    document.getElementById('back').onclick = function() {
        if(gameOver==1)
            return;
        if(col>0) {
            var children = document.getElementById('r' + parseInt(row+1)).children;
            col -= 1
            var child = children[col];
            child.innerHTML = ''
            word = word.substring(0, word.length - 1);
            // console.log(word)
        }
    }
    document.getElementById('enter').onclick = function() {
        if(gameOver==1)
            return;
        console.log(word)
        if(col==5) {
            apiCall(word)
        }
    }
    
    let apiCall = function () {
        fetch('https://akushal25.pythonanywhere.com/verify?guess='+word)
            .then(response => response.json())
            .then(response => {
                console.log((response))
                if(response.response_type=='invalid') {
                    console.log('Not A Word.')
                }
                else {
                    let colours = response.colours
                    let guess = response.guess
                    var children = document.getElementById('r' + parseInt(row+1)).children;
                    row += 1
                    col = 0
                    word = ''
                    for(var i=0; i<5; i++){
                        var child = children[i];
                        child.innerHTML = guess[i]
                    }
                    var i = 0
                    colourise = setInterval(function () {
                        var child = children[i];
                        if(colours[i]=='G')
                            child.className += " green";
                        else if(colours[i]=='Y')
                            child.className += " yellow";
                        else child.className += " gray"
                        i += 1
                        if(i==5)
                            clearInterval(colourise)
                    }, 200);
                    if(response.response_type=='correct') {
                        gameOver = 1
                        console.log('GAME OVER')
                        setTimeout(function() {alert("You Win!!!")},1100)
                    }
                    if(response.response_type=='incorrect' && row==6) {
                        gameOver = 1
                        console.log('GAME OVER')
                        setTimeout(function() {alert("You Lose :(\nBetter luck next time")},500)
                    }
                }
            })
            .catch(error => {console.log(error)})
    }
}
