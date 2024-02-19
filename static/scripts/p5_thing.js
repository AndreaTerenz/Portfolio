var size
var ratio
var rows = 30
var columns
var offset = 0.0

function setup() {
    createCanvas(window.innerWidth, window.innerHeight).parent("#p5Parent")
    drawSquares()
}

function drawSquares() {
    size = createVector(window.innerWidth, window.innerHeight)
    ratio = size.x / size.y
    columns = 60

    let colSize = Math.floor(size.x / columns)
    let rowSize = Math.floor(size.y / rows)
    console.log(size, rows, columns, ratio, colSize, rowSize)

    push()
    translate(size.x / 2, size.y / 2)

    strokeWeight(0)
    for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
            let pos = createVector(x, y)
            let noiseScale = .1
            let noiseVal = noise(pos.x * noiseScale, pos.y * noiseScale, offset)

            let startCol = color('rgb(19,15,118)')
            let endCol = color('rgb(75,255,255)')

            fill(lerpColor(startCol, endCol, noiseVal))
            rect(pos.x * colSize - displayWidth / 2, pos.y * rowSize - displayHeight / 2, colSize, rowSize)
        }
    }

    pop()
}

function windowResized() {
    console.log("AAAAAAAAAAAa")
    drawSquares()
}