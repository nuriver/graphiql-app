import MyRest from './MyRest';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug as string[];
  let requestData;
  // let isRedirected;

  console.log('im here');

  if (slug) {
    const decodedRequestDataString = atob(slug[0]);
    requestData = JSON.parse(decodedRequestDataString);
    // isRedirected = true;
  } else {
    requestData = null;
    // isRedirected = false;
  }

  return <MyRest requestData={requestData} />;
}
