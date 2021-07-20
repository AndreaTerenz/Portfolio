var size
var ratio
var rows = 30
var columns
var offset = 0.0

function setup() {
    createCanvas(displayWidth, displayHeight).parent("#p5Parent")
    ratio = displayWidth / displayHeight
    size = createVector(displayWidth, displayHeight)
    columns = rows  * ratio
    rectMode(CENTER)
}

function draw() {
    background(0);

    let colSize = Math.floor(size.x*2 / columns)
    let rowSize = Math.floor(size.y*2 / rows)

    strokeWeight(0)
    for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
            let pos = createVector((x + .5), (y + .5))
            let noiseScale = .1
            let noiseVal = noise(pos.x*noiseScale, pos.y*noiseScale, offset)

            let startCol = color('rgb(19,15,118)')
            let endCol = color('rgb(75,255,255)')

            fill(lerpColor(startCol, endCol, noiseVal))
            let size = createVector(colSize, rowSize)
            rect(pos.x * colSize, pos.y * rowSize, size.x, size.y)
        }
    }

    offset += .005
}

function windowResized() {
    background(0)
    resizeCanvas(windowWidth, windowHeight)
    ratio = displayWidth / displayHeight
    size = createVector(displayWidth, displayHeight)
    rows = columns * ratio
}