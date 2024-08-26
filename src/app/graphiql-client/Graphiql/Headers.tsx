export default function Headers(): JSX.Element {
  return (
    <div className="graphiql-headers-wrapper">
      <header className="graphiql-headers-header">
        <h3>Headers</h3>
        <button>add headers</button>
        <button>show less</button>
      </header>
      <main className="graphiql-headers-main">
        <section className="graphiql-headers-key-wrapper">
          <h4>Header key</h4>
          <input type="text" className="graphiql-headers-key-input" />
          <input type="text" className="graphiql-headers-key-input" />
        </section>
        <section className="graphiql-headers-value-wrapper">
          <h4>Header value</h4>
          <input type="text" className="graphiql-headers-value-input" />
          <input type="text" className="graphiql-headers-value-input" />
        </section>
      </main>
    </div>
  );
}
