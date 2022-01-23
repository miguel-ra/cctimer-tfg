import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

import { ColorModeProvider } from "./colorModeContext";
import { MenuProvider } from "./menuContext";
import { ModalProvider } from "./modalContext";
import { NotificationsProvider } from "./notificationsContext";
import { PopoverProvider } from "./popoverContext";
import { SettingsProvider } from "./settingsContext";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [
  HelmetProvider,
  ColorModeProvider,
  SettingsProvider,
  PopoverProvider,
  MenuProvider,
  NotificationsProvider,
  ModalProvider,
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
