/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/**@type {HTMLCanvasElement} */
const offscreenCanvas = document.createElement('canvas');
const offctx = offscreenCanvas.getContext('2d');

const image = new Image();

