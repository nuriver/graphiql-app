import GraphiqlMain from './GraphiqlMain';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug;
  // const mySlug = slug[0]

  console.log(slug);
  return <GraphiqlMain />;
}
