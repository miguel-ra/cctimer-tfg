import { Outlet } from "react-router-dom";

import Box from "components/flexboxgrid/Box";
import Navbar from "features/menu/Navbar";
import SideMenuCompact from "features/menu/SideMenuCompact";

function LayoutDesktop() {
  return (
    <Box minHeight="100%" flexWrap="nowrap">
      <SideMenuCompact />
      <Box flexDirection="column" flex={1}>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default LayoutDesktop;
