import SideMenuCompact from "features/menu/SideMenuCompact";
import Navbar from "features/menu/Navbar";
import Timer from "features/timer/Timer";
import Box from "components/flexboxgrid/Box";

function LayoutDesktop() {
  return (
    <Box minHeight="100%" flexWrap="nowrap">
      <SideMenuCompact />
      <Box flexDirection="column" flex={1}>
        <Navbar />
        <Timer />
      </Box>
    </Box>
  );
}

// Desktop
//   LeftMenu
//     CubeSelector
//     Settings
//     About us
//   MainSection
//     Header
//       Title
//       Toggle color mode
//       Language selector
//     Content
//       ScrambleText
//       Counter
//       SessionSelector
//       Times | StatsFull | ScrambleImage

export default LayoutDesktop;
