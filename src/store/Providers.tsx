import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ColorModeProvider } from "./colorModeContext";
import { ModalProvider } from "./modalContext";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [HelmetProvider, ColorModeProvider, ModalProvider];

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
