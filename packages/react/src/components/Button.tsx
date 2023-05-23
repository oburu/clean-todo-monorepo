import { clsx } from 'clsx';

type ButtonType = {
  type?: 'accept' | 'warning' | 'danger' | 'neutral';
  onClick?: () => void;
  children: string | JSX.Element | JSX.Element[];
  extraclasses?: string;
};
export function Button({ type = 'neutral', onClick, children, extraclasses }: ButtonType) {
  const butonStyles = clsx(
    {
      'bg-green-500 hover:bg-green-700 text-white': type === 'accept',
      'bg-red-500 hover:bg-red-700 text-white': type === 'danger',
      'bg-yellow-500 hover:bg-yellow-700 text-white ': type === 'warning',
      'bg-slate-100 border-2 hover:bg-slate-200 border-slate-300 hover:border-slate-400 text-slate-600 dark:bg-slate-900 hover:dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-white dark:border-slate-700 transition ease-in-out duration-200':
        type === 'neutral',
    },
    'font-bold text-lg rounded-lg text-sm p-2.5 ml-2',
    extraclasses
  );
  return (
    <button className={butonStyles} onClick={onClick}>
      {children}
    </button>
  );
}
