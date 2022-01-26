import Raphael, { RaphaelPaper } from "raphael";

const defaultColors = {
  black: "#0d1117",
  blue: "#388bfd",
  green: "#3fb950",
  yellow: "#f0e159",
  orange: "#f0883e",
  red: "#f85149",
  white: "#FFFFFF",
};

function colorGet(col: string) {
  if (col === "r") return defaultColors.red;
  if (col === "o") return defaultColors.orange;
  if (col === "b") return defaultColors.blue;
  if (col === "g") return defaultColors.green;
  if (col === "y") return defaultColors.yellow;
  if (col === "w") return defaultColors.white;
  if (col === "x") return defaultColors.black;
}

const scalePoint = function (w: number, h: number, ptIn: number[]) {
  const defaultWidth = 200;
  const defaultHeight = 110;

  const scale = Math.min(w / defaultWidth, h / defaultHeight);

  const x = Math.floor(ptIn[0] * scale + (w - defaultWidth * scale) / 2) + 0.5;
  const y = Math.floor(ptIn[1] * scale + (h - defaultHeight * scale) / 2) + 0.5;

  return [x, y];
};

function drawPolygon(
  r: RaphaelPaper<"SVG" | "VML">,
  fillColor: string,
  w: number,
  h: number,
  arrx: number[],
  arry: number[]
) {
  let pathString = "";
  for (let i = 0; i < arrx.length; i++) {
    const scaledPoint = scalePoint(w, h, [arrx[i], arry[i]]);
    pathString += (i === 0 ? "M" : "L") + scaledPoint[0] + "," + scaledPoint[1];
  }
  pathString += "z";

  r.path(pathString).attr({ fill: colorGet(fillColor), stroke: "#000" });
}

