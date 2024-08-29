'use client';

interface EndpointProps {
  endpoint: string;
  setEndpoint: (url: string) => void;
}

export default function Endpoint({ endpoint, setEndpoint }: EndpointProps) {
  return (
    <div className="request__endpoint">
      <h2 className="endpoint__title">Endpoint URL</h2>
      <input
        value={endpoint}
        type="text"
        className="rest__input"
        onChange={(item) => setEndpoint(item.target.value)}
      />
    </div>
  );
}
