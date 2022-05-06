import Nav from '~/components/nav';

type LayoutProps = JSX.IntrinsicElements['div'] & Readonly<{}>;

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="font-sans px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <Nav />
      {children}
    </main>
  );
}
