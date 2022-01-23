import { render as rtlRender } from "@testing-library/react";
import { FC, ReactElement } from "react";

import Providers from "store/Providers";

function renderWithProviders(ui: ReactElement) {
  const Wrapper: FC = ({ children }) => <Providers>{children}</Providers>;
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from "@testing-library/react";
// override React Testing Library's render with our own
export { renderWithProviders };
