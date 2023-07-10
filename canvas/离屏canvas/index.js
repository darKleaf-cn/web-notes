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
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  drawWatermark();
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height,  w / 2 - sw / 2, h / 2 - sh / 2, sw, sh)
}

function drawWatermark() {
  const lineOne = 'Copyright';
  const lineTwo = 'Acme Inc';
  let textMetries, FONT_HEIGHT = 128;
  ctx.save();
  ctx.font = FONT_HEIGHT + 'px Arial';
  textMetries = ctx.measureText(lineOne);
  ctx.globalAlpha = 0.6;
  ctx.translate(canvas.width / 2, canvas.height / 2 - FONT_HEIGHT / 2);
  ctx.fillText(lineOne, -textMetries.width / 2, 0);
  ctx.strokeText(lineOne, -textMetries.width / 2, 0);

  textMetries = ctx.measureText(lineTwo);
  ctx.fillText(lineTwo, -textMetries.width / 2, FONT_HEIGHT);
  ctx.strokeText(lineTwo, -textMetries.width / 2, FONT_HEIGHT);
  ctx.restore();
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
  drawWatermark();
  drawScaleText(scaleSlider.value);
}