import MyRest from './MyRest';

export default function Page({
  params,
}: {
  params: { method?: string; data: string[] };
}) {
  const data = params.data as string[];

  let requestData;

  if (data) {
    const decodedRequestDataString = atob(data[0]);
    requestData = JSON.parse(decodedRequestDataString);
  } else {
    requestData = null;
  }

  return <MyRest requestData={requestData} />;
}
