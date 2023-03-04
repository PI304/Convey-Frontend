import { PackagesPage, WithSidebarLayout } from '@components';
import { setLayout } from '@utils';

export default function index() {
  return <PackagesPage />;
}

setLayout(index, WithSidebarLayout);
