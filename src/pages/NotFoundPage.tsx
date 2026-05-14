import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <PageWrapper title="Page Not Found">
      <div className="text-center py-20">
        <p className="text-7xl font-bold text-amber-200 font-display mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Page Not Found</h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">Go to Menu</Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
