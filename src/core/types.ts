export interface ResponseBody {
  id: number;
  name: string;
  details: string;
}

export interface BodyResponseProps {
  body: ResponseBody | null;
}

export interface StatusProps {
  status: number | null;
  statusText: string | null;
}

export interface ResponseProps {
  response: {
    body: ResponseBody | null;
    status: number | null;
    statusText: string | null;
  };
}

export interface RequestBlockProps {
  setResponse: React.Dispatch<
    React.SetStateAction<{
      body: ResponseBody | null;
      status: number | null;
      statusText: string | null;
    }>
  >;
}
export interface ResponseState {
  body: any | null;
  status: number | null;
  statusText: string | null;
}
export interface BodyRequestProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
}
export interface EndpointProps {
  endpoint: string;
  setEndpoint: (url: string) => void;
}

export interface MethodProps {
  method: string;
  setMethod: (method: string) => void;
}

export interface Variable {
  name: string;
  value: string;
}

export interface HandleRequestProps {
  endpoint: string;
  method: string;
  body: string;
  headers: Record<string, string>;
  setResponse: (response: {
    body: ResponseBody | null;
    status: number | null;
    statusText: string | null;
  }) => void;
}
