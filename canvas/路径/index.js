/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = '48pt Helvetica';
ctx.strokeStyle = 'blue';
ctx.fillStyle = 'red';
ctx.lineWidth = '2';

ctx.strokeText('Stroke', 60, 100);
ctx.fillText('Fill', 440, 110);

ctx.strokeText('Stroke & Fill', 650, 110);
ctx.fillText('Stroke & Fill', 650, 110);

// rectangles
ctx.lineWidth = '5';
ctx.beginPath();
ctx.rect(80, 150, 150, 100);
ctx.stroke();

ctx.beginPath();
ctx.rect(400, 150, 150, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(750, 150, 150, 100);
ctx.stroke();
ctx.fill();

// open arcs
ctx.beginPath();
ctx.arc(150, 370, 60, 0, Math.PI * 3 / 2);
ctx.stroke();

ctx.beginPath();
ctx.arc(475, 370, 60, 0, Math.PI * 3 / 2);
ctx.fill();

ctx.beginPath();
ctx.arc(820, 370, 60, 0, Math.PI * 3 / 2);
ctx.stroke();
ctx.fill();

// closed arcs
ctx.beginPath();
ctx.arc(150, 550, 60, 0, Math.PI * 3 / 2);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.arc(475, 550, 60, 0, Math.PI * 3 / 2);
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.arc(820, 550, 60, 0, Math.PI * 3 / 2);
ctx.closePath();
ctx.stroke();
ctx.fill();