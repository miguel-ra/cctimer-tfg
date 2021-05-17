import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ColorModeProvider } from "./colorModeContext";
import { SettingsProvider } from "./settingsContext";
import { ModalProvider } from "./modalContext";
import { PopoverProvider } from "./popoverContext";
import { MenuProvider } from "./menuContext";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [
  HelmetProvider,
  ColorModeProvider,
  SettingsProvider,
  ModalProvider,
  PopoverProvider,
  MenuProvider,
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