function drawSq(
  stickers: string,
  middleIsSolved: boolean,
  shapes: string,
  parentElement: HTMLElement,
  width: number,
  height: number,
  colorString: string
) {
  const z = 1.366; // sqrt(2) / sqrt(1^2 + tan(15 degrees)^2)
  const r = Raphael(parentElement, width, height).setViewBox(0, 0, width, height);
  r.canvas.setAttribute("preserveAspectRatio", "xMidYMid meet");

  let arrx, arry;

  const margin = 1;
  const sidewid = (0.15 * 100) / z;
  let cx = 50;
  let cy = 50;
  const radius = (cx - margin - sidewid * z) / z;
  const w = (sidewid + radius) / radius; // ratio btw total piece width and radius

  const angles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const angles2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //initialize angles
  for (let foo = 0; foo < 24; foo++) {
    angles[foo] = ((17 - foo * 2) / 12) * Math.PI;
    shapes = shapes.concat("xxxxxxxxxxxxxxxx");
  }
  for (let foo = 0; foo < 24; foo++) {
    angles2[foo] = ((19 - foo * 2) / 12) * Math.PI;
    shapes = shapes.concat("xxxxxxxxxxxxxxxx");
  }

  function cos1(index: number) {
    return Math.cos(angles[index]) * radius;
  }
  function sin1(index: number) {
    return Math.sin(angles[index]) * radius;
  }
  function cos2(index: number) {
    return Math.cos(angles2[index]) * radius;
  }
  function sin2(index: number) {
    return Math.sin(angles2[index]) * radius;
  }

  let h = sin1(1) * w * z - sin1(1) * z;
  if (middleIsSolved) {
    arrx = [cx + cos1(1) * w * z, cx + cos1(4) * w * z, cx + cos1(7) * w * z, cx + cos1(10) * w * z];
    arry = [cy - sin1(1) * w * z, cy - sin1(4) * w * z, cy - sin1(7) * w * z, cy - sin1(10) * w * z];
    drawPolygon(r, "x", width, height, arrx, arry);

    cy += 10;
    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(1) * w * z, cx + cos1(1) * w * z];
    arry = [
      cy - sin1(1) * w * z,
      cy - sin1(1) * z,
      cy - sin1(1) * z,
      cy - sin1(1) * w * z,
      cy - sin1(1) * w * z,
    ];
    drawPolygon(r, colorString[5], width, height, arrx, arry);

    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(10) * w * z, cx + cos1(10) * w * z];
    arry = [
      cy - sin1(1) * w * z,
      cy - sin1(1) * z,
      cy - sin1(1) * z,
      cy - sin1(1) * w * z,
      cy - sin1(1) * w * z,
    ];
    drawPolygon(r, colorString[5], width, height, arrx, arry);
    cy -= 10;
  } else {
    arrx = [
      cx + cos1(1) * w * z,
      cx + cos1(4) * w * z,
      cx + cos1(6) * w,
      cx + cos1(9) * w * z,
      cx + cos1(11) * w * z,
      cx + cos1(0) * w,
    ];
    arry = [
      cy - sin1(1) * w * z,
      cy - sin1(4) * w * z,
      cy - sin1(6) * w,
      cy + sin1(9) * w * z,
      cy - sin1(11) * w * z,
      cy - sin1(0) * w,
    ];
    drawPolygon(r, "x", width, height, arrx, arry);

    arrx = [cx + cos1(9) * w * z, cx + cos1(11) * w * z, cx + cos1(11) * w * z, cx + cos1(9) * w * z];
    arry = [cy + sin1(9) * w * z - h, cy - sin1(11) * w * z - h, cy - sin1(11) * w * z, cy + sin1(9) * w * z];
    drawPolygon(r, colorString[4], width, height, arrx, arry);

    cy += 10;
    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(1) * w * z, cx + cos1(1) * w * z];
    arry = [cy - sin1(1) * w * z, cy - sin1(1) * z, cy - sin1(1) * z, cy - sin1(1) * w * z];
    drawPolygon(r, colorString[5], width, height, arrx, arry);

    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(11) * w * z, cx + cos1(11) * w * z];
    arry = [cy - sin1(1) * w * z, cy - sin1(1) * z, cy - sin1(11) * w * z + h, cy - sin1(11) * w * z];
    drawPolygon(r, colorString[2], width, height, arrx, arry);
    cy -= 10;
  }

  //fill and outline first layer
  let sc = 0;
  let foo = 0;
  for (foo = 0; sc < 12; foo++) {
    if (shapes.length <= foo) sc = 12;
    if (shapes.charAt(foo) === "x") sc++;
    if (shapes.charAt(foo) === "c") {
      arrx = [cx, cx + cos1(sc), cx + cos1(sc + 1) * z, cx + cos1(sc + 2)];
      arry = [cy, cy - sin1(sc), cy - sin1(sc + 1) * z, cy - sin1(sc + 2)];
      drawPolygon(r, stickers.charAt(foo), width, height, arrx, arry);

      arrx = [cx + cos1(sc), cx + cos1(sc + 1) * z, cx + cos1(sc + 1) * w * z, cx + cos1(sc) * w];
      arry = [cy - sin1(sc), cy - sin1(sc + 1) * z, cy - sin1(sc + 1) * w * z, cy - sin1(sc) * w];
      drawPolygon(r, stickers.charAt(16 + sc), width, height, arrx, arry);

      arrx = [cx + cos1(sc + 2), cx + cos1(sc + 1) * z, cx + cos1(sc + 1) * w * z, cx + cos1(sc + 2) * w];
      arry = [cy - sin1(sc + 2), cy - sin1(sc + 1) * z, cy - sin1(sc + 1) * w * z, cy - sin1(sc + 2) * w];
      drawPolygon(r, stickers.charAt(17 + sc), width, height, arrx, arry);

      sc += 2;
    }
    if (shapes.charAt(foo) === "e") {
      arrx = [cx, cx + cos1(sc), cx + cos1(sc + 1)];
      arry = [cy, cy - sin1(sc), cy - sin1(sc + 1)];
      drawPolygon(r, stickers.charAt(foo), width, height, arrx, arry);

      arrx = [cx + cos1(sc), cx + cos1(sc + 1), cx + cos1(sc + 1) * w, cx + cos1(sc) * w];
      arry = [cy - sin1(sc), cy - sin1(sc + 1), cy - sin1(sc + 1) * w, cy - sin1(sc) * w];
      drawPolygon(r, stickers.charAt(16 + sc), width, height, arrx, arry);

      sc += 1;
    }
  }

  //fill and outline second layer
  cx += 100;
  cy += 10;

  h = sin1(1) * w * z - sin1(1) * z;
  if (middleIsSolved) {
    arrx = [cx + cos1(1) * w * z, cx + cos1(4) * w * z, cx + cos1(7) * w * z, cx + cos1(10) * w * z];
    arry = [cy + sin1(1) * w * z, cy + sin1(4) * w * z, cy + sin1(7) * w * z, cy + sin1(10) * w * z];
    drawPolygon(r, "x", width, height, arrx, arry);

    cy -= 10;
    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(1) * w * z, cx + cos1(1) * w * z];
    arry = [
      cy + sin1(1) * w * z,
      cy + sin1(1) * z,
      cy + sin1(1) * z,
      cy + sin1(1) * w * z,
      cy + sin1(1) * w * z,
    ];
    drawPolygon(r, colorString[5], width, height, arrx, arry);

    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(10) * w * z, cx + cos1(10) * w * z];
    arry = [
      cy + sin1(1) * w * z,
      cy + sin1(1) * z,
      cy + sin1(1) * z,
      cy + sin1(1) * w * z,
      cy + sin1(1) * w * z,
    ];
    drawPolygon(r, colorString[5], width, height, arrx, arry);
    cy += 10;
  } else {
    arrx = [
      cx + cos1(1) * w * z,
      cx + cos1(4) * w * z,
      cx + cos1(6) * w,
      cx + cos1(9) * w * z,
      cx + cos1(11) * w * z,
      cx + cos1(0) * w,
    ];
    arry = [
      cy + sin1(1) * w * z,
      cy + sin1(4) * w * z,
      cy + sin1(6) * w,
      cy - sin1(9) * w * z,
      cy + sin1(11) * w * z,
      cy + sin1(0) * w,
    ];
    drawPolygon(r, "x", width, height, arrx, arry);

    arrx = [cx + cos1(9) * w * z, cx + cos1(11) * w * z, cx + cos1(11) * w * z, cx + cos1(9) * w * z];
    arry = [cy - sin1(9) * w * z + h, cy + sin1(11) * w * z + h, cy + sin1(11) * w * z, cy - sin1(9) * w * z];
    drawPolygon(r, colorString[4], width, height, arrx, arry);

    cy -= 10;
    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(1) * w * z, cx + cos1(1) * w * z];
    arry = [cy + sin1(1) * w * z, cy + sin1(1) * z, cy + sin1(1) * z, cy + sin1(1) * w * z];
    drawPolygon(r, colorString[5], width, height, arrx, arry);

    arrx = [cx + cos1(0) * w, cx + cos1(0) * w, cx + cos1(11) * w * z, cx + cos1(11) * w * z];
    arry = [cy + sin1(1) * w * z, cy + sin1(1) * z, cy + sin1(11) * w * z - h, cy + sin1(11) * w * z];
    drawPolygon(r, colorString[2], width, height, arrx, arry);
    cy += 10;
  }

  sc = 0;
  for (sc = 0; sc < 12; foo++) {
    if (shapes.length <= foo) sc = 12;
    if (shapes.charAt(foo) === "x") sc++;
    if (shapes.charAt(foo) === "c") {
      arrx = [cx, cx + cos2(sc), cx + cos2(sc + 1) * z, cx + cos2(sc + 2)];
      arry = [cy, cy - sin2(sc), cy - sin2(sc + 1) * z, cy - sin2(sc + 2)];
      drawPolygon(r, stickers.charAt(foo), width, height, arrx, arry);

      arrx = [cx + cos2(sc), cx + cos2(sc + 1) * z, cx + cos2(sc + 1) * w * z, cx + cos2(sc) * w];
      arry = [cy - sin2(sc), cy - sin2(sc + 1) * z, cy - sin2(sc + 1) * w * z, cy - sin2(sc) * w];
      drawPolygon(r, stickers.charAt(28 + sc), width, height, arrx, arry);

      arrx = [cx + cos2(sc + 2), cx + cos2(sc + 1) * z, cx + cos2(sc + 1) * w * z, cx + cos2(sc + 2) * w];
      arry = [cy - sin2(sc + 2), cy - sin2(sc + 1) * z, cy - sin2(sc + 1) * w * z, cy - sin2(sc + 2) * w];
      drawPolygon(r, stickers.charAt(29 + sc), width, height, arrx, arry);

      sc += 2;
    }
    if (shapes.charAt(foo) === "e") {
      arrx = [cx, cx + cos2(sc), cx + cos2(sc + 1)];
      arry = [cy, cy - sin2(sc), cy - sin2(sc + 1)];
      drawPolygon(r, stickers.charAt(foo), width, height, arrx, arry);

      arrx = [cx + cos2(sc), cx + cos2(sc + 1), cx + cos2(sc + 1) * w, cx + cos2(sc) * w];
      arry = [cy - sin2(sc), cy - sin2(sc + 1), cy - sin2(sc + 1) * w, cy - sin2(sc) * w];
      drawPolygon(r, stickers.charAt(28 + sc), width, height, arrx, arry);

      sc += 1;
    }
  }
}

