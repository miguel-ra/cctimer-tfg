import { animated, useSprings } from "@react-spring/web";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { Outlet, OutletProps } from "react-router-dom";
import { useDrag } from "react-use-gesture";

import Box from "components/flexboxgrid/Box";
import SideMenuExpanded from "features/menu/SideMenuExpanded";
import { clamp } from "shared/format/number";
import theme from "styles/theme";

import { LayoutMobileProvider, useLayoutMobile } from "./layoutMobileContext";

type UseSpringProps = {
  x: number;
  width: string;
  immediate: boolean;
  opacity: number;
};

type Item = {
  width: number;
  computeWidth?: () => number;
  Component: (props: OutletProps) => JSX.Element | null;
  overlay: boolean;
};

const items: Item[] = [
  {
    width: window.innerWidth > 500 ? 400 / window.innerWidth : 0.9,
    computeWidth: () => (window.innerWidth > 500 ? 400 / window.innerWidth : 0.9),
    Component: SideMenuExpanded,
    overlay: false,
  },
  {
    width: 1,
    Component: Outlet,
    overlay: true,
  },
];

function computeComponent(
  currentIndex: number,
  {
    activeIndexRef,
    isImmediateRef,
  }: {
    activeIndexRef: MutableRefObject<number>;
    isImmediateRef: MutableRefObject<boolean>;
  }
) {
  const distanceToActive = items
    .slice(0, activeIndexRef.current)
    .reduce((accu, item) => accu + item.width * window.innerWidth, 0);

  const distanceToCurrent = items
    .slice(0, currentIndex)
    .reduce((accu, item) => accu + item.width * window.innerWidth, 0);

  return {
    x: distanceToCurrent - distanceToActive,
    width: `${items[currentIndex].width * 100}vw`,
    immediate: isImmediateRef.current,
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
  const activeIndexRef = useRef(1);
  const isImmediateRef = useRef(false);
  const wasDragDisabledRef = useRef(false);
  const { setOpenMenu, setCloseMenu, isDragDisabledRef } = useLayoutMobile();

  const computeSpring = useCallback((i: number) => {
    if (i < activeIndexRef.current - 1 || i > activeIndexRef.current + 1) {
      return {
        x: 0,
        width: "100vw",
        immediate: isImmediateRef.current,
        opacity: 1,
      };
    }
    const component = computeComponent(i, { activeIndexRef, isImmediateRef });
    const overlay = computeOverlay(i, { x: component.x });

    return { ...component, ...overlay };
  }, []);

  const [springs, api] = useSprings<UseSpringProps>(items.length, computeSpring);

  const bind = useDrag(
    ({ swipe, last, active, movement: [mx], distance }) => {
      if (isDragDisabledRef.current) {
        return;
      }

      const prevActiveIndex = activeIndexRef.current;

      if (swipe[0] !== 0) {
        activeIndexRef.current = clamp(activeIndexRef.current - swipe[0], 0, items.length - 1);
      } else if (last) {
        const movementDirection = mx > 0 ? -1 : 1;
        const autoChangeDistance =
          (Math.min(
            items[activeIndexRef.current + movementDirection]?.width,
            items[activeIndexRef.current]?.width
          ) *
            window.innerWidth) /
          2;

        if (distance > autoChangeDistance) {
          activeIndexRef.current = clamp(activeIndexRef.current + movementDirection, 0, items.length - 1);
        }
      }

      if (prevActiveIndex !== activeIndexRef.current) {
        checkMenuOpen();
      }

      api((i) => {
        if (i < activeIndexRef.current - 1 || i > activeIndexRef.current + 1) {
          return;
        }

        const component = computeComponent(i, { activeIndexRef, isImmediateRef });

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
    { useTouch: true, lockDirection: true }
  );

  useEffect(() => {
    function handler() {
      isImmediateRef.current = true;
      items.forEach((item) => {
        if (item.computeWidth) {
          item.width = item.computeWidth();
        }
      });
      api.start(computeSpring);
      isImmediateRef.current = false;
    }
    api.start(computeSpring);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [computeSpring, api]);

  const checkMenuOpen = useCallback(() => {
    if (window.location.hash !== "#menu") {
      const pathWithHash = `${window.location.href.split("#")[0]}#menu`;
      window.history.pushState(null, "", pathWithHash);
    } else if (activeIndexRef.current !== 0) {
      window.history.back();
    }
    if (wasDragDisabledRef.current) {
      isDragDisabledRef.current = true;
      wasDragDisabledRef.current = false;
    }
  }, [isDragDisabledRef]);

  useEffect(() => {
    function setActiveTab(activeIndex: number) {
      activeIndexRef.current = activeIndex;
      api.start(computeSpring);
      checkMenuOpen();
      if (isDragDisabledRef.current) {
        isDragDisabledRef.current = false;
        wasDragDisabledRef.current = true;
      }
    }
    setOpenMenu(() => setActiveTab.bind(null, 0));
    setCloseMenu(() => setActiveTab.bind(null, 1));
  }, [api, checkMenuOpen, computeSpring, isDragDisabledRef, setCloseMenu, setOpenMenu]);

  useEffect(() => {
    function handler() {
      if (!window.location.hash && activeIndexRef.current !== 1) {
        activeIndexRef.current = 1;
        api.start(computeSpring);
      }
    }
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [api, computeSpring]);

  return (
    <Box position="absolute" width="100%" height="100%" overflow="hidden">
      {springs.map(({ opacity, ...style }, i) => {
        const { Component } = items[i];

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
                    activeIndexRef.current = i;
                    api.start(computeSpring);
                    checkMenuOpen();
                  },
                  style: {
                    backgroundColor: theme.palette.background.primary,
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

export default function LayoutMobileWithProvider() {
  return (
    <LayoutMobileProvider>
      <LayoutMobile />
    </LayoutMobileProvider>
  );
}
