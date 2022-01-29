import { SVGProps } from "react";
import { v4 as uuidv4 } from "uuid";

function Cube4Icon(props: SVGProps<SVGSVGElement>) {
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
          d="m13 51v13h-7c-3.3137085 0-6-2.6862915-6-6v-7zm17 0v13h-13v-13zm17 0v13h-13v-13zm17 0v7c0 3.3137085-2.6862915 6-6 6h-7v-13zm-51-17v13h-13v-13zm17 0v13h-13v-13zm17 0v13h-13v-13zm17 0v13h-13v-13zm-51-17v13h-13v-13zm17 0v13h-13v-13zm17 0v13h-13v-13zm17 0v13h-13v-13zm-51-17v13h-13v-7c0-3.3137085 2.6862915-6 6-6zm17 0v13h-13v-13zm17 0v13h-13v-13zm11 0c3.3137085 0 6 2.6862915 6 6v7h-13v-13z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube4Icon;
