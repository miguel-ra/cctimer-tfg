import { SVGProps } from "react";
import { v4 as uuidv4 } from "uuid";

function Cube5Icon(props: SVGProps<SVGSVGElement>) {
  const gradientId = uuidv4();
  return (
    <svg width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <linearGradient id={gradientId} x1="10.390811%" x2="92.190306%" y1="2.611609%" y2="97.606691%">
        <stop stopColor="var(--gradient-start,#69BFFF)" offset="0%" />
        <stop stopColor="var(--gradient-end,#388BFD)" offset="100%" />
      </linearGradient>{" "}
      <g fill="none" fillRule="evenodd">
        <path
          d="M6,0 L58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 Z"
          fill="var(--background-color,transparent)"
        ></path>
        <path
          d="M58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 L58,0 Z M41.1601562,16 L24.7685547,16 L23.1425781,31.9521484 L26.3945312,32.7871094 L27.4711914,31.9082031 C28.4819336,31.1318359 29.8735352,30.7436523 31.6459961,30.7436523 C33.5795898,30.7436523 35.1286621,31.3918457 36.2932129,32.6882324 C37.4577637,33.9846191 38.0400391,35.7021484 38.0400391,37.8408203 C38.0400391,40.1113281 37.501709,41.8911133 36.4250488,43.1801758 C35.3483887,44.4692383 33.8652344,45.1137695 31.9755859,45.1137695 C30.2470703,45.1137695 28.8554688,44.6486816 27.8007812,43.7185059 C26.8120117,42.8464661 26.1772938,41.5785322 25.8966274,39.9147043 L25.8452148,39.5766602 L22,39.5766602 C22.2490234,42.3452148 23.2670898,44.5131836 25.0541992,46.0805664 C26.8413086,47.6479492 29.1484375,48.4316406 31.9755859,48.4316406 C35.1689453,48.4316406 37.6555176,47.4831543 39.4353027,45.5861816 C41.2150879,43.689209 42.1049805,41.0927734 42.1049805,37.796875 C42.1049805,34.515625 41.2480469,31.9118652 39.5341797,29.9855957 C37.8203125,28.0593262 35.5058594,27.0961914 32.5908203,27.0961914 C30.7314453,27.0961914 29.0570964,27.4981445 27.5677734,28.3020508 L27.2514648,28.4804688 L28.2182617,19.7573242 L41.1601562,19.7573242 L41.1601562,16 Z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube5Icon;
