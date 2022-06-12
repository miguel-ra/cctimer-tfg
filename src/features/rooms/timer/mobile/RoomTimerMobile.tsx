import { animated, useSprings } from "@react-spring/web";
import clsx from "clsx";
import clamp from "lodash/clamp";
import { memo, MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-use-gesture";

import Box from "components/flexboxgrid/Box";
import Typography from "components/typography/Typography";
import { useLayoutMobile } from "features/layout/layoutMobileContext";
import Scramble from "features/timer/mobile/tabs/Scramble";
import useMediaQuery from "shared/hooks/useMediaQuery";

import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";

import { useRoomTimer } from "../roomTimerContext";

import useStyles from "./RoomTimerMobile.styles";
import Timer from "./tabs/Timer";
import Users from "./tabs/Users";

type ComponentProps = {
  mobile: boolean;
};

type Tab = {
  label: string;
  Component: (props: ComponentProps) => JSX.Element;
};

const tabs: Tab[] = [
  {
    // t("Timer")
    label: "Timer",
    Component: Timer,
  },
  {
    // t("Users")
    label: "Users",
    Component: Users,
  },
];

type ComputeSpringOptions = {
  activeTab: MutableRefObject<number>;
  isImmediate: MutableRefObject<boolean>;
};

const SPRING_DURATION = 250;

function computeSpring({ activeTab, isImmediate }: ComputeSpringOptions) {
  return (i: number) => ({
    x: (i - activeTab.current) * window.innerWidth,
    immediate: isImmediate.current,
  });
}

function RoomTimerMobile() {
  const activeTab = useRef(0);
  const isImmediate = useRef(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const { openMenu, isDragDisabledRef } = useLayoutMobile();
  const isSmall = useMediaQuery("@media (max-height:300px)");
  const { roomId } = useRoomTimer();

  const computedTabs = [...tabs];

  if (isSmall) {
    computedTabs.splice(1, 0, {
      // t("Scramble")
      label: "Scramble",
      Component: Scramble,
    });
  }

  const updateLayout = useCallback(() => {
    document.querySelectorAll("[id^='timerTabs-panel-']").forEach((element) => {
      const { index } = (element as HTMLElement).dataset;
      if (index) {
        element.setAttribute("aria-selected", (activeTab.current === Number(index)).toString());
      }
    });
    document.querySelectorAll("[id^='timerTabs-tab-']").forEach((element) => {
      const { index } = (element as HTMLElement).dataset;
      if (index) {
        element.setAttribute("aria-expanded", (activeTab.current === Number(index)).toString());
      }
    });
    setTimeout(() => {
      isDragDisabledRef.current = activeTab.current !== 0;
    }, SPRING_DURATION);
  }, [isDragDisabledRef]);

  const [props, api] = useSprings(computedTabs.length, computeSpring({ activeTab, isImmediate }));

  const bind = useDrag(
    ({ last, active, movement: [mx], swipe, distance }) => {
      if (swipe[0] !== 0) {
        activeTab.current = clamp(activeTab.current - swipe[0], 0, computedTabs.length - 1);
        updateLayout();
      } else if (last) {
        const movementDirection = mx > 0 ? -1 : 1;
        const autoChangeDistance = window.innerWidth / 2;
        if (distance > autoChangeDistance) {
          activeTab.current = clamp(activeTab.current + movementDirection, 0, computedTabs.length - 1);
          updateLayout();
        }
      }

      api((i) => {
        let x = (i - activeTab.current) * window.innerWidth + (active ? mx : 0);
        // Avoid first and last element movement when new offset is beyond screen
        if ((i === 0 && x > 0) || (i === computedTabs.length - 1 && x < 0)) {
          x = 0;
        }

        return { x };
      });
    },
    { useTouch: true, lockDirection: true }
  );

  useEffect(() => {
    function handler() {
      isImmediate.current = true;
      activeTab.current = 0;
      api.start(computeSpring({ activeTab, isImmediate }));
      isImmediate.current = false;
      updateLayout();
    }
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [api, updateLayout]);

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <div role="button" className={classes.header} onClick={openMenu} tabIndex={0}>
        <MenuIcon className={classes.icon} />
        <Typography variant="subtitle1">
          <>
            {t("Room code")}: {roomId}
          </>
        </Typography>
      </div>
      <div className={classes.sections}>
        {props.map((style, i) => {
          const { label, Component } = computedTabs[i];

          return (
            <Box
              key={`${label}-panel`}
              as={animated.div}
              componentProps={{
                ...bind(),
                style,
                role: "tabpanel",
                id: `timerTabs-panel-${i}`,
                "data-index": i,
                "aria-controls": `timerTabs-tab-${i}`,
                "aria-expanded": activeTab.current === i,
              }}
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              left={0}
            >
              <Component mobile />
            </Box>
          );
        })}
      </div>
      <div
        className={classes.buttons}
        role="tablist"
        onClick={(event) => {
          const { index } = (event.target as HTMLElement).dataset;
          if (index) {
            activeTab.current = Number(index);
            api.start(computeSpring({ activeTab, isImmediate }));
            updateLayout();
          }
        }}
      >
        {computedTabs.map(({ label }, i) => (
          <div
            role="tab"
            aria-expanded={activeTab.current === i}
            key={`${label}-tab`}
            data-index={i}
            id={`timerTabs-tab-${i}`}
            className={clsx(classes.button)}
          >
            {t(label)}
          </div>
        ))}
      </div>
    </Box>
  );
}

export default memo(RoomTimerMobile);
