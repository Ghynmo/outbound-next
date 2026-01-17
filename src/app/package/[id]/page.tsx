import PackageDetail from '@/components/pages/PackageDetail';
import { initialPackages } from '@/data/initialData';

export function generateStaticParams() {
  return initialPackages.map((pkg) => ({
    id: pkg.id,
  }));
}

export default function PackageDetailPage() {
  return <PackageDetail />;
}
