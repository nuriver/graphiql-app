import MyRest from './MyRest';

export default function Page({ params }: { params: { data?: string[] } }) {
  const slug = params.data as string[];
  let requestData;
  if (requestData) {
    const decodedRequestDataString = atob(slug[0]);
    requestData = JSON.parse(decodedRequestDataString);
  } else {
    requestData = null;
  }

  return <MyRest requestData={requestData} />;
}
