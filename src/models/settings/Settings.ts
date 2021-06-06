type Settings = {
  inspection: {
    enabled: boolean;
    time: number;
    autoStart: boolean;
  };
  timer: {
    hideTime: boolean;
    hideUI: boolean;
    holdToStart: boolean;
  };
};

const initialSettings: Settings = {
  inspection: {
    enabled: false,
    time: 15,
    autoStart: false,
  },
  timer: {
    hideTime: false,
    hideUI: false,
    holdToStart: false,
  },
};

export type { Settings };
export { initialSettings };
