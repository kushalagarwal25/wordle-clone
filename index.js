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
