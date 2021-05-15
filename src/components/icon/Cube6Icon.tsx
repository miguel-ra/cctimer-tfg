import { SVGProps } from "react";
import generateUniqueId from "./generateUniqueId";

function Cube6Icon(props: SVGProps<SVGSVGElement>) {
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
          d="M58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 L58,0 Z M37.7104492,16 L36.9853516,16 C32.0195312,16.0732422 28.2805176,17.6662598 25.7683105,20.7790527 C23.332231,23.7975186 22.0772809,28.121081 22.0034603,33.7497397 L22,34.28125 L22,35.8413086 C22,39.5473633 22.9521484,42.5759277 24.8564453,44.927002 C26.7607422,47.2780762 29.2436523,48.4536133 32.3051758,48.4536133 C35.3227539,48.4536133 37.7287598,47.4648438 39.5231934,45.4873047 C41.317627,43.5097656 42.2148438,40.8730469 42.2148438,37.5771484 C42.2148438,34.4716797 41.3835449,31.9375 39.7209473,29.9746094 C38.0583496,28.0117188 35.8354492,27.0302734 33.0522461,27.0302734 C30.137207,27.0302734 27.8374023,27.9970703 26.152832,29.9306641 C26.4458008,26.6347656 27.5297852,24.0786133 29.4047852,22.262207 C31.2016602,20.5214844 33.5904744,19.5879517 36.571228,19.4616089 L36.9633789,19.449707 L37.7104492,19.449707 L37.7104492,16 Z M32.3710938,30.4140625 C34.1289062,30.4140625 35.5388184,31.0915527 36.6008301,32.4465332 C37.6628418,33.8015137 38.1938477,35.5776367 38.1938477,37.7749023 C38.1938477,39.9575195 37.670166,41.7226562 36.6228027,43.0703125 C35.5754395,44.4179688 34.1362305,45.0917969 32.3051758,45.0917969 C30.5327148,45.0917969 29.0532227,44.2861328 27.8666992,42.6748047 C26.7426244,41.1482833 26.151006,39.1616143 26.0918442,36.7147978 L26.0869141,36.3027344 L26.0869141,34.8085938 C26.5410156,33.5488281 27.3540039,32.5014648 28.5258789,31.6665039 C29.6977539,30.831543 30.9794922,30.4140625 32.3710938,30.4140625 Z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube6Icon;
