export type RouteParams<T> = {
  key: string;
  name: string; // current context
  params: T;
};
