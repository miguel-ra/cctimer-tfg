import { SVGProps } from "react";
import generateUniqueId from "./generateUniqueId";

function Cube10Icon(props: SVGProps<SVGSVGElement>) {
  const gradientId = generateUniqueId();
  return (
    <svg
      width="64"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <linearGradient
        id={gradientId}
        x1="10.390811%"
        x2="92.190306%"
        y1="2.611609%"
        y2="97.606691%"
      >
        <stop stopColor="var(--gradient-start,#69BFFF)" offset="0%" />
        <stop stopColor="var(--gradient-end,#388BFD)" offset="100%" />
      </linearGradient>{" "}
      <g fill="none" fillRule="evenodd">
        <path
          d="M6,0 L58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 Z"
          fill="var(--background-color,transparent)"
        ></path>
        <path
          d="M58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 L58,0 Z M22.953985,14 L22.2300752,14 L9,18.9675188 L9,23.161203 L18.3109774,19.7413534 L18.3109774,50.52 L22.953985,50.52 L22.953985,14 Z M51.6607519,14 L50.9368421,14 L37.7067669,18.9675188 L37.7067669,23.161203 L47.0177444,19.7413534 L47.0177444,50.52 L51.6607519,50.52 L51.6607519,14 Z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube10Icon;
