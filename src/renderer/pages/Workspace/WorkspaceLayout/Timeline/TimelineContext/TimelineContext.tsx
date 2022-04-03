import { GeistUIThemes } from "@geist-ui/core";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

type TimelineConfig = {
  backgroundColor: string;
  deselectionColor: string;
  foregroundColor: string;
  hoverColor: string;
  labelsWidth: number;
  rangeColor: string;
  rowHeight: number;
  selectionColor: string;
};

type TimelineContextValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      config: TimelineConfig;
    };

const TimelineContext = createContext<TimelineContextValue>({
  isInitialized: false,
});

export const useTimelineConfig = (): TimelineConfig => {
  const context = useContext(TimelineContext);
  if (!context.isInitialized) {
    throw new Error("TimelineContext not defined");
  }
  return context.config;
};

type Props = {
  children: ReactNode;
  theme: GeistUIThemes;
};

export const TimelineLabelsWidth = 160;
export const TimelineRowHeight = 40;

export const TimelineContextProvider = ({
  theme,
  children,
}: Props): ReactElement => {
  const value = useMemo<TimelineContextValue>(
    () => ({
      isInitialized: true,
      config: {
        backgroundColor: theme.palette.background,
        deselectionColor: theme.palette.background,
        foregroundColor: theme.palette.foreground,
        hoverColor: theme.palette.accents_1,
        labelsWidth: TimelineLabelsWidth,
        rangeColor: theme.palette.secondary,
        rowHeight: TimelineRowHeight,
        selectionColor: theme.palette.accents_2,
      },
    }),
    [theme.palette]
  );

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};
