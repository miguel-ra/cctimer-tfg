import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

type ProvidersProps = {
  children?: ReactNode;
};

const providers = [HelmetProvider];

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
