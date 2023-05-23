import dayjs from 'dayjs';
import { Todo } from '../../../../domain/entities/Todo';
import { shortId } from './shared';

export function formatTable(list: Todo[]) {
  return list.map((todo) => {
    return {
      description: todo.description,
      done: todo.done ? '✅' : '⭕',
      id: shortId(todo.id),
      date: dayjs(todo.modifiedOn).format('MMM D h:mm A'),
    };
  });
}
