export type ComponentProps<T extends {}> = T & {
  children: JSX.Element|JSX.Element[],
};
