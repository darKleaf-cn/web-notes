/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const repeatRadio = document.getElementById('repeatRadio');
const noRepeatRadio = document.getElementById('noRepeatRadio');
const repeatXRadio = document.getElementById('repeatXRadio');
const repeatYRadio = document.getElementById('repeatYRadio');
const image = new Image();

function fillCanvasWithPattern(repeatString) {
  const pattern = ctx.createPattern(image, repeatString);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.fill();
}

repeatRadio.onclick = function () {
  fillCanvasWithPattern('repeat');
};
repeatXRadio.onclick = function () {
  fillCanvasWithPattern('repeat-x');
};
repeatYRadio.onclick = function () {
  fillCanvasWithPattern('repeat-y');
};
noRepeatRadio.onclick = function () {
  fillCanvasWithPattern('no-repeat');
};

image.src = './2.jpg';
image.onload = function() {
  fillCanvasWithPattern('repeat')
}