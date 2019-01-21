export interface Item {
  name: string;
}

export function createItem(name: string) {
  return {
    name
  };
}
