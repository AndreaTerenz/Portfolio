var size
var rows = 10
var columns = 20
var offset = 0.0

function setup() {
    console.log("AAAAAAAAAAAAAAAAAa")
    createCanvas(displayWidth, displayHeight).parent("#p5Parent")
    size = createVector(displayWidth, displayHeight)
}

function draw() {
    background(0);

    let colSize = Math.floor(size.x / columns)
    let rowSize = Math.floor(size.y / rows)
    stroke(255)
    strokeWeight(5)
    for (let x = 0; x < columns; x += 1) {
        for (let y = 0; y < rows; y += 1) {
            let pos = createVector((x + .5), (y + .5))
            stroke(255 * noise(pos.x, pos.y, offset))
            point(pos.x * colSize, pos.y * rowSize)
        }
    }

    offset += .01
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    size = createVector(displayWidth, displayHeight)
}