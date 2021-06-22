let puzzle = [],
    gameDiv,
    sol = []

function isSoved(){
    if(JSON.stringify(puzzle) === JSON.stringify(sol)){
        setTimeout(()=>alert('Enhorabuena!!'),0)
    }
}

function generatePuzzle(size) {
    let n = 1
    let numbers = []
    sol = []
    for (let x = 0; x < size; x++) {
        let row = []
        for (let y = 0; y < size; y++) {
            if(x === size - 1 && y === size - 1){
                n=0
            }else{
                numbers.push(n)
            }
            row.push(n)
            
            n++
        }
        sol.push(row)
    }

    puzzle = formatArr(shuffle(numbers),size)

    setGame(size)
}

function shuffle(numbers) {
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    return numbers
}

function formatArr(arr,size){
    let row = []

    return arr.reduce((fArr, n, idx) => {
        if(idx !== 0 && (idx) % size === 0){
            fArr.push(row)
            row = []
            row.push(n)
        }else{
            row.push(n)
            if (idx === (size * size) - 2) {
                row.push(0)
                fArr.push(row)
            }       
        }
        return fArr
    }, [])

}

function setGame(size){
    gameDiv = document.createElement('div')
    gameDiv.style.gridTemplateColumns  = `repeat(${size},50px)`
    gameDiv.style.gridTemplateRows     = `repeat(${size},50px)`
    gameDiv.id = 'game'
    setDivs()

    document.getElementsByTagName('main')[0].appendChild(gameDiv)
}

function setDivs(){
    puzzle.forEach((column,idxC) => {
        column.forEach((num,idxR) => {
            gameDiv.appendChild(createDiv(idxC,idxR,num))
        })
    });
}


function createDiv(idxC,idxR,value){
    let div = document.createElement('div')
    let number = document.createTextNode(value)
    div.id = `${idxC} ${idxR}`
    div.setAttribute('value',value)
    div.appendChild(number)

    div.addEventListener('click',gestorClickDivs)
    return div
}

function gestorClickDivs(e){
    let coords = e.target.id.split(' ')
                            .map(c => parseInt(c));
    
    let coordsToCheck = getCoordsToCheck(coords[0], coords[1])
    let zeroCoords = checkCoord(coordsToCheck)

    if (zeroCoords !== undefined){
        move(zeroCoords,coords)
    }
}

function getCoordsToCheck(x,y){
    let coords = []
    if(x === 0){
        coords.push([x + 1, y])
    }else if (x === puzzle.length - 1){
        coords.push([x - 1, y])
    }else{
        coords.push([x + 1, y])
        coords.push([x - 1, y])
    }

    if(y === 0){
        coords.push([x, y + 1])
    }else if (y === puzzle.length - 1) {
        coords.push([x, y - 1])
    }else{
        coords.push([x, y + 1])
        coords.push([x, y - 1])
    }

    return coords
}

function checkCoord(coords){
    let zeroCoords
    coords.map(coord => {
        let x = coord[0],
            y = coord[1]

        if(puzzle[x][y] === 0){
            zeroCoords = coord
        }
    })

    return zeroCoords
}

function move(coordsZero,coordsClick){
    let idZero = coordsZero.join(' ')
    let idClick = coordsClick.join(' ')

    let divZero = document.getElementById(idZero)
    let divClick = document.getElementById(idClick)
    
    divZero.setAttribute('value', divClick.getAttribute('value'))
    divClick.setAttribute('value', 0)

    divZero.innerHTML = puzzle[coordsClick[0]][coordsClick[1]]
    divClick.innerHTML = 0

    puzzle[coordsZero[0]][coordsZero[1]] = puzzle[coordsClick[0]][coordsClick[1]]
    puzzle[coordsClick[0]][coordsClick[1]] = 0

    isSoved()
}

document.addEventListener('DOMContentLoaded', () =>{ 
    generatePuzzle(3)

    document.getElementById('form')
            .lastElementChild
            .addEventListener('click',gestorFormulario)
})

function gestorFormulario(e){
    e.preventDefault()
    let size = document.getElementById('form')
                       .firstElementChild.value
    
    gameDiv.remove()
    generatePuzzle(size)
}
