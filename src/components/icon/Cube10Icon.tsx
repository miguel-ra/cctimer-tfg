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
          d="M58,0 C61.3137085,0 64,2.6862915 64,6 L64,58 C64,61.3137085 61.3137085,64 58,64 L6,64 C2.6862915,64 0,61.3137085 0,58 L0,6 C0,2.6862915 2.6862915,0 6,0 L58,0 Z M44.9394531,14 C41.0820312,14 38.25,15.2695312 36.4433594,17.8085938 C34.6969401,20.2630208 33.7946235,23.9721951 33.7364095,28.9361165 L33.7333984,29.4541016 L33.7333984,35.484375 C33.7985026,40.4811198 34.742513,44.2368164 36.5654297,46.7514648 C38.3883464,49.2661133 41.1959635,50.5234375 44.9882812,50.5234375 C48.8294271,50.5234375 51.6533203,49.2376302 53.4599609,46.6660156 C55.2063802,44.1801215 56.1086968,40.4242712 56.1669108,35.3984646 L56.1699219,34.8740234 L56.1699219,29.0146484 C56.1210938,23.9039714 55.1933594,20.1238607 53.3867188,17.6743164 C51.5800781,15.2247721 48.7643229,14 44.9394531,14 Z M20.6474609,14.3173828 L19.9394531,14.3173828 L7,19.1757812 L7,23.2773438 L16.1064453,19.9326172 L16.1064453,50.0351562 L20.6474609,50.0351562 L20.6474609,14.3173828 Z M44.9394531,17.7109375 C47.2669271,17.7109375 48.9677734,18.5857747 50.0419922,20.3354492 C51.0732422,22.0151367 51.6094922,24.6510742 51.6507422,28.2432617 L51.6533203,28.6972656 L51.6533203,36.0947266 C51.6044922,39.8056641 51.0388997,42.523763 49.956543,44.2490234 C48.8741862,45.9742839 47.218099,46.8369141 44.9882812,46.8369141 C42.7259115,46.8369141 41.0372721,45.9213867 39.9223633,44.090332 C38.8520508,42.3325195 38.2954883,39.648457 38.2526758,36.0381445 L38.25,35.5820312 L38.25,28.3554688 C38.2825521,24.7421875 38.8277995,22.0647786 39.8857422,20.3232422 C40.9436849,18.5817057 42.6282552,17.7109375 44.9394531,17.7109375 Z"
          fill={`url(#${gradientId})`}
        ></path>
      </g>
    </svg>
  );
}

export default Cube10Icon;
