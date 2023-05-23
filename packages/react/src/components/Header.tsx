import { useEffect, useState } from 'react';
import { usePostTodo } from '../hooks/usePostTodo';
import checkyChecky from '../assets/checkyChecky.svg';
import { Button } from './Button';
import { DayNightToggle } from './DayNightToggle';

type HeaderType = {
  isReordering: boolean;
  handleDone: () => void;
};

export function Header({ isReordering, handleDone }: HeaderType) {
  const [description, setDescription] = useState('');
  const { isErrorCreating, isSuccessCreating, errorCreating, createTodo } = usePostTodo();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (description === '') {
      return;
    }

    createTodo({ description });
  }

  useEffect(() => {
    if (isSuccessCreating) {
      setDescription('');
    }
  }, [isSuccessCreating]);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <h2 className="font-bold text-2xl mr-2 tracking-wider text-cyan-900 dark:text-white">
            To-Do List
          </h2>
          <img src={checkyChecky} className="h-6" />
        </div>
        <DayNightToggle />
      </div>
      <form onSubmit={handleSubmit} className="my-4">
        <input
          disabled={isReordering}
          type="text"
          onChange={handleOnChange}
          value={isReordering ? '⛔' : description}
          autoFocus
          className="border-4 border-slate-200 text-slate-600 text-sm p-2 dark:bg-slate-500 dark:border-slate-800 dark:text-white rounded-2xl w-2/3"
        />
        {isErrorCreating && errorCreating instanceof Error && <p>{errorCreating.message}</p>}
        <Button>Add</Button>
        {isReordering && (
          <Button type="warning" onClick={handleDone} extraclasses="animate-shake">
            Done
          </Button>
        )}
      </form>
    </>
  );
}
