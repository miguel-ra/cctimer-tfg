import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ColorModeProvider } from "./colorModeContext";
import { ModalProvider } from "./modalContext";
import { PopoverProvider } from "./popoverContext";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [
  HelmetProvider,
  ColorModeProvider,
  ModalProvider,
  PopoverProvider,
];

function Providers({ children }: ProvidersProps) {
  return (
    <>
      {providers.reduceRight(
        (accu, Provider) => (
          <Provider>{accu}</Provider>
        ),
        children
      )}
    </>
  );
}

export default Providers;
