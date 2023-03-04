import { WithSidebarLayout, WorkspacesPage } from '@components';
import { setLayout } from '@utils';

export default function index() {
  return <WorkspacesPage />;
}

setLayout(index, WithSidebarLayout);
