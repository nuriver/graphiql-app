export default function SdlInput(): JSX.Element {
  return (
    <div className="graphiql-endpoint-wrapper">
      <label className="graphiql-endpoint-label" htmlFor="graphiql-sdl-input">
        SDL URL
      </label>
      <input
        type="text"
        className="graphiql-endpoint-input"
        id="graphiql-sdl-input"
      />
    </div>
  );
}
