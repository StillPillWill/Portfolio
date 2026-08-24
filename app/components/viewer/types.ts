export type SpinHandle = { active: boolean };

export type ModelViewerProps = {
  url: string;
  projectKey: "vulcan" | "ender3-2";
  label: string;
  hudRight?: string;
  className?: string;
  style?: React.CSSProperties;
};
