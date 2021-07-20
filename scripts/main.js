var size
var ratio
var rows = 30
var columns
var offset = 0.0

function setup() {
    createCanvas(displayWidth, displayHeight).parent("#p5Parent")
    drawSquares()
}

function drawSquares() {
    ratio = displayWidth / displayHeight
    size = createVector(displayWidth, displayHeight)
    columns = rows * ratio
    rectMode(CENTER)

    let colSize = Math.floor(size.x * 2 / columns)
    let rowSize = Math.floor(size.y * 2 / rows)

    push()
    translate(-displayWidth / 2, -displayHeight / 2, 0)
    strokeWeight(0)
    for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
            let pos = createVector(x, y)
            let noiseScale = .1
            let noiseVal = noise(pos.x * noiseScale, pos.y * noiseScale, offset)

            let startCol = color('rgb(19,15,118)')
            let endCol = color('rgb(75,255,255)')

            fill(lerpColor(startCol, endCol, noiseVal))
            let size = createVector(colSize, rowSize)
            rect(pos.x * colSize - displayWidth / 2, pos.y * rowSize - displayHeight / 2, size.x, size.y)
        }
    }
    pop()
}

function windowResized() {
    drawSquares()
}