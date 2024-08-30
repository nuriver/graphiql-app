import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-cont">
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">Go back to home page</Link>
    </div>
  );
}
