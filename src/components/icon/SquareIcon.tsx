import { SVGProps } from "react";
import generateUniqueId from "./generateUniqueId";

function SkewbIcon(props: SVGProps<SVGSVGElement>) {
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
      </linearGradient>
      <g fill="none" fillRule="evenodd">
        <rect
          id="Rectangle"
          fill="var(--background-color,transparent)"
          x="0"
          y="0"
          width="64"
          height="64"
          rx="6"
        ></rect>
        <path
          d="M64,46 L64,58 C64,61.3137085 61.3137085,64 58,64 L44,64 L44,46 L64,46 Z M39,46 L39,64 L25,64 L25,46 L39,46 Z M20,46 L20,64 L6,64 C2.6862915,64 4.05812251e-16,61.3137085 0,58 L0,46 L20,46 Z M64,23 L64,41 L0,41 L0,23 L64,23 Z M20,0 L20,18 L0,18 L0,6 C-4.05812251e-16,2.6862915 2.6862915,6.08718376e-16 6,0 L20,0 Z M39,0 L39,18 L25,18 L25,0 L39,0 Z M58,0 C61.3137085,-6.08718376e-16 64,2.6862915 64,6 L64,18 L44,18 L44,0 L58,0 Z"
          id="Combined-Shape"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default SkewbIcon;
