/**
 * @param {number} min
 * @param {number} max
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @returns {[number, number, number]}
 */
function randColor() {
  return [randInt(0, 256),randInt(0, 256),randInt(0, 256)]
}

/**
 * @param {[number, number, number]} color
 * @returns {"white" | "black"}
 */
function constrastingText(color) {
  const luminance = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
  return luminance < 0.5 ? "white" : "black"
}

function changeColor() {
  const color = randColor()
  document.body.style.backgroundColor = color.map(x => x.toString(16)).reduce((prev, curr) => prev + curr, "#")
  document.body.style.color = constrastingText(color)
}

document.getElementById("changeColor").addEventListener("click", changeColor)
document.getElementById("changeColor").addEventListener("wheel", changeColor)
