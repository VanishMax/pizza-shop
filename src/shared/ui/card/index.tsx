import styles from './card.module.css';
import composeClasses from '../../../components/compose-classes';

type CardProps = JSX.IntrinsicElements['div'] &
  Readonly<{
    className?: string;
  }>;

export default function Card({ children, className = '' }: CardProps) {
  return <div className={composeClasses(styles.card, className)}>{children}</div>;
}
