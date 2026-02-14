type HeaderProps = {
  content?: unknown;
  [key: string]: unknown;
};

export default function Header({ content }: HeaderProps) {
  return (
    <section>
      <h2>Header</h2>
      <p>Replace this snippet with real content.</p>
    </section>
  );
}
