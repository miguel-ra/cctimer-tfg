import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  containerId: string;
  children: ReactNode;
};

function Portal({ containerId, children }: PortalProps) {
  const [domContainer, setDomContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(containerId) as HTMLElement;
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", containerId);
      document.body.appendChild(container);
    }
    setDomContainer(container);
    return () => {
      setDomContainer(null);
      if (!container.textContent) {
        container.remove();
      }
    };
  }, [containerId]);

  if (!domContainer) {
    return null;
  }

  return ReactDOM.createPortal(children, domContainer);
}

export default Portal;
