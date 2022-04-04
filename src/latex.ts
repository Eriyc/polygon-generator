import katex from "katex";
import * as math from "./math";

export const getNotationTex = (
  corners: number,
  step: number,
  figures: number
) => {
  const gcd = math.gcd(corners, step);
  const p = corners / gcd;
  const q = step / gcd;

  if (gcd === 1) {
    console.log("relatively prime!");
  } else {
    console.log("not prime");
  }

  const html = katex.renderToString(`n\\{p/q\\}=${figures}\\{${p}/${q}\\}`);
  return html;
};