function remove_duplicates(arr: number[]) {
  const out = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i] !== arr[i - 1]) out[j++] = arr[i];
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FullCube_pieceAt(obj: any, idx: number) {
  let ret;
  idx < 6
    ? (ret = ~~obj.ul >> ((5 - idx) << 2))
    : idx < 12
    ? (ret = ~~obj.ur >> ((11 - idx) << 2))
    : idx < 18
    ? (ret = ~~obj.dl >> ((17 - idx) << 2))
    : (ret = ~~obj.dr >> ((23 - idx) << 2));
  return ~~((ret & 15) << 24) >> 24;
}

const defaultState = JSON.stringify({
  arr: [],
  prm: [],
  dl: 10062778,
  dr: 14536702,
  ml: 0,
  ul: 70195,
  ur: 4544119,
});

function drawScramble(parentElement: HTMLElement, stringState: string, w = 600, h = 330) {
  const sq1State = JSON.parse(stringState || defaultState);

  const colorString = "yobwrg"; //In dlburf order.

  const posit = [];

  const middleIsSolved = sq1State.ml === 0;

  const map = [5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 17, 16, 15, 14, 13, 12, 23, 22, 21, 20, 19, 18];

  for (let j = 0; j < map.length; j++) {
    posit.push(FullCube_pieceAt(sq1State, map[j]));
  }

  const tb = ["3", "3", "3", "3", "3", "3", "3", "3", "0", "0", "0", "0", "0", "0", "0", "0"];
  const ty = ["e", "c", "e", "c", "e", "c", "e", "c", "e", "c", "e", "c", "e", "c", "e", "c"];
  const col = ["2", "12", "1", "51", "5", "45", "4", "24", "4", "42", "5", "54", "1", "15", "2", "21"];

  const top_side = remove_duplicates(posit.slice(0, 12));
  const bot_side = remove_duplicates(posit.slice(18, 24).concat(posit.slice(12, 18)));
  const eido = top_side.concat(bot_side);

  let a = "";
  let b = "";
  let c = "";
  for (let j = 0; j < 16; j++) {
    a += ty[eido[j]];
    b += tb[eido[j]];
    c += col[eido[j]];
  }

  const stickers = b
    .concat(c)
    .replace(/0/g, colorString[0])
    .replace(/1/g, colorString[1])
    .replace(/2/g, colorString[2])
    .replace(/3/g, colorString[3])
    .replace(/4/g, colorString[4])
    .replace(/5/g, colorString[5]);

  drawSq(stickers, middleIsSolved, a, parentElement, w, h, colorString);
}

export default drawScramble;
