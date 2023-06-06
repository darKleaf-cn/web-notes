/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const snapshotButton = document.getElementById('snapshotButton');
const snapshotImageElement = document.getElementById('snapshotImageElement');

context.beginPath();
context.fillStyle = '#127621';
context.moveTo(10, 10);
context.lineTo(100, 100);
context.lineTo(100, 10);
context.fill();

snapshotButton.onclick = function (e) {
  let dataUrl = canvas.toDataURL();
  snapshotImageElement.src = dataUrl;
  snapshotImageElement.style.display = 'inline';
  canvas.style.display = 'none';
};
