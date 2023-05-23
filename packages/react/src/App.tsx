import { useEffect, useState } from 'react';
import { useGetAllTodos } from './hooks/useGetAllTodos';
import { useUpdateAllTodos } from './hooks/useUpdateAllTodos';
import { Header } from './components/Header';
import { List } from './components/List';
import { Todo } from './constants';

function App() {
  const [localTodos, setLocalTodos] = useState<Todo[]>([]);
  const [isReordering, setIsReordering] = useState(false);
  const { todos, isLoading, isError, error } = useGetAllTodos();
  const { updateAllTodos, isSuccessUpdatingAllTodos } = useUpdateAllTodos();

  useEffect(() => {
    todos && setLocalTodos(todos);
  }, [todos]);

  function handleReorder(newTodosOrdered: Todo[]) {
    setIsReordering(true);
    setLocalTodos(newTodosOrdered);
  }

  function handleDone() {
    updateAllTodos(localTodos);
    isSuccessUpdatingAllTodos && setIsReordering(false);
  }

  return (
    <div className="bg-purple-800 dark:bg-slate-900 h-full py-8 px-2 font-display overflow-scroll text-xl">
      <div className="bg-white dark:bg-slate-700 w-full max-w-lg min-w-fit m-auto p-4 rounded-lg">
        <Header isReordering={isReordering} handleDone={handleDone} />
        {isLoading && <p className="text-slate-700 dark:text-white">loading...</p>}
        {!isLoading && !todos?.length && (
          <p className="tracking-wider dark:text-white">
            It seems the <b className="text-purple-700">list</b> is empty 🙃
          </p>
        )}
        <List todos={localTodos} handleReorder={handleReorder} isReordering={isReordering} />
        {isError && error instanceof Error && (
          <p className="text-slate-700 dark:text-white">{error.message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
