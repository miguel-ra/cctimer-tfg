import { SVGProps } from "react";
import generateUniqueId from "./generateUniqueId";

function ClockIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle
        cx="32"
        cy="32"
        fill="var(--background-color,transparent)"
        r="32"
      />
      <path
        d="m32 0c17.673112 0 32 14.326888 32 32s-14.326888 32-32 32-32-14.326888-32-32 14.326888-32 32-32zm.3577709 6.21260007c-1.0867527-.1975914-2.1279193.52321625-2.3255107 1.60996894l-4.6011767 25.30647169c-.0716509.3940798-.1076943.7938079-.1076943 1.1943485 0 3.6873903 2.9892205 6.6766108 6.6766108 6.6766108.4005406 0 .8002686-.0360435 1.1943485-.1076943 3.6279124-.6596205 6.0341884-4.1353526 5.374568-7.763265l-4.6011767-25.30647169c-.1490123-.81956751-.7904014-1.46095667-1.6099689-1.60996894z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

export default ClockIcon;
