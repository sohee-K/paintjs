const canvas = document.getElementById("js_canvas");
const colors = document.getElementsByClassName("js_color");
const range = document.getElementById("js_range");
const mode = document.getElementById("js_mode");
const save = document.getElementById("js_save");
const context = canvas.getContext("2d");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

let painting = false;
let filling = false;

function applyDefault() {
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    context.strokeStyle = DEFAULT_COLOR;
    context.fillStyle = DEFAULT_COLOR;
    context.lineWidth = 2.5;
}

function startPainting() {
    painting = true;

    if (filling) {
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
}

function handleRangeChange(event) {
    const brushSize = event.target.value;
    context.lineWidth = brushSize;
}

function handleModeClick(event) {
    const currentMode = mode.innerText;
    if (currentMode === "BRUSH") {
        mode.innerText = "PAINT";
        filling = true;
    } else if (currentMode === "PAINT") {
        mode.innerText = "BRUSH";
        filling = false;
    }
}

function handleRightClick(event) {
    event.preventDefault();
}

function handleSaveClick(event) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "image.png";
    link.click();
}

function init() {
    applyDefault();

    if (canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("contextmenu", handleRightClick);
    }

    Array.from(colors).forEach((color) => {
        color.addEventListener("click", handleColorClick);
    });

    if (range) {
        range.addEventListener("input", handleRangeChange);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (save) {
        save.addEventListener("click", handleSaveClick);
    }
}

init();