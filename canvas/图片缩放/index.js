/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = new Image();
const scaleSlider = document.getElementById('scaleSlider');
const scaleOutput = document.getElementById('scaleOutput');
let scale = 1.0;
const MINIMUM_SCALE = 1.0;
const MAXIMUM_SCALE = 3.0;

function drawImage() {
  const w = canvas.width,
    h = canvas.height,
    sw = w * scale,
    sh = h * scale;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(image, w / 2 - sw / 2, h / 2 - sh / 2, sw, sh);
}
function drawScaleText(value) {
  const text = parseFloat(value).toFixed(2);
  let percent = parseFloat(value - MINIMUM_SCALE) / parseFloat(MAXIMUM_SCALE - value);
  scaleOutput.innerText = text;
  percent = percent < 0.35 ? 0.35 : percent;
  scaleOutput.style.fontSize = (percent * MAXIMUM_SCALE) / 1.5 + 'em';
}

scaleSlider.onchange = function (e) {
  scale = e.target.value;
  if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
  if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
  drawScaleText(scale);
  drawImage();
};

ctx.fillStyle = 'cornflowerblue';
ctx.strokeStyle = 'yellow';
ctx.shadowColor = 'rgba(50, 50, 50, 1.0)';
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

image.src = '2.jpg';
image.onload = function() {
  drawImage();
  drawScaleText(scaleSlider.value);
}