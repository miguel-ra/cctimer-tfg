import Box from "components/flexboxgrid/Box";
import Navbar from "features/menu/Navbar";
import SideMenuCompact from "features/menu/SideMenuCompact";
import TimerDesktop from "features/timer/desktop/TimerDesktop";

function LayoutDesktop() {
  return (
    <Box minHeight="100%" flexWrap="nowrap">
      <SideMenuCompact />
      <Box flexDirection="column" flex={1}>
        <Navbar />
        <TimerDesktop />
      </Box>
    </Box>
  );
}

export default LayoutDesktop;
