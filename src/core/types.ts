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
