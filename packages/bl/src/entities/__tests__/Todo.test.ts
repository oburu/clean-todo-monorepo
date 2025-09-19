import { Todo, makeTodo } from '../Todo';

function mockedMakeId() {
  return 'uuid-123456';
}

const nowDate = Date.now();

const mockedTodo: Todo = {
  id: mockedMakeId(),
  description: 'hola',
  createdOn: nowDate,
  modifiedOn: nowDate,
  done: false,
};

describe('Testing the Todo entity', () => {
  it('should create a Todo', () => {
    const res = makeTodo(mockedMakeId).please(mockedTodo);

    expect(res).toEqual(mockedTodo);
  });
});
