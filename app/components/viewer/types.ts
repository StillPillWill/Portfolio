export type SpinHandle = { active: boolean };

export type ModelViewerProps = {
  url: string;
  /** still image shown until (or instead of) the 3D scene */
  still?: string;
  /** degrees; orients the GLB upright */
  rotation?: [number, number, number];
  label: string;
  className?: string;
};
