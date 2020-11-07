export type ComponentProps<T extends {}> = T & {
  children?: string|JSX.Element|(JSX.Element|string)[],
};
