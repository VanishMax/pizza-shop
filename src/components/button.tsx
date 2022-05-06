import { type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import composeClasses from '../compose-classes';
// import styles from '~/styles/components/button.module.css';

type ButtonProps = JSX.IntrinsicElements['div'] & Readonly<{
  submit?: boolean
  label?: string | JSX.Element
  link?: string
  clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  disabled?: boolean
}>;

export default function Button({
  clickHandler,
  label,
  submit = false,
  link = '',
  className = '',
  children,
  // disabled = false,
}: ButtonProps) {
  return (
    <div className={composeClasses(
      'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 cursor-pointer dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
      className,
    )}>
      {link
        ? (
          <Link to={link}>{children || label || ''}</Link>
          )
        : (
          <button type={submit ? 'submit' : 'button'} onClick={e => clickHandler?.(e)}>
            {children || label || ''}
          </button>
          )}
    </div>
  );
}

