import { notFound } from 'next/navigation';
import MyRest from './MyRest';

export default function Page({
  params,
}: {
  params: { method: string; data?: string[] };
}) {
  const data = params.data as string[];
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  if (!validMethods.includes(params.method)) {
    notFound();
  }

  let requestData;

  if (data) {
    const decodedRequestDataString = atob(decodeURIComponent(data[0]));
    requestData = JSON.parse(decodedRequestDataString);
  } else {
    requestData = null;
  }

  return <MyRest requestData={requestData} />;
}
