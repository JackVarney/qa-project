export interface Action {
  name: string;
}

export function createAction(name: string) {
  return {
    name
  };
}
