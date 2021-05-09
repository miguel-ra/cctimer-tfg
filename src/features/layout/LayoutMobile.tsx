import { useRef, useEffect, useCallback, MutableRefObject } from "react";
import { useDrag } from "react-use-gesture";
import { useSprings, animated } from "@react-spring/web";
import theme from "styles/theme";
import { clamp } from "shared/format/number";
import SideMenuExpanded from "features/menu/SideMenuExpanded";
import TimerTabs from "features/timer/TimerTabs";
import Box from "components/flexboxgrid/Box";

const items = [
  {
    width: window.innerWidth > 500 ? 400 / window.innerWidth : 0.9,
    computeWidth: () =>
      window.innerWidth > 500 ? 400 / window.innerWidth : 0.9,
    component: SideMenuExpanded,
    overlay: false,
  },
  {
    width: 1,
    component: TimerTabs,
    overlay: true,
  },
];

function computeComponent(
  currentIndex: number,
  {
    activeIndex,
    isImmediate,
  }: {
    activeIndex: MutableRefObject<number>;
    isImmediate: MutableRefObject<boolean>;
  }
) {
  const distanceToActive = items
    .slice(0, activeIndex.current)
    .reduce((accu, item) => accu + item.width * window.innerWidth, 0);

  const distanceToCurrent = items
    .slice(0, currentIndex)
    .reduce((accu, item) => accu + item.width * window.innerWidth, 0);

  return {
    x: distanceToCurrent - distanceToActive,
    width: `${items[currentIndex].width * 100}vw`,
    immediate: isImmediate.current,
  };
}

function computeOverlay(currentIndex: number, { x }: { x: number }) {
  let opacity = 0;
  const prevItemWitdh = items[currentIndex - 1]?.width;
  if (prevItemWitdh < 1) {
    const computedPreviousWitdh = prevItemWitdh * window.innerWidth;
    opacity = (0.8 * x) / computedPreviousWitdh;
  }

  return {
    opacity,
  };
}

function LayoutMobile() {
  const activeIndex = useRef(1);
  const isImmediate = useRef(false);

  const computeSpring = useCallback((i) => {
    if (i < activeIndex.current - 1 || i > activeIndex.current + 1) {
      return;
    }
    const component = computeComponent(i, { activeIndex, isImmediate });
    const overlay = computeOverlay(i, { x: component.x });

    return { ...component, ...overlay };
  }, []);

  const [springs, set] = useSprings(items.length, computeSpring as any);

  const bind = useDrag(
    ({ swipe, last, active, movement: [mx], distance }) => {
      isImmediate.current = false;

      if (swipe[0] !== 0) {
        activeIndex.current = clamp(
          activeIndex.current - swipe[0],
          0,
          items.length - 1
        );
      } else if (last) {
        const movementDirection = mx > 0 ? -1 : 1;
        const autoChangeDistance =
          (Math.min(
            items[activeIndex.current + movementDirection]?.width,
            items[activeIndex.current]?.width
          ) *
            window.innerWidth) /
          2;

        if (distance > autoChangeDistance) {
          activeIndex.current = clamp(
            activeIndex.current + movementDirection,
            0,
            items.length - 1
          );
        }
      }

      set((i) => {
        if (i < activeIndex.current - 1 || i > activeIndex.current + 1) {
          return;
        }

        const component = computeComponent(i, { activeIndex, isImmediate });

        let x = component.x + (active ? mx : 0);

        // Avoid first and last element movement when new offset is beyond screen
        if ((i === 0 && x > 0) || (i === items.length - 1 && x < 0)) {
          x = 0;
        }
        const prevItemWitdh = items[i - 1]?.width;
        if (prevItemWitdh < 1) {
          const computedPreviousWitdh = prevItemWitdh * window.innerWidth;
          // Avoid sibling movement when new offset is beyond screen
          if (x > computedPreviousWitdh) {
            x = computedPreviousWitdh;
          }
        }

        const overlay = computeOverlay(i, { x });
        return { ...component, ...overlay, x };
      });
    },
    { useTouch: true }
  );

  useEffect(() => {
    function handler() {
      isImmediate.current = true;
      items.forEach((item) => {
        if (item.computeWidth) {
          item.width = item.computeWidth();
        }
      });
      set(computeSpring);
    }
    set(computeSpring);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [computeSpring, set]);

  console.log("render");

  return (
    <Box position="absolute" width="100%" height="100%" overflow="hidden">
      {springs.map(({ opacity, backgroundColor, ...style }, i) => {
        const Component = items[i].component;

        return (
          <Box
            as={animated.div}
            key={i}
            componentProps={{ ...bind(), style }}
            height="100%"
            position="absolute"
            top={0}
            left={0}
          >
            {items[i].overlay && (
              <Box
                as={animated.div}
                width="100%"
                height="100%"
                position="absolute"
                top={0}
                left={0}
                cursor="pointer"
                userSelect="none"
                WebkitTapHighlightColor="transparent"
                componentProps={{
                  onClick: () => {
                    activeIndex.current = i;
                    set(computeSpring);
                  },
                  style: {
                    backgroundColor: theme.palette.background.default,
                    transition: `background ${theme.transition.duration.colorMode} linear`,
                    opacity,
                    zIndex: opacity.to((value: number) => (value ? 1 : -1)),
                  },
                }}
              />
            )}
            <Component />
          </Box>
        );
      })}
    </Box>
  );
}

// Mobile
//   OffsetSection
//     LeftMenu
//       CubeSelector
//     Menu
//       Title
//       Settings
//       About us
//   MainSection
//     SelectedCube
//     Content
//       Tabs
//         Timer
//           ScrambleText
//           Counter
//           StatsMin | ScrambleImage
//         Session
//           SessionSelector
//         Stats

export default LayoutMobile;
