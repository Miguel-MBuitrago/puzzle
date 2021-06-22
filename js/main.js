const SOLUTION = [[1, 2, 3, 4], [5, 6, 7, 8], [6, 10, 11, 12], [13, 14, 15, 0]]

let puzzle,gameDiv

puzzle = [[1, 2, 3, 4], [5, 6, 7, 8], [6, 10, 11, 12], [13, 14, 15, 0]]

function isSoved(){
    if(JSON.stringify(puzzle) === JSON.stringify(SOLUTION)){
        setTimeout(()=>alert('resueto'),100)
    }
}

function setGame(size){
    gameDiv = document.createElement('div')
    gameDiv.style.gridTemplateColumns  = `repeat(${size},50px)`
    gameDiv.style.gridTemplateRows     = `repeat(${size},50px)`
    gameDiv.id = 'game'
    setDivs(puzzle)

    document.getElementsByTagName('main')[0].appendChild(gameDiv)
}

function setDivs(puzzle){
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