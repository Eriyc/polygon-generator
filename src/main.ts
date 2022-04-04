import { Polygon } from "./polygon";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;
const ctx = document
  .querySelector<HTMLCanvasElement>("#canvas")!
  .getContext("2d")!;
const cornerInput = document.querySelector<HTMLInputElement>("#cornerInput")!;
const skipInput = document.querySelector<HTMLInputElement>("#skipInput")!;

import { getNotationTex } from "./latex";

const h = 300;
const w = 300;

ctx.canvas.height = h;
ctx.canvas.width = w;

const settings = {
  corners: 4,
  skip: 1,
  radius: 100,
};

const drawCircle = () => {
  ctx.save();
  ctx.strokeStyle = "gray";
  ctx.translate(w / 2, h / 2);
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.arc(0, 0, settings.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

const drawPolygon = (p: Polygon) => {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  p.draw(ctx, settings.radius);
  ctx.restore();

  ctx.fillText(`{${settings.corners}, ${settings.skip}}`, w - 80, h - 40);
};

const handleUpdate = () => {
  const p = new Polygon(settings.corners, settings.skip);

  document.querySelector("#formula")!.innerHTML = getNotationTex(
    settings.corners,
    settings.skip,
    p.cNumber
  );

  drawPolygon(p);
  drawCircle();
};

cornerInput.oninput = () => {
  settings.corners = cornerInput.valueAsNumber;
  document.querySelector<HTMLSpanElement>("#corners")!.innerText =
    cornerInput.value;

  handleUpdate();
};

skipInput.oninput = () => {
  document.querySelector("#skip-label-value")!.textContent = skipInput.value;
  settings.skip = skipInput.valueAsNumber;

  handleUpdate();
};

handleUpdate();
