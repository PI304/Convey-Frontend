import { PackagesPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <PackagesPage />;
}

setLayout(index, WithSidebarLayout);
