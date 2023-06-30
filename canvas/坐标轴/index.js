/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const axis_margin = 40,
  axis_origin = {
    x: axis_margin,
    y: canvas.height - axis_margin
  },
  axis_top = axis_margin,
  axis_right = canvas.width - axis_margin,

  horizontal_tick_spacing = 10,
  vertical_tick_spacing = 10,

  axis_width = axis_right - axis_origin.x,
  axis_height = axis_origin.y - axis_top,

  num_vertical_ticks = axis_height / vertical_tick_spacing,
  num_horizontal_ticks = axis_width / horizontal_tick_spacing,

  tick_width = 10,
  ticks_linewidth = 0.5,
  ticks_color = 'navy',

  axis_linewidth = 1.0,
  axis_color = 'blue';

function drawAxes() {
  ctx.save();
  ctx.strokeStyle = axis_color;
  ctx.lineWidth = axis_linewidth;

  drawHorizontalAxis();
  drawVerticalAxis();

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = ticks_color;

  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();

  ctx.restore();
}

function drawHorizontalAxis() {
  ctx.beginPath();
  ctx.moveTo(axis_origin.x, axis_origin.y);
  ctx.lineTo(axis_right, axis_origin.y);
  ctx.stroke();
}

function drawVerticalAxis() {
  ctx.beginPath();
  ctx.moveTo(axis_origin.x, axis_origin.y);
  ctx.lineTo(axis_origin.x, axis_top);
  ctx.stroke();
}

function drawVerticalAxisTicks() {
  let deltaY;
  for(let i = 1; i < num_vertical_ticks; i++) {
    ctx.beginPath();
    if (i % 5 === 0) deltaY = tick_width;
    else deltaY = tick_width / 2;
    ctx.moveTo(axis_origin.x - de)
  }
}

function drawHorizontalAxisTicks() {

}