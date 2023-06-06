/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rubberbandDiv = document.getElementById('rubberbandDiv');
const resetButton = document.getElementById('resetButton');
const image = new Image();
const mousedown = {};
let rubberbandRectangle = {};
let dragging = false;

function rubberbandStart(x, y) {
  mousedown.x = x;
  mousedown.y = y;
  rubberbandRectangle.left = mousedown.x;
  rubberbandRectangle.top = mousedown.y;

  moveRubberbandDiv();
  showRubberbandDiv();

  dragging = true;
}

function rubberbandStrech(x, y) {
  rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
  rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;

  rubberbandRectangle.width = Math.abs(x - mousedown.x);
  rubberbandRectangle.height = Math.abs(y - mousedown.y);

  moveRubberbandDiv();
  resizeRubberbandDiv();
}

function rubberbandEnd() {
  const bbox = canvas.getBoundingClientRect();
  context.drawImage(
    canvas,
    rubberbandRectangle.left - bbox.left,
    rubberbandRectangle.top - bbox.top,
    rubberbandRectangle.width,
    rubberbandRectangle.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  resetRubberbandRectangle();

  rubberbandDiv.style.width = 0;
  rubberbandDiv.style.height = 0;

  hideRubberbandDiv();
  dragging = false;
}

function moveRubberbandDiv() {
  rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
  rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

function resizeRubberbandDiv() {
  rubberbandDiv.style.width = rubberbandRectangle.width + 'px';
  rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

function showRubberbandDiv() {
  rubberbandDiv.style.display = 'inline';
}

function hideRubberbandDiv() {
  rubberbandDiv.style.display = 'none';
}

function resetRubberbandRectangle() {
  rubberbandRectangle = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
}

// 事件

canvas.onmousedown = function (e) {
  const x = e.clientX;
  const y = e.clientY;

  e.preventDefault();
  rubberbandStart(x, y);
};

window.onmousemove = function (e) {
  const x = e.clientX;
  const y = e.clientY;

  e.preventDefault();
  if (dragging) {
    rubberbandStrech(x, y);
  }
};

window.onmouseup = function (e) {
  e.preventDefault();
  rubberbandEnd();
};

image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

resetButton.onclick = function (e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

image.src = '2.jpg';
