export default function Documentation({
  doc,
}: {
  doc: string | undefined;
}): JSX.Element {
  return (
    <div className="graphiql-documentation-wrapper">
      <h3>Documentation:</h3>
      <div className="graphiql-documentation">
        <pre role="region">{doc}</pre>
      </div>
    </div>
  );
}
