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
        deselectionColor: theme.palette.accents_1,
        labelsWidth: 150,
        rowHeight: 40,
        selectionColor: theme.palette.accents_3,
        backgroundColor: theme.palette.background,
        hoverColor: theme.palette.accents_2,
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
