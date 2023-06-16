/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineWidth = 30;

ctx.font = '24px Helvetica';
ctx.fillText('click anywhere to erase', 175, 40);

ctx.strokeStyle = 'goldenrod';
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';


ctx.strokeRect(75, 100, 200, 200);
ctx.fillRect(325, 100, 200, 200);
ctx.canvas.onmousedown = function(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}