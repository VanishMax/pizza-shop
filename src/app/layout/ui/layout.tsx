import Nav from './nav';

export default function Layout({ children }: JSX.IntrinsicElements['div']) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
