import MyRest from './MyRest';

export default function Page({ params }: { params: { data?: string[] } }) {
  const slug = params.data as string[];
  let requestData;
  let isRedirected;

  if (slug) {
    const decodedRequestDataString = atob(slug[0]);
    console.log('Decoded String:', decodedRequestDataString);

    // Check if the decoded string is a JSON object
    if (decodedRequestDataString.startsWith('{')) {
      try {
        requestData = JSON.parse(decodedRequestDataString);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        requestData = null;
      }
    } else {
      // Handle the case where it's not JSON (e.g., it's a URL)
      requestData = { endpoint: decodedRequestDataString };
    }

    // const decodedRequestDataString = atob(slug[0]);
    // requestData = JSON.parse(decodedRequestDataString);
    isRedirected = true;
  } else {
    requestData = null;
    isRedirected = false;
  }

  return <MyRest requestData={requestData} />;
}
