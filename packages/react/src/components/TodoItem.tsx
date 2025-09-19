import { clsx } from "clsx";
import { forwardRef, useRef, useState } from "react";
import { Todo } from "../constants";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { Button } from "./Button";
import { Spinner } from "./Spinner";

const messageList = [
  "Yes, please",
  "Sí, por favor",
  "Sì grazie",
  "Oui s'il te plaît",
  "はい",
];

export const TodoItem = forwardRef<
  HTMLDivElement,
  { todo: Todo; isReordering: boolean }
>((props, ref) => {
  const [showDialog, setShowDialog] = useState(false);
  const acceptMessage = useRef(
    messageList[Math.floor(Math.random() * messageList.length)]
  );
  const { updateTodo, isUpdating } = useUpdateTodo();
  const { deleteTodo, isDeleting } = useDeleteTodo();

  const { todo, isReordering, ...rest } = props;

  function handleDoneTodo() {
    const newTodo = {
      ...todo,
      done: !todo.done,
    };

    updateTodo(newTodo);
  }

  function handleDeleteTodo() {
    deleteTodo(todo.id);
    toggleDialog();
  }

  function toggleDialog() {
    setShowDialog((prev) => !prev);
  }

  const dialogStyles = clsx(
    { "[transform:rotateX(180deg)]": showDialog },
    "[transform-style:preserve-3d] transition-all duration-300 relative h-full w-full bg-slate-100 dark:bg-slate-800 active:bg-slate-300 dark:active:bg-slate-950 rounded items-center"
  );
  const labelStyles = clsx("flex items-center cursor-pointer", {
    "line-through text-gray-400 dark:text-slate-500": todo.done,
    "text-slate-600 dark:text-slate-300": !todo.done,
  });

  return (
    <div
      className="relative [perspective:1000px] h-14 w-full mb-2"
      ref={ref}
      {...rest}
    >
      <div className={dialogStyles}>
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex h-full w-full px-2 items-center "
        >
          <div className="flex items-center h-full w-full">
            <label className={labelStyles}>
              <input
                disabled={isReordering}
                type="checkbox"
                checked={todo.done}
                onChange={handleDoneTodo}
                className="bg-slate-300 border-0 text-sky-500  mr-2 h-5 w-5 rounded cursor-pointer "
              />

              {todo.description}
            </label>
            {isUpdating && <Spinner />}
            {isDeleting && <Spinner />}
          </div>
          {!isReordering && (
            <Button onClick={toggleDialog} type="neutral">
              <span className="text-xs flex items-center">❌</span>
            </Button>
          )}
        </div>
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="[backface-visibility: hidden] [transform:rotateX(180deg)] flex absolute inset-0 h-full w-full items-center px-2 dark:bg-slate-900 bg-slate-200 rounded"
        >
          <div className="flex items-center h-full w-full">
            <span className="dark:text-slate-400">
              <b className="text-rose-600">Deleting!!</b> are you sure?
            </span>
            <Button onClick={handleDeleteTodo} type="neutral">
              <span>🚀 {acceptMessage.current}</span>
            </Button>
          </div>
          <Button onClick={toggleDialog} type="neutral">
            <span className="text-md flex items-center">Cancel</span>
          </Button>
        </div>
      </div>
    </div>
  );
});
