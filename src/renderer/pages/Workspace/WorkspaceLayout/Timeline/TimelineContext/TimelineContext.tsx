import { GeistUIThemes } from "@geist-ui/core";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

type TimelineConfig = {
  labelsWidth: number;
  rowHeight: number;
  selectionColor: string;
  deselectionColor: string;
  backgroundColor: string;
  hoverColor: string;
  foregroundColor: string;
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
  theme: GeistUIThemes;
  children: ReactNode;
};

export const TimelineContextProvider = ({
  theme,
  children,
}: Props): ReactElement => {
  const value = useMemo<TimelineContextValue>(
    () => ({
      isInitialized: true,
      config: {
        labelsWidth: 150,
        rowHeight: 40,
        deselectionColor: theme.palette.background,
        selectionColor: theme.palette.accents_2,
        backgroundColor: theme.palette.background,
        hoverColor: theme.palette.accents_1,
        foregroundColor: theme.palette.foreground,
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
