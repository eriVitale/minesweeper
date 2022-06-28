//tutorial from Ania at Traversy Media https://www.youtube.com/watch?v=W0No1JDc6vE&t=1224s

document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid')
    let width=10
    let bombAmount=20
    let flags=0
    let squares=[]
    let isGameOver=false
    //create board
    function createBoard(){
        //get shuffled game array with random bombs
        const bombsArray=Array(bombAmount).fill('bomb')
        const emptyArray=Array(width*width-bombAmount).fill('valid')
        const gameArray=emptyArray.concat(bombsArray)
        const shuffledArray=gameArray.sort(()=>Math.random() -0.5)

        for(let i=0; i<width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('id',i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            //normal click
            square.addEventListener('click', function(e){
                click(square)
            })
            //right click
            square.oncontextmenu=function(e){
                e.preventDefault()
                addFlag(square)
            }
        }

        //add numbers
        for(let i=0; i<squares.length; i++){
            let total=0
            const isLeftEdge=(i%width===0)
            const isRightEdge=(i%width===width-1)

            if (squares[i].classList.contains('valid')){
                //check left
                if (i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
                //check top left
                if (i>11 && !isLeftEdge &&squares[i-1-width].classList.contains('bomb'))total++
                //check top
                if (i>10 && squares[i-width].classList.contains('bomb'))total++
                //check top right
                if (i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb'))total++
                //check right
                if(i<98 & !isRightEdge && squares[i+1].classList.contains('bomb'))total++
                //check bottom right
                if (i<88 && !isRightEdge && squares[i+1+width].classList.contains('bomb'))total++
                //check bottom
                if (i<89 && squares[i+width].classList.contains('bomb'))total++
                //check bottom left
                if (i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb'))total++
                squares[i].setAttribute('data',total)
            }
        
        }
    }
    createBoard();


    //add flag with right click
    function addFlag(square){
        if (isGameOver) return
        if (!square.classList.contains('checked')&&(flags<bombAmount)){
            if (!square.classList.contains('flag')){
                square.classList.add('flag')
                square.innerHTML='🚩'
                flags++
                checkForWin()
            }
            else{
                square.classList.remove('flag')
                square.innerHTML=''
                flags--
            }
        }
    }

    //click on square actions
    function click(square){
        let currentId=square.id
        if (isGameOver)return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')){
            gameOver(square)
        }
        else {
            let total=square.getAttribute('data')
            if (total!=0){
                square.classList.add('checked')
                square.innerHTML=total
                return
            }
            checkSquares(square,currentId)
        } 
        square.classList.add('checked')
    }

//check neighboring squares once square is clicked
function checkSquares(square,currentId){
    const isLeftEdge=(currentId%width===0)
    const isRightEdge=(currentId%width==width-1)

    setTimeout(()=>{
        //check left
        if (currentId>0 && !isLeftEdge){
            const newId=squares[parseInt(currentId)-1].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check top left
        if (currentId>11 && !isLeftEdge){
            const newId=squares[parseInt(currentId)-1-width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check top
        if (currentId>10){
            const newId=squares[parseInt(currentId)-width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check top right
        if (currentId>9 && !isRightEdge){
            const newId=squares[parseInt(currentId)+1-width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check right
        if (currentId<98 && !isRightEdge){
            const newId=squares[parseInt(currentId)+1].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check bottom right
        if (currentId<88 && !isRightEdge){
            const newId=squares[parseInt(currentId)+1+width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check bottom
        if (currentId<89){
            const newId=squares[parseInt(currentId)+width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }
        //check bottom left
        if (currentId<90 && !isLeftEdge){
            const newId=squares[parseInt(currentId)-1+width].id
            const newSquare=document.getElementById(newId)
            click(newSquare)
        }


    },10)
}


//game over
function gameOver(square){
    alert('Game Over!')
    isGameOver=true
    //show all bombs if game over
    squares.forEach(square=>{
        if(square.classList.contains('bomb')){
            square.innerHTML='💣'
        }
    })
}

//check for win
function checkForWin(){
    let matches=0;
    for(let i=0;i<squares.length;i++){
        if (squares[i].classList.contains('flag')&&squares[i].classList.contains('bomb')){
            matches++
        }
        if (matches===bombAmount){
            alert('You win!')
            isGameOver=true
        }
    }
}

})