export type Todo = {
  id?: string;
  done?: boolean;
  createdOn?: number;
  modifiedOn?: number;
  description?: string;
};

export function makeTodo(makeId: () => string) {
  const nowDate = Date.now();
  return {
    please({
      done = false,
      modifiedOn = nowDate,
      description,
      createdOn = nowDate,
      id = makeId(),
    }: Todo) {
      return {
        id,
        done,
        createdOn,
        modifiedOn,
        description,
      };
    },
  };
}
