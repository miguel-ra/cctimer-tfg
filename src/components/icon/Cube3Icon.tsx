import { SVGProps } from "react";
import { v4 as uuidv4 } from "uuid";

function Cube3Icon(props: SVGProps<SVGSVGElement>) {
  const gradientId = uuidv4();
  return (
    <svg width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <linearGradient id={gradientId} x1="10.390811%" x2="92.190306%" y1="2.611609%" y2="97.606691%">
        <stop stopColor="var(--gradient-start,#69BFFF)" offset="0%" />
        <stop stopColor="var(--gradient-end,#388BFD)" offset="100%" />
      </linearGradient>
      <g fill="none" fillRule="evenodd">
        <path
          d="m6 0h52c3.3137085 0 6 2.6862915 6 6v52c0 3.3137085-2.6862915 6-6 6h-52c-3.3137085 0-6-2.6862915-6-6v-52c0-3.3137085 2.6862915-6 6-6z"
          fill="var(--background-color,transparent)"
        />
        <path
          d="m18 46v18h-12c-3.3137085 0-6-2.6862915-6-6v-12zm23 0v18h-18v-18zm23 0v12c0 3.3137085-2.6862915 6-6 6h-12v-18zm-46-23v18h-18v-18zm23 0v18h-18v-18zm23 0v18h-18v-18zm-46-23v18h-18v-12c0-3.3137085 2.6862915-6 6-6zm23 0v18h-18v-18zm17 0c3.3137085 0 6 2.6862915 6 6v12h-18v-18z"
          fill={`url(#${gradientId})`}
        />
      </g>
    </svg>
  );
}

export default Cube3Icon;
