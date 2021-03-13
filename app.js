const canvas = document.getElementById('jsCanvas');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const ctx = canvas.getContext('2d');

console.log(mode);
canvas.width = 700;
canvas.height = 700;
canvas.fillStyle = "#2c2c2c";
let fillMode = false;

mode.addEventListener('click', () =>{
  if(!fillMode){
    mode.innerHTML = 'Paint'
  }else{
    mode.innerHTML = 'Fill'
  }
  fillMode = !fillMode;
})

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false

function stopPainting() {
  painting = false
}

function startPainting(e) {
  painting = true;
}

function init() {
  const colors = document.getElementsByClassName('controls_color')
  for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', (e) => {
      if(fillMode){
        ctx.fillStyle = e.target.style.backgroundColor;
        ctx.fillRect(0,0,700, 700);
      }else{
        ctx.strokeStyle = e.target.style.backgroundColor;
      }
    })
  }
}


function onMouseMove(e) {
  // console.log(e);
  //내가 관심있는건 offset : canvas와 관련있는값
  //client X Y는 윈도우 전체에서의 좌표
  //offsetX offsetY는 캔버스 안에서의 좌표
  const x = e.offsetX;
  const y = e.offsetY;
  console.log(painting)
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // console.log(x,y)
}
function onMouseDown(e) {
  startPainting();
}

function onMouseUp(e) {
  painting = false;
}


function onMouseLeave() {
  console.log('onMouseLeave');
  stopPainting();
}

function onContextMenu(e){
  e.preventDefault();
  
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', onMouseLeave)
  canvas.addEventListener('contextmenu', onContextMenu)
}

if (range) {
  range.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
  })
}

init();