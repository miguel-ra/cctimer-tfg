import { SVGProps } from "react";
import { v4 as uuidv4 } from "uuid";

function Cube7Icon(props: SVGProps<SVGSVGElement>) {
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
          d="M58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 L58,0 Z M44.0234375,14 L20,14 L20,17.7109375 L39.2382812,17.7109375 L24.5654297,49.546875 L29.3017578,49.546875 L44.0234375,16.5390625 L44.0234375,14 Z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube7Icon;
