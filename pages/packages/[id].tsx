import { PackagesViewPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils/setLayout';

export default function index() {
  return <PackagesViewPage />;
}

setLayout(index, WithSidebarLayout);
