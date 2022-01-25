import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

import { ColorModeProvider } from "./colorModeContext";
import { ModalProvider } from "./modalContext";
import { NotificationsProvider } from "./notificationsContext";
import { PopoverProvider } from "./popoverContext";
import { SettingsProvider } from "./settingsContext";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [
  RecoilRoot,
  HelmetProvider,
  ColorModeProvider,
  SettingsProvider,
  PopoverProvider,
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
