export default function EndpointInput(): JSX.Element {
  return (
    <div className="graphiql-endpoint-wrapper">
      <label
        className="graphiql-endpoint-label"
        htmlFor="graphiql-endpoint-input"
      >
        Endpoint URL
      </label>
      <input
        type="text"
        className="graphiql-endpoint-input"
        id="graphiql-endpoint-input"
        placeholder="Enter your GraphQL API endpoint"
      />
    </div>
  );
}
