import { MutableRefObject, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import clamp from "lodash/clamp";
import clsx from "clsx";
import { ReactComponent as MenuIcon } from "assets/icons/menu.svg";
import useMediaQuery from "shared/hooks/useMediaQuery";
import { useMenu } from "store/menuContext";
import { PuzzleTime, Time } from "models/times/Time";
import { puzzlesData } from "models/puzzles/Puzzle";
import Times from "features/times/Times";
import Typography from "components/typography/Typography";
import Box from "components/flexboxgrid/Box";
import { TimerProvider, useTimer } from "../timerViewModel";
import useStyles from "./TimerMobile.styles";
import Timer from "./Timer";
import Scramble from "./Scramble";

type TabComponentProps = {
  addTime: (time: Time) => void;
  puzzleTimes: PuzzleTime[];
};

type Tab = {
  label: string;
  Component: (props: TabComponentProps) => JSX.Element;
};

const tabs: Tab[] = [
  {
    // t("Timer")
    label: "Timer",
    Component: Timer,
  },
  {
    // t("Session")
    label: "Session",
    Component: Times,
  },
  {
    // t("Stats")
    label: "Stats",
    Component: () => (
      <Box display="grid" placeContent="center" width="100%" height="100%">
        Stats
      </Box>
    ),
  },
];

type TimerMobileProps = {
  isParentDragDisabled: MutableRefObject<boolean>;
  openMenu: () => void;
};

type ComputeSpringOptions = {
  activeTab: MutableRefObject<number>;
  isImmediate: MutableRefObject<boolean>;
};

const SPRING_DURATION = 250;
const DISABLED_OPACITY = 0.5;

function computeSpring({ activeTab, isImmediate }: ComputeSpringOptions) {
  return (i: number) => ({
    x: (i - activeTab.current) * window.innerWidth,
    opacity: activeTab.current !== i ? DISABLED_OPACITY : 1,
    immediate: isImmediate.current,
  });
}

function TimerMobile({ isParentDragDisabled, openMenu }: TimerMobileProps) {
  const activeTab = useRef(0);
  const isImmediate = useRef(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const { selectedItem } = useMenu();
  const { addTime, puzzleTimes } = useTimer();
  const isSmall = useMediaQuery("@media (max-height:300px)");

  const computedTabs = [...tabs];

  if (isSmall) {
    computedTabs.splice(1, 0, {
      // t("Scramble")
      label: "Scramble",
      Component: Scramble,
    });
  }

  function updateLayout() {
    document.querySelectorAll("[id^='timerTabs-panel-']").forEach((element) => {
      const { index } = (element as HTMLElement).dataset;
      if (index) {
        element.setAttribute("aria-selected", (activeTab.current === Number(index)).toString());
      }
    });
    document.querySelectorAll("[id^='timerTabs-tab-']").forEach((element) => {
      const { index } = (element as HTMLElement).dataset;
      if (index) {
        element.setAttribute("hidden", (activeTab.current !== Number(index)).toString());
      }
    });
    setTimeout(() => {
      isParentDragDisabled.current = activeTab.current !== 0;
    }, SPRING_DURATION);
  }

  const [props, api] = useSprings(computedTabs.length, computeSpring({ activeTab, isImmediate }));

  const bind = useDrag(
    ({ last, active, movement: [mx], swipe, distance }: any) => {
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

        return { x, opacity: activeTab.current !== i ? DISABLED_OPACITY : 1 };
      });
    },
    { useTouch: true, lockDirection: true }
  );

  useEffect(() => {
    function handler() {
      isImmediate.current = true;
      api.start(computeSpring({ activeTab, isImmediate }));
      isImmediate.current = false;
    }
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [api]);

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <div role="button" className={classes.header} onClick={openMenu} tabIndex={0}>
        <MenuIcon className={classes.icon} />
        <Typography variant="subtitle1">
          {selectedItem?.key ? t(puzzlesData?.[selectedItem?.key]?.label) : "CCTimer.com"}
        </Typography>
      </div>
      <div className={classes.sections}>
        {props.map(({ opacity, ...style }, i) => {
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
              <Component addTime={addTime} puzzleTimes={puzzleTimes} />
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
        {props.map(({ opacity }, i) => {
          const { label } = computedTabs[i];
          return (
            <animated.button
              role="tab"
              aria-expanded={activeTab.current === i}
              key={`${label}-tab`}
              data-index={i}
              id={`timerTabs-tab-${i}`}
              className={clsx(classes.button)}
              style={{ opacity }}
            >
              {t(label)}
            </animated.button>
          );
        })}
      </div>
    </Box>
  );
}

export default function TimerMobileWithProvider(props: TimerMobileProps) {
  return (
    <TimerProvider>
      <TimerMobile {...props} />
    </TimerProvider>
  );
}
