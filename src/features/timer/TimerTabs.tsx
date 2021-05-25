import { MutableRefObject, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import clamp from "lodash/clamp";
import clsx from "clsx";
import { Time } from "models/times/Time";
import { puzzlesData } from "models/puzzles/Puzzle";
import { useMenu } from "store/menuContext";
import Stopwatch from "features/stopwatch/Stopwatch";
import Typography from "components/typography/Typography";
import Box from "components/flexboxgrid/Box";
import { useTimerViewModel } from "./timerViewModel";
import { TimerProvider } from "./timerContext";
import useStyles from "./TimerTabs.styles";

type TabComponentProps = {
  addTime: (time: Time) => void;
};

type Tab = {
  label: string;
  Component: (props: TabComponentProps) => JSX.Element;
};

const tabs: Tab[] = [
  {
    // t("Timer")
    label: "Timer",
    Component: ({ addTime }: TabComponentProps) => (
      <Box flex={1} width="100%" position="relative">
        <Stopwatch onSave={addTime} />
      </Box>
    ),
  },
  {
    // t("Session")
    label: "Session",
    Component: () => <div>Session</div>,
  },
  {
    // t("Stats")
    label: "Stats",
    Component: () => <div>Stats</div>,
  },
];

type TimerTabsProps = {
  isParentDragDisabled: MutableRefObject<boolean>;
};

const SPRING_DURATION = 250;

function computeSpring(activeTab: MutableRefObject<number>) {
  return (i: number) => ({
    x: (i - activeTab.current) * window.innerWidth,
    opacity: activeTab.current !== i ? 0.4 : 1,
  });
}

function TimerTabs({ isParentDragDisabled }: TimerTabsProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { selectedItem } = useMenu();
  const { addTime } = useTimerViewModel();
  const activeTab = useRef(0);

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

  const [props, api] = useSprings(tabs.length, computeSpring(activeTab));

  const bind = useDrag(({ last, active, movement: [mx], swipe, distance }: any) => {
    if (swipe[0] !== 0) {
      activeTab.current = clamp(activeTab.current - swipe[0], 0, tabs.length - 1);
      updateLayout();
    } else if (last) {
      const movementDirection = mx > 0 ? -1 : 1;
      const autoChangeDistance = window.innerWidth / 2;
      if (distance > autoChangeDistance) {
        activeTab.current = clamp(activeTab.current + movementDirection, 0, tabs.length - 1);
        updateLayout();
      }
    }

    api((i) => {
      let x = (i - activeTab.current) * window.innerWidth + (active ? mx : 0);
      // Avoid first and last element movement when new offset is beyond screen
      if ((i === 0 && x > 0) || (i === tabs.length - 1 && x < 0)) {
        x = 0;
      }

      return { x, opacity: activeTab.current !== i ? 0.4 : 1 };
    });
  });

  return (
    <Box width="100%" height="100%" flexDirection="column">
      <div className={classes.header}>
        <Typography variant="subtitle1">
          {selectedItem?.key ? t(puzzlesData?.[selectedItem?.key]?.label) : "CCTimer.com"}
        </Typography>
      </div>
      <div className={classes.sections}>
        {props.map(({ opacity, ...style }, i) => {
          const { Component } = tabs[i];

          return (
            <Box
              key={i}
              as={animated.div}
              componentProps={{
                ...bind(),
                style,
                role: "tabpanel",
                id: `timerTabs-panel-${i}`,
                "data-index": i,
                "aria-labelledby": `timerTabs-tab-${i}`,
                "aria-selected": activeTab.current === i,
              }}
              height="100%"
              width="100%"
              position="absolute"
              top={0}
              left={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Component addTime={addTime} />
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
            api.start(computeSpring(activeTab));
            updateLayout();
          }
        }}
      >
        {props.map(({ opacity }, i) => {
          const { label } = tabs[i];
          return (
            <animated.button
              key={label}
              data-index={i}
              id={`timerTabs-tab-${i}`}
              className={clsx(classes.button)}
              style={{ opacity }}
              aria-controls={`timerTabs-panel-${i}`}
              hidden={activeTab.current !== i}
            >
              {t(label)}
            </animated.button>
          );
        })}
      </div>
    </Box>
  );
}

export default function TimerTabsWithProvider(props: TimerTabsProps) {
  return (
    <TimerProvider>
      <TimerTabs {...props} />
    </TimerProvider>
  );
}
