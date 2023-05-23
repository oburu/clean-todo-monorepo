import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TodoItem } from './TodoItem';
import { Todo } from '../constants';

type ListType = {
  todos: Todo[];
  handleReorder: (todo: Todo[]) => void;
  isReordering: boolean;
};

export function List({ todos, handleReorder, isReordering }: ListType) {
  function handleRepositioning(result: DropResult) {
    if (!todos) return;
    const newTodos = Array.from(todos);
    const [reorderedItem] = newTodos.splice(result.source.index, 1);

    if (!result.destination) return;
    newTodos.splice(result.destination.index, 0, reorderedItem);

    handleReorder(newTodos);
  }

  return (
    <div className="relative">
      <DragDropContext onDragEnd={handleRepositioning}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={isReordering && !snapshot.isDraggingOver ? 'animate-shake' : ''}
            >
              {todos?.length &&
                todos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <TodoItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        todo={item}
                        isReordering={isReordering}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
