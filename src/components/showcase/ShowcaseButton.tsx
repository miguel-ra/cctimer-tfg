import { ReactNode } from "react";

import Button from "components/button/Button";
import Tooltip from "components/tooltip/Tooltip";

type ShowcaseButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

function ShowcaseButton({ label, onClick, children }: ShowcaseButtonProps) {
  return (
    <Tooltip label={label}>
      <Button size="small" shape="square" aria-label={label} onClick={onClick}>
        {children}
      </Button>
    </Tooltip>
  );
}

ShowcaseButton.displayName = "ShowcaseButton";

export default ShowcaseButton;
