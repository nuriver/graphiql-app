import GraphiqlMain from './GraphiqlMain';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug as string[];
  let requestData;
  let isRedirected;
  if (slug) {
    const decodedRequestDataString = atob(slug[0]);
    requestData = JSON.parse(decodedRequestDataString);
    isRedirected = true;
  } else {
    requestData = null;
    isRedirected = false;
  }

  return <GraphiqlMain requestData={requestData} isRedirected={isRedirected} />;
}
