import { RestfulHeader } from '../store/restfulSlice';
import { AppDispatch } from '../store/store';

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
  body: ResponseBody | null;
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
  updateUrl: () => void;
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
  dispatch: AppDispatch;
}
export interface RestfulState {
  method: string;
  endpoint: string;
  body: string;
  headers: RestfulHeader[];
  variables?: string;
  url?: string;
  response?: ResponseState | null;
}
export type SendClickHandler = (
  event: React.MouseEvent<HTMLButtonElement>
) => void;

export interface HistoryObject {
  method: string;
  endpoint: string;
  url: string;
}

export interface GraphiqlState {
  endpoint: string;
  sdl: string;
  query: string;
  variables: string;
  headers: GraphiqlHeader[];
  url?: string;
}

export interface GraphiqlHeader {
  id: string;
  key: string;
  value: string;
}
