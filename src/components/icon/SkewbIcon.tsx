import { SVGProps } from "react";

import generateUniqueId from "./generateUniqueId";

function SkewbIcon(props: SVGProps<SVGSVGElement>) {
  const gradientId = generateUniqueId();
  return (
    <svg
      width="64"
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <linearGradient
        x1="10.3908111%"
        y1="2.61160876%"
        x2="92.1903058%"
        y2="97.6066909%"
        id={gradientId}
      >
        <stop stopColor="var(--gradient-start,#69BFFF)" offset="0%" />
        <stop stopColor="var(--gradient-end,#388BFD)" offset="100%" />
      </linearGradient>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          fill="var(--background-color,transparent)"
          x="0"
          y="9.09494702e-13"
          width="64"
          height="64"
          rx="6"
        ></rect>
        <path
          d="M-0.000533905933,38.5334661 L25.4634661,63.9994661 L6,64 C2.6862915,64 4.05816873e-16,61.3137085 0,58 L-0.000533905933,38.5334661 Z M63.9994661,38.5354661 L64,58 C64,61.3137085 61.3137085,64 58,64 L38.5354661,63.9994661 L63.9994661,38.5354661 Z M31.9994661,0.536466094 L63.4634661,32.0004661 L32.0004661,63.4644661 L0.536466094,32.0004661 L31.9994661,0.536466094 Z M25.4654661,-0.000533905932 L-0.000533905933,25.4654661 L0,6 C-4.05816873e-16,2.6862915 2.6862915,9.38525082e-13 6,9.37916411e-13 L25.4654661,-0.000533905932 Z M58,9.37916411e-13 C61.3137085,9.3730774e-13 64,2.6862915 64,6 L63.9994661,25.4634661 L38.5334661,-0.000533905932 L58,9.37916411e-13 Z"
          id="Combined-Shape"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default SkewbIcon;
