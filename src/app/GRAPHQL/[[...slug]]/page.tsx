import GraphiqlMain from './GraphiqlMain';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug as string[];
  let requestData;
  if (slug) {
    const decodedRequestDataString = atob(slug[0]);
    requestData = JSON.parse(decodedRequestDataString);
  } else {
    requestData = null;
  }

  return <GraphiqlMain requestData={requestData} />;
}
