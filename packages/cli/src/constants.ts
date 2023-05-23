export const choices = {
  add: 'Add new Todo',
  list: 'List Todos',
  toggle: 'Toggle Todo',
  delete: 'Delete Todo',
  clearAll: 'Clear all Todos',
  exit: 'Exit',
} as const;

export type ValueOf<T> = T[keyof T];
